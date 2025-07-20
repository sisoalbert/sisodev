import React from "react";
import { useParams } from "react-router-dom";

function BlogDetails() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Blog Details</h1>
      <p className="text-gray-600">Blog post "{slug}" details coming soon...</p>
    </div>
  );
}

export default BlogDetails;