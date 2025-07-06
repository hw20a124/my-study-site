import { useState, useContext } from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { UserContext } from "../UserContext";

const StudyForm = () => {
  const { user } = useContext(UserContext); // 現在のログインユーザー

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (!user) {
      setMessage("ログインしてください");
      return;
    }

    try {
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
    } catch (error) {
      console.error("保存エラー:", error);
      setMessage("❌ 保存に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white dark:bg-gray-800 rounded shadow max-w-md mx-auto mt-6 space-y-4">
      <h2 className="text-xl font-bold text-center">学習記録フォーム</h2>

      <input
        type="text"
        placeholder="タイトル"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="メモ"
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        required
        className="w-full border p-2 rounded"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        保存する
      </button>

      {message && <p className="text-center mt-2">{message}</p>}
    </form>
  );
};

export default StudyForm;
