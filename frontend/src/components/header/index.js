import React from "react";
import { Link } from "react-router-dom";

import Logo from "../../assets/images/logo.svg";
import { Container } from "./styles";

export default function Header(props) {
  return (
    <Container>
      <div>
        <img src={Logo} alt="MeetApp Logo" />
        <div>
          <div>
            <strong>{props.user}</strong>
            <Link style={{ textDecoration: "none" }} to="/profile">
              <span>Meu perfil</span>
            </Link>
          </div>
          <button type="button">Sair</button>
        </div>
      </div>
    </Container>
  );
}
