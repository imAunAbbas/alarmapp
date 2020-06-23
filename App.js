import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Start from './scr/screens/start';
import Main from './scr/screens/main';

const MainStack = createStackNavigator(
  {
    Start: {
      screen: Start,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Main: {
      screen: Main,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
  },
  {
    initialRouteName: 'Start',
  },
);

const App = createAppContainer(MainStack);
export default App;
