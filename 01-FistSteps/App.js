import {Button, StyleSheet, Text, View} from 'react-native';

//One of the first things we need to do to start with React Native is to change our mindset. The regular html tags, h2, h3, p,section, etc, won't work here, because those are browser components that the React Dom package makes them possible to work on the browser. But in here, this is another universe in which to construct UI we need to use the built-in components the 'react-native' package offers, such as the StyleSheet, Text, View imported above. So by combining and nesting what React Native gives us in how we'll construct UI. This aspect gives me peace because it is somehow similar how Flutter operates.

//the View component is like a div, but it only can contain other built-in components and not single texts. Texts must be inside Text components. I like that in the phone the Expo app displays clear and precise errors, for instance if we use texts outside a Text component.
export default function App() {
    return (
        <View style={styles.container}>
            <View>
                <Text style={styles.myAmazingText}>Hello world madre!</Text>
                <Text style={moreStyles.god}>Another good text</Text>
            </View>
            <Text style={{ //inline-style approach
                margin: 16,
                borderWidth: 2,
                borderColor: 'red',
                padding: 16//#ccc
            }}>Another piece of text</Text>
            <Button title='Tap me'/>
        </View>
    );
}

//Another important aspect is that 'css' as we know it doesn't exist here either. We got our own particular way of declaring styles in a css-like manner. We got 2 ways of applying styles. inline styles or stylesheet objects as the one we have here.
//we got the object stylesheets approach in each we need to use this 'Stylesheet' object to create our styles. we could store our styles in a plain and simple js object without the StyleSheet.create(). But using the StyleSheet.create() we will get us 2 benefits: IDE as-we-type autocompletion and validation if we typed invalid style properties. So this makes us our life a little easier.
//Styles in React Native won't be the same as the ones in css. For instance take a look on how to apply borders(each border aspect must be specified in specific property). On the other hands the margin and padding properties accept a number as a value that will be internally translated into pixels.

//Stylesheet object approach: Recommended way
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#6b6b6b',
        alignItems: 'center',
        justifyContent: 'center',
    },
    myAmazingText : {
        margin: 16,
        padding: 16,
        borderWidth: 3,
        borderColor: 'purple'
    }
});

//Plain js Object: not recommended
const moreStyles = {
  god: {
      color: 'brown',
      fontSize: 20
  }
}
