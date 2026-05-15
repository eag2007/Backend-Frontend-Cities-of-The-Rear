import "./Home.css";
import "../../style.css";

import Hero from "../../Components/HomePage/Hero/Hero";
import About from "../../Components/HomePage/About/About";
import Statistics from "../../Components/HomePage/Statistics/Statistics";

type Props = {};

const Home = (props: Props) => {
  return (
    <>
      <main className="home-main">
        <Hero />
        <About />
        <Statistics />
      </main>
    </>
  );
};

export default Home;
