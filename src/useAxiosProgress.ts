import { useState } from "react";
import axios from "axios";

interface ProgressProps {
  progress: number;
  uploadFile: (file: File) => Promise<void>;
}

export const useUploadProgress = (): ProgressProps => {
  const [progress, setProgress] = useState<number>(0);

  const uploadFile = async (file: File): Promise<void> => {
    try {
      const formData = new FormData();
      formData.append("file", file);

      const config: any = {
        onUploadProgress: function (progressEvent: ProgressEvent) {
          const percentCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setProgress(percentCompleted);
        },
      };

      await axios.post(
        "https://api.escuelajs.co/api/v1/files/upload",
        formData,
        config
      );
      setProgress(100); // If upload is successful, set progress to 100
    } catch (err: any) {
      console.error("Error uploading file:", String(err));
      setProgress(0); // Reset progress if there is an error
    }
  };

  return { progress, uploadFile };
};
