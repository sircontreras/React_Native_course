import {Text, StyleSheet, Platform} from "react-native";


//PLATFORM FILES:
//Pay attention to the way this file is named: title.android.js, this means that when importing this Title component, RN will pick it automatically when the app is open is android. The same applies for ios, we can have another file called: Title.ios.js and and the app is open in ios. So this is pretty convenient.

//Worth noting is that this is component specific, we can do the same for instance for the color constant file. colors.android.js and colors.ios.js..We could a set of colors for ios and another one for android. This is really powerful and convenient feature.
function Title({children}){

    return (
        <Text style={styles.title}>{children}</Text>
    )

}

const styles = StyleSheet.create({
    title : {
        fontFamily : 'open-sans-bold', //...using custom fonts
        fontSize:18,
        color: 'white',
        textAlign:'center',
        //PLATFORM SPECIFIC CODE: RN provides us with another object that doesn't need to be reactive due to static nature of loading the app in any OS. We have two ways of using it...
        //borderWidth: Platform.OS === 'android' ?  2 : 0, //accessing it the .OS property or...
        // borderWidth: Platform.select({android : 2 , ios: 0}), //Using the .select() method which allows to return any value we want based on the platform. In my opinion. This doesn't offer that much power/value, but it is true is more readable.
        borderWidth: 2,
        borderColor :'white',
        padding: 12,
        //Dynamics widths..meehh!!..I already knew that.
        maxWidth:'80%',
        width: 300
    }
})

export default Title;