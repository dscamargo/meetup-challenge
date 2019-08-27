import React from 'react';
import { useSelector } from 'react-redux';

import createRouter from './routes';

// import { Container } from './styles';

export default function App() {
  const isLogged = useSelector(state => state.auth.isLogged);

  const Routes = createRouter(isLogged);

  return <Routes />;
}
