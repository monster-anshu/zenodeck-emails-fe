export function getImageDimensions(
  file: File
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    img.onload = () => {
      const { width, height } = img;
      resolve({ width, height });
      URL.revokeObjectURL(img.src);
    };

    img.onerror = () => {
      reject(new Error("Failed to load the image file."));
      URL.revokeObjectURL(img.src);
    };

    img.src = URL.createObjectURL(file);
  });
}

function isAudioOnly(videoElement: HTMLVideoElement) {
  return videoElement.videoWidth === 0 && videoElement.videoHeight === 0;
}

export function checkAudioVideo(file: File): Promise<boolean> {
  const videoPlayer = document.createElement("video");
  videoPlayer.setAttribute("src", URL.createObjectURL(file));

  return new Promise((resolve, reject) => {
    videoPlayer.onerror = () => {
      reject(new Error("Failed to load the video file."));
    };

    videoPlayer.onloadedmetadata = () => {
      if (isAudioOnly(videoPlayer)) {
        resolve(false);
      } else {
        resolve(true);
      }
      URL.revokeObjectURL(videoPlayer.src);
    };
  });
}
