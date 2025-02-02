import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import axios from "axios";

export default function DemoContent() {
  const [image, setImage] = useState(null); // For uploading a single file
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [fullText, setFullText] = useState("");

  // Hardcode your local Flask server URL:
  const apiUrl = "http://127.0.0.1:8000";

  const contentRef = useRef(null);

  // Typing effect: animate the "fullText" into "typedText"
  useEffect(() => {
    if (isTyping && fullText) {
      setTypedText(""); // reset typed text
      let index = 0;
      const typingInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText((prev) => prev + fullText.charAt(index));
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 15);

      return () => clearInterval(typingInterval);
    }
  }, [isTyping, fullText]);

  // "Under construction" overlay hides after 5 seconds
  useEffect(() => {
    const overlayTimeout = setTimeout(() => {
      setShowOverlay(false);
    }, 5000);
    return () => clearTimeout(overlayTimeout);
  }, []);

  // Handle file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("Selected file:", file);
      setImage(file);
    }
  };

  // Upload file to Flask server
  const handleUpload = async () => {
    if (!image) return;
    setIsLoading(true);

    try {
      // Prepare form data
      const formData = new FormData();
      formData.append("image", image);

      console.log("Sending POST request to:", `${apiUrl}/api`);
      console.log("FormData file name:", image.name);

      // Perform the POST request
      const response = await axios.post(`${apiUrl}/api`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Response from server:", response.data);

      // Destructure the API response:
      // The report details are nested inside "data", while the images are top-level.
      const { data: reportData, image1, image2, image3 } = response.data;
      const {
        differential_diagnosis,
        findings,
        image_description,
        imaging_study,
        impression,
        recommendations,
        segmentation_descriptions,
      } = reportData;

      // Build a formatted report text using the returned fields
      let reportText = "";

      if (image_description) {
        reportText += "Image Description:\n";
        reportText += image_description + "\n\n";
      }
      if (imaging_study) {
        reportText += "Imaging Study:\n";
        reportText += imaging_study + "\n\n";
      }
      if (findings) {
        reportText += "Findings:\n";
        // Loop through the findings object to list each detail
        Object.entries(findings).forEach(([key, value]) => {
          // Replace underscores with spaces for readability
          const label = key.replace(/_/g, " ");
          reportText += `${label}: ${value}\n`;
        });
        reportText += "\n";
      }
      if (impression) {
        reportText += "Impression:\n";
        reportText += impression + "\n\n";
      }
      if (differential_diagnosis && Array.isArray(differential_diagnosis)) {
        reportText += "Differential Diagnosis:\n";
        reportText += differential_diagnosis.join(", ") + "\n\n";
      }
      if (recommendations && Array.isArray(recommendations)) {
        reportText += "Recommendations:\n";
        recommendations.forEach((rec, index) => {
          reportText += `${index + 1}. ${rec}\n`;
        });
        reportText += "\n";
      }
      if (
        segmentation_descriptions &&
        Array.isArray(segmentation_descriptions)
      ) {
        reportText += "Segmentation Descriptions:\n";
        reportText += segmentation_descriptions.join(", ") + "\n\n";
      }

      // Set the fullText and start the typing animation
      setFullText(reportText || "No report text found");
      setIsTyping(true);

      // Process the returned images (assumed to be in base64)
      const newPreviewImages = [];
      if (image1) newPreviewImages.push(`data:image/png;base64,${image1}`);
      if (image2) newPreviewImages.push(`data:image/png;base64,${image2}`);
      if (image3) newPreviewImages.push(`data:image/png;base64,${image3}`);
      setPreviewImages(newPreviewImages);

      // Show the "Download Report" button
      setShowButton(true);
    } catch (error) {
      console.error("Error during API call:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Generate PDF of typed text and images
  const downloadPDF = () => {
    const pdf = new jsPDF();
    const margin = 10;
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    let yPosition = margin;

    // Add the report text to the PDF
    pdf.setFontSize(12);
    // Split the text to fit within the page width
    const lines = pdf.splitTextToSize(typedText, pageWidth - 2 * margin);
    pdf.text(lines, margin, yPosition);
    // Advance yPosition based on the number of text lines
    yPosition += lines.length * 7 + margin;

    // Loop through each preview image and add it to the PDF
    previewImages.forEach((imgData) => {
      // Set a fixed width for the image and calculate height (assuming a 4:3 ratio here)
      const imgWidth = pageWidth - margin * 2;
      const imgHeight = imgWidth * 0.75; // adjust ratio as needed

      // Check if adding the image would exceed the page height
      if (yPosition + imgHeight > pageHeight - margin) {
        pdf.addPage();
        yPosition = margin;
      }
      pdf.addImage(imgData, "PNG", margin, yPosition, imgWidth, imgHeight);
      yPosition += imgHeight + margin;
    });

    pdf.save("report.pdf");
  };

  return (
    <>
      {/* Under-construction overlay */}
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75">
          <img src="/cong.svg" alt="Building in progress..." className="mb-4" />
          <p className="text-white text-2xl font-bold">
            Building in progress...
          </p>
          <p className="text-white text-2xl font-bold">
            But you can still see the preview of our work
          </p>
        </div>
      )}

      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader">Loading...</div>
        </div>
      )}

      {/* Main container */}
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6 m-3 sm:p-8 lg:p-10 w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded-full file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                hover:file:bg-blue-100"
            />
          </div>

          {image && (
            <div className="mt-4">
              <button
                onClick={handleUpload}
                className="bg-blue-500 p-2 border hover:bg-blue-300 text-white"
              >
                Upload
              </button>
            </div>
          )}
        </div>

        {/* Content area (for previewing the text and images) */}
        <div
          ref={contentRef}
          className="m-3 border border-gray-300 text-white p-4 rounded-md whitespace-pre-wrap"
        >
          {/* Typed text area */}
          <p className="inline">
            {typedText}
            {isTyping && (
              <span className="inline-block bg-white w-1 h-5 align-baseline animate-blink"></span>
            )}
          </p>

          {/* Preview images (if any) */}
          {previewImages.length > 0 && (
            <div className="mt-5 flex flex-col gap-5">
              {previewImages.map((imgSrc, idx) => (
                <img
                  key={idx}
                  src={imgSrc}
                  alt={`Preview ${idx}`}
                  className="w-auto h-auto rounded-md object-contain"
                />
              ))}
            </div>
          )}
        </div>

        {/* Download PDF button */}
        {showButton && (
          <div>
            <button
              onClick={downloadPDF}
              className="bg-green-500 p-2 border hover:bg-green-300 m-2 text-white"
            >
              Download Report
            </button>
          </div>
        )}
      </div>
    </>
  );
}
