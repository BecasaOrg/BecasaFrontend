import { InputHTMLAttributes } from "react";

const inputClass =
  "w-full bg-[#0d1b2a] border border-[#1e3a4a] rounded-lg px-4 py-2.5 text-white text-sm placeholder:text-white/25 focus:outline-none focus:border-[#AAFF00]/60 transition-colors";

const labelClass = "block text-white/60 text-xs mb-1";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  colSpan?: boolean;
}

export function FormField({ label, colSpan, className, ...props }: FormFieldProps) {
  return (
    <div className={colSpan ? "sm:col-span-2" : ""}>
      <label className={labelClass}>{label}</label>
      <input className={`${inputClass} ${className ?? ""}`} {...props} />
    </div>
  );
}

interface FormSelectProps {
  label: string;
  name: string;
  options: { value: string; label: string }[];
  required?: boolean;
  placeholder?: string;
}

export function FormSelect({ label, name, options, required, placeholder }: FormSelectProps) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="relative">
        <select
          name={name}
          className={`${inputClass} appearance-none cursor-pointer`}
          defaultValue=""
          required={required}
        >
          <option value="" disabled>{placeholder ?? "Seleccione"}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none text-xs">▼</span>
      </div>
    </div>
  );
}
