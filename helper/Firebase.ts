import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getUniqueId} from 'react-native-device-info';
import riddles from '../data/Riddle.json';

export const signInAnonymously = async () => {
  try {
    const currentUser = auth().currentUser;
    if (currentUser) {
      // Check if user_info exists for this user
      const doc = await firestore()
        .collection('user_info')
        .doc(currentUser.uid)
        .get();
      if (doc.exists()) {
        console.log('Already signed in anonymously:', currentUser.uid);
        return currentUser;
      }
    }
    // If not signed in or user_info does not exist, sign in anonymously
    const result = await auth().signInAnonymously();
    console.log('Signed in anonymously:', result.user.uid);
    return result.user;
  } catch (error) {
    console.error('Anonymous sign-in failed:', error);
    throw new Error('Could not sign in anonymously.');
  }
};

export const createUserInfo = async (
  currentLevel?: number,
  upiId?: string,
  mobileNo?: string,
) => {
  const uid = await getUniqueId();
  if (!uid) {
    console.log('UID is required.');
    return;
  }

  // Check if a user with this deviceUniqueId already exists
  const existingQuery = await firestore()
    .collection('user_info')
    .where('uid', '==', uid)
    .get();

  console.log('existingQuery', existingQuery.empty);

  if (!existingQuery.empty) {
    // Return the first existing user with this deviceId
    const existingUser = existingQuery.docs[0].data();
    console.log('User already exists for this device:', existingUser.uid);
    return existingUser;
  }

  try {
    await firestore()
      .collection('user_info')
      .doc(uid)
      .set({
        uid,
        current_level: 1,
        upi_id: upiId || '',
        mobile_no: mobileNo || '',
        created_at: firestore.FieldValue.serverTimestamp(),
      });
    await firestore().collection('earning_history').add({
      uid,
      question: 'New User Bonus',
      amount: 5, // Default amount, can be updated later
      timestamp: firestore.FieldValue.serverTimestamp(),
    });

    return {
      uid,
      current_level: currentLevel ?? 1,
      upi_id: upiId || '',
      mobile_no: mobileNo || '',
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Something went wrong while saving user data.');
  }
};

export const updateUserInfo = async (
  updates: Partial<{current_level: number; upi_id: string; mobile_no: string}>,
) => {
  const uid = await getUniqueId();
  if (!uid) throw new Error('UID is required');

  try {
    // Update user_info where deviceId matches deviceUniqueId
    const querySnapshot = await firestore()
      .collection('user_info')
      .where('uid', '==', uid)
      .get();

    if (querySnapshot.empty) {
      throw new Error('User not found for this device.');
    }

    // Update all matching docs (should be only one, but just in case)
    let updatedDocData = null;
    for (const docRef of querySnapshot.docs) {
      await docRef.ref.update({
        ...updates,
        last_updated: firestore.FieldValue.serverTimestamp(),
      });
      const updatedDoc = await docRef.ref.get();
      updatedDocData = updatedDoc.data();
    }

    return updatedDocData;
  } catch (error) {
    console.error('Failed to update user info:', error);
    throw new Error('Could not update user info.');
  }
};

export const getUserInfo = async () => {
  const uid = await getUniqueId();
  if (!uid) throw new Error('UID is required');

  try {
    // Fetch user_info by deviceId instead of uid
    const querySnapshot = await firestore()
      .collection('user_info')
      .where('uid', '==', uid)
      .get();

    if (querySnapshot.empty) {
      throw new Error('User not found');
    }

    // Return the first matching user_info document
    const doc = querySnapshot.docs[0];

    if (!doc.exists) {
      throw new Error('User not found');
    }

    return doc.data();
  } catch (error) {
    console.error('Failed to get user info:', error);
    throw new Error('Something went wrong while retrieving user info.');
  }
};

export const addPlayHistory = async ({
  solvedQuestion,
  answer,
  hint,
}: {
  solvedQuestion: string;
  answer: string;
  hint: string;
}) => {
  const uid = await getUniqueId();

  if (!uid || !solvedQuestion) {
    throw new Error('User ID and Question are required.');
  }

  try {
    await firestore().collection('play_history').add({
      uid: uid,
      solved_question: solvedQuestion,
      answer: answer,
      hint: hint,
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
  } catch (error) {
    console.error('Play history failed:', error);
    throw new Error('Failed to save play history.');
  }
};

export const getPlayHistory = async () => {
  const uid = await getUniqueId();

  if (!uid) throw new Error('UID is required');

  try {
    const snapshot = await firestore()
      .collection('play_history')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .get();

    if (snapshot.empty) {
      return []; // No plays yet
    }

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error('Error getting play history:', error);
    throw new Error('Failed to retrieve play history.');
  }
};

export const addEarningHistory = async ({question}: {question: string}) => {
  const uid = await getUniqueId();

  if (!uid || !question) {
    throw new Error('UID and question are required.');
  }

  // Optional: Prevent duplicate earnings for same question
  const exists = await firestore()
    .collection('earning_history')
    .where('uid', '==', uid)
    .where('question', '==', question)
    .get();

  if (!exists.empty) {
    throw new Error('Earnings for this question already recorded.');
  }

  try {
    await firestore()
      .collection('earning_history')
      .add({
        uid,
        question,
        amount: 0.25, // Default amount, can be updated later
        timestamp: firestore.FieldValue.serverTimestamp(),
      })
      .then(
        res => {
          return res;
        }, // Return the document ID
      );
  } catch (error) {
    console.error('Earning failed:', error);
    throw new Error('Failed to save earning history.');
  }
};

export const getEarningHistory = async () => {
  const uid = await getUniqueId();
  if (!uid) throw new Error('UID is required');

  try {
    const snapshot = await firestore()
      .collection('earning_history')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .get();

    if (snapshot.empty) {
      return []; // No earnings yet
    }

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error('Error getting earnings:', error);
    throw new Error('Failed to retrieve earning history.');
  }
};

export const addWithdrawal = async (amount: number, paymentId: string) => {
  const uid = await getUniqueId();
  if (!uid || !paymentId || typeof amount !== 'number') {
    throw new Error('Invalid input data.');
  }

  if (amount <= 0) {
    throw new Error('Withdrawal amount must be greater than zero.');
  }

  try {
    await firestore().collection('withdraw_history').add({
      uid,
      amount,
      payment_id: paymentId,
      status: 'pending',
      timestamp: firestore.FieldValue.serverTimestamp(),
    });
    return {
      success: true,
      message: 'Withdrawal request submitted successfully.',
    };
  } catch (error) {
    console.error('Withdrawal failed:', error);
    throw new Error('Failed to process withdrawal.');
  }
};

export const getWithdrawHistory = async () => {
  const uid = await getUniqueId();

  if (!uid) throw new Error('UID is required');

  try {
    const snapshot = await firestore()
      .collection('withdraw_history')
      .where('uid', '==', uid)
      .orderBy('timestamp', 'desc')
      .get();

    if (snapshot.empty) {
      return []; // No withdrawals yet
    }

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error('Error getting withdraw history:', error);
    throw new Error('Failed to retrieve withdrawal history.');
  }
};

export const getTotalEarnings = async () => {
  const uid = await getUniqueId();
  if (!uid) throw new Error('UID is required');

  try {
    const snapshot = await firestore()
      .collection('earning_history')
      .where('uid', '==', uid)
      .get();

    if (snapshot.empty) {
      return 0;
    }

    return snapshot.docs.reduce((sum, doc) => {
      const data = doc.data();
      return sum + (typeof data.amount === 'number' ? data.amount : 0);
    }, 0);
  } catch (error) {
    console.error('Error calculating total earnings:', error);
    throw new Error('Failed to calculate total earnings.');
  }
};

export const getAvailableAmount = async () => {
  const uid = await getUniqueId();
  if (!uid) throw new Error('UID is required');

  try {
    // Get total earnings
    const earningsSnapshot = await firestore()
      .collection('earning_history')
      .where('uid', '==', uid)
      .get();

    const totalEarnings = earningsSnapshot.docs.reduce((sum, doc) => {
      const data = doc.data();
      return sum + (typeof data.amount === 'number' ? data.amount : 0);
    }, 0);

    // Get total withdrawals
    const withdrawSnapshot = await firestore()
      .collection('withdraw_history')
      .where('uid', '==', uid)
      .get();

    const totalWithdrawn = withdrawSnapshot.docs.reduce((sum, doc) => {
      const data = doc.data();
      return sum + (typeof data.amount === 'number' ? data.amount : 0);
    }, 0);

    // Available amount = earnings - withdrawn
    return totalEarnings - totalWithdrawn;
  } catch (error) {
    console.error('Error calculating available amount:', error);
    throw new Error('Failed to calculate available amount.');
  }
};

const createRiddles = async () => {
  const user = await signInAnonymously();
  const uid = user.uid;

  if (!uid) {
    console.log('UID is required.');
    return;
  }

  // Check if a user with this deviceUniqueId already exists
  const existingQuery = await firestore().collection('riddles').get();

  if (!existingQuery.empty) {
    // Return the first existing user with this deviceId
    const existingUser = existingQuery.docs[0].data();
    console.log('User already exists for this device:', existingUser.uid);
    return existingUser;
  }

  try {
    riddles.map(async (riddle: any, index: number) => {
      await firestore()
        .collection('riddles')
        .add({
          id: index + 1,
          ...riddle,
          created_at: firestore.FieldValue.serverTimestamp(),
        });
      console.log('Riddle added', uid);
    });

    return {
      uid,
    };
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Something went wrong while saving user data.');
  }
};

export const getAllRiddles = async () => {
  try {
    const snapshot = await firestore()
      .collection('riddles')
      .orderBy('id', 'asc')
      .get();

    if (snapshot.empty) {
      return []; // No plays yet
    }

    return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
  } catch (error) {
    console.error('Error getting play history:', error);
    throw new Error('Failed to retrieve play history.');
  }
};

export const getRiddleById = async ({id}: {id: number}) => {
  try {
    const snapshot = await firestore()
      .collection('riddles')
      .where('id', '==', id)
      .get();

    if (snapshot.empty) {
      return []; // No plays yet
    }

    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error getting play history:', error);
    throw new Error('Failed to retrieve play history.');
  }
};
