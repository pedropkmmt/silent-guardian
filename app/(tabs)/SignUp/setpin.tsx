import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useRouter } from 'expo-router';

const router = useRouter();
const handlNavigate = () => {
   
    router.push('/(tabs)/ChatList');
  };
const handleBack = () => {
   
    router.push('/(tabs)/SignUp/signup_userprofile');
  };

const PINSecurityPage = () => {
  const [pin, setPin] = useState('');
  const maxPinLength = 4;

  const handlePinPress = (digit:any) => {
    if (pin.length < maxPinLength) {
      setPin(pin + digit);
    }
  };

  const handleBackspace = () => {
    setPin(pin.slice(0, -1));
  };

  const renderPinDots = () => {
    const dots = [];
    for (let i = 0; i < maxPinLength; i++) {
      dots.push(
        <View
          key={i}
          style={[
            styles.pinDot,
            i < pin.length ? styles.pinDotFilled : styles.pinDotEmpty
          ]}
        />
      );
    }
    return dots;
  };

  const renderNumberPad = () => {
    const numbers = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      ['', 0, '⌫']
    ];

    return numbers.map((row, rowIndex) => (
      <View key={rowIndex} style={styles.numberRow}>
        {row.map((number, colIndex) => (
          <TouchableOpacity
            key={colIndex}
            style={[
              styles.numberButton,
              number === '' && styles.emptyButton
            ]}
            onPress={() => {
              if (number === '⌫') {
                handleBackspace();
              } else if (number !== '') {
                handlePinPress(number.toString());
              }
            }}
            disabled={number === ''}
          >
            <Text style={styles.numberText}>
              {number}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backArrow}>←</Text>
        </TouchableOpacity>
      </View>

      {/* Title and Subtitle */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>PIN Security</Text>
        <Text style={styles.subtitle}>Protect your account with a secure PIN</Text>
      </View>

      {/* PIN Dots */}
      <View style={styles.pinContainer}>
        <View style={styles.pinDotsContainer}>
          {renderPinDots()}
        </View>
      </View>

      {/* Number Pad */}
      <View style={styles.numberPad}>
        {renderNumberPad()}
      </View>

      {/* Bottom Buttons */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity style={styles.skipButton} onPress={handlNavigate}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        
        <TouchableOpacity onPress={handlNavigate}
          style={[
            styles.continueButton,
            pin.length === maxPinLength ? styles.continueButtonActive : styles.continueButtonInactive
          ]} 
          disabled={pin.length !== maxPinLength}
        >
          <Text style={[
            styles.continueText,
            pin.length === maxPinLength ? styles.continueTextActive : styles.continueTextInactive
          ]}>
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backArrow: {
    fontSize: 24,
    color: '#333',
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 22,
  },
  pinContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  pinDotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pinDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginHorizontal: 12,
  },
  pinDotEmpty: {
    backgroundColor: '#ddd',
  },
  pinDotFilled: {
    backgroundColor: '#333',
  },
  numberPad: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  numberRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  numberButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyButton: {
    backgroundColor: 'transparent',
  },
  numberText: {
    fontSize: 24,
    color: '#333',
    fontWeight: '400',
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 40,
    paddingTop: 20,
  },
  skipButton: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  skipText: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  continueButton: {
    paddingHorizontal: 32,
    paddingVertical: 15,
    borderRadius: 25,
    minWidth: 120,
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#007AFF',
  },
  continueButtonInactive: {
    backgroundColor: '#E5E5E5',
  },
  continueText: {
    fontSize: 16,
    fontWeight: '600',
  },
  continueTextActive: {
    color: '#fff',
  },
  continueTextInactive: {
    color: '#999',
  },
});

export default PINSecurityPage;