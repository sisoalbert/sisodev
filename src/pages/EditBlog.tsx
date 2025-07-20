import React from "react";
import { useParams } from "react-router-dom";

function EditBlog() {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Edit Blog Post</h1>
      <p className="text-gray-600">Editing blog post ID: {id} - form coming soon...</p>
    </div>
  );
}

export default EditBlog;