import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import SlideViewer from './components/SlideViewer';
import LessonList from './components/LessonList';
import { lessons } from './data/lessons';

function App() {
  const [selectedLesson, setSelectedLesson] = useState(null);

  //テーマの状態を追加
  const [theme, setTheme] = useState("light");

  //テーマが変わったら HTMLに反映
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  //テーマ切り替え関数
  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <>
      <header className="header">
        <h1 style={{ margin: 0 }}>My教材サイト</h1>
        {/* テーマ切り替えボタン(どのページでも共通表示) */}
        <button onClick={toggleTheme}>
          {theme === "light" ? "🌙 ダーク" : "☀ ライト"}
        </button>
      </header>

      <main className="main">
        {selectedLesson ? (
          <>
            <button onClick={()=> setSelectedLesson(null)}>
              ← 戻る
            </button>
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
  )
}

export default App
