import { StyleSheet } from 'react-native';
import { theme } from "../../index"
export const {padding, color, fontSize, fontFamily } = theme;

//These styles are used for Book Item
const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginVertical:0.6,
    marginHorizontal: 1
  },

  wrapper:{
    padding: padding,
    flexDirection: "row",
    backgroundColor: 'rgba(56, 122, 249, 0.8)'
  },

  info:{
    flex:1
  },

  title:{
    fontSize: fontSize.large,
    fontFamily: fontFamily.bold,
    color: color.black,
  },

  author:{
    fontSize: fontSize.regular,
    fontFamily: fontFamily.bold,
    color: color.light_grey,
  },

  bottom:{
    flexDirection: "row",
    flex:1,
    marginTop:padding * 0.5,
  },

  source:{
    fontSize: fontSize.small,
    fontFamily: fontFamily.bold,
    color: color.underlayColor,
    textAlign: 'right'
  },

  date:{
    fontSize: fontSize.small,
    fontFamily: fontFamily.bold,
    color: color.grey,
    marginLeft: padding
  },
});

export default styles;