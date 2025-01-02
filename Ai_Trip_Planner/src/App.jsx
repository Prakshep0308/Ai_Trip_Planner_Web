import { useState } from "react";
import "./App.css";
import Hero from "./components/Custom/Hero";
import Footer from "./components/Custom/Footer";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Hero />
      <Footer />
    </>
  );
}

export default App;
