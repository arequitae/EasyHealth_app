/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import './src/utils/constant.js'
console.disableYellowBox = true 
AppRegistry.registerComponent(appName, () => App);