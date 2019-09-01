import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
`;

export const InnerContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const Form = styled.View`
  width: 90%;
`;

export const SeparateView = styled.View`
  width: 100%;
  height: 1px;
  margin-top: 20px;
  border-top-color: rgba(255, 255, 255, 0.3);
  border-top-width: 1px;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: 'rgba(255,255,255,0.5)',
})`
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.2);
  margin-top: 20px;
  padding: 0 20px;
  color: #fff;
  font-size: 16px;
`;

export const SubmitButton = styled.TouchableOpacity`
  width: 100%;
  background: #e5556e;
  height: 50px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  border-radius: 4px;
`;

export const LogoutButton = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  background: #d44059;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  border-radius: 4px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 14px;
`;
