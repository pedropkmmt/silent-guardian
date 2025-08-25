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
  Modal,
  FlatList,
} from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { countries, Country, getCountryByCode } from '../../../lib/code';
import { useRouter } from 'expo-router';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Responsive dimensions
const isSmallScreen = screenWidth < 375;
const isTablet = screenWidth > 768;

const NumberEntry = () => {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<Country>(
    getCountryByCode('ZA') || countries[0] 
  );
  const [showCountryPicker, setShowCountryPicker] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRegisterMode, setIsRegisterMode] = useState(false); // track if in register mode

  // Navigate to OTP for both login and register
  const handleContinue = () => {
    console.log('Phone number:', selectedCountry.dialCode + phoneNumber.replace(/\s/g, ''));
    console.log('Remember me:', rememberMe);
    console.log('Register mode:', isRegisterMode);
    
    // Navigate to OTP 
    router.push('/(tabs)/login/otp');
  };

  // Toggle between login and register mode
  const handleRegister = () => {
    setIsRegisterMode(true);
    // Clear form when switching to register mode
    setPhoneNumber('');
    setRememberMe(false);
  };

  // Switch back to login mode
  const handleLogin = () => {
    setIsRegisterMode(false);
    // Clear form when switching to login mode
    setPhoneNumber('');
    setRememberMe(false);
  };

  const formatPhoneNumber = (text: string, dialCode: string) => {
    const cleaned = text.replace(/\D/g, '');
    
    if (dialCode === '+27') { 
      if (cleaned.length <= 2) {
        return cleaned;
      } else if (cleaned.length <= 6) {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
      } else {
        return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 6)} ${cleaned.slice(6, 10)}`;
      }
    } else if (dialCode === '+1') {
      if (cleaned.length <= 3) {
        return cleaned;
      } else if (cleaned.length <= 6) {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3)}`;
      } else {
        return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6, 10)}`;
      }
    } else if (dialCode === '+44') { 
      if (cleaned.length <= 4) {
        return cleaned;
      } else if (cleaned.length <= 7) {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4)}`;
      } else {
        return `${cleaned.slice(0, 4)} ${cleaned.slice(4, 7)} ${cleaned.slice(7, 11)}`;
      }
    } else {
      //  formatting for other countries
      if (cleaned.length <= 3) {
        return cleaned;
      } else if (cleaned.length <= 6) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
      } else if (cleaned.length <= 9) {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6)}`;
      } else {
        return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 9)} ${cleaned.slice(9, 12)}`;
      }
    }
  };

  const handlePhoneChange = (text: string) => {
    const formatted = formatPhoneNumber(text, selectedCountry.dialCode);
    setPhoneNumber(formatted);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setPhoneNumber(''); 
    setShowCountryPicker(false);
    setSearchQuery('');
  };

  const filteredCountries = searchQuery 
    ? countries.filter(country => 
        country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
        country.dialCode.includes(searchQuery)
      )
    : countries;

  const getPhoneNumberMinLength = (dialCode: string) => {
    if (dialCode === '+1') return 10; 
    if (dialCode === '+44') return 10; 
    if (dialCode === '+27') return 9;  
    if (dialCode === '+33') return 9;  
    if (dialCode === '+49') return 10; 
    return 8; 
  };

  const isPhoneValid = () => {
    const cleanedPhone = phoneNumber.replace(/\D/g, '');
    const minLength = getPhoneNumberMinLength(selectedCountry.dialCode);
    return cleanedPhone.length >= minLength;
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

  const CountryPickerModal = () => (
    <Modal
      visible={showCountryPicker}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.modalContainer}>
        <View style={styles.modalHeader}>
          <TouchableOpacity 
            onPress={() => setShowCountryPicker(false)}
            style={styles.modalCloseButton}
          >
            <Text style={styles.modalCloseText}>Cancel</Text>
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Select Country</Text>
          <View style={styles.modalPlaceholder} />
        </View>
        
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search countries..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#8E8E93"
          />
        </View>

        <FlatList
          data={filteredCountries}
          keyExtractor={(item) => item.code}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.countryItem}
              onPress={() => handleCountrySelect(item)}
            >
              <Text style={styles.countryFlag}>{item.flag}</Text>
              <View style={styles.countryInfo}>
                <Text style={styles.countryName}>{item.name}</Text>
                <Text style={styles.countryDialCode}>{item.dialCode}</Text>
              </View>
              {selectedCountry.code === item.code && (
                <Text style={styles.selectedIndicator}>✓</Text>
              )}
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Modal>
  );

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
              <Text style={styles.loginText}>
                {isRegisterMode ? 'Register' : 'Login'}
              </Text>
              <TouchableOpacity 
                style={styles.registerButton}
                activeOpacity={0.8}
                onPress={isRegisterMode ? handleLogin : handleRegister}
              >
                <Text style={styles.registerText}>
                  {isRegisterMode ? 'Login' : 'Register'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form Content */}
          <View style={styles.formContainer}>
            <Text style={styles.infoText}>
              You will get a code via SMS
            </Text>
            
            {/* Phone Input */}
            <View style={styles.phoneInputContainer}>
              <TouchableOpacity 
                style={styles.countryCodeContainer}
                onPress={() => setShowCountryPicker(true)}
                activeOpacity={0.8}
              >
                <View style={styles.flagContainer}>
                  <Text style={styles.flagText}>{selectedCountry.flag}</Text>
                </View>
                <Text style={styles.countryCode}>{selectedCountry.dialCode}</Text>
                <Text style={styles.dropdownArrow}>▼</Text>
              </TouchableOpacity>
              
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter phone number"
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                keyboardType="phone-pad"
                placeholderTextColor="#C7C7CC"
                maxLength={15} 
                autoFocus={false}
              />
            </View>

            {/* Remember Me Checkbox - only show in login mode */}
            {!isRegisterMode && (
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
            )}

            {/* Continue Button */}
            <TouchableOpacity 
              onPress={handleContinue}
              style={[
                styles.continueButton,
                isPhoneValid() && styles.continueButtonActive
              ]}
              disabled={!isPhoneValid()}
              activeOpacity={0.8}
            >
              <Text style={styles.continueButtonText}>→</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <CountryPickerModal />
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
      paddingVertical: 4,
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
      marginRight: 8,
    },
    dropdownArrow: {
      fontSize: 10,
      color: '#8E8E93',
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
    // Modal styles
    modalContainer: {
      flex: 1,
      backgroundColor: '#F8F9FA',
    },
    modalHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5EA',
      backgroundColor: 'white',
    },
    modalCloseButton: {
      padding: 5,
    },
    modalCloseText: {
      fontSize: 16,
      color: '#1DA1F2',
      fontWeight: '500',
    },
    modalTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: '#000',
    },
    modalPlaceholder: {
      width: 60,
    },
    searchContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#E5E5EA',
    },
    searchInput: {
      backgroundColor: '#F0F0F0',
      borderRadius: 10,
      paddingHorizontal: 15,
      paddingVertical: 12,
      fontSize: 16,
      color: '#000',
    },
    countryItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 15,
      backgroundColor: 'white',
      borderBottomWidth: 1,
      borderBottomColor: '#F0F0F0',
    },
    countryFlag: {
      fontSize: 24,
      marginRight: 15,
    },
    countryInfo: {
      flex: 1,
    },
    countryName: {
      fontSize: 16,
      fontWeight: '500',
      color: '#000',
      marginBottom: 2,
    },
    countryDialCode: {
      fontSize: 14,
      color: '#8E8E93',
    },
    selectedIndicator: {
      fontSize: 18,
      color: '#1DA1F2',
      fontWeight: 'bold',
    },
  });
};

export default NumberEntry;