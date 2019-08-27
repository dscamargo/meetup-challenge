import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/background';
import Header from '~/components/header';
import {
  Container,
  InnerContainer,
  Form,
  FormInput,
  SeparateView,
} from './styles';

export default function Profile() {
  return (
    <Background>
      <Header />
      <Container>
        <InnerContainer>
          <Form>
            <FormInput placeholder="Digite seu nome" />

            <FormInput placeholder="Digite seu email" />

            <SeparateView></SeparateView>

            <FormInput placeholder="Senha atual" />

            <FormInput placeholder="Nova senha" />

            <FormInput placeholder="Confirmação de senha" />
          </Form>
        </InnerContainer>
      </Container>
    </Background>
  );
}

Profile.navigationOptions = {
  tabBarLabel: 'Meu perfil',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="person" size={30} color={tintColor} />
  ),
};
