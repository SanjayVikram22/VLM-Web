import React, { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import axios from "axios";

export default function DemoContent() {
  const [image, setImage] = useState(null);
  const [typedText, setTypedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const [showOverlay, setShowOverlay] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);
  const [fullText, setFullText] = useState("");
  const [apiUrl, setApiUrl] = useState(null); // Rename to `apiUrl`
  const contentRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  useEffect(() => {
    const fetchApiUrl = async () => {
      try {
        const res = await axios.get("https://med-vlm.onrender.com/url");
        const fetchedUrl = `http://${res.data.url}:8000/api`;
        setApiUrl(fetchedUrl);
        console.log(fetchedUrl); // Use `fetchedUrl` instead of `ApiUrl`
      } catch (error) {
        console.error("Error fetching the API URL:", error);
      }
    };

    fetchApiUrl();
  }, []);

  const handleUpload = async () => {
    if (!image || !apiUrl) return; // Ensure `apiUrl` is available
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await axios.post(
        apiUrl, // Use `apiUrl` directly here
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { data, image } = response.data;

      console.log("Full text data received from API:", data);

      setFullText(data || "");

      if (image) {
        setPreviewImage(`data:image/png;base64,${image}`);
      } else {
        console.error("No image data received");
      }

      setIsLoading(false);
      setShowButton(true);
      setIsTyping(true);
    } catch (error) {
      console.error("Error during API call:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("FullText updated:", fullText);
  }, [fullText]);

  useEffect(() => {
    if (isTyping && fullText) {
      let index = -1; 
      const typingInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText((prev) => prev + fullText.charAt(index));
          index++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 15);
    }
  }, [isTyping, fullText]);

  useEffect(() => {
    const overlayTimeout = setTimeout(() => {
      setShowOverlay(false);
    }, 5000);

    return () => clearTimeout(overlayTimeout);
  }, []);

  const downloadPDF = () => {
    const pdf = new jsPDF();
    const content = contentRef.current;
    if (!content) {
      console.error("Content ref is not available");
      return;
    }

    pdf.setFontSize(12);
    const lines = pdf.splitTextToSize(typedText, 180);
    pdf.text(lines, 10, 10);

    if (previewImage) {
      html2canvas(content, { scale: 2 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const imgWidth = 180;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const position = lines.length * 10 + 10;

        pdf.addImage(imgData, "PNG", 10, position, imgWidth, imgHeight);
        pdf.save("report.pdf");
      });
    } else {
      pdf.save("report.pdf");
    }
  };

  return (
    <>
      {showOverlay && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black bg-opacity-75">
          <img src="/cong.svg" alt="Building in progress..." className="mb-4" />
          <p className="text-white text-2xl font-bold">
            Building in progress...
          </p>
          <p className="text-white text-2xl font-bold align-middle">
            But you can still see the preview of our work
          </p>
        </div>
      )}

      {isLoading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="loader">Loading...</div>
        </div>
      )}

      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-md rounded-lg p-6 sm:p-8 lg:p-10 w-full max-w-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Upload Image:
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
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
          {previewImage && (
            <div className="m-5 flex justify-center">
              <img
                src={previewImage}
                alt="Preview"
                className="w-full max-w-lg h-auto rounded-md object-contain"
              />
            </div>
          )}
        </div>

        <div
          ref={contentRef}
          className="m-3 border border-gray-300 text-white p-4 rounded-md whitespace-pre-wrap leading-none"
        >
          <p className="inline">
            {typedText}
            {isTyping && (
              <span className="inline-block bg-white w-1 h-5 align-baseline animate-blink"></span>
            )}
          </p>
        </div>
        {showButton && (
          <div>
            <button
              onClick={downloadPDF}
              className="bg-green-500 p-2 border hover:bg-green-300 text-white"
            >
              Download Report
            </button>
          </div>
        )}
      </div>
    </>
  );
}
