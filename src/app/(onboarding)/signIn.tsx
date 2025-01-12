import { Text, TextInput, View, StyleSheet, Alert, Button } from 'react-native';
import { useState } from 'react';
import { useAuth } from '~/src/providers/AuthProvider';
import { router } from 'expo-router';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const handleSignIn = async () => {
    setLoading(true);
    await signIn(email, password);
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
        onPress={handleSignIn}
        disabled={loading}
        title={loading ? 'Signing in..' : 'Sign in'}
      />
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
