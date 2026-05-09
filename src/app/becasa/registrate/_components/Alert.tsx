export default function Alert({
  message,
  className,
}: {
  message: { type: "success" | "error"; text: string } | null;
  className?: string;
}) {
  if (!message) return null;

  const bg =
    message.type === "success"
      ? "bg-[#AAFF00]/20 text-[#AAFF00]"
      : "bg-red-500/20 text-red-400";

  return (
    <div className={`${className ?? ""} p-3 rounded-lg text-sm ${bg}`}>
      {message.text}
    </div>
  );
}
