import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdAddCircleOutline } from "react-icons/md";
import { toast } from "react-toastify";

import api from "../../services/api";
import history from "../../services/history";

import {
  Container,
  InnerContainer,
  EditContainer,
  ButtonContainer
} from "./styles";
import Header from "../../components/header";

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
      console.log(error);
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
              required
            />
            <input
              name="email"
              type="email"
              placeholder="Seu email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              required
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
            <MdAddCircleOutline size={"1.5em"} />
            <span>Salvar perfil</span>
          </button>
        </ButtonContainer>
      </InnerContainer>
    </Container>
  );
}
