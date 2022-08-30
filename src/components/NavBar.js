import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar({ logOut, userData }) {
  const [email, setEmail] = useState();

  useEffect(() => {
    setEmail(userData.email);
  },[userData]);

  function handleLogOut() {
    logOut();
  }

  return (
    <nav className='header__nav'>
      <h2 className='header__nav-email'>{email}</h2>
      <Link to='/sign-in' onClick={handleLogOut} className='header__nav-link header__nav-logout-link'>Выйти</Link>
    </nav>
  );
}