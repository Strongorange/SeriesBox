import React, { useEffect } from "react";

const InitialVideo = () => {
  const [shouldUnmount, setShouldUnmount] = React.useState(false);
  const [unmount, setUnmount] = React.useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldUnmount(true);
    }, 3000);
    const timer2 = setTimeout(() => {
      setUnmount(true);
    }, 3500);
    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);
  return unmount ? null : (
    <div
      className={`fixed w-screen h-screen z-initial-video top-0 ${
        shouldUnmount ? "animate-fade-out" : "animate-fade-in"
      }`}
    >
      <video
        src={"/initialVideo.mp4"}
        autoPlay
        muted
        loop
        className="w-full h-full object-fill"
      />
    </div>
  );
};

export default InitialVideo;
