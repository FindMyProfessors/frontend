export const Navbar = () => {
  return (
    <div className="flex justify-between h-16 items-center container mx-auto px-4">
      <div className="text-lg">FMP</div>
      <div className="flex items-center">
        <button className="px-4 py-1.5 text-sm">LOGIN</button>
        <button className="bg-black text-white px-4 py-1.5 text-sm">
          SIGN IN
        </button>
      </div>
    </div>
  );
};
