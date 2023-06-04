import {Text, View, StyleSheet, Pressable} from "react-native";

function GoalItem(props) {

    return (
        <View style={styles.goalItem}>
            {/*The Pressable component serves the need of building custom buttons. By default, it doesn't show any feedback when pressed. We can use certain props such as the android_ripple to apply a ripple effect on android, but this won't affect ios. To affect ios and android we could also use the 'style' prop, whose styles will be applied when pressed. That prop also gives us the option to use a callback instead in which we receive the current state of the button as parameter to apply logic to decide how to apply styles*/}
            <Pressable onPress={() => props.onDeleteItem(props.id)} android_ripple={{
                color: 'red',
            }} style={({pressed})=>pressed && styles.pressedItem}>
                <Text style={styles.goalText}>{props.text}</Text>
            </Pressable>
        </View>
    )
}

const styles = StyleSheet.create({
    goalItem: {
        margin: 8,

        borderRadius: 6,
        backgroundColor: '#5E0ACC',
    },
    pressedItem: {
        opacity : 0.5
    },
    goalText: {
        padding: 8,
        color: 'white'
    }
})
export default GoalItem;