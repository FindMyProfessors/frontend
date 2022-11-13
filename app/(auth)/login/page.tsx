import React from "react";

export default function page() {
  return (
    <div>
      <form className="mx-auto flex w-max flex-col mt-20">
        <div className="mb-2">
          <input
            placeholder="Username"
            type="text"
            className="rounded border px-4 py-2"
          />
        </div>
        <div>
          <input
            placeholder="Password"
            type="password"
            className="rounded border px-4 py-2"
          />
        </div>
        <button></button>
      </form>
    </div>
  );
}
