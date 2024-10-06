import { AppRegistry } from 'react-native';
import AppNavigation from './src/navigation';
import { name as appName } from './app.json';

export default function App() {
  return (
    <AppNavigation />
  );
}

AppRegistry.registerComponent(appName, () => App);