type Step = "register" | "payment";

export default function StepIndicator({
  step,
  onChange,
}: {
  step: Step;
  onChange: (s: Step) => void;
}) {
  const stepClass = (s: Step) =>
    `w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
      step === s ? "bg-[#AAFF00] text-black" : "bg-white/10 text-white/40"
    }`;

  const labelClass = (s: Step) =>
    `text-sm ${step === s ? "text-white font-medium" : "text-white/40"}`;

  return (
    <div className="flex items-center gap-2 mb-6">
      <div onClick={() => onChange("register")} className={stepClass("register")}>
        1
      </div>
      <span className={labelClass("register")}>Registro</span>
      <div className="w-6 h-px bg-white/20" />
      <div className={stepClass("payment")}>2</div>
      <span className={labelClass("payment")}>Pago</span>
    </div>
  );
}
