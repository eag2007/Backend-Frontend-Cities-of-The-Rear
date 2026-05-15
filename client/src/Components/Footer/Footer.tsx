import "./Footer.css";
import "../../style.css";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="main-footer">
      <div className="footer-container">
        <p>© 1941-1945 Трудовой подвиг тыла. Память навсегда.</p>
        <p>
          Все представленные города удостоены звания "Город трудовой доблести"
        </p>
      </div>
    </footer>
  );
};

export default Footer;
