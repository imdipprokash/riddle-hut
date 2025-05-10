import { Dimensions } from "react-native";

export const {width:ScreenWidth,height:ScreenHight} = Dimensions.get('window')
export const hp = (percentage: number) => (ScreenHight * percentage) / 100;
export const wp = (percentage: number) => (ScreenWidth * percentage) / 100;