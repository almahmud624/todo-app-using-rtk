interface NotFoundProps {
  message: string;
  className?: string;
}
export default function NotFound({ message, className }: NotFoundProps) {
  return (
    <div
      className={`h-[30vh] grid place-items-center text-xl font-semibold text-red-600 ${className}`}
    >
      {message}
    </div>
  );
}
