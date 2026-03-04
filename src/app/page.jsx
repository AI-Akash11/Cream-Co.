import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col gap-3 min-h-screen items-center justify-center">
      <button className="btn btn-primary">Click me</button>
      <button className="btn btn-secondary">Click me</button>
      <button className="btn btn-accent">Click me</button>
      <button className="btn btn-neutral">Click me</button>
      <button className="btn btn-success">Click me</button>
      <button className="btn btn-error">Click me</button>
    </div>
  );
}
