import React from 'react'
import { StyleSheet, View, Text, Button, ActivityIndicator } from 'react-native'
import Answer from "./components/Answer";

class App extends React.Component {
    state = { style: 'orange', yesOrNo: 'maybe', loading: false}

    onClick = this.onClick.bind(this)

    onClick() {
        console.log("state changed");
        this.setState({loading: true});
        //this.setState((prevState) => ({ style: prevState.style === 'light' ? 'dark' : 'light', loading: true }))
        fetch(`https://yesno.wtf/api`, {
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        })
        .then(async (res) => {
            try {
                const json = await res.json()
                let newStyle;
                switch (json.answer){
                    case "yes":
                      newStyle = "green";
                      break;
                    case "no":
                      newStyle = "red";
                      break;
                    default:
                      newStyle = "orange";
                }
                this.setState({style: newStyle,loading: false, yesOrNo: json.answer});
                return json
            } catch (error) {
                // this.setState({style: newStyle,loading: false, yesOrNo: json.answer})
                console.error('Failed to fetch', error);
                return false
            }
        })
        .catch(error => {
            this.setState({style: "orange",loading: false, yesOrNo: "maybe"});
            // console.error('No data ?', error);
            return false
        })
    }

    render() {
        const { style } = this.state;


        return (
            <View style={[styles.container, theme['bg_'+style]]} >
                <ActivityIndicator size="large" color="#ffffff" display={this.state.loading ? "flex" : "none"}/>
                <Answer yesOrNo={this.state.yesOrNo}/>
                <Button onPress={this.onClick} title={"switch THEME"} display={"none"} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

const theme = StyleSheet.create({
    bg_orange: {
        backgroundColor: '#ff5d15',
    },
    bg_green: {
        backgroundColor: '#5aff1e',
    },
    bg_red: {
        backgroundColor: '#ff1425',
    }
})

export default App