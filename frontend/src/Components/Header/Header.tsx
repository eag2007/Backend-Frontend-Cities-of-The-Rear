import "./Header.css";
import "../../style.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const Header = (props: Props) => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  return (
    <header className="main-header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate(`/search`)}>
          <h1>Города трудовой доблести</h1>
          <span>1941-1945</span>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/" data-link>
                Главная
              </Link>
            </li>
            <li>
              <Link to="/search" data-link>
                Поиск
              </Link>
            </li>
            <li>
              <a href="/map" data-link>
                Карта
              </a>
            </li>
            {isLoggedIn() ? (
              <li id="adminLink.html">
                <Link to="/adminpanel" data-link>
                  Админ-панель
                </Link>
              </li>
            ) : (
              <></>
            )}
            {isLoggedIn() ? (
              <li>
                <Link to="/" onClick={() => logout()} id="exitLink">
                  Выйти
                </Link>
              </li>
            ) : (
              <li>
                <Link to="/login" id="authLink">
                  Войти
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
