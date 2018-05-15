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

    searchOption(value) {
        const answers = [];
        this.state.options.forEach(option => {
            if(option.name === value) {
                option.selected = !option.selected;
            }
        });
        this.setState({
            options: this.state.options
        }, () => {
            console.log(this.state.options);
            this.state.options.forEach(option => {
                if(option.selected) {
                    answers.push(option.name);
                }
            });
            this.props.handleChange(this.props.index, answers.join(','));
        })
    }
    componentWillMount() {

            this.state.options = [];
            this.props.options.forEach(option => {
                this.state.options.push({
                    name: option,
                    selected: false
                })
            });
        console.log(this.state.options);
        this.setState({
            options: this.state.options
        }, () => {
            console.log(this.state.options)
        });
    }

    /*componentWillReceiveProps(props) {
        console.log(props.value);
        if(props.value) {
            console.log(props);
            let selected_options = props.value.split(',');
            console.log(selected_options);
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
        console.log(this.state.options);
        this.setState({
            options: this.state.options
        }, () => {
            console.log(this.state.options)
        });
    }*/

    render() {
        const {id, title, options} = this.props;
        console.log(this.state.options);
        return (
            <Content style={{top: 10, marginBottom: 10}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <View style={{ paddingTop: 10 }}>
                        {
                            this.state.options.map((option,index) => (
                                <View key={index} style={{ flexDirection: 'row', paddingTop: 10 , paddingLeft: 5}}>
                                    <Checkbox
                                        rightText={option.name}
                                        style={{flex: 1, padding: 5}}
                                        isChecked={option.selected} onClick={() => {
                                            this.searchOption(option.name);
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