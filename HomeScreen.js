import React, { Component } from 'react';
import {
    Text,
    View,
    Button
} from 'react-native';

state = {
    Page1: '基本信息',
    Page2: '现病史'
};

export default class HomeScreen extends Component {


    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Home Screen</Text>
                <Button
                    title = 'Go to Details'
                    onPress={() => this.props.navigation.navigate('Details', {
                        pageInfo: state.Page1
                    })}
                />
                <Button
                    title = 'Add New'
                    onPress={() => this.props.navigation.navigate('Details', {
                        pageInfo: state.Page1
                    })}
                />
            </View>
        );
    }
}