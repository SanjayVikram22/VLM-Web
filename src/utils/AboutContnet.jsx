import React from "react";

export default function AboutContnet() {
  return (
    <>
      <div className="about-content py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-8 text-center">About Us</h1>
          <p className="text-lg mb-12 text-center max-w-2xl mx-auto">
            Meet the dedicated team behind Med-VLM, a project driven by
            innovation in medical imaging and artificial intelligence.
          </p>

          <h2 className="text-3xl font-bold mb-6 text-blue-500">
            Project Team
          </h2>
          <ul className="space-y-4 mb-12">
            <li className="bg-white text-gray-900 py-4 px-6 rounded-lg shadow">
              Saravanan G - Project Supervisor
            </li>
            <li className="bg-white text-gray-900 py-4 px-6 rounded-lg shadow">
              Sachin M Sabariram - Deep Learning and Model Development
            </li>
            <li className="bg-white text-gray-900 py-4 px-6 rounded-lg shadow">
              Sanjay Vikram C.B - Model Development and Web Development
            </li>
            <li className="bg-white text-gray-900 py-4 px-6 rounded-lg shadow">
              Sharon Deboarh E - Data Science and Machine Learning
            </li>
            <li className="bg-white text-gray-900 py-4 px-6 rounded-lg shadow">
              Kavin M - Web Development and Machine Learning
            </li>
          </ul>

          

          <h2 className="text-3xl font-bold mb-6 text-blue-500 mt-12">
            Our Vision
          </h2>
          <p className="text-lg">
            Our vision is to bridge the gap between advanced AI technologies and
            practical healthcare solutions. By developing powerful tools like
            Med-VLM, we aim to enhance diagnostic accuracy, reduce workload on
            medical professionals, and ultimately improve patient outcomes.
          </p>
        </div>
      </div>
    </>
  );
}
