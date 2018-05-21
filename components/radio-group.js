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
            value: [],
            selected: ''
        }
    }

    handleChange(e) {
        console.log(e);
        this.state.value[e].Record_Value = !this.state.value[e].Record_Value;
        this.state.value.forEach((d, index) => {
            if (index !== e) {
                d.Record_Value = false;
            }
        });
        this.setState({
            value: this.state.value
        }, () => {
            console.log(this.state.value);
            this.props.handleChange(this.props.index, this.state.value);
        });

    }

    componentWillMount() {
        this.setState({
            value: this.props.value
        }, () => {
            console.log(this.state.value);
        });
    }

    componentWillReceiveProps(props) {
        console.log(props.value);
        let selected = 0;
        props.value.forEach((option, index) => {
            if (option.Record_Value === true) {
                selected = index;
            }
        });
        this.setState({
            value: props.value,
            selected: selected
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
                        this.handleChange(index);
                    }} selectedIndex={this.state.selected} >
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