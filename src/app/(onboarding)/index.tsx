import { Text, TextInput, View, StyleSheet, Alert, Button } from 'react-native';
import { useState } from 'react';
import { useAuth } from '@providers/AuthProvider';
import { Link } from 'expo-router';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signUp } = useAuth();

  const handleSignUp = async () => {
    setLoading(true);
    await signUp(email, password);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        placeholder="jon@email.com"
      />
      <Text style={styles.label}>Password</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
      />

      <Button
        onPress={handleSignUp}
        disabled={loading}
        title={loading ? 'Creating account...' : 'Create account'}
      />
      <Link href="/(onboarding)/signIn" style={styles.textButton}>
        Sign in
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
  },
  textButton: {
    color: 'blue',
    textAlign: 'center',
    marginTop: 10,
  },
  input: {
    backgroundColor: 'white',
    padding: 10,
    marginTop: 5,
    marginBottom: 20,
    borderRadius: 5,
  },
  label: {
    color: 'gray',
    fontSize: 16,
  },
});
