import {Image, Platform, Pressable, StyleSheet, Text, View} from "react-native";

const MealItem = ({title, imageUrl, duration, complexity, affordability})=>{

    return (
        <View style={styles.mealItem}>
            <Pressable android_ripple={{
                color: '#ccc'
            }} style={({pressed})=> pressed ? styles.buttonPressed : null}>
               <View style={styles.innerContainer}>
                   <View>
                       <Image source={{uri : imageUrl}} style={styles.image}/>
                       <Text style={styles.title}>{title}</Text>{/*LOADING IMAGES FROM INTERNET. The same way as before but using an object with 'uri' property with url string as value. One important aspect of Image component is that it infers the width and height of the image when it comes from local but not the same when the image is from web. For that we'll need to custom styles.*/}
                   </View>
                   <View style={styles.details}>
                       <Text style={styles.detailItem}>{duration}m</Text>
                       <Text style={styles.detailItem}>{complexity.toUpperCase()}</Text>
                       <Text style={styles.detailItem}>{affordability.toUpperCase()}</Text>
                   </View>
               </View>
            </Pressable>
        </View>
    );

}

export default MealItem;

const styles = StyleSheet.create({
    mealItem: {
      margin: 16,
        borderRadius:8,
        elevation : 4,
        backgroundColor : 'white', //in IOS in order for the shadow styles to work, a backgroundColor must be set.
        shadowColor : 'black',
        shadowOpacity : 0.50,
        shadowOffset : {width : 0, height: 2},
        shadowRadius :16,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible' //With this we make that the Pressable android_ripple effect doesn't go behind the rounded corners we set.
        /*in ios the shadow styles can be cropped if the overflow hidden is applied. This doesn't in android though. So one possible legal approach is to apply the shadow in an outer container and the overflow:hidden in an inner container.*/
    },
    buttonPressed : {
        opacity: 0.6
    },
    innerContainer : { //...like we did here.
        overflow:'hidden',
        borderRadius: 8
    },
    image: {
        width : '100%',
        height : 200
    },
    title : {
        fontWeight : 'bold',
        textAlign:'center',
        fontSize:18,
        margin: 8
    },
    details : {
        flexDirection : 'row',
        alignItems:'center',
        padding : 8,
        justifyContent:'center'
    },
    detailItem : {
        marginHorizontal : 4,
        fontSize:12
    }
})