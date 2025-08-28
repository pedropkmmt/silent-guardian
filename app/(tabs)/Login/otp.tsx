import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Path, Svg } from 'react-native-svg';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive dimensions
const isSmallScreen = screenWidth < 375;
const isTablet = screenWidth > 768;

const OTPEntry = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<(TextInput | null)[]>([]);

  // Check if this is register mode 
  const isRegisterMode = params?.mode === 'register';
  
  const phoneNumber = '+27 82 123 4567'; 

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(resendTimer - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const otpCode = otp.join('');
    console.log('OTP Code:', otpCode);
    console.log('Register mode:', isRegisterMode);
    
    // Navigate based on mode
    if (isRegisterMode) {
      // if in register mode, go to signup user 
      router.push('/(tabs)/SignUp/setpin');
    } else {
      router.push('/(tabs)/SignUp/signup_userprofile'); 
    }
  };

  const handleBack = () => {
    router.push('/(tabs)/Login/Login');
  };

  const handleResend = () => {
    if (canResend) {
      setResendTimer(30);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      console.log('Resending OTP...');
    }
  };

  const isOtpComplete = () => {
    return otp.every(digit => digit.length === 1);
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
              <Text style={styles.titleText}>Enter verification code</Text>
            </View>
          </View>

          {/* Header Content */}
          <View style={styles.header}>
            <View style={styles.headerTop}>
              <TouchableOpacity 
                onPress={handleBack}
                style={styles.backButton}
                activeOpacity={0.8}
              >
                <Text style={styles.backText}>← Back</Text>
              </TouchableOpacity>
              <Text style={styles.verifyText}>Verify</Text>
              <View style={styles.headerPlaceholder} />
            </View>
          </View>

          {/* Form Content */}
          <View style={styles.formContainer}>
            <Text style={styles.infoText}>
              We've sent a 6-digit code to{'\n'}
              <Text style={styles.phoneNumberText}>{phoneNumber}</Text>
            </Text>
            
            {/* Show different subtitle based on mode */}
            {isRegisterMode && (
              <Text style={styles.registerModeText}>
                Verify your number to complete registration
              </Text>
            )}
            
            {/* OTP Input */}
            <View style={styles.otpContainer}>
              {otp.map((digit, index) => (
                <TextInput
                  key={index}
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  style={[
                    styles.otpInput,
                    digit ? styles.otpInputFilled : null
                  ]}
                  value={digit}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={({ nativeEvent }) => handleKeyPress(nativeEvent.key, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  textAlign="center"
                  selectTextOnFocus
                />
              ))}
            </View>

            {/* Resend Code */}
            <View style={styles.resendContainer}>
              <Text style={styles.resendText}>Didn't receive the code?</Text>
              <TouchableOpacity
                onPress={handleResend}
                disabled={!canResend}
                activeOpacity={0.8}
              >
                <Text style={[
                  styles.resendButton,
                  canResend ? styles.resendButtonActive : styles.resendButtonDisabled
                ]}>
                  {canResend ? 'Resend code' : `Resend in ${resendTimer}s`}
                </Text>
              </TouchableOpacity>
            </View>

            {/* Verify Button */}
            <TouchableOpacity
              style={[
                styles.verifyButton,
                isOtpComplete() && styles.verifyButtonActive
              ]}
              onPress={handleVerify}
              disabled={!isOtpComplete()}
              activeOpacity={0.8}
            >
              <Text style={styles.verifyButtonText}>→</Text>
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
    backButton: {
      padding: 5,
    },
    backText: {
      fontSize: isTablet ? 16 : 14,
      color: 'white',
      fontWeight: '500',
    },
    verifyText: {
      fontSize: isTablet ? 28 : isSmallScreen ? 22 : 24,
      fontWeight: '600',
      color: 'white',
    },
    headerPlaceholder: {
      width: 60, 
    },
    titleContainer: {
      marginBottom: 20,
    },
    titleText: {
      fontSize: isTablet ? 36 : isSmallScreen ? 24 : 28,
      fontWeight: '600',
      color: 'white',
      lineHeight: isTablet ? 44 : isSmallScreen ? 30 : 34,
      marginLeft: isTablet ? 48 : isSmallScreen ? 24 : 24,
      marginTop: isSmallScreen ? 100 : 120,
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
      marginBottom: isSmallScreen ? 20 : 30,
      textAlign: 'center',
      fontWeight: '400',
      lineHeight: 22,
    },
    phoneNumberText: {
      color: '#333',
      fontWeight: '600',
    },
    registerModeText: {
      fontSize: isTablet ? 14 : 12,
      color: '#1DA1F2',
      marginBottom: isSmallScreen ? 30 : 40,
      textAlign: 'center',
      fontWeight: '500',
    },
    otpContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: isSmallScreen ? 40 : 50,
      paddingHorizontal: isTablet ? 40 : 20,
    },
    otpInput: {
      width: isTablet ? 56 : isSmallScreen ? 44 : 48,
      height: isTablet ? 56 : isSmallScreen ? 44 : 48,
      borderWidth: 2,
      borderColor: '#E5E5EA',
      borderRadius: 8,
      fontSize: isTablet ? 24 : 20,
      fontWeight: '600',
      color: '#000',
      backgroundColor: 'white',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
    },
    otpInputFilled: {
      borderColor: '#1DA1F2',
      backgroundColor: '#F0F8FF',
    },
    resendContainer: {
      alignItems: 'center',
      marginBottom: isSmallScreen ? 40 : 60,
    },
    resendText: {
      fontSize: isTablet ? 16 : 14,
      color: '#8E8E93',
      marginBottom: 8,
      fontWeight: '400',
    },
    resendButton: {
      fontSize: isTablet ? 16 : 14,
      fontWeight: '600',
      paddingVertical: 8,
      paddingHorizontal: 12,
    },
    resendButtonActive: {
      color: '#1DA1F2',
    },
    resendButtonDisabled: {
      color: '#C7C7CC',
    },
    verifyButton: {
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
    verifyButtonActive: {
      backgroundColor: '#1DA1F2',
    },
    verifyButtonText: {
      fontSize: isTablet ? 28 : 24,
      color: 'white',
      fontWeight: '300',
    },
  });
};

export default OTPEntry;