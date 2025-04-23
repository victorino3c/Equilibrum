import {
  Text,
  View,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { useState } from 'react';
import { useAuth } from '@providers/AuthProvider';
import { Link } from 'expo-router';
import IconInputTextLeft from '~/src/components/inputs/IconInputTextLeft';

import { Feather } from '@expo/vector-icons';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp, setProfileUsername } = useAuth();

  const iconUser = <Feather name="user" size={26} color="#6608ff" />;
  const iconMail = <Feather name="mail" size={26} color="#6608ff" />;
  const iconLock = <Feather name="unlock" size={26} color="#6608ff" />;

  const handleSignUp = async () => {
    if (password !== passwordConfirmation) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    const { session } = await signUp(email, password);
    const { id } = session?.user;
    await setProfileUsername(id!, username);
    setLoading(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <Text style={styles.titleText}>Registrarse</Text>
        <IconInputTextLeft
          icon={iconUser}
          selected={username}
          setSelected={setUsername}
          placeholder="victorino_3c"
        />
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
        <IconInputTextLeft
          icon={iconLock}
          selected={passwordConfirmation}
          setSelected={setPasswordConfirmation}
          placeholder="Confirmar contraseña"
          password={true}
        />
        <TouchableOpacity
          style={styles.continuarButton}
          onPress={() => {
            handleSignUp();
          }}
          disabled={loading}>
          <Text style={{ color: 'white', fontSize: 30, fontWeight: '500' }}>
            {loading ? 'Creando cuenta' : 'Regitrarse'}
          </Text>
        </TouchableOpacity>

        <Link href="/(onboarding)/signIn" style={styles.textButton}>
          Iniciar sesión
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
    marginBottom: 10,
    paddingHorizontal: 50,
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
