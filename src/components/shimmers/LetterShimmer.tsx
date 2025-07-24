import React from "react";
import { motion } from "motion/react";

interface LetterShimmerProps {
  lines?: number;
  wordsPerLine?: number[];
  showAvatar?: boolean;
  showTimestamp?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const LetterShimmer: React.FC<LetterShimmerProps> = ({
  lines = 3,
  wordsPerLine = [8, 12, 6],
  showAvatar = true,
  showTimestamp = true,
  className,
  style,
}) => {
  const shimmerVariants = {
    initial: {
      opacity: 0.3,
    },
    animate: {
      opacity: [0.3, 0.8, 0.3],
    },
  };

  const shimmerTransition = {
    duration: 1.2,
    ease: "easeInOut" as const,
    repeat: Infinity,
  };

  const generateWords = (wordCount: number, lineIndex: number) => {
    return Array.from({ length: wordCount }).map((_, wordIndex) => {
      const wordLength = Math.floor(Math.random() * 8) + 3; // Random word length between 3-10
      const delay = (lineIndex * 0.1) + (wordIndex * 0.05);
      
      return (
        <motion.span
          key={`word-${lineIndex}-${wordIndex}`}
          style={{
            display: "inline-block",
            height: "16px",
            width: `${wordLength * 8}px`,
            backgroundColor: "#e5e7eb",
            borderRadius: "2px",
            marginRight: "8px",
            marginBottom: "4px",
          }}
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={{ ...shimmerTransition, delay }}
        />
      );
    });
  };

  return (
    <div
      className={className}
      style={{
        padding: "16px",
        backgroundColor: "white",
        borderRadius: "8px",
        border: "1px solid #e5e7eb",
        marginBottom: "12px",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", gap: "12px" }}>
        {/* Avatar shimmer */}
        {showAvatar && (
          <motion.div
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#e5e7eb",
              flexShrink: 0,
            }}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={shimmerTransition}
          />
        )}

        <div style={{ flex: 1 }}>
          {/* Header with name and timestamp */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "8px",
            }}
          >
            {/* Name shimmer */}
            <motion.div
              style={{
                height: "16px",
                width: "80px",
                backgroundColor: "#e5e7eb",
                borderRadius: "2px",
              }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ ...shimmerTransition, delay: 0.1 }}
            />

            {/* Timestamp shimmer */}
            {showTimestamp && (
              <motion.div
                style={{
                  height: "14px",
                  width: "60px",
                  backgroundColor: "#f3f4f6",
                  borderRadius: "2px",
                }}
                variants={shimmerVariants}
                initial="initial"
                animate="animate"
                transition={{ ...shimmerTransition, delay: 0.15 }}
              />
            )}
          </div>

          {/* Content lines */}
          <div style={{ lineHeight: "1.6" }}>
            {Array.from({ length: lines }).map((_, lineIndex) => {
              const wordCount = wordsPerLine[lineIndex] || Math.floor(Math.random() * 8) + 4;
              return (
                <div
                  key={`line-${lineIndex}`}
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    marginBottom: lineIndex < lines - 1 ? "8px" : "0",
                  }}
                >
                  {generateWords(wordCount, lineIndex)}
                </div>
              );
            })}
          </div>

          {/* Action buttons shimmer (like/reply) */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginTop: "12px",
            }}
          >
            <motion.div
              style={{
                height: "12px",
                width: "30px",
                backgroundColor: "#f3f4f6",
                borderRadius: "2px",
              }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ ...shimmerTransition, delay: 0.3 }}
            />
            <motion.div
              style={{
                height: "12px",
                width: "35px",
                backgroundColor: "#f3f4f6",
                borderRadius: "2px",
              }}
              variants={shimmerVariants}
              initial="initial"
              animate="animate"
              transition={{ ...shimmerTransition, delay: 0.35 }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LetterShimmer;
