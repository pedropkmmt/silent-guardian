import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
const { width, height } = Dimensions.get('window');

const router = useRouter();

const handleNavigate = () => {
  router.push('/(tabs)/introduction pages/introductionstep_2');
};

const handleSkip = () => {
  router.push('/(tabs)/login/Login'); 
};

const PaginationDots = ({ currentIndex = 1, totalDots = 4 }) => (
  <View style={styles.paginationContainer}>
    {Array.from({ length: totalDots }).map((_, index) => (
      <View
        key={index}
        style={[
          styles.dot,
          index === currentIndex ? styles.activeDot : styles.inactiveDot,
        ]}
      />
    ))}
  </View>
);

const IntroductionScreenOne = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Illustration Area */}
      <View style={styles.illustrationContainer}>
        <View style={styles.illustrationWrapper}>
          <Image
            source={require('../../../assets/images/undraw_group-chat_4xw0.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </View>
     
      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Group Chatting</Text>
        <Text style={styles.subtitle}>
          Connect with multiple members in{'\n'}group chats
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {/* Get Started Button */}
        <TouchableOpacity onPress={handleNavigate} style={styles.getStartedButton}>
          <Text style={styles.getStartedText}>Get started</Text>
        </TouchableOpacity>

        {/* Navigation Buttons */}
        <View style={styles.navigationButtons}>
          <TouchableOpacity onPress={handleSkip} style={styles.skipButton}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleNavigate} style={styles.nextButton}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        </View>

        {/* Pagination Dots */}
        <PaginationDots currentIndex={0} totalDots={4} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  illustrationWrapper: {
    width: '100%',
    height: 280,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustration: {
    width: '100%',
    height: '100%',
    maxWidth: 350,
    maxHeight: 280,
  },
  contentContainer: {
    alignItems: 'center',
    paddingHorizontal: 40,
    paddingVertical: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 24,
    fontWeight: '400',
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
    alignItems: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  nextButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  skipText: {
    fontSize: Math.min(width * 0.04, 16),
    color: '#9CA3AF',
    fontWeight: '500',
  },
  nextText: {
    fontSize: Math.min(width * 0.04, 16),
    color: '#4A90E2',
    fontWeight: '600',
  },
  getStartedButton: {
    backgroundColor: '#4A90E2',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    maxWidth: 300,
    alignItems: 'center',
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#4A90E2',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  getStartedText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#4A90E2',
    width: 24,
    borderRadius: 4,
  },
  inactiveDot: {
    backgroundColor: '#D1D5DB',
  },
});

export default IntroductionScreenOne;