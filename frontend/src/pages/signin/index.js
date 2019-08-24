import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "unform";
import * as Yup from "yup";

import { signinRequest } from "../../store/modules/auth/actions";

import { Container, SignupLink } from "./styles";
import Logo from "../../assets/images/logo.svg";

import Loading from "../../components/loading";

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Digite um email válido")
    .required("O email é obrigatório."),
  password: Yup.string().required("A senha é obrigatória.")
});

export default function Signin() {
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth);
  async function handleSubmit({ email, password }) {
    dispatch(signinRequest(email, password));
  }

  return (
    <Container>
      <div>
        <img src={Logo} alt="MeetApp Logo" />

        <Form schema={schema} onSubmit={handleSubmit}>
          <Input name="email" type="email" placeholder="Seu email" />
          <Input
            name="password"
            type="password"
            placeholder="Sua senha secreta"
          />

          <button type="submit">
            {auth.loading ? (
              <Loading width={30} height={30}></Loading>
            ) : (
              "Entrar"
            )}
          </button>
        </Form>
        <SignupLink to="/signup">Criar conta grátis</SignupLink>
      </div>
    </Container>
  );
}
