"use client";

import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

export default function FaceAttendance() {
  const videoRef = useRef();
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [userName, setUserName] = useState("");  // To capture the user's name
  const [userId, setUserId] = useState("");  // To capture the user's ID

  // Load face-api.js models
  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models/tiny_face_detector_model-weights_manifest.json');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models/face_landmark_68_model-weights_manifest.json');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models/face_recognition_model-weights_manifest.json');
      startVideo();
    };
    loadModels();
  }, []);

  // Start webcam
  const startVideo = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.error("Error accessing webcam:", err));
  };

  // Capture and send descriptor along with name and ID
  const captureAndSend = async () => {
    setLoading(true);
    const detection = await faceapi
      .detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceDescriptor();

    if (!detection) {
      setResult("No face detected");
      setLoading(false);
      return;
    }

    const descriptor = Array.from(detection.descriptor); // Convert Float32Array to Array

    // Send name, ID, and descriptor to the backend
    try {
      const res = await fetch("/api/attendance/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ descriptor, userName, userId }),  // Send name and ID
      });
      const data = await res.json();
      console.log(data, "from attendance");

      setResult(data.success ? `Welcome, ${data.user.userName}` : data.message);
    } catch (err) {
      setResult("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-4">
      <h1 className="text-2xl font-bold">Face Attendance</h1>

      {/* Input fields for Name and ID */}
      <input
        type="text"
        placeholder="Enter your name"
        value={userName}
        onChange={(e) => setUserName(e.target.value)}
        className="mb-4 p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Enter your user ID"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
        className="mb-4 p-2 border rounded"
      />

      {/* Video element to display webcam */}
      <video ref={videoRef} autoPlay playsInline className="rounded-md shadow w-64 h-48" />

      {/* Button to capture and send data */}
      <button
        onClick={captureAndSend}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Mark Attendance"}
      </button>

      {/* Display result */}
      {result && <p className="text-lg font-medium text-green-600">{result}</p>}
    </div>
  );
}
