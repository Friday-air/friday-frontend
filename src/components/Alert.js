import React from "react";

export default function Alert({ type, message }) {
  return (
    <div className="bg-grey-lightest border-l-4 border-red p-4 py-6 rounded shadow-lg flex items-center justify-between mb-6">
      <span className="fa-stack fa-2x sm:mr-2 mb-3">
        <i className="fas fa-circle text-red-dark fa-stack-2x"></i>
        <i className="fas fa-hand-paper fa-stack-1x text-white"></i>
      </span>
      <div className="sm:text-left text-center sm:mb-0 mb-3 w-128">
        <p className="font-bold mb-1 text-lg">You shall not pass.</p>
        <p className="text-grey-dark inline-block">
          {type}:{message}
        </p>
      </div>
      <i className="fas fa-times mx-4 fa-2x text-grey-darker"></i>
    </div>
  );
}
