import "./Hero.css";
import "../../../style.css";

type Props = {};

const Hero = (props: Props) => {
  return (
    <div>
      <section className="hero-main">
        <div className="hero-content">
          <h1>Тыл — половина Победы</h1>
          <p>
            Память о трудовом подвиге советского народа в годы Великой
            Отечественной войны
          </p>
        </div>
      </section>
    </div>
  );
};

export default Hero;
