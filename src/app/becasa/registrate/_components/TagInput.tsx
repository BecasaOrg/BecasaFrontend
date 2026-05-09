import { useState, KeyboardEvent } from "react";

interface TagInputProps {
  label: string;
  tags: string[];
  onAdd: (tag: string) => void;
  onRemove: (tag: string) => void;
  placeholder?: string;
  suggestions?: string[];
  suggestionsLabel?: string;
  colSpan?: boolean;
  name?: string;
}

export default function TagInput({
  label,
  tags,
  onAdd,
  onRemove,
  placeholder,
  suggestions,
  suggestionsLabel,
  colSpan,
  name,
}: TagInputProps) {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  const filtered = suggestions
    ? suggestions.filter(
        (s) =>
          s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s)
      )
    : [];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const val = input.trim();
      if (val && !tags.includes(val)) {
        onAdd(val);
      }
      setInput("");
    }
  };

  return (
    <div className={colSpan ? "sm:col-span-2 relative" : "relative"}>
      <label className="block text-white/60 text-xs mb-1">{label}</label>
      <div
        className="w-full bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg px-3 py-2 flex flex-wrap gap-1.5 cursor-text focus-within:border-[#AAFF00]/60 transition-colors min-h-[42px]"
        onClick={() => setOpen(true)}
      >
        {tags.map((t) => (
          <span
            key={t}
            className="bg-[#AAFF00]/15 text-[#AAFF00] text-xs px-2 py-0.5 rounded-full flex items-center gap-1"
          >
            {t}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onRemove(t);
              }}
              className="hover:text-white transition-colors"
            >
              ×
            </button>
          </span>
        ))}
        <input
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={suggestions ? (e) => { if (e.key === "Enter") e.preventDefault(); } : handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          className="bg-transparent text-white text-sm placeholder:text-white/25 outline-none flex-1 min-w-[160px]"
        />
      </div>
      {suggestionsLabel && (
        <p className="text-white/30 text-[10px] mt-0.5">{suggestionsLabel}</p>
      )}
      {name && (
        <input type="hidden" name={name} value={tags.join(", ")} />
      )}
      {open && filtered.length > 0 && (
        <div className="absolute top-full left-0 right-0 z-20 bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg mt-1 max-h-40 overflow-y-auto shadow-xl">
          {filtered.map((s) => (
            <button
              type="button"
              key={s}
              onMouseDown={() => {
                onAdd(s);
                setInput("");
              }}
              className="w-full text-left px-4 py-2 text-sm text-white/80 hover:bg-[#AAFF00]/10 hover:text-[#AAFF00] transition-colors"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
