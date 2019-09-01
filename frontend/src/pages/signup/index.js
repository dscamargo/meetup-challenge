import React from "react";
import { Form, Input } from "unform";
import * as Yup from "yup";
import { toast } from "react-toastify";

import api from "../../services/api";
import history from "../../services/history";
import { Container, SignupLink } from "./styles";
import Logo from "../../assets/images/logo.svg";

const schema = Yup.object().shape({
  username: Yup.string().required("O nome do usuário é obrigatório."),
  email: Yup.string()
    .email("Insira um email válido.")
    .required("O email é obrigatório."),
  password: Yup.string()
    .min(6, "A senha precisa ter pelo menos 6 caracteres.")
    .required("A senha é obrigatória")
});

export default function Signup() {
  async function handleSubmit(data) {
    try {
      await api.post("/users", data);

      toast.info("Usuário criado com sucesso !", {
        position: toast.POSITION.TOP_RIGHT
      });
      history.push("/signin");
    } catch (error) {
      toast.error("Problema ao criar usuário, tente novamente !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }
  return (
    <Container>
      <div>
        <img src={Logo} alt="MeetApp Logo" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="username" placeholder="Nome completo" />
          <Input name="email" type="email" placeholder="Seu email" />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />

          <button type="submit">Criar conta</button>
        </Form>

        <SignupLink to="/signin">Já tenho login</SignupLink>
      </div>
    </Container>
  );
}
