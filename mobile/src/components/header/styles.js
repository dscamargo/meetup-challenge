import styled from 'styled-components/native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const Container = styled.View`
  width: 100%;
  height: ${getStatusBarHeight() + 50}px;
  background: rgba(0, 0, 0, 0.3);
  justify-content: center;
  align-items: center;
`;

export const HeaderImage = styled.Image`
  width: 24px;
  height: 24px;
  margin-top: 30px;
`;
