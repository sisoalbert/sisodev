import React from "react";
import CommentShimmer from "./CommentShimmer";
import LetterShimmer from "./LetterShimmer";

const CommentShimmerDemo: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px", color: "#1f2937" }}>
        Comment Shimmer Loading States
      </h2>
      
      <div style={{ display: "grid", gap: "40px" }}>
        <div>
          <h3 style={{ marginBottom: "10px", color: "#374151" }}>Full Comment Section</h3>
          <CommentShimmer count={3} showReplies={true} />
        </div>

        <div>
          <h3 style={{ marginBottom: "10px", color: "#374151" }}>Comments Without Replies</h3>
          <CommentShimmer count={4} showReplies={false} />
        </div>

        <div>
          <h3 style={{ marginBottom: "10px", color: "#374151" }}>Single Letter Shimmer Variations</h3>
          <div style={{ display: "grid", gap: "16px" }}>
            <LetterShimmer lines={1} wordsPerLine={[12]} />
            <LetterShimmer lines={2} wordsPerLine={[8, 10]} showAvatar={false} />
            <LetterShimmer lines={3} wordsPerLine={[6, 12, 8]} showTimestamp={false} />
            <LetterShimmer lines={4} wordsPerLine={[10, 8, 15, 5]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentShimmerDemo;
