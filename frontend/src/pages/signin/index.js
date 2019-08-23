import React from "react";
import { useDispatch } from "react-redux";
import { Form, Input } from "unform";

import { signinRequest } from "../../store/modules/auth/actions";

import { Container, SignupLink } from "./styles";
import Logo from "../../assets/images/logo.svg";

export default function Signin() {
  const dispatch = useDispatch();
  async function handleSubmit({ email, password }) {
    dispatch(signinRequest(email, password));
  }
  return (
    <Container>
      <div>
        <img src={Logo} alt="MeetApp Logo" />

        <Form onSubmit={handleSubmit}>
          <Input name="email" type="email" placeholder="Seu email" required />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
            required
          />

          <button type="submit">Entrar</button>
        </Form>
        <SignupLink to="/signup">Criar conta grátis</SignupLink>
      </div>
    </Container>
  );
}
