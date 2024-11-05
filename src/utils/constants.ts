import {Dimensions} from 'react-native';

export const AppColors = {
  bgColor: '#f2f2f2',
  activeBtnColor: '#3E87FF',
  underlayColor: '#51CD43',
};

export const {width: ScreenWidth, height: ScreenHeight} =
  Dimensions.get('screen');

export function splitToTwoArrays(arr: any) {
  // Function to generate a random character
  function getRandomChar() {
    const chars = 'abcdefghijklmnopqrstuvwxyz';
    return chars[Math.floor(Math.random() * chars.length)];
  }

  // Add random characters until the array length is 16
  while (arr.length < 16) {
    const randomChar = getRandomChar();
    const randomPosition = Math.floor(Math.random() * (arr.length + 1));
    arr.splice(randomPosition, 0, randomChar); // Insert at random position
  }

  // Split the array into two arrays of 8 characters each
  const arr1 = arr.slice(0, 8);
  const arr2 = arr.slice(8, 16);

  return [arr1, arr2];
}
