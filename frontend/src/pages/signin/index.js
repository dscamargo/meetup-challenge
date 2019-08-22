import React from "react";

import { Container, SignupLink } from "./styles";
import Logo from "../../assets/images/logo.svg";

export default function Signin() {
  return (
    <Container>
      <div>
        <img src={Logo} alt="MeetApp Logo" />
        <input type="text" placeholder="Digite seu e-mail" />
        <input type="password" placeholder="Sua senha secreta" />
        <button type="button">Entrar</button>
        <SignupLink to="/signup">Criar conta grátis</SignupLink>
      </div>
    </Container>
  );
}
