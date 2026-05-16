import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import "./LoginPage.css";
import "../../style.css";
import { useForm } from "react-hook-form";
import { useAuth } from "../../Context/useAuth";
import { useEffect, useRef, useState } from "react";

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

  const [showError, setShowError] = useState(false);
  const errorTimerRef = useRef<number | null>(null);

  const handleLogin = async (form: LoginFormsInput) => {
    try {
      await loginUser(form.email, form.password);
    } catch (error) {
      setShowError(true);

      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }

      errorTimerRef.current = window.setTimeout(() => {
        setShowError(false);
      }, 3000);
    }
  };

  useEffect(() => {
    return () => {
      if (errorTimerRef.current) {
        clearTimeout(errorTimerRef.current);
      }
    };
  }, []);

  return (
    <div>
      <main>
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
              {showError && (
                <div id="loginError" className="error-message">
                  Неверный логин или пароль
                </div>
              )}
              <button type="submit" className="btn-primary btn-block">
                Войти
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
