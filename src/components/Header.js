import logo from "../images/mesto-header__logo.svg";

export default function Header() {
  return (
    <header className="header">
      <img alt="Лого сайта" className="header__logo" src={logo} />
    </header>
  );
}
