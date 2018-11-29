import React, { Component } from 'react';
import { Content, Form, Label, Text, View} from 'native-base';
import Checkbox from 'react-native-check-box';


export default class CheckBoxComponent extends Component {

    constructor(props) {
        super (props);
        this.state = {
            options: []
        };
        this.searchOption = this.searchOption.bind(this);
        this.searchFalseOption = this.searchFalseOption.bind(this);
        this.sendHideSignal = this.sendHideSignal.bind(this);
    }

    searchOption(index) {
        this.state.options[index].Record_Value = true;
        if (this.props.hiddenList !== null) {
            if (index === this.props.hiddenList.length - 1) {
                this.sendHideSignal(index, this.props.hiddenList[index]);
            }
        }
        this.setState({
            options: this.state.options
        }, () => {
            this.props.handleChange(this.props.index, this.state.options);
        })
    }

    searchFalseOption(index) {
        this.state.options[index].Record_Value = false;
        if (this.props.hiddenList !== null) {
            if (index === this.props.hiddenList.length - 1) {
               this.sendHideSignal(index, this.props.hiddenList[index - 1]);
            }
        }
        this.setState({
            options: this.state.options
        }, () => {
            this.props.handleChange(this.props.index, this.state.options);
        })
    }

    componentWillMount() {
        if (this.props.hiddenList) {
            this.props.value.forEach((option, index) => {
                if (option.Record_Value[0] === true) {
                    console.log(`${this.props.id}有需要隐藏的问题，现在隐藏了${index}选项涉及的问题`);
                    this.sendHideSignal(index, this.props.hiddenList[index]);
                }
            })
        }
        this.setState({
            options: this.props.value
        }, () => {
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            options: props.value
        }, () => {
        });
    }

    sendHideSignal(index, id) {
        this.props.generateHideSignal(index, id);
    }

    render() {
        const {id, title, options} = this.props;
        return (
            this.props.hidden === false ? ( <Content style={{top: 10, marginBottom: 10}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <View style={{ paddingTop: 10 }}>
                        <Text>  是  否</Text>
                        {
                            options.map((option,index) => (
                                <View key={index} style={{ flexDirection: 'row', paddingTop: 10 , paddingLeft: 5}}>
                                    <Checkbox isChecked={this.state.options[index].Record_Value === 'unselected' ? false : this.state.options[index].Record_Value} onClick={() => {
                                        this.searchOption(index)
                                    }}/>
                                    <Checkbox
                                        rightText={option}
                                        style={{flex: 1}}
                                        isChecked={this.state.options[index].Record_Value === 'unselected' ? false : !this.state.options[index].Record_Value} onClick={() => {
                                        this.searchFalseOption(index);
                                    }}/>
                                </View>
                            ))
                        }
                    </View>


                </Form>
            </Content>) : (<View/>)

        )
    }
}