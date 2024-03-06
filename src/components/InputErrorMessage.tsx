export default function InputErrorMessage({ message }: { message: string }) {
  return <span className="mt-1.5 text-xs text-red-600">{message}</span>;
}
