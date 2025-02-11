"use client";

import React from "react";

type Props = {
  onDelete: () => void;
};

function DeleteButton({ onDelete }: Props) {
  const handleDelete = () => {
    if (confirm("Are you sure you want to delete?")) {
      onDelete();
    }
  };
  return <button onClick={handleDelete}>-</button>;
}

export default DeleteButton;
