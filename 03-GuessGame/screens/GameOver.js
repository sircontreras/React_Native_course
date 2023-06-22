import {Image, Text, View, StyleSheet, Dimensions, useWindowDimensions, ScrollView} from "react-native";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import PrimaryButton from "../components/ui/PrimaryButton";

function GameOverScreen({roundsNumber, userNumber, onStartNewGame}){

    const {width, height} = useWindowDimensions();

    let imageSize = 300;
    if(width < 380){
        imageSize = 100;
    }
    if(height < 400){
        imageSize = 80;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius : imageSize / 2
    }

    return (
        <ScrollView style={styles.screen}>
        <View style={styles.rootContainer}>
            <Title>Game is over!</Title>
            {/*Pay attention on how we are a rounded cropped image. Also take a look to the css involved. We used overflow:hidden again*/}
            <View style={[styles.imageContainer, imageStyle]}>
                <Image source={require('../assets/images/success.png')} style={styles.image}/>
            </View>
            {/*The Text component can hold other Text components without problem. This possibility allows to have multiple styles in the string. Something to note is that we use some fontSize for the parent Text component, its children Text will inherit the same size. So the same goes for all the text related styles in this regard. This is not inheritance. That's happens due to how the texts are rendered in their native versions behinds the scenes. That aspect doesn’t happen if the fontSize is applied to a parent View for example. */}
            <Text style={styles.summaryText}>Your phone needed <Text style={styles.highlight}>{roundsNumber}</Text> rounds to guess the number <Text style={styles.highlight}>{userNumber}</Text>.</Text>

            <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
        </View>
        </ScrollView>
    )
}

//DIMENSION API: Explained in NumberContainer.js
// const deviceWidth = Dimensions.get('window').width;

export default GameOverScreen;

const styles = StyleSheet.create({
    screen : {
        flex: 1
    },
    rootContainer : {
      flex: 1,
        padding: 24,
        justifyContent:'center',
        alignItems: 'center'
    },
    imageContainer : {
        // width: deviceWidth < 380 ? 150 : 300,
        // height: deviceWidth < 380 ? 150 : 300,
        // borderRadius : deviceWidth < 380 ? 75 : 300150,
        borderWidth: 3,
        borderColor : Colors.primary800,
        overflow: 'hidden',
        margin : 36
    },
    image: {
        width:'100%',
        height: '100%'
    },
    summaryText: {
        fontFamily : 'open-sans',
        fontSize: 24,
        textAlign: 'center',
        marginBottom : 24
    },
    highlight : {
        fontFamily : 'open-sans-bold',
        color : Colors.primary500
    }
});