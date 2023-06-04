import {View, StyleSheet} from "react-native";
import Colors from "../../constants/colors";

function Card({children}){
    return (
        <View style={styles.inputContainer}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    inputContainer : {
        padding: 16,
        marginTop : 100,
        marginHorizontal : 24,
        borderRadius: 8,
        backgroundColor: Colors.primary800, //In RN we can use the same techniques to hold colors in a constant that we use in React.js
        alignItems:'center',
        //BOX SHADOW
        //only for android: a single property? are you kidding me?
        elevation : 8,
        //only for ios:
        shadowColor : 'black',
        shadowOffset : {
            width : 0, height: 5
        },
        shadowRadius : 6,
        shadowOpacity : 0.25
    },
})
export default Card;