import { useState, useEffect } from "react";

type MediaStreamTrack = {
  stop: () => void;
};

type MediaStream = {
  getVideoTracks: () => MediaStreamTrack[];
  getAudioTracks: () => MediaStreamTrack[];
  stop?: () => void;
};

export interface UserMedia {
  stream: MediaStream | null;
  error: Error | null;
  start: () => Promise<void>;
  close: () => void;
}
export const useUserMedia = (
  constraints: MediaStreamConstraints
): UserMedia => {
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [error, setError] = useState<Error | null>(null);

  const close = () => {
    if (!stream) return;
    if (stream?.getVideoTracks) {
      stream.getVideoTracks().map((track: MediaStreamTrack) => track.stop());
    }
    if (stream?.getAudioTracks) {
      stream.getAudioTracks().map((track: MediaStreamTrack) => track.stop());
    }
    if (stream?.stop) {
      stream.stop();
    }
  };

  const start = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia(
        constraints
      );
      setStream(mediaStream);
    } catch (e: any) {
      setError(e);
    }
  };

  return { stream, error, start, close };
};
