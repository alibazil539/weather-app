import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/home";
import City from "./pages/City";

export default function App() {
  return (
    <div>
      <h1>Weather App</h1>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/city/:name" element={<City />} />
      </Routes>
    </div>
  );
}

