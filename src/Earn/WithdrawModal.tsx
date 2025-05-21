import React, {useEffect, useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import {hp, wp} from '../../helper/constant';
import {
  addWithdrawal,
  getUserInfo,
  updateUserInfo,
} from '../../helper/Firebase';
import {showModal} from '../../components/RootModal';
import ToastMsg from '../../components/ToastMsg';

interface WithdrawModalProps {
  onClose: () => void;
  message: string;
  maxAmount: number;
}
export interface UserInfoProps {
  upi_id: string;
  deviceId: string;
  created_at: CreatedAt;
  mobile_no: string;
  current_level: number;
  uid: string;
}
interface CreatedAt {
  seconds: number;
  nanoseconds: number;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({
  onClose,
  message,
  maxAmount,
}) => {
  const [userInfo, setUserInfo] = useState<UserInfoProps>({} as UserInfoProps);
  const [amount, setAmount] = useState(maxAmount || 0);
  const [upiId, setUpiId] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  useEffect(() => {
    getUserInfo().then((res: any) => {
      setUpiId(res?.upi_id);
      setUserInfo(res);
    });
  }, [userInfo?.upi_id]);

  const updateUser = () => {
    if (userInfo?.upi_id === '') {
      updateUserInfo({upi_id: upiId, mobile_no: mobileNo}).then((res: any) => {
        setUserInfo(res);
      });
    }
  };
  const withdraw = () => {
    addWithdrawal(amount, userInfo?.upi_id).then((res: any) => {
      onClose();
      if (res?.success) {
        showModal((onClose: any) => (
          <ToastMsg
            message={`${res?.message} ₹${amount}`}
            type="success"
            onClose={() => {
              onClose();
            }}
          />
        ));
      }
    });
  };
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {userInfo?.upi_id === '' ? (
            <>
              <Text style={[styles.title, {fontSize: hp(2.5)}]}>
                Enter UPI ID
              </Text>
              <TextInput
                style={styles.TextInputStyle}
                placeholder="Enter upi id"
                onChangeText={setUpiId}
              />
              <Text style={[styles.title, {fontSize: hp(2.5)}]}>
                Enter Mobile No.
              </Text>
              <TextInput
                style={styles.TextInputStyle}
                placeholder="Enter mobile no."
                onChangeText={setMobileNo}
              />
              <View style={{flexDirection: 'row', gap: wp(4)}}>
                <TouchableOpacity
                  onPress={onClose}
                  style={[styles.button, {backgroundColor: 'lightblue'}]}>
                  <Text style={[styles.buttonText, {color: 'black'}]}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={updateUser}
                  style={[styles.button, {backgroundColor: 'darkgreen'}]}>
                  <Text style={styles.buttonText}>Update</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={[styles.title, {fontSize: hp(2.5)}]}>
                Withdraw amount
              </Text>
              <TextInput
                inputMode="numeric"
                placeholder={'10'}
                editable={false}
                style={[
                  styles.title,
                  {
                    backgroundColor: 'white',
                    width: wp(40),
                    borderRadius: hp(1),
                    borderWidth: 1,
                  },
                ]}
                value={amount.toString()}
                onChangeText={text => {
                  if (isNaN(Number(text))) {
                    return;
                  } else {
                    setAmount(Number(text));
                  }
                }}></TextInput>
              <Text style={styles.title}>UPI : {userInfo?.upi_id}</Text>

              <View style={{flexDirection: 'row', gap: wp(4)}}>
                <TouchableOpacity
                  onPress={onClose}
                  style={[styles.button, {backgroundColor: 'lightblue'}]}>
                  <Text style={[styles.buttonText, {color: 'black'}]}>
                    Close
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={withdraw}
                  style={[styles.button, {backgroundColor: 'darkgreen'}]}>
                  <Text style={styles.buttonText}>Withdraw</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: wp(80),
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: hp(0.4),
  },
  title: {
    fontSize: hp(2),
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
  message: {
    fontSize: hp(1.7),
    color: '#666',
    textAlign: 'center',
    fontFamily: 'KanchenjungaRegular',
  },
  button: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: hp(1),
    width: wp(30),
  },
  buttonText: {
    color: 'white',
    fontSize: hp(1.8),
    fontFamily: 'KanchenjungaRegular',
    textAlign: 'center',
  },
  TextInputStyle: {
    fontFamily: 'KanchenjungaRegular',
    fontSize: hp(1.8),
    borderWidth: 1,
    width: wp(60),
    borderRadius: hp(1),
  },
});

export default WithdrawModal;
