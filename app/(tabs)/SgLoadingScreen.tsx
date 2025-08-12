import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Animated,
  StatusBar,
  Platform,
  Image,
} from 'react-native';
import { useRouter } from 'expo-router';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// helper functions
const wp = (percentage: number) => {
  const value = (percentage * screenWidth) / 100;
  return Math.round(value);
};

const hp = (percentage: number) => {
  const value = (percentage * screenHeight) / 100;
  return Math.round(value);
};

const responsiveFontSize = (size: number) => {
  const scale = screenWidth / 375;
  const newSize = size * scale;
  return Math.max(newSize, size * 0.8); 
};

const SGLoadingScreen = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.8)).current;
  const [dimensions, setDimensions] = useState({
    width: screenWidth,
    height: screenHeight,
  });

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setDimensions({
        width: window.width,
        height: window.height,
      });
    });

    // Fade in animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Scale animation
    Animated.timing(scaleAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Rotation animation 
    const rotationAnimation = Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      })
    );
    rotationAnimation.start();

    return () => {
      rotationAnimation.stop();
      subscription?.remove();
    };
  }, []);

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // screen dimensions
  const isSmallScreen = dimensions.width < 360 || dimensions.height < 640;
  const isTablet = dimensions.width > 600;
  const isLandscape = dimensions.width > dimensions.height;

  return (
    <View style={styles.container}>
      <StatusBar 
        barStyle="dark-content" 
        backgroundColor="#FFFFFF" 
        translucent={Platform.OS === 'android'}
      />
      
      {/* Main Content */}
      <Animated.View 
        style={[
          styles.mainContent,
          {
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
            paddingHorizontal: wp(5),
          }
        ]}
      >
        {/* App Logo and Title */}
        <View style={[
          styles.logoContainer,
          { 
            marginBottom: isLandscape ? hp(15) : hp(20),
            transform: isTablet ? [{ scale: 1.2 }] : [{ scale: 1 }]
          }
        ]}>
          <View style={[
            styles.logoIcon,
            {
              width: wp(isSmallScreen ? 25 : 30),
              height: hp(isSmallScreen ? 12 : 15),
            }
          ]}>

            <Image
              source={require('../../assets/images/undraw_online-community_3o0l.png')} 
              style={[
                styles.logoImage,
                {
                  width: wp(isSmallScreen ? 25 : 30),
                  height: hp(isSmallScreen ? 12 : 15),
                }
              ]}
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Loading Section with Text and Ring */}
        <View style={styles.loadingSection}>
          {/* Loading ring */}
          <Animated.View 
            style={[
              styles.loadingRing,
              {
                width: isLandscape ? wp(12) : wp(isTablet ? 12 : isSmallScreen ? 15 : 16),
                height: isLandscape ? wp(12) : wp(isTablet ? 12 : isSmallScreen ? 15 : 16),
                borderRadius: isLandscape ? wp(6) : wp(isTablet ? 6 : isSmallScreen ? 7.5 : 8),
                borderWidth: isSmallScreen ? 2 : 3,
                transform: [{ rotate: rotation }],
                marginBottom: hp(3),
              }
            ]}
          />
          
          {/* Loading text */}
          <View style={styles.textContainer}>
            <Text style={[
              styles.loadingText,
              { 
                fontSize: responsiveFontSize(isTablet ? 20 : isSmallScreen ? 16 : 18),
                lineHeight: responsiveFontSize(isTablet ? 26 : isSmallScreen ? 20 : 24)
              }
            ]}>
              Stay Connected
            </Text>
            <Text style={[
              styles.loadingText,
              { 
                fontSize: responsiveFontSize(isTablet ? 20 : isSmallScreen ? 16 : 18),
                lineHeight: responsiveFontSize(isTablet ? 26 : isSmallScreen ? 20 : 24)
              }
            ]}>
              Stay Chatting
            </Text>
          </View>
        </View>
      </Animated.View>

      {/* Footer */}
      <View style={[
        styles.footer,
        { paddingBottom: Platform.OS === 'ios' ? hp(4) : hp(3) }
      ]}>
        <Text style={[
          styles.versionText,
          { fontSize: responsiveFontSize(isSmallScreen ? 12 : 14) }
        ]}>
          Version 1.0.0
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  mainContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logoIcon: {
    position: 'relative',
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: {
    width: '100%',
    height: '100%',
    maxWidth: 350,
    maxHeight: 280,
  },
  chatBubble: {
    backgroundColor: '#2196F3',
    borderRadius: 15,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chatTail: {
    position: 'absolute',
    bottom: -8,
    left: 8,
    width: 15,
    height: 10,
    backgroundColor: '#2196F3',
    transform: [{ rotate: '45deg' }],
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2196F3',
    letterSpacing: 1,
  },
  loadingSection: {
    alignItems: 'center',
    position: 'relative',
  },
  speechBubbleContainer: {
    position: 'relative',
    alignItems: 'center',
  },
  speechBubble: {
    backgroundColor: '#E3F2FD',
    borderWidth: 3,
    borderColor: '#2196F3',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  loadingRing: {
    borderColor: 'transparent',
    borderTopColor: '#2196F3',
    borderRightColor: '#2196F3',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2196F3',
    textAlign: 'center',
    lineHeight: 24,
  },
  speechTail: {
    position: 'absolute',
    bottom: -20,
    left: 30,
    width: 40,
    height: 20,
    backgroundColor: '#E3F2FD',
    borderLeftWidth: 3,
    borderBottomWidth: 3,
    borderLeftColor: '#2196F3',
    borderBottomColor: '#2196F3',
    borderBottomLeftRadius: 20,
    transform: [{ rotate: '-45deg' }],
  },
  footer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  versionText: {
    fontSize: 14,
    color: '#2196F3',
    fontWeight: '500',
  },
});

export default SGLoadingScreen;