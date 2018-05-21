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
    }

    searchOption(index) {
        this.state.options[index].Record_Value = !this.state.options[index].Record_Value;
        this.setState({
            options: this.state.options
        }, () => {
            this.props.handleChange(this.props.index, this.state.options);
        })
        /*const answers = [];
        this.state.options.forEach(option => {
            if(option.name === value) {
                option.selected = !option.selected;
            }
        });
        this.setState({
            options: this.state.options
        }, () => {
            this.state.options.forEach(option => {
                if(option.selected) {
                    answers.push(option.name);
                }
            });
            this.props.handleChange(this.props.index, answers.join(','));
        })*/
    }
    componentWillMount() {
        this.setState({
            options: this.props.value
        }, () => {
            console.log(this.state);
        });
    }

    componentWillReceiveProps(props) {
        /*console.log(props);
        if(props.value) {
            let selected_options = props.value.split(',');
            this.state.options = [];
            props.options.forEach(option => {
                for (let i=0; i<selected_options.length; i++) {
                    if (option === selected_options[i]) {
                        this.state.options.push({
                            name: option,
                            selected: true
                        });
                        break;
                    }
                    if (i === selected_options.length-1) {
                        this.state.options.push({
                            name: option,
                            selected: false
                        });
                    }
                }
            });
        } else {
            this.state.options = [];
            props.options.forEach(option => {
                this.state.options.push({
                    name: option,
                    selected: false
                })
            })
        }
        this.setState({
            options: this.state.options
        }, () => {
        });*/
        this.setState({
            options: props.value
        }, () => {
            console.log(this.state);
        });
    }

    render() {
        const {id, title, options} = this.props;
        return (
            <Content style={{top: 10, marginBottom: 10}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <View style={{ paddingTop: 10 }}>
                        {
                            options.map((option,index) => (
                                <View key={index} style={{ flexDirection: 'row', paddingTop: 10 , paddingLeft: 5}}>
                                    <Checkbox
                                        rightText={option}
                                        style={{flex: 1, padding: 5}}
                                        isChecked={this.state.options[index].Record_Value} onClick={() => {
                                            this.searchOption(index);
                                    }}/>
                                    {/*<Text style={{fontSize: 14, paddingLeft: 5}}>{option.name}</Text>*/}
                                </View>
                            ))
                        }
                    </View>


                </Form>
            </Content>
        )
    }
}