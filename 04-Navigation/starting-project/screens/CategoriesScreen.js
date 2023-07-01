import {FlatList} from "react-native";
import {CATEGORIES} from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

//Any component/screen that is registered with Stack.Screen will be given a special parameter call 'navigation' that contains methods that allows us to navigate.
function CategoriesScreen({navigation}){

    function renderCategoryItem(itemData){

        function pressHandler(){
            //...For instance here we can see how to navigate to the Screen registed under the 'name' of 'MealsOverview'.
            navigation.navigate('MealsOverview');
        }
        return <CategoryGridTile title={itemData.item.title} color={itemData.item.color} onPress={pressHandler}/>
    }

    //Pay attention that FlatList when its items surpasses the height of its parent, it will be scrollable automatically. I thought we had to add ScrollView or something as a wrapper.
    return <FlatList data={CATEGORIES}
                     keyExtractor={(item)=>item.id}
                     renderItem={renderCategoryItem}
                    numColumns={2} //With this property the Flatlist will be shown the iterable content in the number of columns specified
        />

}

export default CategoriesScreen;