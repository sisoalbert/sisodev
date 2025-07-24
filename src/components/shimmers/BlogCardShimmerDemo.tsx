import React from "react";
import BlogCardShimmer from "./BlogCardShimmer";

const BlogCardShimmerDemo: React.FC = () => {
  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "20px", color: "#1f2937" }}>
        BlogCard Shimmer Loading States
      </h2>
      
      <div style={{ display: "grid", gap: "20px" }}>
        <div>
          <h3 style={{ marginBottom: "10px", color: "#374151" }}>Full BlogCard Shimmer</h3>
          <BlogCardShimmer />
        </div>

        <div>
          <h3 style={{ marginBottom: "10px", color: "#374151" }}>Without Image</h3>
          <BlogCardShimmer showImage={false} />
        </div>

        <div>
          <h3 style={{ marginBottom: "10px", color: "#374151" }}>Without Subtitle</h3>
          <BlogCardShimmer showSubtitle={false} />
        </div>

        <div>
          <h3 style={{ marginBottom: "10px", color: "#374151" }}>Without Tags</h3>
          <BlogCardShimmer showTags={false} />
        </div>

        <div>
          <h3 style={{ marginBottom: "10px", color: "#374151" }}>Minimal (Title + Author/Date only)</h3>
          <BlogCardShimmer showImage={false} showSubtitle={false} showTags={false} />
        </div>
      </div>
    </div>
  );
};

export default BlogCardShimmerDemo;
