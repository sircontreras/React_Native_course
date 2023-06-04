import {ImageBackground, SafeAreaView, StyleSheet} from 'react-native';
import StartGameScreen from "./screens/StartGameScreen";
import {LinearGradient} from "expo-linear-gradient";
import {useEffect, useState} from "react";
import GameScreen from "./screens/GameScreen";
import Colors from './constants/colors';
import GameOverScreen from "./screens/GameOver";
import {useFonts} from "expo-font";

import * as SplashScreen from 'expo-splash-screen';

// Keep the splash screen visible while we fetch resources. This is one of the official resources one can use to artificially keep the splash screen while we load something else that should be ready when a component such the app.js are loaded. We use the SplashScreen utility from the additional package from expo that we can install with: npx expo install expo-splash-screen...
SplashScreen.preventAutoHideAsync();

export default function App() {
    const [userNumber, setUserNumber] = useState();
    const [gameIsOver, setGameIsOver] = useState(false);
    const [guessRounds, setGuessRounds] = useState(0);

    /*CUSTOM FONTS: In RN we add custom fonts to the project using a special additional expo package that we can install with: expo install expo-font. This package provides us with a special hook(useFonts), we need pass it its config inside an object. Check the docs to learn more about it: https://docs.expo.dev/versions/latest/sdk/font/ */
    /*This hook returns an array whose first element contains a boolean that let us know if all the fonts has been loaded and ready to use.*/
    /*So, to use these fonts in your application, you just need to any of yours styles definitions, just add the good font-family property with any of identifiers you passed to useHook, e.g: font-family: 'open-sans-bold'*/
    const [fontsLoaded] = useFonts({
        'open-sans' : require('./assets/fonts/OpenSans-Regular.ttf'),
        'open-sans-bold' : require('./assets/fonts/OpenSans-Bold.ttf')
    });

    function pickedNumberHandler(pickedNumber){
        setUserNumber(pickedNumber);
    }

    //At this point in the course, a primitive and programmatic way of doing navigation is implemented here. But later I was told a more official way of doing so with an external package will be taught. I guess is a React router type of thing.
    let screen = <StartGameScreen onPickedNumber={pickedNumberHandler}/>

    if(userNumber){
        screen = <GameScreen userNumber={userNumber} onGameOver={gameOverHandler}/>;
    }
    if(gameIsOver) {
        screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler}/>
    }

    function gameOverHandler(numberOfRounds){
        setGameIsOver(true);
        setGuessRounds(numberOfRounds);
    }

    function startNewGameHandler(){
        setUserNumber(null);
        setGameIsOver(false);
        setGuessRounds(0);
    }

    /*...Once our resource, such the custom load has loaded, we do something like this with a useEffect to authorize the leaving of the splash screen...*/
    useEffect(()=>{

        async function doSomething() {
            setTimeout(async ()=>{
                //This call will imperatively tell the splash screen to go away and to let app run normally.
                await SplashScreen.hideAsync();
            },3000); //let's mimic the fonts took too long to load

        }

        if(fontsLoaded){
            doSomething();
        }
    },[fontsLoaded]);

    /*To accompanying the useHook approach we use this condition to not display content until those fonts are loaded. If I didn't put this condition here the console will complain about it. It like we cannot show content until fonts are loaded...Needs to investigate further.*/
    if(!fontsLoaded){
        return null;
    }


  return (
      //One method to apply gradients is using a component from an external Expo package for this purpose. You need to install it with: expo install expo-linear-gradient. This command will read the expo version you have and then install the gradient package compatible with it. We use the LinearGradient component that counts with a 'color' prop for the gradient colors. After that this component works and can be used like a View
    <>

        <LinearGradient style={styles.rootScreen} colors={[Colors.primary700, Colors.accent500]}>
            {/*But to deal with background images, we have another special built-in component, ImageBackground. the 'resizeMode' is the same as the backgroundSize from web. Keep in mind that built-in components are component composed of other built-in components. ImageBackground can receive two types of styles: 'styles' that will be applied to its outermost internal View component, and the imageStyle which will be applied to its internal Image component*/}
            <ImageBackground source={require('./assets/images/background.png')} resizeMode='cover' style={styles.rootScreen} imageStyle={styles.backgroundImage}>
                {/*IOS 11+ ONLY(WTF? what about android?): We have a special component that automatically applies padding to reflect the portion of the view that is covered by navigation bars, tab bars, toolbars, and other ancestor views. To work property it needs a property that applies height to it. In our case we are using the flex: 1 style property. This component is most commonly put in the topmost level of our app  to affect all pages. In this case right in here, in the App.js*/}
                {/*One workaround to have the same effect on android is to also used the <StatusBar/> component. I asked Marcello about it, and he told me that nowadays people use this package: https://www.npmjs.com/package/react-native-safe-area-context which works on both OS greatly. It seems RN have deficiency in this regard*/}
                <SafeAreaView style={styles.rootScreen}>
                    {screen}
                </SafeAreaView>
            </ImageBackground>
        </LinearGradient></>

  );
}

const styles = StyleSheet.create({
    rootScreen : {
        flex: 1, //flex is commonly used as height: 100%. Remember that its effect will be applied over the current axis: column axis: vertically, row axis: horizontally.
    },
    backgroundImage: {
        opacity : 0.15
    }
    });


//Pay attention to the folder structure and the folder names this project has. It's all up to the developer.