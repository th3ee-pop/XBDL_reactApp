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
        this.state.value[e].Record_Value = !this.state.value[e].Record_Value;
        this.state.value.forEach((d, index) => {
            if (index !== e) {
                d.Record_Value = false;
            }
        });
        if (this.props.hiddenList !== null) {
            this.sendHideSignal(e, this.props.hiddenList[e]);
        } else if (this.props.id === '1.3') {
            this.props.hideWoman(e);
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

            this.props.value.forEach((option, index) => {
                if (option.Record_Value === true) {
                    console.log(`${this.props.id}有需要隐藏的问题，现在隐藏了${index}选项涉及的问题`);
                    this.sendHideSignal(index, this.props.hiddenList[index]);
                }
            })
        } else if (this.props.id === '1.3') {
            this.props.value.forEach((option, index) => {
                if(option.Record_Value === true) {
                    console.log(`当前选项为${index}`);
                    this.props.hideWoman(index);
                }
            })
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
        });
    }

    componentWillReceiveProps(props) {
        this.props.value.forEach((item, index) => {
            if(item.Record_Value !== props.value[index].Record_Value && this.props.hiddenList !== null) {
                this.sendHideSignal(index, this.props.hiddenList[index])
            } else if (item.Record_Value !== props.value[index].Record_Value && this.props.id === '1.3') {
                if (props.value[index].Record_Value === true) {
                    this.props.hideWoman(index);
                }
            }
        });

        let selected = null;
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