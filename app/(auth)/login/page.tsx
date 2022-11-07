import React from "react";

export default function page() {
  return (
    <div className="mx-auto flex max-w-screen-sm flex-col items-center">
      <div>Login</div>
      <form className="flex flex-col">
        <input
          className="rounded border px-3 py-2"
          placeholder="Email"
          type="text"
        />
        <input
          className="rounded border px-3 py-2"
          placeholder="Password"
          type="text"
        />
      </form>
    </div>
  );
}
