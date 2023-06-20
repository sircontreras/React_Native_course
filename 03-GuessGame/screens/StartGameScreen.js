import {TextInput, View, StyleSheet, Alert} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import {useState} from "react";
import Colors from "../constants/colors";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({onPickedNumber}){

    const [enteredNumber, setEnteredNumber] = useState('');

    function numberInputHandler(enteredText){
        setEnteredNumber(enteredText);
    }

    function resetInputHandler(){
        setEnteredNumber('');
    }

    function confirmInputHandler(){
       const chosenNumber = parseInt(enteredNumber);
       if(isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99){
           //to trigger alerts we rely on this Built-in object that allows to call several methods. One of them is the .alert(). This will display the native alert in each OS, so expect to have different styles on the alerts in each OS. By default, the buttons will dismiss the alert when clicked.
           Alert.alert('Invalid number!','Number has to be a number between 1 and 99',
               //as third argument we pass configs for the buttons of this alert. The 'style' prop, applies predefined styles
               [{
               text : 'Okay', style : 'destructive', onPress : resetInputHandler
           }])
           return;
       }

        onPickedNumber(chosenNumber);
    }

    return (
        <View style={styles.rootContainer}>

            <Title>Guess My number</Title>
            <Card>
                <InstructionText>Enter a Number</InstructionText>

                {/*Turns out the built-in 'TextInput' component like in Flutter, has all kind of props for every need we may need. Some of them are: maxLength, keyBoardType, autoCapitalize, autoCorrect. Apparently the 'type' of value it will have cannot be set. We can protect ourselves with the type of keyboard and maybe interviewing the pasted texts*/}
                <TextInput style={styles.numberInput} maxLength={2} keyboardType='number-pad' autoCapitalize='none' autoCorrect={false} value={enteredNumber} onChangeText={numberInputHandler}/>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                    </View>
                </View>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    rootContainer : {
      flex: 1,
        marginTop:100,
        alignItems: 'center'
    },
    numberInput : {
        width:50,
        height: 50,
        fontSize: 32,
        borderBottomColor : Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical :8,
        fontWeight: 'bold',
        textAlign:'center',
    },
    buttonsContainer : {
        flexDirection : 'row'
    },
    buttonContainer : {
        flex: 1 //According to what I've seen, the child of buttonContainer(in our case is PrimaryButton,  that doesn't have any width applied), will stretch to fill up buttonContainer. That's appear to be the normal behaviour. Which is great!.
    }
})

export default StartGameScreen;