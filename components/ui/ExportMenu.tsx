"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Download, Video, Share2 } from "lucide-react";

export default function ExportMenu({
  canvasRef,
}: {
  canvasRef: React.RefObject<HTMLCanvasElement>;
}) {
  const [isRecording, setIsRecording] = useState(false);

  const handleDownloadImage = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = `nexus-art-${Date.now()}.png`;
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  };

  const handleRecordVideo = async () => {
    // Mock recording logic for now as full MediaRecorder webm/mp4 logic is verbose
    if (isRecording) {
      setIsRecording(false);
      alert("Recording saved (mock)");
      return;
    }
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      alert("Recording finished (5s mock)");
    }, 5000);
  };

  return (
    <div className="flex gap-2">
      <motion.button
        className="flex items-center gap-2 px-4 py-2 bg-zinc-800 rounded hover:bg-zinc-700 text-sm"
        onClick={handleDownloadImage}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Download size={16} /> PNG
      </motion.button>
      <motion.button
        className={`flex items-center gap-2 px-4 py-2 rounded text-sm ${isRecording ? "bg-red-900 text-white" : "bg-zinc-800 hover:bg-zinc-700"}`}
        onClick={handleRecordVideo}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Video size={16} /> {isRecording ? "Stop" : "REC"}
      </motion.button>
      <motion.button
        className="flex items-center gap-2 px-4 py-2 bg-blue-900 rounded hover:bg-blue-800 text-sm"
        onClick={() => alert("Link copied to clipboard!")}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Share2 size={16} /> Share
      </motion.button>
    </div>
  );
}
