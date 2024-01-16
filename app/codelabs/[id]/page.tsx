import React from "react";

export default function page({ params }: { params: { id: string } }) {
  return (
    <div>
      <>
        <h1>Blog {params.id}</h1>
      </>
    </div>
  );
}
