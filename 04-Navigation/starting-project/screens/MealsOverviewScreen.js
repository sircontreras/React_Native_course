import {View, StyleSheet, Text, FlatList} from "react-native";
import {useRoute} from "@react-navigation/native";
import {MEALS} from "../data/dummy-data";
import MealItem from "../components/MealItem";

//...Like the 'navigation' parameter, we also are given the 'route' prop from the Route package...
function MealsOverviewScreen({route}){

    const catId = route.params.categoryId; //This 'route' prop contains certain important things. among them there's the '.params' property that contains then the object we send.

    //And of course we also have the alternative to use the useRoute hook that returns us the same object. Good for deep nested components
    //const route = useRoute();

    const displayedMeals = MEALS.filter((mealItem)=>{
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    function renderMealItem(itemData){

        const item = itemData.item;
        const mealItemProps= {
            title: item.title,
            imageUrl : item.imageUrl,
            affordability : item.affordability,
            complexity : item.complexity,
            duration : item.duration
        }

        return <MealItem {...mealItemProps} />
    }
    return (
        <View>
            <Text>Meals Overview Screen - {catId}</Text>
            <FlatList data={displayedMeals} keyExtractor={(item)=>item.id} renderItem={renderMealItem}/>
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