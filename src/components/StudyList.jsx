import { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { collection, query, where, onSnapshot, orderBy, doc, deleteDoc } from "firebase/firestore";
import { UserContext } from "../UserContext";
import StudyForm from "./StudyForm";

const StudyList = () => {
  const { user } = useContext(UserContext);
  const [records, setRecords] = useState([]);
  const [editingRecord, setEditingRecord] = useState(null);

  useEffect(() => {
    if (!user) return;

    //ユーザーIDでフィルタ+作成日時で並び替え
    const q = query(
      collection(db, "records"),
      where("uid", "==", user.uid),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecords(data);
    });

    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("この記録を削除しますか？");
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "records", id));
    } catch (error) {
      console.error("削除エラー", error);
      alert("削除に失敗しました");
    }
  };

  const handleEdit = (record) => {
    setEditingRecord(record);
  }

  return (
    <div className="max-w-md mx-auto mt-6 p-4 bg-white dark:bg-gray-800 rounded shadow">
      <StudyForm
        existingRecord={editingRecord}
        onSave={() => setEditingRecord(null)}
        onCancel={() => setEditingRecord(null)}
      />

      <h2 className="text-xl font-bold mb-4 text-center text-white">📚 学習記録一覧</h2>
      {records.length === 0 && <p>記録がありません</p>}
      <ul className="space-y-2">
        {records.map(record => (
          <li key={record.id} className="border-b pb-2">
            <h3 className="font-semibold">{record.title}</h3>
            <p>{record.memo}</p>
            <p className="text-sm text-gray-500">
              {record.createdAt?.toDate().toLocaleString() || "日付なし"}
            </p>
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => handleEdit(record)}
                className="text-blue-500 text-sm hover:underline"
              >
                ✏ 編集
              </button>
              <button
                onClick={() => handleDelete(record.id)}
                className="absolute top-0 right-0 text-red-500 hover:text-red-700 text-sm">
                🗑 削除
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StudyList;