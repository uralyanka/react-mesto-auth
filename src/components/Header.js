import React from 'react';
import { Link, Routes, Route, NavLink } from 'react-router-dom';
import logo from "../images/mesto-header__logo.svg";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="header__link">
      <img alt="Лого сайта" className="header__logo" src={logo} />
      </Link>
      
      <nav className="header__nav">
        <Routes>
          <Route exact path="/">
            <NavLink to="/sign-in" className="header__nav-link">Выйти</NavLink>
          </Route>
          <Route path="/sign-up">
            <NavLink to="/sign-in" className="header__nav-link">Войти</NavLink>
          </Route>
          <Route path="/sign-in">
            <NavLink to="/sign-up" className="header__nav-link">Регистрация</NavLink>
          </Route>
        </Routes>
      </nav>

    </header>
  );
}
