import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Register from "./Register";
import Login from "./Login";
import ProtectedRoute from "./ProtectedRoute";
import InfoToolip from "./InfoTooltip";
import * as auth from "../utils/auth";
import Content from "./Content";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userAuth, setUserAuth] = useState({ email: "", _id: "" });

  const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
  const [isSuccessRegister, setIsSuccessRegister] = useState(false);

  const navigate = useNavigate();

  function closeInfoPopup() {
    setIsInfoPopupOpen(false);
  }

  function handleRegister({ email, password }) {
    auth
      .register({ email, password })
      .then((res) => {
        setUserAuth(res.data);
        navigate("/");
        setIsSuccessRegister(true);
        setIsInfoPopupOpen(true);
      })
      .catch((err) => {
        setIsSuccessRegister(false);
        setIsInfoPopupOpen(true);
        if (err === "Ошибка: 400") return console.log("некорректно заполнено одно из полей");
        console.log(err);
      });
  }

  function handleLogin({ email, password }) {
    auth
      .signin({ email, password })
      .then((res) => {
        setLoggedIn(true);
        localStorage.setItem("token", res["token"]);
        setUserAuth({ email: email });
        navigate("/");
      })
      .catch((err) => {
        setIsSuccessRegister(false);
        setIsInfoPopupOpen(true);
        if (err === "Ошибка: 400") return console.log("не передано одно из полей");
        if (err === "Ошибка: 401") return console.log("пользователь с email не найден");
        console.log(err);
      });
  }

  function handleCheckToken() {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .getContent(token)
        .then((res) => {
          setUserAuth(res.data);
          setLoggedIn(true);
          navigate("/");
        })
        .catch((err) => {
          if (err === 400) return console.log("Токен не передан или передан не в том формате");
          if (err === 401) return console.log("Переданный токен некорректен");
          console.log(err);
        });
    }
  }

  useEffect(() => {
    handleCheckToken();
  }, []);

  function handleLogOut() {
    localStorage.removeItem("token");
    setUserAuth({});
    setLoggedIn(false);
    navigate("/sign-in");
  }

  return (
    <div className="root">
      <div className="page">

        <Header handleLogOut={handleLogOut} user={userAuth}/>

        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute loggedIn={loggedIn}>
                <Content />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />

          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
        </Routes>
        <Footer />

        <InfoToolip
          isOk={isSuccessRegister}
          isOpen={isInfoPopupOpen}
          onClose={closeInfoPopup}
        />
      </div>
    </div>
  );
}
