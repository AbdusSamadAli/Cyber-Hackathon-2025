import React from "react";

export default function VideoPlayer() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-white">
      <h1 className="text-4xl font-extrabold mb-8 text-cyan-300 drop-shadow-[0_0_15px_#22d3ee]">
        🎬 Project Demo Video
      </h1>

      <div className="w-full max-w-4xl rounded-2xl overflow-hidden shadow-[0_0_30px_#22d3ee99] ring-2 ring-cyan-400/40">
        <video
          src="/project_video.mp4"
          controls
          className="w-full h-auto bg-black"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}
