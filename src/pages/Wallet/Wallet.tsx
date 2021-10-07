import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import CustomHeader from '../../components/atoms/CustomHeader/CustomHeader';
import PrimaryInput from '../../components/atoms/PrimaryInput/PrimaryInput';
import PrimaryButton from '../../components/atoms/PrimaryButton/PrimaryButton';
import GenericOptionCard from '../../components/atoms/GenericOptionCard/GenericOptionCard';
import RazorpayCheckout from 'react-native-razorpay';
import {createPaymentOrder, fetchWallet} from '../../services/Wallet.service';
import {useState, useEffect} from 'react';
import {COLORS} from '../../constants/theme';
export default function Wallet({navigation}: any) {
  const [text, setText] = useState<number>(0);
  const [money, setMoney] = useState<number>(0);
  useEffect(() => {
    //setMoney(500);
    fetchWallet()
      .then(walletMoney => {
        console.log('WALLET MONEY ', walletMoney);
        setMoney(walletMoney.data.money);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  async function _onPressButton(amount: number) {
    const BODY: any = await createPaymentOrder(amount);
    console.log('BODY ', BODY);
    var options = {
      description: 'Credits towards consultation',
      image: 'https://i.imgur.com/3g7nmJC.png',
      currency: 'INR',
      key: 'rzp_test_p2hBfFvnk8gquT',
      amount: amount * 100,
      name: 'BABA RAMDEV',
      order_id: BODY.data.id,
      prefill: {
        email: 'void@razorpay.com',
        contact: '9191919191',
        name: 'BABA RAMDEV',
      },
      theme: {color: COLORS.primary[400]},
    };
    RazorpayCheckout.open(options)
      .then((data: any) => {
        // handle success
        Alert.alert(`Success: ${data.razorpay_payment_id}`);
      })
      .catch((error: any) => {
        // handle failure
        Alert.alert(`Error: ${error.code} | ${error.description}`);
      });
  }
  return (
    <View style={styles.container}>
      {/* <CustomHeader heading="Add Money" /> */}
      <View style={styles.balanceWrapper}>
        <View style={styles.balanceInfo}>
          <Text style={styles.balanceInfoText}>Your Top Astro Balance</Text>
        </View>
        <View style={styles.balance}>
          <Text style={styles.balanceValue}>
            {'\u20B9'}
            {money}
          </Text>
        </View>
      </View>
      <View style={styles.inputWrapper}>
        <PrimaryInput
          handleText={text => setText(parseInt(text))}
          width="100%"
          customCls={styles.customInput}
          placeHoldText="Enter Amount in INR"
          rightElement={
            <View style={styles.proceedButtonWrapper}>
              <PrimaryButton
                text="Proceed"
                onPress={() => {
                  console.log('clicked');
                  _onPressButton(text);
                }}
              />
            </View>
          }
        />
      </View>

      <View style={styles.optionListWrapper}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          persistentScrollbar={false}>
          {[1, 2, 3, 4, 5].map(() => (
            <TouchableOpacity onPress={() => _onPressButton(500)}>
              <GenericOptionCard
                showIcon={false}
                customCls={styles.OptionCard}
                content="Pay ₹500, Get ₹ 100"
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primary[100],
    alignItems: 'center',
  },
  LeftWrapper: {
    flexDirection: 'row',
  },
  iconWrapper: {
    backgroundColor: 'rgba(255, 112, 7, 0.1)',
    borderRadius: 6,
    padding: 4,
    marginRight: 22,
  },
  contentWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    color: '#303030',
    fontSize: 16,
    fontWeight: '500',
  },
  balanceWrapper: {
    paddingTop: 10,
    paddingHorizontal: 20,
    flex: 0.05,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  balanceInfo: {},
  balanceInfoText: {
    color: '#000',
    fontWeight: 'bold',
  },
  balance: {},
  RightArrowWrapper: {},
  balanceValue: {
    color: '#000',
    fontWeight: 'bold',
  },
  inputWrapper: {
    width: '90%',
    position: 'relative',
    marginBottom: 20,
  },
  customInput: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  proceedButtonWrapper: {
    position: 'absolute',
    top: '50%',
    right: 6,
    transform: [{translateY: -20}],
  },
  optionListWrapper: {
    flex: 1,
    width: '90%',
  },
  OptionCard: {
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 15,
    borderWidth: 1.2,
    borderColor: '#E3E3E3',
    borderBottomColor: '#E3E3E3',
  },
});
