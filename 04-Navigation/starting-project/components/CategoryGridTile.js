import {Pressable, Text, View, StyleSheet, Platform} from "react-native";

function CategoryGridTile({title, color, onPress}){

    return (
        <View style={[styles.gridItem]}>
            <Pressable android_ripple={{
                color: '#ccc'
            }} style={({pressed})=> [styles.button, pressed ? styles.buttonPressed : null]} onPress={onPress}>
                <View style={[styles.innerContainer, {backgroundColor : color}]}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    )
}

export default CategoryGridTile;

//pay attention how these styles makes possible that the two columns in which the content is being displayed gets into squares
const styles = StyleSheet.create({
   gridItem : {
        flex: 1,
       margin: 16,
       height: 150,
       borderRadius: 8,
       elevation : 4,
       // borderWidth: 1,
       backgroundColor : 'white', //in IOS in order for the shadow styles to work, a backgroundColor must be set.
       shadowColor : 'black',
       shadowOpacity : 0.25,
       shadowOffset : {width : 0, height: 2},
       shadowRadius : 8,
       overflow: Platform.OS === 'android' ? 'hidden' : 'visible' //With this we make that the Pressable android_ripple effect doesn't go behind the rounded corners we set.


   },
    button: {
       flex: 1,
    },
    buttonPressed : {
      opacity: 0.6
    },
    innerContainer : {
       flex: 1, //at first, when we apply this style, the container went blank, because, its container, the 'Pressable' component was not being applied any sizing styles. take that into account always. That's why we created the 'button' style above this one to cover this need.(React Native stuff).
        padding: 16,
        justifyContent :'center',
        alignItems:'center',
        borderRadius: 8
    },
    title: {
       fontWeight: 'bold',
        fontSize: 18
    }
});