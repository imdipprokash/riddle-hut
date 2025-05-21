import React, {useState} from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import {hp, wp} from '../../helper/constant';

interface WithdrawModalProps {
  onClose: () => void;
  message: string;
}

const WithdrawModal: React.FC<WithdrawModalProps> = ({onClose, message}) => {
  let userInfo = false;
  const [amount, setAmount] = useState(0);
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {userInfo ? (
            <>
              <Text style={styles.title}>Congratulations!</Text>
              <Text style={[styles.title, {fontSize: hp(2.5)}]}> +₹0.25</Text>
              <Text style={styles.message}>{message}</Text>
              <TouchableOpacity onPress={onClose} style={styles.button}>
                <Text style={styles.buttonText}>Close</Text>
              </TouchableOpacity>
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
              <Text style={styles.title}>
                Withdraw to UPI : hlwimdipprokashsardarxxxxxx@upi
              </Text>

              <View style={{flexDirection: 'row', gap: wp(4)}}>
                <TouchableOpacity
                  onPress={onClose}
                  style={[styles.button, {backgroundColor: 'lightblue'}]}>
                  <Text style={[styles.buttonText, {color: 'black'}]}>
                    Close
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={onClose}
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
  TextInputStyle: {},
});

export default WithdrawModal;
