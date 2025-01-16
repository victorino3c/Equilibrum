import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Touchable,
} from 'react-native';
import { useState } from 'react';
import { useAuth } from '~/src/providers/AuthProvider';
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons';
import IconInputTextLeft from '~/src/components/inputs/IconInputTextLeft';
import { Link } from 'expo-router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const iconMail = <Feather name="mail" size={26} color="#6608ff" />;
  const iconLock = <Feather name="unlock" size={26} color="#6608ff" />;

  const handleSignIn = async () => {
    setLoading(true);
    await signIn(email, password);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Iniciar sesion</Text>
        <IconInputTextLeft
          icon={iconMail}
          selected={email}
          setSelected={setEmail}
          placeholder="nicolas@gmail.com"
        />
        <IconInputTextLeft
          icon={iconLock}
          selected={password}
          setSelected={setPassword}
          placeholder="Contraseña"
          password={true}
        />
        <Text style={[styles.textButton, { textAlign: 'right' }]}>¿Olvidó su contraseña?</Text>

        <Text style={{ textAlign: 'center', marginTop: 20, fontSize: 16 }}>
          O inicia sesión con:
        </Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 15, gap: 40 }}>
          <TouchableOpacity>
            <AntDesign name="google" size={44} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="facebook" size={44} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome name="apple" size={44} color="black" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.continuarButton}
          onPress={() => {
            handleSignIn();
          }}
          disabled={loading}>
          <Text style={{ color: 'white', fontSize: 30, fontWeight: '500' }}>
            {loading ? 'Iniciando sesion' : 'Iniciar sesión'}
          </Text>
        </TouchableOpacity>

        <Link href="/(onboarding)" style={styles.textButton}>
          Registrarse
        </Link>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  textButton: {
    color: 'blue',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5,
  },
  titleText: {
    fontSize: 35,
    color: '#6608ff',
    fontWeight: '700',
    marginBottom: 20,
  },
  continuarButton: {
    alignSelf: 'center',
    backgroundColor: '#6608ff',
    borderRadius: 15,
    padding: 10,
    paddingHorizontal: 50,
    marginBottom: 10,
    alignItems: 'center',
    marginTop: 20,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
