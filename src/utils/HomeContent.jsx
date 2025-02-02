import React from "react";

export default function HomeContent() {
  return (
    <div className="py-10 bg-gray-900 text-gray-300 ">
      <div className="container mx-auto max-w-screen-lg">
        <h1 className="mb-6 text-center text-4xl font-bold text-gray-100">
          Welcome to Med-VLM
        </h1>
        <p className="mb-6 text-center text-lg">
          Med-VLM is a cutting-edge project focused on leveraging Vision
          Transformer Models (VLM) for accurate medical image diagnosis and the
          Segment Anything Model (SAM) for segmenting anomalies in images. Our
          system not only identifies conditions but also provides detailed
          segmentation and localization of abnormalities in images from the
          brain, liver, chest X-ray, and retina, achieving over 90% AUC.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-2xl font-semibold text-blue-400">
              Aim and Objectives
            </h1>
            <p className="mt-4">
              Our primary goal is to develop a comprehensive AI tool that
              assists healthcare professionals in making precise diagnoses. The
              key objectives include:
            </p>
            <ul className="list-disc pl-5 mt-4">
              <li>
                Developing a robust Vision Transformer Model for multiple types
                of medical images
              </li>
              <li>
                Creating a web interface that allows users to upload medical
                images and receive diagnosis and analysis
              </li>
              <li>
                Integrating the model into an end-to-end pipeline that handles
                the entire process from image upload to detailed report
                generation
              </li>
            </ul>
          </div>
          <div>
            <img
              src="./medical_image_sample.jpeg"
              alt="Medical Image Sample"
              className="rounded shadow-lg size-96"
            />
          </div>
        </div>

        <h1 className="mt-10 mb-6 text-2xl font-semibold text-blue-400">
          Methodology
        </h1>
        <p>We follow a comprehensive approach involving:</p>
        <ol className="list-decimal pl-5 mt-4">
          <li>
            Data Collection and Preprocessing: Curating a diverse dataset and
            preparing it for model training.
          </li>
          <li>
            Model Training and Validation: Leveraging state-of-the-art Vision
            Transformer techniques for robust training and validation.
          </li>
          <li>
            Web Application Development: Integrating the trained model with a
            seamless web interface for real-time inference.
          </li>
        </ol>

        <h1 className="mt-10 mb-6 text-center text-2xl font-semibold text-blue-400">
          Current Focus
        </h1>
        <p>
          We have successfully developed a VLM capable of segmenting,
          localizing, and categorizing medical images. Our current focus
          includes:
        </p>
        <ul className="list-disc pl-5 mt-4">
          <li>
            Exploring alternative approaches for further accuracy and
            efficiency.
          </li>
          <li>
            Developing models that generate captions for areas with detected
            abnormalities.
          </li>
        </ul>
      </div>
    </div>
  );
}
