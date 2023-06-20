import {StatusBar} from 'expo-status-bar';
import {Button, FlatList, StyleSheet, View} from 'react-native';
import {useState} from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";


//Flexbox is the way how we create complex layouts. It's very similar how it works in css. By default, all Views component are display:flex, flexDirection: column,  unlike the web.
export default function App() {

    const [courseGoals, setCourseGoals] = useState([]);
    const [modalIsVisible, setModalIsVisible] = useState(false);

    function startAddGoalHandler() {
        setModalIsVisible(true);
    }

    function endAddGoalHandler() {
        setModalIsVisible(false);
    }

    function addGoalHandler(enteredGoalText) {
        console.log(enteredGoalText);
        setCourseGoals((currentCourseGoals) => {
            return [...currentCourseGoals, {
                //The FlatList component will automatically look for the 'key' property in its target object and will automatically apply it as key on the top-most parent
                text: enteredGoalText, key: Math.random().toString()
            }];
        });
        endAddGoalHandler();
    }

    function deleteGoalHandler(id) {
        setCourseGoals((currentCourseGoals) => {
            return currentCourseGoals.filter((goal) => {
                return goal.key !== id;
            });
        });
    }

    {/*The outermost View component will have its width to 100% and its height as big as the content by default. We would need to force the height to be 100% if that's the need*/
    }


    {/*STYLING LIMITATION BY OS:*/}
    {/*There are certain details we need to take into account when applying styles to components. And that is that React native components at the end are translated to their respective native equivalents in their respective mobile OS. There might be times when certain elements will reflect certain styles in android but no in ios, because their respective translated native widgets do not support certain styles. For instance the Text component is able to take the borderRadios in android but not in ios. The View component will not accept the 'color' style in neither android nor ios. When we found ourselves in these scenarios, we may need to wrap the element in a View component and apply the styles to it and other times only apply font styles to the Text component*/
    }
    {/*Another difference with regular css is that the style inheritance doesn't exist here. A style applied to a parent won't affect its children, as the 'color' property does in regular css.*/
    }

    {/*SCROLLING:*/}
    {/*Scrollable content: like the web, for mobile we need to explicitly tell React Native when areas need to be scrollable. For that purpose we have the ScrollView component*/   }
    {/*The Space taken by a 'ScrollView' component is determined by its parent, so always use a View as a wrapper of it. Using ScrollView without a View wrapper can make the ScrollView to behaves weirdly in regard its height */
    }
    {/*The ScrollView component has a ton of props, please read the docs to check them: https://reactnative.dev/docs/scrollview. You'll find that certain components have special props only for ios and other only for android. This is because each mobile OS have its own set of ways of display stuff. For instance the scrolling in ios have a bouncing animation while exceeding the scroll force permitted whereas in android we don't have that. So special props for controlling those details are available, in this case that is the alwaysBounceVertical={false}..When applied, that bouncing animation will stop happening and it will behaves like android*/    }
    {/*An important aspect about the ScrollView component is that is suitable for content that  we know is limited and need scrolls, such as an article page, or lists that have a limited amount of items. But when dealing with dynamic lists such the one in our example that could grow unlimitedly is not suitable, because the ScrollView renders everything even though is not being visible yet and this could cause performance issues.*/
    }

    {/*MISC:*/}
    {/*Check the app.json file. In there you'll find an object in which we can specify general configs for the project. For instance, one thing we did in that document was to add a 'backgroundColor' property, that basically  apply the same bg color to each screen in our app. This can save us from applying it manually to each screen.(Check the docs and see which other configs we have at our disposal.)*/
    }
    return (
        <>
            {/*With the help of the 'StatusBar' component we can customize the colors of the bar that contains the icons of battery, hour, Wi-Fi icons, etc. In this case since we have dark background we decided to use the 'light' theme which makes the content of the top bar(icons, texts, etc white.*/}
            <StatusBar style='light'/>
            <View
                style={styles.appContainer}>

                <Button title='Add New Goal' color='#a065ec' onPress={startAddGoalHandler}/>
                <GoalInput onAddGoal={addGoalHandler} visible={modalIsVisible} onCancel={endAddGoalHandler}/>

                <View style={styles.goalsContainer}>
                    {/*The FlatList component is suitable for dynamic lists. It will only render what is seen in screen and will lazily load the items that are near to the viewport as we scroll to them whereas it will discard items that were left behind and out the view. Well-suited for performance.*/}
                    <FlatList data={courseGoals} renderItem={({item, index}) => {
                        return <GoalItem id={item.key} text={item.text} onDeleteItem={deleteGoalHandler}/>
                    }}
                        //If the target object doesn't have an id or key property to be used as key, the component offers us a pretty convenient alternative, the keyExtractor prop that allows us to generate uniques identifiers for this purpose.
                        // keyExtractor={(item, index)=>{
                        //     return item.key
                        // }}
                    />

                </View>


                {/*
            <View style={styles.goalsContainer}>
                <ScrollView>
                    {courseGoals.map((goal)=>{
                        return <View key={goal} style={styles.goalItem}>
                            <Text style={styles.goalText}>{goal}</Text>
                        </View>
                    })}

                </ScrollView>
            </View>
            */}
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    //In the app.json file
    appContainer: {
        paddingTop: 50,
        paddingHorizontal: 16,
        // backgroundColor : '#1e085a',
        height: '100%'
    },
    goalsContainer: {
        flex: 5
    }
});

{/*We count with a couple of interesting possibilities for debugging. In the terminal when the project is running, press the key 'm'. and that will open a menu on your phone. in which we can select 'Open js debugger', which will open the Chrome browser inspector, in which we have access to the network and sources tab like we do in the web.*/}

{/*Devtools: It's an alternative window instead of the inspector window we talked about above. You need to install the dev-tools with 'npm install -g react-devtools', and then run 'react-devtools' command, then reload your app. Press the 'm' key, then select the 'Open js debugger option', and now the devTools will appear instead. In there you'll see your component tree with the options to manipulate the state of the props and see them being reflected right away on the app itself. This makes me imagine that debugging phase can be kind of painful.
 */}
