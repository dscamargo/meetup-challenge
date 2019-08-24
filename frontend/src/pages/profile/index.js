import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";
import * as Yup from "yup";

import api from "../../services/api";
import history from "../../services/history";

import {
  Container,
  InnerContainer,
  EditContainer,
  ButtonContainer
} from "./styles";
import Header from "../../components/header";

const schema = Yup.object().shape({
  password_old: Yup.string().min(6, "Senha atual inválida."),
  password: Yup.string().when("password_old", (oldPassword, field) =>
    oldPassword
      ? field
          .min(6, "Nova senha inválida.")
          .required("A nova senha é obrigatória.")
      : field
  ),
  password_confirmation: Yup.string().when("password", (password, field) =>
    password
      ? field
          .min(6, "A confirmação deve ser igual a nova senha. ")
          .required("A confirmação de senha é obrigatória.")
          .oneOf(
            [Yup.ref("password")],
            "A confirmação deve ser igual a nova senha."
          )
      : field
  )
});

export default function Profile() {
  const profile = useSelector(state => state.user.profile);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password_old, setPassword_old] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmations] = useState("");

  useEffect(() => {
    setUsername(profile.username);
    setEmail(profile.email);
  }, [profile.email, profile.username]);

  async function handleSubmit() {
    try {
      if (
        !(await schema.isValid({
          password,
          password_old,
          password_confirmation
        }))
      ) {
        toast.error("Verifique os campos e tente novamente. !", {
          position: toast.POSITION.TOP_RIGHT
        });

        return;
      }

      await api.put(`/users/${profile.id}`, {
        username,
        email,
        password,
        password_confirmation,
        password_old
      });

      toast.info("Suas informações foram alteradas com sucesso !", {
        position: toast.POSITION.TOP_RIGHT
      });
      history.push("/");
    } catch (error) {
      toast.error("Senha incorreta !", {
        position: toast.POSITION.TOP_RIGHT
      });
    }
  }

  return (
    <Container>
      <Header username={profile.username} />
      <InnerContainer>
        <EditContainer>
          <div>
            <input
              name="username"
              type="text"
              placeholder="Seu nome"
              onChange={e => setUsername(e.target.value)}
              value={username}
              readOnly
            />
            <input
              name="email"
              type="email"
              placeholder="Seu email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              readOnly
            />
          </div>

          <div>
            <input
              name="password_old"
              type="password"
              placeholder="Senha atual"
              onChange={e => setPassword_old(e.target.value)}
              value={password_old}
              minLength="6"
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Nova senha"
              onChange={e => setPassword(e.target.value)}
              value={password}
              minLength="6"
              required
            />
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirmação de senha"
              onChange={e => setPassword_confirmations(e.target.value)}
              value={password_confirmation}
              minLength="6"
              required
            />
          </div>
        </EditContainer>
        <ButtonContainer>
          <div />
          <button onClick={handleSubmit} type="button">
            <div>
              <MdAddCircleOutline size={"1.5em"} />
              <span>Salvar perfil</span>
            </div>
          </button>
        </ButtonContainer>
      </InnerContainer>
    </Container>
  );
}
