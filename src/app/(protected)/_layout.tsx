import { Slot } from 'expo-router';

import { useAuth } from '../../providers/AuthProvider';

import { Redirect } from 'expo-router';

export default function Protected() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/(onboarding)'} />;
  }

  return <Slot />;
}
