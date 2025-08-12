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
      {/* Header - Skip and Next */}
      {/* <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View> */}

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
        <TouchableOpacity style={styles.getStartedButton}>
          <Text style={styles.getStartedText}>Get started</Text>
        </TouchableOpacity>

        {/* Pagination Dots */}
        <PaginationDots currentIndex={1} totalDots={4} />
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