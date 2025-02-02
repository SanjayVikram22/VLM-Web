import React, { useState } from "react";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white p-4 lg:p-6">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo and Title */}
        <a className="text-3xl font-bold flex items-center lg:mr-auto" href="/">
          🧠 Med-VLM
        </a>

        {/* Mobile Menu Button */}
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>

        {/* Navigation Links */}
        <div
          className={`${
            isOpen ? "flex" : "hidden"
          } fixed inset-0 bg-blue-600 z-10 flex-col items-center justify-center lg:flex lg:flex-row lg:static lg:inset-auto lg:bg-transparent`}
        >
          <ul className="space-y-8 lg:space-y-0 lg:flex lg:space-x-8">
            <li>
              <a className="block text-lg hover:text-gray-300" href="/">
                Home
              </a>
            </li>
            <li>
              <a className="block text-lg hover:text-gray-300" href="/about">
                About
              </a>
            </li>
            <li>
              <a className="block text-lg hover:text-gray-300" href="/progress">
                Progress
              </a>
            </li>
            <li>
              <a className="block text-lg hover:text-gray-300" href="/demo">
                Demo
              </a>
            </li>
          </ul>

          {/* Close Button in Mobile View */}
          {isOpen && (
            <button
              className="absolute top-4 right-4 text-3xl lg:hidden focus:outline-none"
              onClick={() => setIsOpen(false)}
            >
              ✖
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
