import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Start from './scr/screens/start';
import Input from './scr/screens/input';
import Timer from './scr/screens/timer';

const MainStack = createStackNavigator(
  {
    Start: {
      screen: Start,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Input: {
      screen: Input,
      navigationOptions: () => ({
        headerShown: false,
      }),
    },
    Timer: {
      screen: Timer,
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
