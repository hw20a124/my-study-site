import { useState, useEffect } from "react";
import SlideViewer from "./SlideViewer";
import LessonList from "./LessonList";
import { lessons } from "../data/lessons";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import StudyForm from "./StudyForm";
import StudyList from "./StudyList";

const Home = () => {
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [theme, setTheme] = useState("light");
  const { user } = useContext(UserContext);

  const handleLogout = async () => {
    await signOut(auth);
  };

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <header className="header">
        <h1 style={{ margin: 0 }}>My教材サイト</h1>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          {/* ログインユーザー表示 */}
          {user ? (
            <>
              <span>{user.email} さん</span>
              <button onClick={handleLogout}>ログアウト</button>
            </>
          ) : (
              <span>ログインしていません</span>
          )}
          <button onClick={toggleTheme}>
            {theme === "light" ? "🌙 ダーク" : "☀ ライト"}
          </button>
        </div>
      </header>

      <main className="main">
        <StudyForm />
        <StudyList />
        {selectedLesson ? (
          <>
            <button onClick={() => setSelectedLesson(null)}>← 戻る</button>
            <SlideViewer lesson={selectedLesson} />
          </>
        ) : (
          <LessonList lessons={lessons} onSelect={setSelectedLesson} />
        )}
      </main>

      <footer className="footer">
        &copy; 2025 My教材サイト. All rights reserved.
      </footer>
    </>
  );
};

export default Home;