import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";

import Logo from "../../assets/images/logo.svg";
import { Container } from "./styles";
import { signOut } from "../../store/modules/auth/actions";

export default function Header({ username }) {
  const dispatch = useDispatch();
  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Container>
      <div>
        <Link to="/">
          <img src={Logo} alt="MeetApp Logo" />
        </Link>
        <div>
          <div>
            <strong>{username}</strong>
            <Link style={{ textDecoration: "none" }} to={`/profile`}>
              <span>Meu perfil</span>
            </Link>
          </div>
          <button onClick={handleLogout} type="button">
            Sair
          </button>
        </div>
      </div>
    </Container>
  );
}
