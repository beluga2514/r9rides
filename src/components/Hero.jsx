

function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen bg-black text-white flex items-center"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

        <div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Ride Your
            <span className="text-red-500"> Dream Bike</span>
          </h1>

          <p className="mt-6 text-gray-400 text-lg">
            Premium bike rentals for city rides, long trips and unforgettable adventures.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
<a
  href="#booking"
  className="bg-green-600 px-6 py-3 rounded-lg hover:bg-green-700"
>
  Start Ride
</a>
            <a
              href="https://forms.gle/HexZo9ZBKPNoWLSX7"
              target="_blank"
              rel="noreferrer"
              className="bg-red-600 px-6 py-3 rounded-lg hover:bg-red-700"
            >
              Book Now
            </a>

            <a
              href="#bikes"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black"
            >
              Explore Bikes
            </a>

          </div>
        </div>

        <div>
        <div className="h-96 w-full rounded-xl bg-gray-800 flex items-center justify-center">
  <h2 className="text-3xl font-bold text-red-500">
    RIDEX
  </h2>
</div>
        </div>

      </div>
    </section>
  );
}

export default Hero;