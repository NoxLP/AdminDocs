import * as React from 'react';
import { Image, ImageStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import Input from '../components/Input/Input';

const LOGO: ImageStyle = {
  height: '50%',
  width: '80%'
}

export default function Login() {
  return (
    <SafeAreaView>
      <KeyboardAwareScrollView>
        <Image style={LOGO} source={require('../assets/images/adminDocs-logo-placeholder.png')} />
        <Input
          placeholder='Nº teléfono'

        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}