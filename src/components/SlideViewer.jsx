import { useState } from "react";

function SlideViewer({ lesson }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slide = lesson.slides[currentSlide];

  //演習用の入力状態
  const [code, setCode] = useState(slide.initialCode || "");
  const [isCorrect, setIsCorrect] = useState(null);

  //次のスライドへ
  const next = () => {
    const nextIndex = currentSlide + 1;
    setCurrentSlide(nextIndex);
    const nextSlide = lesson.slides[nextIndex];
    setCode(nextSlide?.initialCode || "");
  };

  //前のスライドへ
  const prev = () => {
    const prevIndex = currentSlide - 1;
    setCurrentSlide(prevIndex);
    const prevSlide = lesson.slides[prevIndex];
    setCode(prevSlide?.initialCode || "");
  };

  //カード風スタイル
  const cardStyle = {
    border: "1px solid #ccc",
    padding: "16px",
    borderRadius: "12px",
    backgroundColor: "var(--card-bg)",
    color: "var(--text-color)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    marginTop: "20px"
  }

  //演習チェックロジック
  const handleCodeChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);

    if (slide.answer !== undefined) {
      const normalizedUserCode = newCode.trim().replace(/\s+/g, "");
      const normalizedAnswer = slide.answer.trim().replace(/\s+/g, "");
      setIsCorrect(normalizedUserCode === normalizedAnswer);
    }
  }

  //スライド進捗(%表示用)
  const progress = ((currentSlide + 1) / lesson.slides.length * 100);

  return (
    <div>
      <h2>{lesson.title}</h2>

      {/* スライド番号表示 */}
      <p style={{ fontSize: "14px", color: "#666", marginBottom: "10px" }}>
        スライド {currentSlide + 1} / {lesson.slides.length}
      </p>

      {/* テキストスライド */}
      {slide.type === "text" && (
        <div
          dangerouslySetInnerHTML={{ __html: slide.content }}
          style={cardStyle}
        />
      )}

      {/* 演習スライド */}
      {slide.type === "exercise" && (
        <div style={{ marginTop: "20px" }}>
          <p>{slide.description}</p>
          <textarea
            value={code}
            onChange={handleCodeChange}
            style={{
              width: "100%",
              height: "120px",
              fontFamily: "monospace",
              fontSize: "14px"
            }}
          />
          {isCorrect !== null && (
            <p style={{color: isCorrect ? "green": "red", marginTop: "10px"}}>
              {isCorrect ? "正解です!" : "まだ正解ではありません"}
            </p>
          )}
          <h4>プレビュー</h4>
          <div
            style={{
              ...cardStyle,
              marginTop: "10px",
              backgroundColor: "#f9f9f9"
            }}
            dangerouslySetInnerHTML={{__html: code}}
          />
        </div>
      )}


      {/* ナビゲーション */}
      <div style={{ marginTop: "20px" }}>
        <button style={{marginRight: "10px"}} onClick={prev} disabled={currentSlide === 0}>← 前へ</button>
        <button style={{ marginLeft: "10px" }} onClick={next} disabled={currentSlide === lesson.slides.length - 1}>次へ →</button>
      </div>

      {/*進捗バー*/}
      <div style={{ marginTop: "30px" }}>
        <div
          style={{
            height: "8px",
            backgroundColor: "#eee",
            borderRadius: "4px",
            overflow: "hidden"
          }}
        >
          <div
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#4caf50",
              transition: "width 0.3s ease"
            }}
          />
        </div>
        <p style={{ fontSize: "12px", textAlign: "right" }}>
          {Math.round(progress)}%
        </p>
      </div>

    </div>

    
  );
}

export default SlideViewer;