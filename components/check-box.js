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
    }
    componentWillMount() {
        this.setState({
            options: this.props.value
        }, () => {
            console.log(this.state);
        });
    }

    componentWillReceiveProps(props) {
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
                                </View>
                            ))
                        }
                    </View>


                </Form>
            </Content>
        )
    }
}