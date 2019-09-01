import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { MdAddCircleOutline } from "react-icons/md";
import * as Yup from "yup";
import { toast } from "react-toastify";

import { updateProfileRequest } from "../../store/modules/user/actions";

import {
  Container,
  InnerContainer,
  EditContainer,
  ButtonContainer
} from "./styles";
import Header from "../../components/header";

const schema = Yup.object().shape({
  username: Yup.string().required("O nome do usuário é obrigatório"),
  email: Yup.string()
    .email("Insira um email válido")
    .required("O email é obrigatório"),
  password_old: Yup.string(),
  password: Yup.string().when("password_old", (oldPassword, field) =>
    oldPassword
      ? field

          .required("A nova senha é obrigatória.")
          .min(6, "Nova senha inválida.")
      : field
  ),
  password_confirmation: Yup.string().when("password", (password, field) =>
    password
      ? field
          .oneOf(
            [Yup.ref("password")],
            "A confirmação deve ser igual a nova senha."
          )
          .required("A confirmação de senha é obrigatória.")
      : field
  )
});

export default function Profile() {
  const dispatch = useDispatch();
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
    schema
      .validate({
        username,
        email,
        password_old,
        password,
        password_confirmation
      })
      .then(() => {
        dispatch(
          updateProfileRequest({
            username,
            email,
            password_old,
            password,
            password_confirmation
          })
        );
      })
      .catch(err => {
        toast.error(err.message, {
          position: toast.POSITION.TOP_RIGHT
        });
      });
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
            />
            <input
              name="email"
              type="email"
              placeholder="Seu email"
              onChange={e => setEmail(e.target.value)}
              value={email}
            />
          </div>

          <div>
            <input
              name="password_old"
              type="password"
              placeholder="Senha atual"
              onChange={e => setPassword_old(e.target.value)}
              value={password_old}
              required
            />
            <input
              name="password"
              type="password"
              placeholder="Nova senha"
              onChange={e => setPassword(e.target.value)}
              value={password}
              required
            />
            <input
              name="password_confirmation"
              type="password"
              placeholder="Confirmação de senha"
              onChange={e => setPassword_confirmations(e.target.value)}
              value={password_confirmation}
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
