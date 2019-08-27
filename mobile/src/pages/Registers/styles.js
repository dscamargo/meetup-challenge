import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
`;

export const Meetup = styled.View`
  width: 100%;
  border-radius: 4px;
  background: #fff;
  margin-top: 20px;
`;

export const Banner = styled.Image`
  width: 100%;
  height: 150px;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
`;

export const ListContainer = styled.View`
  width: 100%;
  padding: 0 10px;
`;

export const Title = styled.Text`
  font-size: 20px;
  color: #000;
  font-weight: bold;
  margin: 20px 0;
`;

export const InfoView = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
`;

export const InfoText = styled.Text`
  color: #999;
  margin-left: 10px;
`;

export const RegisterButton = styled.TouchableOpacity`
  width: 100%;
  height: 40px;
  background: #f94d6a;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
  border-radius: 4px;
`;
export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  font-size: 16px;
`;
