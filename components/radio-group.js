import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Form,Label,Text, View} from 'native-base';
import RadioModal from 'react-native-radio-master';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';


export default class RadioGroupComponent extends Component {

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
        this.props.handleChange(this.props.id, e);
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value
        });
    }

    render() {
        const { title, value, id, options} = this.props;
        return (
            <Content style={{top: 10, marginBottom: 10}}>
                <Form>
                        <Label>
                            {id + ' ' + title}
                        </Label>
                    < RadioGroup
                        size = {16}
                        thickness={2}
                        color = '#4682B4'
                        onSelect={(index, value) => {
                        console.log(index);
                        console.log(value);
                        this.handleChange(index);
                    }} selectedIndex={value} >
                        {
                            options.map((option, index) => (
                                    <RadioButton style={{marginLeft:3}} key={index} value={option}>
                                        <Text style={{bottom: 3}}>{option}</Text>
                                    </RadioButton>
                            ))
                        }
                    </RadioGroup>
                </Form>
            </Content>
        )
    }
}

let styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding: 20
    },
    text: {
        fontSize: 14,
    },
});