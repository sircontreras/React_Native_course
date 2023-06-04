import {Text, StyleSheet} from "react-native";
import Colors from "../../constants/colors";

//In this component we are employing a technique based on developer architecture. We can decide to receive a prop for styles(name is up to us like any other prop) to make our component even more reusable(The same with React.js)
function InstructionText({children, style}){

    return (
        //The 'style' prop for built-in RN component allows us to have multiples independent sets of styles in an array syntax. Behind the scenes these will be merged into one single styling object. These styles are read from left to right, meaning, in our case the 'style' object will overwrite any style in 'styles.instructionText'
        <Text style={[styles.instructionText, style]}>{children}</Text>
    );

}

const styles = StyleSheet.create({
    instructionText:  {
        fontFamily: 'open-sans', //...using custom fonts
        color : Colors.accent500,
        fontSize: 24
    },
})
export default InstructionText;