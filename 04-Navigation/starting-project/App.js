import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import CategoriesScreen from "./screens/CategoriesScreen";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import MealsOverviewScreen from "./screens/MealsOverviewScreen";

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <>
      <StatusBar style='light'/>
      {/*Similar to React.js, there's a specific package that can help us with navigation that can be used with or without Expo. This is the @react-navigation/native package: https://reactnavigation.org/. First we run: npm install @react-navigation/native and then to use it with expo: npx expo install react-native-screens react-native-safe-area-context. In case we are using RN without expo there's another command and procedure we can follow, fortunately  the docs are clear. Then we can use the NavigationContainer wrapper above everything. This is the component that holds the state of where we are. */}
      <NavigationContainer>
          {/*Next we need to install some 'Navigator', which is the entity that executes the navigation orders and subscribe the screen to the Navigation system. Transition from screen to the other with a nice native animation by OS. To use it we need to first create the navigator. For this, outside the App component we declare what in line 7. That Stack variable now holds 2 components, the Stack.Navigator and Stack.Screen. Use them as follows:*/}
          <Stack.Navigator
              initialRouteName='MealsCategories'
          >
              {/*Stack.Screen allows to specify the name of the screen, through which we'll navigate to later the component it will render. Pay attention to the fact that in the 'component' property we do not put the JSX but just the reference*/}
              {/*After we've applied this set of changes. when running the app in both android and ios we see now that the background color we set in the app.json is gone and a Safe area behaviour has been applied for both systems. the content no longer overlaps the status bar. Also, an additional header with the text we put in the 'name' property is present in that header. So no need to use other external solutions for the Safe area thing. Additionally, the header also counts with a 'back arrow' in the left hand sie that appears automatically when there's a previous screen in stack. The arrow icon is the icon used in each OS.*/}
              {/*Out of the box, the top-most screen (i.e. the first child inside of <Stack.Navigator>) is used as the initial screen. Alternatively, there also is an initialRouteName prop that can be set on the navigator component*/}
            <Stack.Screen name='MealsCategories' component={CategoriesScreen}/>
            <Stack.Screen name='MealsOverview' component={MealsOverviewScreen}/>
          </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
