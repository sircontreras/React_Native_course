import {View, StyleSheet, Alert, FlatList} from "react-native";
import Title from "../components/ui/Title";
import {useEffect, useState} from "react";
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import { Entypo } from '@expo/vector-icons';
import GuessLogItem from "../components/game/GuessLogItem";

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({userNumber, onGameOver}){

    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState([initialGuess]);

    function generateRandomBetween(min, max, exclude) {
        const rndNum = Math.floor(Math.random() * (max - min)) + min;

        if (rndNum === exclude) {
            return generateRandomBetween(min, max, exclude);
        } else {
            return rndNum;
        }
    }

    useEffect(()=>{
        if(currentGuess === userNumber){
            onGameOver(guessRounds.length);
        }
    },[currentGuess, userNumber, onGameOver]);

    function nextGuessHandler(direction){ //direction => 'lower', 'greater'
        if((direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)){
            Alert.alert("Don't lie!", 'You know that your indication is wrong', [{
                text : 'Sorry!', style : 'cancel'
            }]);
            return;
        }
        if(direction === 'lower'){
            maxBoundary = currentGuess;
        }else{
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRounds((prevGuessRounds)=>[ newRndNumber, ...prevGuessRounds]);
    }

    useEffect(()=>{
        minBoundary = 1;
        maxBoundary = 100;
    },[]);

    return (
        <View style={styles.screen}>
                <Title>Opponent's Guess</Title>
            <NumberContainer>{userNumber}/{currentGuess}</NumberContainer>

            <Card>
                <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>

                        <PrimaryButton onPress={()=>nextGuessHandler('lower')}>
                            {/*Icons: Expo comes with a package that contains several icon families that could speed up the iconography work in our app: read the docs to know all about them: https://docs.expo.dev/guides/icons/ and https://icons.expo.fyi/
                        */}
                            <Entypo name="minus" size={24} color="white" />
                        </PrimaryButton>
                    </View>
                   <View style={styles.buttonContainer}>
                       <PrimaryButton onPress={()=>nextGuessHandler('greater')}>
                           <Entypo name="plus" size={24} color="white" />
                       </PrimaryButton>
                   </View>

                </View>

            </Card>
            {/*The very nature of FlatList is to have an unlimited height. So have to wrap it with some container that dictates how much space will have available. Otherwise, the FlatList will not scroll properly in both OS.*/}
            <View style={styles.listContainer}>
                {/*Something weird I noticed. This GameScreen is not the first one that appears when you open the app. I left a string text inside a View and any error was thrown. But it did when I navigated to this page. wait,whaat?. Does React Native only throws errors over the documents that are being rendered?. Terrible if the answers is yes. I need to investigate this further. */}

                {/*We do an old .map approach or...*/}
                {/*{guessRounds.map((guessRound)=>{*/}
                {/*    return <Text key={guessRound}>{guessRound}</Text>*/}
                {/*})}*/}
                {/*We can use a FlatList*/}
                <FlatList data={guessRounds} renderItem={(itemData)=>{
                    return <GuessLogItem roundNumber={guessRounds.length - itemData.index} guess={itemData.item}/>;
                }} keyExtractor={(item)=>item}/>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    screen : {
        flex: 1,
        padding: 24,
    },
    instructionText : {
        marginBottom : 12
    },
    buttonsContainer : {
        flexDirection : 'row'
    },
    buttonContainer : {
        flex: 1 //According to what I've seen, the child of buttonContainer(in our case is PrimaryButton,  that doesn't have any width applied), will stretch to fill up buttonContainer. That's appear to be the normal behaviour. Which is great!.
    },
    listContainer : {
        flex: 1,
        padding: 16
    }
})

export default GameScreen;