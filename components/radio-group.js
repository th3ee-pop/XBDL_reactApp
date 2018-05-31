import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Content, Form,Label,Text, View} from 'native-base';
import RadioModal from 'react-native-radio-master';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';


export default class RadioGroupComponent extends Component {

    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.sendHideSignal = this.sendHideSignal.bind(this);
        this.state = {
            value: [],
            selected: '',
            hiddenSet: false
        }
    }

    handleChange(e) {
        console.log(e);
        console.log(this.props.hiddenList);
        this.state.value[e].Record_Value = !this.state.value[e].Record_Value;
        this.state.value.forEach((d, index) => {
            if (index !== e) {
                d.Record_Value = false;
            }
        });
        if (this.props.hiddenList !== null) {
            this.sendHideSignal(e, this.props.hiddenList[e]);
        }
        this.setState({
            value: this.state.value
        }, () => {
            this.props.handleChange(this.props.index, this.state.value);
        });

    }

    sendHideSignal(index, id) {
            this.props.generateHideSignal(index, id);
    }

    componentWillMount() {
        if (this.props.hiddenList) {
            console.log(this.props.hiddenList);
        }
        let selected = null;
        this.props.value.forEach((option, index) => {
            if (option.Record_Value === true) {
                selected = index;
            }
        });
        this.setState({
            value: this.props.value,
            selected: selected
        }, ()=> {
            console.log(this.state.selected);
        });
    }

    componentWillReceiveProps(props) {
        let selected = null;
        props.value.forEach((option, index) => {
            if (option.Record_Value === true) {
                selected = index;
            }
        });
        this.setState({
            value: props.value,
            selected: selected
        }, () => {
            console.log(this.state.selected);
           /* console.log(selected);
            console.log(props.id);
            if(props.hiddenList !== null && selected !== null) {
                this.sendHideSignal(selected, props.hiddenList[selected])
            }*/
        });
    }

    render() {
        const { title, value, id, options} = this.props;
        return (
            this.props.hidden === false ? (<Content style={{top: 10, marginBottom: 10}}>
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
            </Content>) : (<View/>)
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