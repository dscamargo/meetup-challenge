import React from "react";
import { Form, Input } from "unform";

import api from "../../services/api";
import history from "../../services/history";
import { Container, SignupLink } from "./styles";
import Logo from "../../assets/images/logo.svg";

export default function Signup() {
  async function handleSubmit(data) {
    try {
      await api.post("/users", data);

      history.push("/signin");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Container>
      <div>
        <img src={Logo} alt="MeetApp Logo" />

        <Form onSubmit={handleSubmit}>
          <Input name="username" placeholder="Nome completo" required />
          <Input name="email" type="email" placeholder="Seu email" required />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
            required
          />
          <Input
            name="password_confirmation"
            type="password"
            placeholder="Sua senha secreta novamente"
            required
          />

          <button type="submit">Criar conta</button>
        </Form>

        <SignupLink to="/signin">Já tenho login</SignupLink>
      </div>
    </Container>
  );
}
