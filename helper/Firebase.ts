import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {getUniqueId} from 'react-native-device-info';

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
  const user = await signInAnonymously();

  const uid = user.uid;

  const deviceUniqueId = await getUniqueId();

  if (!uid) {
    console.log('UID, UPI ID, and Mobile Number are required.');
  }

  // Validate mobile number format
  // if (!mobileNo || !/^\d{10}$/.test(mobileNo)) {
  //   console.log('Invalid mobile number format.');
  // }

  // Check if user already exists
  const existingDoc = await firestore().collection('user_info').doc(uid).get();
  if (existingDoc.exists()) {
    console.log('User already exists.');
  }
  try {
    await firestore()
      .collection('user_info')
      .doc(uid)
      .set({
        uid,
        current_level: currentLevel ?? 1,
        upi_id: upiId || '',
        mobile_no: mobileNo || '',
        deviceId: deviceUniqueId || '',
        created_at: firestore.FieldValue.serverTimestamp(),
      });
    console.log('User created successfully:', uid);
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Something went wrong while saving user data.');
  }
};

export const updateUserInfo = async (
  updates: Partial<{current_level: number; upi_id: string; mobile_no: string}>,
) => {
  const user = await signInAnonymously();
  const uid = user.uid;
  if (!uid) throw new Error('UID is required');

  try {
    await firestore()
      .collection('user_info')
      .doc(uid)
      .update({
        ...updates,
        last_updated: firestore.FieldValue.serverTimestamp(),
      });
    const doc = await firestore().collection('user_info').doc(uid).get();

    if (!doc.exists) {
      throw new Error('User not found');
    }

    return doc.data();
  } catch (error) {
    console.error('Failed to update user info:', error);
    throw new Error('Could not update user info.');
  }
};

export const getUserInfo = async () => {
  const user = await signInAnonymously();
  const uid = user.uid;
  if (!uid) throw new Error('UID is required');

  try {
    const doc = await firestore().collection('user_info').doc(uid).get();

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
  const user = await signInAnonymously();
  const uid = user.uid;

  if (!uid || !solvedQuestion) {
    throw new Error('User ID and Question are required.');
  }

  try {
    await firestore().collection('play_history').add({
      uid,
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

const updatePlayHistory = async (
  docId: string,
  updates: Partial<{solved_question: string}>,
) => {
  if (!docId) throw new Error('Document ID is required');

  try {
    await firestore()
      .collection('play_history')
      .doc(docId)
      .update({
        ...updates,
        last_updated: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error('Failed to update play history:', error);
    throw new Error('Could not update play history.');
  }
};

const getPlayHistory = async (uid: string) => {
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
  const user = await signInAnonymously();
  const uid = user.uid;

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

const updateEarningHistory = async (
  docId: string,
  updates: Partial<{question: string}>,
) => {
  if (!docId) throw new Error('Document ID is required');

  try {
    await firestore()
      .collection('earning_history')
      .doc(docId)
      .update({
        ...updates,
        last_updated: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error('Failed to update earning history:', error);
    throw new Error('Could not update earning history.');
  }
};

export const getEarningHistory = async () => {
  const user = await signInAnonymously();
  const uid = user.uid;
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
  const user = await signInAnonymously();
  const uid = user.uid;
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

const updateWithdrawHistory = async (
  docId: string,
  updates: Partial<{amount: number; payment_id: string}>,
) => {
  if (!docId) throw new Error('Document ID is required');

  if (updates.amount !== undefined && updates.amount <= 0) {
    throw new Error('Withdrawal amount must be greater than zero.');
  }

  try {
    await firestore()
      .collection('withdraw_history')
      .doc(docId)
      .update({
        ...updates,
        last_updated: firestore.FieldValue.serverTimestamp(),
      });
  } catch (error) {
    console.error('Failed to update withdraw history:', error);
    throw new Error('Could not update withdraw history.');
  }
};

export const getWithdrawHistory = async () => {
  const user = await signInAnonymously();
  const uid = user.uid;

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

const getTotalAmountWithdrawalAmount = async () => {
  const user = await signInAnonymously();
  const uid = user.uid;

  if (!uid) throw new Error('UID is required');

  try {
    const [userInfo, playHistory, earningHistory, withdrawHistory] =
      await Promise.all([
        getUserInfo(),
        getPlayHistory(uid),
        getEarningHistory(),
        getWithdrawHistory(),
      ]);

    return {
      userInfo,
      playHistory,
      earningHistory,
      withdrawHistory,
    };
  } catch (error) {
    console.error('Failed to get full user data:', error);
    throw new Error('Unable to fetch all user-related data.');
  }
};

const getFullUserData = async (uid: string) => {
  if (!uid) throw new Error('UID is required');

  try {
    const [userInfo, playHistory, earningHistory, withdrawHistory] =
      await Promise.all([
        getUserInfo(),
        getPlayHistory(uid),
        getEarningHistory(),
        getWithdrawHistory(),
      ]);

    return {
      userInfo,
      playHistory,
      earningHistory,
      withdrawHistory,
    };
  } catch (error) {
    console.error('Failed to get full user data:', error);
    throw new Error('Unable to fetch all user-related data.');
  }
};

// await updateUserInfo("uid123", { upi_id: "newupi@bank", current_level: 3 });

// await updatePlayHistory("docId123", { solved_question: "Q2" });

// await updateEarningHistory("docId456", { question: "Q3" });

// await updateWithdrawHistory("docId789", { amount: 100 });

export const getTotalEarnings = async () => {
  const user = await signInAnonymously();
  const uid = user.uid;
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
  const user = await signInAnonymously();
  const uid = user.uid;
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
