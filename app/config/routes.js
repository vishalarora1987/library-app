import React from 'react';

import { Scene, Router, Stack } from 'react-native-router-flux';
import Home from '../modules/home/scenes/Home';
import { color, navTitleStyle } from "../styles/theme";

//This is where we create routes between different Views/Pages/Scenes
export default class extends React.Component {
  render() {
    return (
        <Router>
          <Stack key="root"
                 navigationBarStyle={{backgroundColor: 'white'}}
                 titleStyle={navTitleStyle}
                 backButtonTintColor={color.black}>
            <Scene key="Home" component={Home} title="Books Catalogue" initial/>
          </Stack>
        </Router>
    )
  }
}