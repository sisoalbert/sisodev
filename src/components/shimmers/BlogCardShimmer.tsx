import React from "react";
import { motion } from "motion/react";

interface BlogCardShimmerProps {
  showImage?: boolean;
  showSubtitle?: boolean;
  showTags?: boolean;
}

const BlogCardShimmer: React.FC<BlogCardShimmerProps> = ({
  showImage = true,
  showSubtitle = true,
  showTags = true,
}) => {
  const shimmerVariants = {
    initial: {
      backgroundPosition: "-200px 0",
    },
    animate: {
      backgroundPosition: "calc(200px + 100%) 0",
    },
  };

  const shimmerTransition = {
    duration: 1.5,
    ease: "linear" as const,
    repeat: Infinity,
  };

  const shimmerStyle = {
    background: "linear-gradient(90deg, #f0f0f0 0px, #e0e0e0 40px, #f0f0f0 80px)",
    backgroundSize: "200px 100%",
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        marginBottom: "24px",
      }}
    >
      {showImage && (
        <motion.div
          style={{
            height: "200px",
            ...shimmerStyle,
          }}
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={shimmerTransition}
        />
      )}

      <div style={{ padding: "20px" }}>
        {/* Title shimmer */}
        <motion.div
          style={{
            height: "24px",
            width: "80%",
            marginBottom: "8px",
            ...shimmerStyle,
          }}
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
          transition={shimmerTransition}
        />

        {/* Subtitle shimmer */}
        {showSubtitle && (
          <motion.div
            style={{
              height: "16px",
              width: "60%",
              marginBottom: "12px",
              ...shimmerStyle,
            }}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ ...shimmerTransition, delay: 0.1 }}
          />
        )}

        {/* Author and date section */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "16px",
          }}
        >
          <motion.div
            style={{
              height: "14px",
              width: "100px",
              ...shimmerStyle,
            }}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ ...shimmerTransition, delay: 0.2 }}
          />

          <motion.div
            style={{
              height: "14px",
              width: "60px",
              ...shimmerStyle,
            }}
            variants={shimmerVariants}
            initial="initial"
            animate="animate"
            transition={{ ...shimmerTransition, delay: 0.3 }}
          />
        </div>

        {/* Tags shimmer */}
        {showTags && (
          <div style={{ marginTop: "12px" }}>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
              {[1, 2, 3].map((index) => (
                <motion.div
                  key={index}
                  style={{
                    height: "20px",
                    width: `${40 + index * 10}px`,
                    ...shimmerStyle,
                    borderRadius: "3px",
                  }}
                  variants={shimmerVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ ...shimmerTransition, delay: 0.4 + index * 0.1 }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogCardShimmer;
