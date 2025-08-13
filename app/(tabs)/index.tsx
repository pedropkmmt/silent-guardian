import React, { useState, useEffect } from 'react';
import IntroductionScreenOne from "./introduction pages/introduction_Step_1";
import NumberEntry from './login/Login';
import SGLoadingScreen from "./SgLoadingScreen";
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [showLoading, setShowLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoading(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

   if (showLoading) {
    return <SGLoadingScreen />;
  }

  return <IntroductionScreenOne />;
}