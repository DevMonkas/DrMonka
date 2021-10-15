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
import {COLORS, FONTS} from '../../constants/theme';
import TransactionHistory from './TransactionHistory';
import CustomAlert from '../../components/atoms/CustomAlert/CustomAlert';
export default function Wallet({navigation}: any) {
  const [text, setText] = useState<number>(0);
  const [money, setMoney] = useState<number>(0);
  const [modalVisibilty, setmodalVisibilty] = useState(false);
  const [alertObj, setalertObj] = useState({mode: '', message: ''});

  useEffect(() => {
    //setMoney(500);
    fetchWallet()
      .then(walletMoney => {
        console.log('WALLET MONEY ', walletMoney);
        setMoney(walletMoney.data.money);
      })
      .catch(err => {
        console.log('ERROR BLOCK');
        console.log(err);
      });
  }, []);
  async function _onPressButton(amount: number) {
    if (!amount || amount < 0) return;
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
        // Alert.alert(`Success: ${data.razorpay_payment_id}`);
        setMoney(money + amount);
        setmodalVisibilty(true);
        setalertObj({mode: 'success', message: 'Amount added successfully'});
      })
      .catch((error: any) => {
        // handle failure
        console.log('CATCH BLOCK');
        // Alert.alert(`Error: ${error.code} | ${error.description}`);
        setmodalVisibilty(true);
        setalertObj({mode: 'failed', message: 'Transaction Failed'});
      });
  }

  return (
    <View style={styles.container}>
      {/* <CustomHeader heading="Add Money" /> */}
      <CustomAlert
        displayMode={alertObj.mode}
        displayMsg={alertObj.message}
        visibility={modalVisibilty}
        dismissAlert={setmodalVisibilty}
      />
      <View style={styles.balanceWrapper}>
        <View style={styles.balanceInfo}>
          <Text style={[styles.balanceInfoText, FONTS.secondaryFam]}>
            Your QiviHealth Balance
          </Text>
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
                disable={text ? false : true}
                text="ADD MONEY"
                onPress={() => {
                  console.log('clicked');
                  _onPressButton(text);
                }}
              />
            </View>
          }
        />
      </View>
      <View style={{marginVertical: 10, width: '95%'}}>
        <Text style={{fontSize: 20, textAlign: 'left'}}>
          Transaction History
        </Text>
      </View>
      <TransactionHistory />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    paddingTop: 15,
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
    fontSize: 18,
  },
  balance: {
    position: 'relative',
    right: 10,
  },
  RightArrowWrapper: {},
  balanceValue: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputWrapper: {
    backgroundColor: 'white',
    alignContent: 'center',
    justifyContent: 'center',
    marginTop: 10,
    paddingTop: 20,
    width: '98%',
    position: 'relative',
    marginBottom: 10,
    borderRadius: 20,
  },
  customInput: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  proceedButtonWrapper: {
    position: 'absolute',
    top: '50%',
    right: 3,
    transform: [{translateY: -20}],
  },
  // optionListWrapper: {
  //   flex: 1,
  //   width: '90%',
  // },
  OptionCard: {
    marginBottom: 20,
    borderRadius: 10,
    paddingVertical: 15,
    borderWidth: 1.2,
    borderColor: '#E3E3E3',
    borderBottomColor: '#E3E3E3',
  },
});
