import { Dimensions } from "react-native";

export const { width: ScreenWidth, height: ScreenHight } = Dimensions.get('window')
export const hp = (percentage: number) => (ScreenHight * percentage) / 100;
export const wp = (percentage: number) => (ScreenWidth * percentage) / 100;


export const generateUUID = (): string => {
    const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
    return template.replace(/[xy]/g, (char) => {
        const random = Math.random() * 16 | 0;
        const value = char === 'x' ? random : (random & 0x3 | 0x8);
        return value.toString(16);
    });
};