import firestore from '@react-native-firebase/firestore';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {getUniqueId, getManufacturer} from 'react-native-device-info';

const createUserUniqueId = async (userId: string) => {
  try {
    const id = await getUniqueId();
    const userDoc = await firestore().collection('users').doc(userId).get();

    if (userDoc.exists() && userDoc.data()?.unique_id) {
      console.log('Unique ID already exists, not updating.');
      return;
    }

    await firestore().collection('users').doc(userId).set({
      unique_id: id,
      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    console.log('User unique ID created successfully!');
  } catch (error) {
    console.error('Error creating user unique ID:', error);
  }
};

// Update user name
const updateUserLevel = async (userId: string, newLevel: number) => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();

    if (userDoc.exists()) {
      const currentLevel = userDoc.data()?.level || 0;

      if (currentLevel < newLevel) {
        await firestore().collection('users').doc(userId).update({
          level: newLevel,
          updatedAt: firestore.FieldValue.serverTimestamp(),
        });
        console.log('User level updated successfully!');
      } else {
        console.log(
          'Current level is greater than or equal to the new level. No update performed.',
        );
      }
    } else {
      console.log('User document does not exist.');
    }
  } catch (error) {
    console.error('Error updating user level:', error);
  }
};

// Create a table to store questions, answers, and hints with unique_id as foreign key
const addQuestionAnswerHint = async (uniqueId: string, question: string) => {
  try {
    await firestore().collection('questions').add({
      unique_id: uniqueId,
      question,

      createdAt: firestore.FieldValue.serverTimestamp(),
    });
    console.log('Question, answer, and hint added successfully!');
  } catch (error) {
    console.error('Error adding question, answer, and hint:', error);
  }
};

// fetch user level
const fetchUserLevel = async (userId: string): Promise<number | null> => {
  try {
    const userDoc = await firestore().collection('users').doc(userId).get();
    if (userDoc.exists()) {
      const userData = userDoc.data();
      console.log('User level fetched successfully:', userData?.level);
      return userData?.level || null;
    } else {
      console.log('User document does not exist.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user level:', error);
    return null;
  }
};

export const handleAnonymousAuth = async () => {
  try {
    const {user} = await auth().signInAnonymously();
    createUserUniqueId(user.uid);
    updateUserLevel(user.uid, 2);
    // fetchUserLevel(user.uid);
    console.log('Anonymous user signed in successfully!');
  } catch (error) {
    console.error('Error with anonymous authentication:', error);
  }
};
