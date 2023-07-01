import {View, StyleSheet, Text} from "react-native";
import {useRoute} from "@react-navigation/native";

//...Like the 'navigation' parameter, we also are given the 'route' prop from the Route package...
function MealsOverviewScreen({route}){

    const catId = route.params.categoryId; //This 'route' prop contains certain important things. among them there's the '.params' property that contains then the object we send.

    //And of course we also have the alternative to use the useRoute hook that returns us the same object. Good for deep nested components
    //const route = useRoute();

    return (
        <View>
            <Text>Meals Overview Screen - {catId}</Text>
        </View>
    )

}

const styles=  StyleSheet.create({
    container: {
        flex: 1,
        padding:16
    }
});
export default MealsOverviewScreen;