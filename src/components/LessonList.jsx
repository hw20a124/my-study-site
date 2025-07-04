function LessonList({ lessons, onSelect }) {
  return (
    <div style={{padding: "20px"}}>
      <h2>教材一覧</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        {lessons.map((lesson) => (
          <div
            key={lesson.id}
            onClick={() => onSelect(lesson)}
            style={{
              cursor: "pointer",
              padding: "16px",
              backgroundColor: "#2196f3",
              color: "#ffffff",
              borderRadius: "12px",
              border: "1px, solid #ffffff",
              boxShadow: "0 4px 12px rgba(0, 0 ,0 ,0.1)",
              transition: "transform 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <h3 style={{ margin: 0 }}>{lesson.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LessonList;