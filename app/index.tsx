import { Redirect } from 'expo-router';

export default function Index() {
  // This will redirect the root route '/' to '/discover'
  // without affecting other routes like '/auth/*'
  return <Redirect href="/discover" />;
}
