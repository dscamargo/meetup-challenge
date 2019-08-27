import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Image, ActivityIndicator } from 'react-native';

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

export default function Signup({ navigation }) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {}
  return (
    <Background>
      <Container>
        <MainContainer>
          <Image source={logo} />

          <Form>
            <FormInput
              autoCorrect={false}
              autoCapitalize="characters"
              placeholder="Digite seu nome"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
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
            />

            <FormInput
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Digite sua senha"
              ref={passwordRef}
              returnKeyType="send"
              onSubmitEditing={handleSubmit}
            />

            <Button onPres={handleSubmit} background="#F94D6A">
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
