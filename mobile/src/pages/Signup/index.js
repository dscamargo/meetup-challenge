import React, { useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import { Image, ActivityIndicator, Alert } from 'react-native';
import * as Yup from 'yup';

import Background from '~/components/background';

import {
  Container,
  MainContainer,
  Form,
  FormInput,
  Button,
  ButtonText,
} from './styles';
import logo from '~/assets/images/logo.png';
import api from '~/services/api';

const schema = Yup.object().shape({
  password: Yup.string()
    .min(6, 'A senha deve ter pelo menos 6 caracteres')
    .required('A senha é obrigatória'),
  email: Yup.string()
    .email('Insira um email válido')
    .required('O email é obrigatório'),
  username: Yup.string().required('O nome é obrigatório'),
});

export default function Signup({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const loading = useSelector(state => state.auth.loading);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit() {
    schema
      .validate({
        username,
        email,
        password,
      })
      .then(async () => {
        await api.post('/users', { username, email, password });

        Alert.alert('Criação de conta', 'Conta criada com sucesso.');
        navigation.navigate('Signin');
      })
      .catch(err => {
        Alert.alert('Verifique seus dados', `${err.message}`);
      });
  }

  return (
    <Background>
      <Container>
        <MainContainer>
          <Image source={logo} />

          <Form>
            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu nome"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              onChangeText={setUsername}
              value={username}
            />

            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu email"
              ref={emailRef}
              returnKeyType="next"
              onSubmitEditing={() => passwordRef.current.focus()}
              onChangeText={setEmail}
              value={email}
            />

            <FormInput
              secureTextEntry
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite sua senha"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
              onChangeText={setPassword}
              value={password}
            />

            <Button onPress={handleSubmit} background="#F94D6A">
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ButtonText color="#fff">Criar conta</ButtonText>
              )}
            </Button>
          </Form>

          <Button
            onPress={() => navigation.navigate('Signin')}
            background="transparent"
          >
            <ButtonText color="rgba(255,255,255,0.5)">
              Já tenho login
            </ButtonText>
          </Button>
        </MainContainer>
      </Container>
    </Background>
  );
}
