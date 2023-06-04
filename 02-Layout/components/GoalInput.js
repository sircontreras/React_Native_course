import {Button, TextInput, View, StyleSheet, Modal, Image} from "react-native";
import {useState} from "react";

function GoalInput(props){

    const [enteredGoalText, setEnteredGoalText] = useState('');

    function goInputHandler(enteredText) {
        setEnteredGoalText(enteredText);
    }

    function addGoalHandler(){
        props.onAddGoal(enteredGoalText);
        setEnteredGoalText('');
    }

    return (
       <Modal visible={props.visible} animationType='slide'>
           <View style={styles.inputContainer}>
               {/*The Image component requires to be specified a source using the 'require() method'*/}
               <Image source={require('../assets/images/goal.png')} style={styles.image
               }/>
               <TextInput placeholder='Your course goals!' style={styles.textInput} value={enteredGoalText}
                          onChangeText={goInputHandler}/>
               <View style={styles.buttonContainer}>
                   <View style={styles.button}>
                       <Button title='Cancel' onPress={props.onCancel} color='#F31282'/>
                   </View>
                   <View style={styles.button}>
                       <Button title='Add Goal' onPress={addGoalHandler} color='#B180F0'/>
                   </View>
               </View>
           </View>
       </Modal>
    )

}

export default GoalInput;

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor : '#311b6b'
    },
    image: {

        width: 100,
        height:100,
        margin: 20
    },
    textInput: {
        width:'100%',
        borderWidth: 1,
        borderColor: '#e4d0ff',
        padding: 16,
        backgroundColor : '#e4d0ff',
        color: '#120438',
        borderRadius: 6
    },
    buttonContainer : {
        flexDirection: 'row',
        marginTop: 16
    },
    button : {
        width : 100,
        marginHorizontal : 8
    }
})




