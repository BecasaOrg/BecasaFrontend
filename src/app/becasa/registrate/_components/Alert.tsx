export default function Alert({
  message,
  className,
}: {
  message: { type: "success" | "error" | "warning"; text: string } | null;
  className?: string;
}) {
  if (!message) return null;

  const bg =
    message.type === "success"
      ? "bg-[#AAFF00]/20 text-[#AAFF00]"
      : message.type === "warning"
        ? "bg-yellow-500/20 text-yellow-400"
        : "bg-red-500/20 text-red-400";

  return (
    <div className={`${className ?? ""} p-3 rounded-lg text-sm ${bg}`}>
      {message.text}
    </div>
  );
}
