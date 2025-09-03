import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import City from "./pages/City";

export default function App() {
  return (
    <div className="min-h-screen font-sans p-6">
      <header className="mb-6">
        <Link to="/" className="text-2xl font-bold">Weather App</Link>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/city/:name" element={<City />} />
        </Routes>
      </main>
    </div>
  );
}
