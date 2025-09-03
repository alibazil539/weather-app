import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ placeholder = "Search city..." }) {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function submit(e) {
    e.preventDefault();
    if (!q.trim()) return;
    // encode city name in URL
    navigate(`/city/${encodeURIComponent(q.trim())}`);
    setQ("");
  }

  return (
    <form onSubmit={submit} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={placeholder}
        className="p-2 border rounded flex-1"
      />
      <button className="p-2 border rounded">Search</button>
    </form>
  );
}
