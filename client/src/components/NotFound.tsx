import React from "react";

const NotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-4">Error 404</h1>
      <p>Couldn't find the page</p>
    </div>
  );
};

export default NotFound;
