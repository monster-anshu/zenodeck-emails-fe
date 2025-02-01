import React, { useImperativeHandle, useRef, useState } from "react";
import { toast } from "sonner";

import Spinner from "@repo/ui/components/spinner";
import { checkAudioVideo, getImageDimensions } from "@repo/ui/lib/file";
import ReactPortal from "./react-portal.tsx";

export type IFile = {
  file?: File;
  url: string;
};

export function formatFileSize(fileSizeInBytes: number): string {
  if (fileSizeInBytes === 0) {
    return "0 B";
  }

  const sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
  const i = Math.floor(Math.log(fileSizeInBytes) / Math.log(1024));

  return `${(fileSizeInBytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
}

export interface IFileUploadProps {
  accept?: string;
  fileCheckRegex?: RegExp;
  fileInfo?: {
    type?: string;
    maxSize?: number;
    width?: number;
    height?: number;
  };
  module?: string;
  uploadFn?: (
    file: File,
    module?: string,
    onProgress?: (progress: number) => void
  ) => Promise<IFile> | IFile;
  hideLoader?: boolean;
  onProgress?: (progress: number) => void;
  disabled?: boolean;
}

export interface IFileUploadRef {
  openFile: (value: {
    onFileUpload: (file: IFile) => void;
    file?: File | null;
  }) => void;
}

const FileUpload = React.forwardRef<IFileUploadRef, IFileUploadProps>(
  function FileUpload(
    {
      accept,
      fileCheckRegex,
      fileInfo = {},
      uploadFn,
      module,
      hideLoader,
      onProgress,
      disabled,
    },
    ref
  ) {
    const eventRef = useRef<{
      onFileUpload?: (file: IFile) => void;
    }>({});
    const inputRef = useRef<HTMLInputElement>(null);

    const [loading, setProgress] = useState({
      progress: 0,
      isVisible: false,
    });

    const startUploadFile = async (selectedFile: File) => {
      try {
        setProgress({
          isVisible: true,
          progress: 0,
        });
        const res = await uploadFn?.(selectedFile, module, onProgress);
        if (!res) return;
        eventRef.current.onFileUpload?.(res);
        onProgress?.(0);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        onProgress?.(0);
        setProgress({
          isVisible: false,
          progress: 0,
        });
      }
    };

    const handleFile = async (selectedFile: File) => {
      if (disabled) return;
      const { type, maxSize = 25 } = fileInfo;
      const sizeInByte = (maxSize || 0) * 1024 * 1024;
      if (maxSize && sizeInByte < selectedFile.size) {
        toast.error("File size must not exceed " + formatFileSize(sizeInByte));
        return;
      }

      if (fileCheckRegex && !fileCheckRegex.test(selectedFile.name)) {
        toast.error("File type not supported");
        return;
      }

      if (selectedFile.type.includes("video")) {
        const isVideo = await checkAudioVideo(selectedFile);
        selectedFile = new File([selectedFile], selectedFile.name, {
          ...selectedFile,
          type: isVideo ? "video/mp4" : "audio/mp4",
        });
      }

      if (type === "img" && (fileInfo.width || fileInfo.height)) {
        const { height, width } = await getImageDimensions(selectedFile);

        if (fileInfo.width !== height || fileInfo.height !== width) {
          toast.error(
            `Image dimensions must be ${fileInfo.width}x${fileInfo.height} pixels `
          );
          return;
        }
        startUploadFile(selectedFile);
      } else {
        startUploadFile(selectedFile);
      }
    };

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = async (
      event
    ) => {
      const { target } = event;
      const file = target.files?.[0];
      if (!file) return;
      handleFile(file);
      if (inputRef.current) inputRef.current.value = "";
    };

    useImperativeHandle(ref, () => ({
      openFile: ({ onFileUpload, file }) => {
        eventRef.current.onFileUpload = onFileUpload;
        if (file instanceof File) {
          handleFile(file);
          return;
        }
        inputRef.current?.click();
      },
    }));

    return (
      <>
        {!hideLoader && loading.isVisible && <FileUploadLoader />}
        <input
          disabled={disabled}
          type="file"
          onChange={disabled ? undefined : handleChange}
          accept={accept}
          ref={inputRef}
          style={{ display: "none" }}
        />
      </>
    );
  }
);

export const FileUploadLoader = () => {
  return (
    <ReactPortal wrapperId="global-loader">
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
        className="fixed bottom-0 left-0 right-0 top-0 z-[100] grid place-items-center bg-black/40"
      >
        <Spinner size={40} className="text-p1 rounded-full bg-white p-1" />
      </div>
    </ReactPortal>
  );
};

export default FileUpload;
