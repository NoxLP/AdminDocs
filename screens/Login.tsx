import React, {useEffect} from 'react';
import { Image, ImageStyle, ViewStyle } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../components/Button/Button';
import Input from '../components/Input/Input';
import { ViewProps } from '../components/Themed';
import Layout from "../constants/Layout";
import useLogin from '../hooks/useLogin';
import { RootStackScreenProps } from '../types';

const CONTAINER: ViewStyle = {
  height: Layout.window.height,
  width: Layout.window.width,
}
const CONTAINER_CONTENT: ViewStyle = {
  alignItems: "center"
}
const LOGO: ImageStyle = {
  height: 250,
  width: '80%',
  marginTop: '6%',
  marginBottom: '10%',
}
const INPUT: ViewStyle = {
  margin: '10%'
}

export default function Login({ navigation }: RootStackScreenProps<'Login'>) {
  const [isUserLogged, phoneInput, setPhoneInput, pwdInput, setPwdInput, login] = useLogin()
  /*
  const loginButtonOnPress = async () => {
    if (await login()) navigation.navigate("dashboard")
  }

  useEffect(() => {
    if (isUserLogged()) {
      navigation.navigate("dashboard")
    }
  }, [])
*/
  return (
    <SafeAreaView style={CONTAINER}>
      <KeyboardAwareScrollView style={CONTAINER} contentContainerStyle={CONTAINER_CONTENT}>
        <Image style={LOGO} source={require('../assets/images/adminDocs-logo-placeholder.png')} />
        <Input
          placeholder='Nº teléfono'
          keyboardType='phone-pad'
          value={phoneInput}
          onChangeText={setPhoneInput}
        />
        <Input
          placeholder='Contraseña'
          keyboardType='visible-password'
          password={true}
          value={pwdInput}
          onChangeText={setPwdInput}
        />
        <Button style={{ marginTop: '5%' }} text='Log in'/>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  )
}