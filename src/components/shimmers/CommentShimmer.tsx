import React from "react";
import LetterShimmer from "./LetterShimmer";

interface CommentShimmerProps {
  count?: number;
  showReplies?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const CommentShimmer: React.FC<CommentShimmerProps> = ({
  count = 3,
  showReplies = true,
  className,
  style,
}) => {
  const generateCommentVariations = () => {
    const variations = [
      { lines: 2, wordsPerLine: [6, 8] },
      { lines: 3, wordsPerLine: [10, 12, 5] },
      { lines: 1, wordsPerLine: [15] },
      { lines: 4, wordsPerLine: [8, 10, 12, 7] },
    ];
    
    return Array.from({ length: count }).map((_, index) => {
      const variation = variations[index % variations.length];
      const hasReply = showReplies && Math.random() > 0.6; // 40% chance of having a reply
      
      return (
        <div key={`comment-${index}`}>
          <LetterShimmer
            lines={variation.lines}
            wordsPerLine={variation.wordsPerLine}
            showAvatar={true}
            showTimestamp={true}
          />
          
          {/* Reply shimmer */}
          {hasReply && (
            <div style={{ marginLeft: "52px", marginTop: "-8px" }}>
              <LetterShimmer
                lines={Math.floor(Math.random() * 2) + 1}
                wordsPerLine={[6, 9]}
                showAvatar={true}
                showTimestamp={true}
                style={{
                  backgroundColor: "#f9fafb",
                  border: "1px solid #f3f4f6",
                }}
              />
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className={className} style={style}>
      <div style={{ marginBottom: "24px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#374151",
            marginBottom: "16px",
          }}
        >
          Comments
        </h3>
        
        {/* Comment input shimmer */}
        <div
          style={{
            padding: "16px",
            backgroundColor: "white",
            borderRadius: "8px",
            border: "1px solid #e5e7eb",
            marginBottom: "24px",
          }}
        >
          <div style={{ display: "flex", gap: "12px", alignItems: "flex-start" }}>
            <div
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "50%",
                backgroundColor: "#e5e7eb",
                flexShrink: 0,
              }}
            />
            <div style={{ flex: 1 }}>
              <div
                style={{
                  height: "80px",
                  backgroundColor: "#f9fafb",
                  border: "1px solid #e5e7eb",
                  borderRadius: "6px",
                  marginBottom: "12px",
                }}
              />
              <div
                style={{
                  height: "32px",
                  width: "80px",
                  backgroundColor: "#e5e7eb",
                  borderRadius: "4px",
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div>
        {generateCommentVariations()}
      </div>
    </div>
  );
};

export default CommentShimmer;
