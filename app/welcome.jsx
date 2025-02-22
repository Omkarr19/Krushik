import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { StatusBar } from 'expo-status-bar';
import { wp, hp } from '../helpers/common';
import { theme } from '../constants/theme';
import Button from '../components/Button';
import LottieView from 'lottie-react-native';
import { useRouter } from 'expo-router';

const Welcome = () => {
  const router = useRouter();
  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />
      <View style={styles.container}>
        {/* Welcome Animation */}
        <LottieView
          style={styles.welcomeAnimation}
          source={require('../assets/lollie/Farmer.json')}
          autoPlay
          loop
        />

        {/* Title and Punchline */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Krushik!</Text>
          <Text style={styles.punchline}>
          Harvest Success, Cultivate Profits,      Where Growth Meets Opportunity!
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Button
            title="Getting Started"
            buttonStyle={styles.gettingStartedButton}
            onPress={() => router.push('signUp')}
          />
          <View style={styles.bottomTextContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <Pressable onPress={() => router.push('login')}>
              <Text style={styles.loginButtonText}> Login</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: 'white',
    paddingHorizontal: wp(4),
    paddingVertical: hp(8),
  },
  welcomeAnimation: {
    height : hp(35),
    width : wp(80),
    alignSelf: 'center',
  },
  textContainer: {
    gap: hp(2),
    alignItems: 'center',
  },
  title: {
    color: theme.colors.primary,
    textAlign: 'center',
    fontWeight: theme.fonts.extraBold,
    fontSize: hp(4),
    textShadowColor: theme.colors.darkLight,
    textShadowOffset: { width : 1, height : 1 },
    textShadowRadius: 2,
  },
  punchline: {
    textAlign: 'center',
    paddingHorizontal: wp(10),
    fontSize: hp(1.8),
    color: theme.colors.textLight,
  },
  footer: {
    gap: hp(3),
    width : '100%',
  },
  gettingStartedButton: {
    marginHorizontal: wp(6),
    backgroundColor: theme.colors.primary,
    borderRadius: theme.radius.lg,
    paddingVertical: hp(1.8),
  },
  bottomTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: wp(1),
  },
  loginText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  loginButtonText: {
    color: theme.colors.primaryDark,
    fontWeight: theme.fonts.semibold,
    fontSize: hp(1.6),
  },
});
