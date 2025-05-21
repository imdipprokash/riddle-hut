import {Dimensions} from 'react-native';

export const {width: ScreenWidth, height: ScreenHight} =
  Dimensions.get('window');
export const hp = (percentage: number) => (ScreenHight * percentage) / 100;
export const wp = (percentage: number) => (ScreenWidth * percentage) / 100;

export const generateUUID = (): string => {
  const template = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  return template.replace(/[xy]/g, char => {
    const random = (Math.random() * 16) | 0;
    const value = char === 'x' ? random : (random & 0x3) | 0x8;
    return value.toString(16);
  });
};

export const Keyword = [
  'fashion',
  'clothing',
  'designer clothing',
  'luxury fashion',
  'sustainable fashion',
  'dresses',
  'activeness',
  'sneakers',
  'women’s clothing online',
  'plus-size clothing',
  'discount clothing',
  'free shipping',
];

interface FirestoreTimestamp {
  seconds: number;
  nanoseconds: number;
}

// Format the date
export const formatDate = (timestamp: FirestoreTimestamp): string => {
  // Convert Firestore timestamp to milliseconds
  const millis =
    timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1e6);

  // Create Date object
  const d = new Date(millis);

  const day = String(d.getDate()).padStart(2, '0');
  const month = String(d.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
  const year = d.getFullYear();

  let hours = d.getHours();
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const seconds = String(d.getSeconds()).padStart(2, '0');

  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12; // Convert 0 to 12 for 12-hour format

  const time = `${hours}:${minutes}:${seconds} ${ampm}`;
  return `${day}-${month}-${year}, ${time}`;
};
