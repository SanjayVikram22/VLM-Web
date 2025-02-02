import React from "react";
import Home from "./components/Home";
import About from "./components/About";
import Progress from "./components/Progress";
import Demo from "./components/Demo";
import 'swiper/swiper-bundle.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/demo" element={<Demo />} />
      </Routes>
    </BrowserRouter>
  );
}
