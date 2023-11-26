import React, { useState } from "react";

type FilePickerProps = {
  label: string;
  error?: string;
  handleFilePick?: (file: File) => void;
};

const FilePicker = ({ label, error, handleFilePick }: FilePickerProps) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
      if (handleFilePick) handleFilePick(file);
    }
  };

  const borderColor = error ? "border-primary-red" : "border-outline";
  return (
    <div className="text-sm">
      <p className="text-content-1 font-medium mb-2">{label}</p>
      <label htmlFor="file-picker" className="block">
        <div
          className={`w-[300px] flex flex-row items-center justify-between border ${borderColor} rounded-lg mb-4 cursor-pointer pl-4`}
        >
          <input
            type="file"
            accept=".csv"
            id="file-picker"
            className="w-0 h-0"
            onChange={handleFileChange}
          />
          <p
            className={`flex-1 text-sm text-left ${
              file ? "text-content-2" : "text-content-3"
            }`}
          >
            {file?.name || "No file selected"}
          </p>
          <p
            className={`py-3 px-5 border-l ${borderColor} rounded-lg text-content-2 font-medium`}
          >
            Select File
          </p>
        </div>
      </label>
      {error ? (
        <div>
          <p className="text-primary-red font-medium mb-2">Error</p>
          <p className="text-content-2">{error}</p>
        </div>
      ) : (
        <p className="text-content-3">File must be in .csv format</p>
      )}
    </div>
  );
};

export default FilePicker;
