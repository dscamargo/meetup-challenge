import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Registers from './pages/Registers';

export default isLogged =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({ Signin, Signup }),
        App: createBottomTabNavigator(
          {
            Dashboard,
            Registers,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              activeTintColor: '#fff',
              style: {
                backgroundColor: '#2B1A2F',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isLogged ? 'App' : 'Sign',
      }
    )
  );
