import {FlatList} from "react-native";
import {CATEGORIES} from "../data/dummy-data";
import CategoryGridTile from "../components/CategoryGridTile";

function CategoriesScreen(){

    function renderCategoryItem(itemData){
        return <CategoryGridTile title={itemData.item.title} color={itemData.item.color}/>
    }

    //Pay attention that FlatList when its items surpasses the height of its parent, it will be scrollable automatically. I thought we had to add ScrollView or something as a wrapper.
    return <FlatList data={CATEGORIES}
                     keyExtractor={(item)=>item.id}
                     renderItem={renderCategoryItem}
                    numColumns={2} //With this property the Flatlist will be shown the iterable content in the number of columns specified
        />

}

export default CategoriesScreen;