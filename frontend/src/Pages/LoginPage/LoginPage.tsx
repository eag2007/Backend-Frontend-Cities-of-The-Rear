import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./LoginPage.css";
import "../../style.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";

type Props = {};

type LoginFormsInput = {
  email: string;
  password: string;
};

const validation = Yup.object().shape({
  email: Yup.string().required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const LoginPage = (props: Props) => {
  const { loginUser } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormsInput>({ resolver: yupResolver(validation) });

  const handleLogin = (form: LoginFormsInput) => {
    loginUser(form.email, form.password);
  };

  return (
    <div>
      <main>
        <div className="container">
          <div className="login-container">
            <div className="login-card">
              <h2>Вход в админ-панель</h2>
              <form id="loginForm" onSubmit={handleSubmit(handleLogin)}>
                <div className="form-group">
                  <label>E-mail</label>
                  <input type="email" id="username" {...register("email")} />
                  {errors.email ? <p>{errors.email.message}</p> : ""}
                </div>
                <div className="form-group">
                  <label>Пароль</label>
                  <input
                    type="password"
                    id="password"
                    {...register("password")}
                  />{" "}
                  {errors.password ? <p>{errors.password.message}</p> : ""}
                </div>
                <div
                  id="loginError"
                  className="error-message"
                  style={{ display: "none" }}
                >
                  Неверный логин или пароль
                </div>
                <button type="submit" className="btn-primary btn-block">
                  Войти
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
