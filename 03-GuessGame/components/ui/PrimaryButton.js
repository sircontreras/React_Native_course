import {Pressable, Text, View, StyleSheet} from "react-native";
import Colors from "../../constants/colors";

//Technique to build custom buttons cropped by rounded corners. Study the component structure and the styling applied to them.
function PrimaryButton({children, onPress}) {

    return (
        <View style={styles.buttonOuterContainer}>
            {/*Remember 'Pressable' is not js functional entity only. It is a component, a container capable of being applied styles like the View component and can be used like so*/}
            <Pressable onPress={onPress} android_ripple={{
                color: Colors.accent500
            }}
                       style={({pressed})=> {
                           //React Native allow to have styles in arrays. It will interpret them nicely and will apply them without problem
                           return pressed ?  [styles.pressed, styles.buttonInnerContainer] : styles.buttonInnerContainer
                       }}>
                   <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    )

}

export default PrimaryButton;

const styles = StyleSheet.create({
    buttonOuterContainer : {
        borderRadius: 28,//It does not crop by its self. We need overflow: hidden like the web for that.
        overflow: 'hidden', //did not expect this property existed in React native
        margin: 4,
    },
    buttonInnerContainer: {
        backgroundColor: Colors.primary500,  //In RN we can use the same techniques to hold colors in a constant like we do in React.js
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
        borderRadius: 28,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center'
    },
    pressed : {
        opacity: 0.5
    }
})