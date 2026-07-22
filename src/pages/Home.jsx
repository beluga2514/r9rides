import Booking from "./Booking";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "./About";
import Footer from "../components/Footer";

function Home() {
  return (
  <>
  <Navbar />
  <Hero />
  <About />
  <Booking />
  <Footer />
</>
  );
}

export default Home;