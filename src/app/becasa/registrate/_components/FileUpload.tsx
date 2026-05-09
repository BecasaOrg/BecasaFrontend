import { RefObject } from "react";

interface FileUploadProps {
  label: string;
  name: string;
  fileName: string | null;
  fileRef: RefObject<HTMLInputElement | null>;
  onChange: (name: string | null) => void;
}

export default function FileUpload({
  label,
  name,
  fileName,
  fileRef,
  onChange,
}: FileUploadProps) {
  return (
    <div>
      <label className="block text-white/60 text-xs mb-1">{label}</label>
      <div
        className="w-full bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg px-4 py-2.5 flex items-center justify-between cursor-pointer hover:border-[#AAFF00]/40 transition-colors"
        onClick={() => fileRef.current?.click()}
      >
        <span className="text-sm text-white/25 truncate mr-2">
          {fileName ?? "Adjuntar Archivo"}
        </span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          className="text-white/30 flex-shrink-0"
        >
          <path
            d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <input
          name={name}
          ref={fileRef}
          type="file"
          className="hidden"
          onChange={(e) => onChange(e.target.files?.[0]?.name ?? null)}
        />
      </div>
    </div>
  );
}
