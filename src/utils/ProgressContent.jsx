import React from "react";
import progressImage from "/progress.png";

export default function ProgressContent() {
  return (
    <>
      <div className="progress-content py-10 bg-gray-900 text-white min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="mb-8 text-center text-4xl font-extrabold">
            Project Progress
          </h1>

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">
              Segmentation and Localisation Model
            </h2>
            <div className="w-full bg-gray-700 rounded-full h-8 mb-4">
              <div
                className="bg-green-500 h-8 rounded-full text-sm font-semibold text-white flex items-center justify-center"
                style={{ width: "90%" }}
              >
                90% Complete
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">Web Interface</h2>
            <div className="w-full bg-gray-700 rounded-full h-8 mb-4">
              <div
                className="bg-yellow-500 h-8 rounded-full text-sm font-semibold text-white flex items-center justify-center"
                style={{ width: "50%" }}
              >
                50% Complete
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="mb-4 text-2xl font-bold">End to End Pipeline</h2>
            <div className="w-full bg-gray-700 rounded-full h-8 mb-4">
              <div
                className="bg-red-500 h-8 rounded-full text-sm font-semibold text-white flex items-center justify-center"
                style={{ width: "30%" }}
              >
                30% Complete
              </div>
            </div>
          </div>

          <h2 className="mt-12 mb-8 text-center text-3xl font-bold">
            Progress so far!
          </h2>
          <p className="text-center text-lg max-w-2xl mx-auto">
            Developed a state of the art model that segments and localises the
            abnormalities across various medical images with over 90% AUC.
          </p>

          <div className="text-center mt-10">
            <img
              src={progressImage}
              alt="Project Progress"
              className="rounded shadow-lg mx-auto w-3/4"
            />
          </div>

          <h2 className="mt-12 mb-8 text-center text-3xl font-bold">
            Ongoing Work
          </h2>
          <p className="text-center text-lg max-w-2xl mx-auto">
            We are working on developing advanced models for abnormality
            captioning and full report generation into the Med-VLM platform.
            Stay tuned for more updates!
          </p>
        </div>
      </div>
    </>
  );
}
