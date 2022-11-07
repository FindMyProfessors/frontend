import Link from "next/link";

export const Navbar = () => {
  return (
    <div className="mx-auto flex h-16 w-full max-w-screen-xl items-center justify-between px-4">
      <div className="text-xl tracking-wider">FMC</div>
      <div className="flex items-center">
        <Link href="/login">
          <button className="whitespace-nowrap rounded px-4 py-2">
            SIGN IN
          </button>
        </Link>
        <Link href="/">
          <button className="whitespace-nowrap rounded bg-black px-4 py-2 text-white">
            SIGN UP
          </button>
        </Link>
      </div>
    </div>
  );
};
