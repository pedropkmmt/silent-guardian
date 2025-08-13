import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';

const  NumberEntry = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleContinue = () => {
    console.log('Phone number:', phoneNumber);
    console.log('Remember me:', rememberMe);
  };

  const CurvedBackground = () => (
    <Svg
      height="300"
      width="100%"
      style={StyleSheet.absoluteFillObject}
      viewBox="0 0 375 300"
    >
      <Path
        d="M0 0 L375 0 L375 200 Q187.5 280 0 200 Z"
        fill="#1DA1F2"
      />
    </Svg>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1DA1F2" />
      
      {/* Curved Blue Background */}
      <View style={styles.backgroundContainer}>
        <CurvedBackground />
      </View>

      {/* Header Content */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.loginText}>Login</Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerText}>Register</Text>
          </TouchableOpacity>
        </View>
        
        <Text style={styles.titleText}>Enter your</Text>
        <Text style={styles.titleText}>mobile phone</Text>
      </View>

      {/* Form Content */}
      <View style={styles.formContainer}>
        <Text style={styles.infoText}>You will get a code via sms.</Text>
        
        {/* Phone Input */}
        <View style={styles.phoneInputContainer}>
          <View style={styles.countryCodeContainer}>
            <View style={styles.flagContainer}>
              <Text style={styles.flagText}></Text>
            </View>
            <Text style={styles.countryCode}>00</Text>
          </View>
          
          <TextInput
            style={styles.phoneInput}
            placeholder="00 0000 0000"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            placeholderTextColor="#C7C7CC"
          />
        </View>

        {/* Remember Me Checkbox */}
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
            onPress={() => setRememberMe(!rememberMe)}
          >
            {rememberMe && <Text style={styles.checkmark}>✓</Text>}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>Remember me</Text>
        </View>

        {/* Continue Button */}
        <TouchableOpacity
          style={[
            styles.continueButton,
            phoneNumber.length > 0 && styles.continueButtonActive
          ]}
          onPress={handleContinue}
          disabled={phoneNumber.length === 0}
        >
          <Text style={styles.continueButtonText}>→</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 300,
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    zIndex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
  },
  loginText: {
    fontSize: 24,
    fontWeight: '600',
    color: 'white',
  },
  registerButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  registerText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '500',
  },
  titleText: {
    fontSize: 28,
    fontWeight: '300',
    color: 'white',
    lineHeight: 34,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  infoText: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 40,
    textAlign: 'center',
  },
  phoneInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
    paddingBottom: 12,
    marginBottom: 40,
  },
  countryCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  flagContainer: {
    marginRight: 8,
  },
  flagText: {
    fontSize: 20,
  },
  countryCode: {
    fontSize: 16,
    color: '#000',
    marginRight: 8,
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    paddingVertical: 0,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 60,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#E5E5EA',
    borderRadius: 3,
    marginRight: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#1DA1F2',
    borderColor: '#1DA1F2',
  },
  checkmark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#8E8E93',
  },
  continueButton: {
    position: 'absolute',
    bottom: 40,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E5E5EA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  continueButtonActive: {
    backgroundColor: '#1DA1F2',
  },
  continueButtonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: '300',
  },
});

export default NumberEntry;