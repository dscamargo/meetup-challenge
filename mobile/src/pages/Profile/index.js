import React, { useState, useRef, useEffect } from 'react';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';

import Icon from 'react-native-vector-icons/MaterialIcons';
import Background from '~/components/background';
import Header from '~/components/header';

import {
  Container,
  InnerContainer,
  Form,
  FormInput,
  SeparateView,
  SubmitButton,
  LogoutButton,
  ButtonText,
} from './styles';

import { signOut } from '~/store/modules/auth/actions';
import { updateProfileRequest } from '~/store/modules/user/actions';

const schema = Yup.object().shape({
  password_confirmation: Yup.string().when('password', (password, field) =>
    password
      ? field
          .oneOf(
            [Yup.ref('password')],
            'A nova senha e a confirmação devem ser iguais'
          )
          .required('A confirmação de senha é obrigatória')
      : field
  ),
  password: Yup.string().when('password_old', (oldPassword, field) =>
    oldPassword
      ? field
          .required('A nova senha é obrigatória')
          .min(6, 'A nova senha deve ter pelo menos 6 caracteres')
      : field
  ),
  password_old: Yup.string(),
  email: Yup.string()
    .required('O email é obrigatório')
    .email('Insira um email válido'),
  username: Yup.string().required('O nome é obrigatório'),
});

export default function Profile() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password_old, setOldPassword] = useState('');
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const emailRef = useRef();
  const oldPasswordRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmationRef = useRef();

  const profile = useSelector(state => state.user.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    setPassword('');
    setPasswordConfirmation('');
    setOldPassword('');
  }, [profile]);

  useEffect(() => {
    setUsername(profile.username);
    setEmail(profile.email);
  }, [profile]);

  function handleSubmit() {
    schema
      .validate({
        username,
        email,
        password,
        password_old,
        password_confirmation,
      })
      .then(() =>
        dispatch(
          updateProfileRequest(
            username,
            email,
            password,
            password_old,
            password_confirmation
          )
        )
      )
      .catch(err => Alert.alert('Perfil', `${err.message}`));
  }
  function handleLogout() {
    dispatch(signOut());
  }
  return (
    <Background>
      <Header />
      <Container>
        <InnerContainer>
          <Form>
            <FormInput
              placeholder="Digite seu nome"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              onSubmitEditing={() => emailRef.current.focus()}
              onChangeText={setUsername}
              value={username}
            />

            <FormInput
              placeholder="Digite seu email"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              ref={emailRef}
              onSubmitEditing={() => passwordRef.current.focus()}
              onChangeText={setEmail}
              value={email}
            />

            <SeparateView />

            <FormInput
              secureTextEntry
              placeholder="Senha atual"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              ref={oldPasswordRef}
              onSubmitEditing={() => passwordRef.current.focus()}
              onChangeText={setOldPassword}
              value={password_old}
            />

            <FormInput
              secureTextEntry
              placeholder="Nova senha"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="next"
              ref={passwordRef}
              onSubmitEditing={() => passwordConfirmationRef.current.focus()}
              onChangeText={setPassword}
              value={password}
            />

            <FormInput
              secureTextEntry
              placeholder="Confirmação de senha"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="send"
              ref={passwordConfirmationRef}
              onSubmitEditing={handleSubmit}
              onChangeText={setPasswordConfirmation}
              value={password_confirmation}
            />

            <SubmitButton onPress={handleSubmit}>
              <ButtonText>Atualizar perfil</ButtonText>
            </SubmitButton>
            <LogoutButton onPress={handleLogout}>
              <ButtonText>Sair do MeetApp</ButtonText>
            </LogoutButton>
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
