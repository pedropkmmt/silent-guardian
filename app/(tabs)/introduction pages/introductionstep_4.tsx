import { useRouter } from 'expo-router';
import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
const { width, height } = Dimensions.get('window');

 const router = useRouter();

  const handleNavigate = () => {
   
    router.push('../Login/Login');
  };
      const handleSkip = () => {
  router.push('/(tabs)/login/Login'); 
};
const PaginationDots = ({ currentIndex = 4, totalDots = 4 }) => (
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

const IntroductionScreenFour = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Illustration Area */}
      <View style={styles.illustrationContainer}>
        <View style={styles.illustrationWrapper}>
          <Image
            source={require('../../../assets/images/undraw_work-chat_hc3y.png')} 
            style={styles.illustration}
            resizeMode="contain"
          />
        </View>
      </View>
     
      {/* Content */}
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Cross-Platform Compatibility</Text>
        <Text style={styles.subtitle}>
          Access chats on any device seamlessly.
        </Text>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomContainer}>
        {/* Get Started Button */}
        <TouchableOpacity onPress={ handleSkip} style={styles.getStartedButton}>
          <Text  style={styles.getStartedText}>Get started</Text>
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
        <PaginationDots currentIndex={3} totalDots={4} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: width * 0.05, 
    paddingTop: height * 0.015, 
    paddingBottom: height * 0.025, 
    minHeight: 50,
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
  backgroundWave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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

export default IntroductionScreenFour;