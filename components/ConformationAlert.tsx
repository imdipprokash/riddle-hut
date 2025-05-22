import {Modal, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {hp, wp} from '../helper/constant';

type Props = {
  yesHandler: () => void;
  noHandler: () => void;
};

const ConformationAlert = ({yesHandler, noHandler}: Props) => {
  return (
    <Modal transparent={true} animationType="fade" visible={true}>
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Are you sure ?</Text>
          <Text style={styles.message}>
            All levels will be reset if you click 'Yes'. Do you want to proceed?
          </Text>
          <View
            style={{flex: 1, flexDirection: 'row', gap: 20, marginTop: hp(2)}}>
            <TouchableOpacity onPress={() => noHandler()} style={styles.button}>
              <Text style={styles.buttonText}>No</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => yesHandler()}
              style={[styles.button, {backgroundColor: 'red'}]}>
              <Text style={styles.buttonText}>Yes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConformationAlert;

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
    height: hp(24),

    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    gap: hp(1),
  },
  title: {
    fontSize: hp(3),
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
  message: {
    fontSize: hp(2),
    color: '#555',
    textAlign: 'center',
    fontFamily: 'KanchenjungaRegular',
  },
  button: {
    backgroundColor: '#007BFF',
    borderRadius: 5,
    width: wp(20),
    height: hp(4.6),
    textAlign: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'KanchenjungaBold',
    textAlign: 'center',
  },
});
