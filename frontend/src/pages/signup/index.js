import React from "react";

import { Container, SignupLink } from "./styles";
import Logo from "../../assets/images/logo.svg";

export default function Signup() {
  return (
    <Container>
      <div>
        <img src={Logo} alt="MeetApp Logo" />
        <input type="text" placeholder="Digite seu nome" />
        <input type="text" placeholder="Digite seu e-mail" />
        <input type="password" placeholder="Sua senha secreta" />
        <input type="password" placeholder="Sua senha secreta novamente" />
        <button type="button">Criar conta</button>
        <SignupLink to="/signin">Já tenho login</SignupLink>
      </div>
    </Container>
  );
}
