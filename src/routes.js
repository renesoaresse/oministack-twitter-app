import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import Login from './screens/Login';
import Timeline from './screens/Timeline';
import New from './screens/New';

export default createAppContainer(
  createSwitchNavigator({
    Login,
    App: createStackNavigator({
      Timeline,
      New,
    }),
  }),
);
