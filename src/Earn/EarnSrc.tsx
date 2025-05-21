import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {use, useEffect} from 'react';
import {hp, wp} from '../../helper/constant';
import {useState} from 'react';
import EarningHistory from './EarningHistory';
import WithdrawHistory from './WithdrawHistory';
import {showModal} from '../../components/RootModal';
import WithdrawModal from './WithdrawModal';
import ToastMsg from '../../components/ToastMsg';
import {getAvailableAmount, getTotalEarnings} from '../../helper/Firebase';

type Props = {};

const EarnSrc = (props: Props) => {
  const tabs = ['Earning History', 'Withdraw History'];
  const [availableAmount, setAvailableAmount] = useState<any>(null);
  const [totalEarning, setTotalEarning] = useState<any>(null);
  const [reload, setReload] = useState(0);

  useEffect(() => {
    getAvailableAmount().then((res: any) => {
      setAvailableAmount(res);
    });
  }, [reload]);

  useEffect(() => {
    getTotalEarnings().then((res: any) => {
      console.log('Total Earnings', res);
      setTotalEarning(res);
    });
  }, []);

  const [activeTab, setActiveTab] = useState(0);
  const handleWithdraw = () => {
    if (availableAmount < 10) {
      showModal((onClose: any) => (
        <ToastMsg
          message="You have not enough balance to withdraw minimum ₹10 required"
          type="error"
          onClose={() => {
            onClose();
          }}
        />
      ));
    } else {
      showModal((onClose: any) => (
        <WithdrawModal
          maxAmount={availableAmount}
          message=""
          onClose={() => {
            onClose();
            setReload(reload + 1);
            showModal((onClose: any) => (
              <ToastMsg
                message={`Your request for withdrawal of ₹${availableAmount} has been successfully submitted`}
                type="success"
                onClose={() => {
                  onClose();
                }}
              />
            ));
          }}
        />
      ));
    }
  };
  return (
    <View style={{marginVertical: hp(2)}}>
      {/* show earnings */}
      <View style={styles.earningContainer}>
        <View style={{flexDirection: 'row', gap: wp(2)}}>
          <Text style={styles.normalTextStyle}>Total Earnings</Text>
          <Text style={styles.title}>₹{totalEarning}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: wp(2),
            alignSelf: 'center',
            marginTop: -hp(0.5),
          }}>
          <Text style={[styles.normalTextStyle, {fontSize: hp(2.5)}]}>
            Available Amount
          </Text>
          <Text style={[styles.title, {fontSize: hp(2.5)}]}>
            ₹{availableAmount}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.btnStyle, {backgroundColor: '#0284c7'}]}
          onPress={handleWithdraw}>
          <Text style={[styles.title, {color: 'white', fontSize: hp(1.8)}]}>
            Withdraw
          </Text>
        </TouchableOpacity>
      </View>

      {/* tabs */}

      <>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: hp(2),
            backgroundColor: 'lightblue',
            marginTop: hp(2),
            borderRadius: hp(1),
            width: wp(84),
            alignSelf: 'center',
          }}>
          {tabs.map((tab, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.tabStyle,
                {
                  // width: wp(45),
                  backgroundColor:
                    activeTab === index ? '#0284c7' : 'transparent',
                  borderRadius: hp(1),
                  flex: 1,
                },
              ]}
              onPress={() => setActiveTab(index)}>
              <Text
                style={[
                  styles.title,
                  {
                    fontSize: hp(1.8),
                    color: activeTab === index ? 'white' : '#666',
                  },
                ]}>
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 0 ? <EarningHistory /> : <WithdrawHistory />}
      </>
    </View>
  );
};

export default EarnSrc;

const styles = StyleSheet.create({
  title: {
    fontSize: hp(3),
    textAlign: 'center',
    fontFamily: 'KanchenjungaBold',
  },
  normalTextStyle: {
    fontSize: hp(3),
    fontFamily: 'IBMPlexSans',
    textAlign: 'center',
  },
  earningContainer: {
    alignSelf: 'center',
    backgroundColor: 'lightblue',
    paddingHorizontal: wp(6),
    paddingVertical: hp(1.2),
    borderRadius: hp(1),
    gap: 4,
  },
  btnStyle: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp(1),
    borderRadius: hp(1),
  },
  tabStyle: {
    padding: wp(3),
  },
});
