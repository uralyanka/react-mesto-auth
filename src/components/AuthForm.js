import { Link } from "react-router-dom";

export default function AuthForm( { className, title, buttonText }) {
  return (
    <form className={`auth-form ${className}`}>
      <h2 className="auth-form__title">{title}</h2>
      <fieldset className="auth-form__input-container">
        <input
          id="user-email"
          name="email"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          type="text"
        />
        <input
          id="user-password"
          name="password"
          placeholder="Пароль"
          required
          minLength="2"
          maxLength="40"
          type="password"
        />
      </fieldset>
      <button
        type="submit"
        aria-label="Отправить данные"
        className={"button auth-form__submit-btn"}
      >
        {buttonText}
      </button>
      <Link to="/sign-in" className="auth-form__login-link">
        Уже зарегистрированы? Войти
      </Link>
    </form>
  );
}
