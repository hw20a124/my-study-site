import { useState, useEffect, useContext } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp, doc, updateDoc } from "firebase/firestore";
import { UserContext } from "../UserContext";

const StudyForm = ({existingRecord, onCancel}) => {
  const { user } = useContext(UserContext); // 現在のログインユーザー

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [message, setMessage] = useState("");

  //編集モードの場合、フォームに既存データを反映
  useEffect(() => {
    if (existingRecord) {
      setTitle(existingRecord.title);
      setMemo(existingRecord.memo);
    }
  }, [existingRecord]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user) {
      setMessage("ログインしてください");
      return;
    }

    try {
      if (existingRecord) {
        //編集モード
        const docRef = doc(db, "records", existingRecord.id);
        await updateDoc(docRef, {
          title,
          memo,
        });
        setMessage("✅ 記録を更新しました！");
        onSave?.();
      } else {
        //新規作成モード
        await addDoc(collection(db, "records"), {
          uid: user.uid,
          email: user.email,
          title,
          memo,
          createdAt: serverTimestamp(),
        });

        setTitle("");
        setMemo("");
        setMessage("✅ 学習記録を保存しました！");
      }
    } catch (error) {
      console.error("保存エラー:", error);
      setMessage("❌ 保存に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg mb-6 transition-all"
    >
      <h2 className="text-lg font-bold mb-2">
        {existingRecord ? "✏ 記録を編集" : "🆕 記録を追加"}
      </h2>
      <input
        className="w-full p-2 mb-3 border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-blue-400"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        className="w-full p-2 mb-4 border rounded bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="メモ"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <div className="flex gap-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 shadow-md transition-colors">
          保存 
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-1 rounded"
          >
            キャンセル
          </button>
        )}
      </div>
    </form>
  );
};

export default StudyForm;
