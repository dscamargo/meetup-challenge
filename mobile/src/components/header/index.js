import React from 'react';

import Logo from '~/assets/images/logo.png';

import { Container, HeaderImage } from './styles';

export default function header() {
  return (
    <Container>
      <HeaderImage source={Logo} />
    </Container>
  );
}
