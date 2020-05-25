import { Platform } from 'react-native';
import { moderateScale as normalize } from 'react-native-size-matters';


//colors: few of these are used but others were used for experimentation with UI
const color = {
  black: 'rgba(0,0,0,.84)',
  light_black: '#414141',
  main: '#7A94CE',
  white: '#ffffff',
  light_grey: '#eaeaea',
  grey: '#ccc',
  underlayColor: '#ddd'
}

const fontSize = {
  small: normalize(12),
  regular: normalize(14),
  large: normalize(21),
  extralarge: normalize(28)
}

//Font for iOS
const helvetica = {
  bold: "HelveticaNeue-Bold",
  medium: "HelveticaNeue-Medium",
  regular: "Helvetica Neue",
  light: "HelveticaNeue-Light"
}

//Font for Android
const sanSerif = {
  bold: "sans-serif",
  medium: "sans-serif-medium",
  regular: "sans-serif-thin",
  light: "sans-serif-light"
}

//Dynamically assign the fond based on devise
const fontFamily = (Platform.OS === 'ios') ? helvetica : sanSerif;
const padding = 8;

const navTitleStyle = {
  fontSize: fontSize.large + 1,
  fontFamily: fontFamily.bold,
  color: color.black,
  letterSpacing: 0.4
}
const navigationBarStyle = { backgroundColor: color.black, borderBottomWidth:0 }

export {
  color,
  fontSize,
  fontFamily,
  padding,
  navTitleStyle,
  navigationBarStyle,
  normalize
}