import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive dimensions
const isSmallScreen = screenWidth < 375;
const isTablet = screenWidth > 768;

const NumberEntry = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleContinue = () => {
    console.log('Phone number:', phoneNumber);
    console.log('Remember me:', rememberMe);
  };

  const formatPhoneNumber = (text: string) => {

    const cleaned = text.replace(/\D/g, '');
    
    if (cleaned.length <= 2) {
      return cleaned;
    } else if (cleaned.length <= 6) {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    } else {
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6, 10)}`;
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text);
    setPhoneNumber(formatted);
  };

  const CurvedBackground = () => {
    const curveHeight = isTablet ? 350 : isSmallScreen ? 280 : 320;
    
    return (
      <Svg
        height={curveHeight}
        width="100%"
        style={StyleSheet.absoluteFillObject}
        viewBox={`0 0 ${screenWidth} ${curveHeight}`}
      >
        <Path
          d={`M0 0 L${screenWidth} 0 L${screenWidth} ${curveHeight * 0.7} Q${screenWidth / 2} ${curveHeight * 0.95} 0 ${curveHeight * 0.7} Z`}
          fill="#1DA1F2"
        />
      </Svg>
    );
  };

  const styles = createStyles();

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1DA1F2" />
      
      <KeyboardAvoidingView 
        style={styles.keyboardAvoid}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          bounces={false}
        >
          {/* Curved Blue Background */}
          <View style={styles.backgroundContainer}>
            <CurvedBackground />
              <View style={styles.titleContainer}>
              <Text style={styles.titleText}>Enter your mobile phone</Text>
            </View>
          </View>

          {/* Header Content */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <Text style={styles.loginText}>Login</Text>
              <TouchableOpacity 
                style={styles.registerButton}
                activeOpacity={0.8}
              >
                <Text style={styles.registerText}>Register</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Content */}
          <View style={styles.formContainer}>
            <Text style={styles.infoText}>You will get a code via SMS</Text>
            
            {/* Phone Input */}
            <View style={styles.phoneInputContainer}>
              <View style={styles.countryCodeContainer}>
                <View style={styles.flagContainer}>
                  <Text style={styles.flagText}>sa</Text>
                </View>
                <Text style={styles.countryCode}>+27</Text>
              </View>
              
              <TextInput
                style={styles.phoneInput}
                placeholder="XX XXXX XXXX"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                placeholderTextColor="#C7C7CC"
                maxLength={12} 
                autoFocus={false}
              />
            </View>

            {/* Remember Me Checkbox */}
            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={[styles.checkbox, rememberMe && styles.checkboxChecked]}
                onPress={() => setRememberMe(!rememberMe)}
                activeOpacity={0.8}
              >
                {rememberMe && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
                <Text style={styles.checkboxLabel}>Remember me</Text>
              </TouchableOpacity>
            </View>

            {/* Continue Button */}
            <TouchableOpacity
              style={[
                styles.continueButton,
                phoneNumber.replace(/\s/g, '').length >= 10 && styles.continueButtonActive
              ]}
              onPress={handleContinue}
              disabled={phoneNumber.replace(/\s/g, '').length < 10}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>→</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const createStyles = () => {
  const headerHeight = isTablet ? 380 : isSmallScreen ? 300 : 340;
  
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    keyboardAvoid: {
      flex: 1,
    },
    scrollContainer: {
      flexGrow: 1,
      minHeight: screenHeight,
    },
    backgroundContainer: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: headerHeight,
    },
    header: {
      paddingHorizontal: isTablet ? 48 : 24,
      paddingTop: Platform.OS === 'ios' ? 20 : 40,
      paddingBottom: isSmallScreen ? 30 : 40,
      zIndex: 1,
      height: headerHeight,
      justifyContent: 'space-between',
    },
    headerTop: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    loginText: {
      fontSize: isTablet ? 28 : isSmallScreen ? 22 : 24,
      fontWeight: '600',
      color: 'white',
    },
    registerButton: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      paddingHorizontal: isTablet ? 24 : 16,
      paddingVertical: isTablet ? 12 : 8,
      borderRadius: 25,
      borderWidth: 1,
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    registerText: {
      color: 'white',
      fontSize: isTablet ? 16 : 14,
      fontWeight: '500',
    },
    titleContainer: {
      marginBottom: 20,
    },
    titleText: {
      fontSize: isTablet ? 36 : isSmallScreen ? 24 : 28,
      fontWeight: '600',
      color: 'white',
      lineHeight: isTablet ? 44 : isSmallScreen ? 300: 34,
      marginLeft: isTablet ? 20 : isSmallScreen ? 30: 34
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: isTablet ? 48 : 24,
      paddingTop: isSmallScreen ? 20 : 30,
      paddingBottom: 40,
    },
    infoText: {
      fontSize: isTablet ? 16 : 14,
      color: '#8E8E93',
      marginBottom: isSmallScreen ? 30 : 40,
      textAlign: 'center',
      fontWeight: '400',
    },
    phoneInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 2,
      borderBottomColor: '#E5E5EA',
      paddingBottom: 12,
      marginBottom: isSmallScreen ? 30 : 40,
      backgroundColor: 'white',
      borderRadius: 8,
      paddingHorizontal: 16,
      paddingTop: 16,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    countryCodeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 16,
      paddingRight: 16,
      borderRightWidth: 1,
      borderRightColor: '#E5E5EA',
    },
    flagContainer: {
      marginRight: 8,
    },
    flagText: {
      fontSize: isTablet ? 24 : 20,
    },
    countryCode: {
      fontSize: isTablet ? 18 : 16,
      color: '#000',
      fontWeight: '500',
    },
    phoneInput: {
      flex: 1,
      fontSize: isTablet ? 18 : 16,
      color: '#000',
      paddingVertical: 0,
      fontWeight: '400',
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: isSmallScreen ? 40 : 60,
    },
    checkbox: {
      width: isTablet ? 24 : 20,
      height: isTablet ? 24 : 20,
      borderWidth: 2,
      borderColor: '#E5E5EA',
      borderRadius: 4,
      marginRight: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
    checkboxChecked: {
      backgroundColor: '#1DA1F2',
      borderColor: '#1DA1F2',
    },
    checkmark: {
      color: 'white',
      fontSize: isTablet ? 14 : 12,
      fontWeight: 'bold',
    },
    checkboxLabel: {
      fontSize: isTablet ? 18 : 16,
      color: '#333',
      fontWeight: '400',
    },
    continueButton: {
      position: 'absolute',
      bottom: 40,
      right: isTablet ? 48 : 24,
      width: isTablet ? 64 : 56,
      height: isTablet ? 64 : 56,
      borderRadius: isTablet ? 32 : 28,
      backgroundColor: '#E5E5EA',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 4,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
    },
    continueButtonActive: {
      backgroundColor: '#1DA1F2',
    },
    continueButtonText: {
      fontSize: isTablet ? 28 : 24,
      color: 'white',
      fontWeight: '300',
    },
  });
};

export default NumberEntry;