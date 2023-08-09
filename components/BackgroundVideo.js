// components/BackgroundVideo.js

import React from "react";

const BackgroundVideo = ({ videoSource }) => {
  return (
    <div className="fixed top-0 left-0 z-0 w-screen h-screen overflow-hidden">
      <video
        src={videoSource}
        autoPlay="autoplay"
        loop="loop"
        muted
        className="object-cover w-full h-full"
      />
    </div>
  );
};

export default BackgroundVideo;
