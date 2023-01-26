import { NavigationContainer } from '@react-navigation/native';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';

import { AppRoutes } from './app.routes';

export function Routes() {

  // Prevenindo Glitch na navegação - avoid Glitch on nav
  const { COLORS } = useTheme(); 

  return (
    <View style={{flex: 1, backgroundColor: COLORS.GRAY_600}}>
    <NavigationContainer>
      <AppRoutes />
    </NavigationContainer>
    </View>
  );
}