import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
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
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={styles.nextText}>Next</Text>
        </TouchableOpacity>
      </View>

      {/* Illustration Area */}
     
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
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  skipText: {
    fontSize: 16,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  nextText: {
    fontSize: 16,
    color: '#4A90E2',
    fontWeight: '600',
  },
  illustrationContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  illustrationWrapper: {
    width: '100%',
    height: 250,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
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