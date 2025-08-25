import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  Alert,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';



const router = useRouter();
const handleNext = () => {
   
    router.push('/(tabs)/SignUp/setpin');
  };
  const handleBack = () => {
   
    router.push('/(tabs)/login/Login');
  };
const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const renderAvatar = () => {
    if (profileImage) {
      return (
        <Image
          source={{ uri: profileImage }}
          style={styles.avatarImage}
          resizeMode="cover"
        />
      );
    }
    
    return <Icon name="person" size={60} color="#B8E6FF" />;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#1DA1F2" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <Icon name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          
          <Text style={styles.headerTitle}>Register</Text>
          
          <View style={styles.placeholder} />
        </View>
        
        {/* Profile Avatar Section */}
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            {renderAvatar()}
          </View>
          <TouchableOpacity 
            style={styles.editButton}
            activeOpacity={0.7}
          >
            <Icon name="edit" size={16} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Form Content */}
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Icon name="person" size={20} color="#999" style={styles.inputIcon} />
          <TextInput
            style={styles.textInput}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
            placeholderTextColor="#999"
          />
        </View>
        
        <View style={styles.underline} />
        
        <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
          <View style={styles.nextButtonBackground}>
            <Icon name="arrow-forward" size={24} color="white" />
          </View>
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
  header: {
    height: 280,
    backgroundColor: '#1EA7E8',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
  },
  placeholder: {
    width: 34, 
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255, 255, 255, 0.5)',
    overflow: 'hidden',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 60,
  },
  editButton: {
    position: 'absolute',
    bottom: 5,
    right: '35%',
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1EA7E8',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 60,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  inputIcon: {
    marginRight: 15,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  underline: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginTop: 5,
  },
  nextButton: {
    position: 'absolute',
    right: 30,
    bottom: 100,
  },
  nextButtonBackground: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#1EA7E8',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#1EA7E8',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default RegisterScreen;