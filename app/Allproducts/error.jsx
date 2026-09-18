"use client";
export default function Error({ error, reset }) {
  return (
    <div className="pt-52">
      <div>{error.message}</div>
      <button className="p-3 bg-red-400" onClick={() => reset()}>reload</button>
    </div>
  );
}
