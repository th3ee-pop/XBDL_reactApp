import React, { Component } from 'react';
import { StyleSheet , View, ScrollView, TextInput, ActivityIndicator} from 'react-native';

export default class TableInputComponent extends Component {


    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            value: ''
        }
    }


    handleChange(e) {
        this.setState({
            value: e
        });
        this.props.changeValue(e, this.props.index, this.props.cellIndex);
    }
    

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value
        });
    }


    render() {
        const { func , value, title, id } = this.props;
        return (
            <TextInput value={this.state.value}  onChangeText={(value) => {
                this.handleChange(value)
            }}/>
        )
    }
}