import React, { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image, ActivityIndicator } from 'react-native';

import { signinRequest } from '~/store/modules/auth/actions';
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

export default function Signin({ navigation }) {
  const loading = useSelector(state => state.auth.loading);
  const dispatch = useDispatch();
  const passwordRef = useRef();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSubmit() {
    dispatch(signinRequest(email, password));

    console.tron.log('Logou');
  }
  return (
    <Background>
      <Container>
        <MainContainer>
          <Image source={logo} />

          <Form>
            <FormInput
              icon="mail-outline"
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite seu email"
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
              onSubmitEditing={handleSubmit}
              onChangeText={setPassword}
              value={password}
            />

            <Button onPress={handleSubmit} background="#F94D6A">
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ButtonText color="#fff">Entrar</ButtonText>
              )}
            </Button>
          </Form>

          <Button
            onPress={() => navigation.navigate('Signup')}
            background="transparent"
          >
            <ButtonText color="rgba(255,255,255,0.5)">
              Criar conta grátis
            </ButtonText>
          </Button>
        </MainContainer>
      </Container>
    </Background>
  );
}
