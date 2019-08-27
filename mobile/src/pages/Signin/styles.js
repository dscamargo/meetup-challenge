import styled from 'styled-components/native';
import { Platform } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.KeyboardAvoidingView.attrs({
  enable: Platform.OS === 'ios',
  behavior: 'padding',
})`
  margin-top: ${getStatusBarHeight()};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const MainContainer = styled.View`
  width: 315px;
  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255, 0.5)',
})`
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  margin-bottom: 15px;
  border-radius: 4px;
  padding: 0 20px;
  font-size: 18px;
  color: #fff;
`;

export const Button = styled.TouchableOpacity`
  background: ${props => props.background};
  width: 100%;
  height: 50px;
  justify-content: center;
  align-items: center;
  border-radius: 4px;
  margin-bottom: 10px;
`;

export const ButtonText = styled.Text`
  color: ${props => props.color};
  font-weight: bold;
  font-size: 18px;
`;
