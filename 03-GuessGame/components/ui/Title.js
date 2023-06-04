import {Text, StyleSheet} from "react-native";

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
        borderWidth: 2,
        borderColor :'white',
        padding: 12
    }
})

export default Title;