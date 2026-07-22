function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md text-white z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <h1 className="text-2xl font-bold text-red-500">
          R9RIDES
        </h1>

        <ul className="hidden md:flex gap-8 font-medium">
          <li><a href="#home" className="hover:text-red-500">Home</a></li>
          <li><a href="#about" className="hover:text-red-500">About</a></li>
          <li><a href="#bikes" className="hover:text-red-500">Bikes</a></li>
          <li><a href="#contact" className="hover:text-red-500">Contact</a></li>
        </ul>

        <a
          href="https://forms.gle/HexZo9ZBKPNoWLSX7"
          target="_blank"
          rel="noreferrer"
          className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg font-semibold"
        >
          Book Now
        </a>

      </div>
    </nav>
  );
}

export default Navbar;