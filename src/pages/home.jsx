import React from "react";
import SearchBar from "../components/SearchBar";

export default function home() {
  return (
    <div>
      <h1 className="text-xl mb-4">Search weather by city</h1>
      <SearchBar />
      <p className="mt-4 text-sm text-gray-600">
        Type any city name (e.g. "Karachi", "London"). Uses Open-Meteo (no API key).
      </p>
    </div>
  );
}
