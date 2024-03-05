import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

export default function PopupForm({ isOpen, onClose, onSubmit, initialData }) {
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (initialData) {
      setAuthor(initialData.author);
      setTitle(initialData.title);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = { author, title };
    onSubmit(data);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "gray",
        padding: "20px",
        zIndex: 100,
      }}
    >
      <form onSubmit={handleSubmit}>
        <label>
          Author:
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
        </label>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </form>
    </div>
  );
}

PopupForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  initialData: PropTypes.object,
};
