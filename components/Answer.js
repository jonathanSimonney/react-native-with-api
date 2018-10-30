import React, {Component} from 'react';
import {StyleSheet, Text} from "react-native";

export default class Answer extends Component<Props> {
    render() {
        return (
            <Text style={theme[this.props.yesOrNo]}>
                {this.props.yesOrNo}
            </Text>
        )
    }
}

const theme = StyleSheet.create({
    maybe: {
        color: '#5924ff',
    },
    yes: {
        color: '#ff21e5',
    },
    no: {
        color: '#4cfdff'
    }
})