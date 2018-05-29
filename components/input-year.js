import React, { Component } from 'react';
import {Content, Form, Input, Label, Item , Icon, Text, View} from 'native-base';



export default class InputYearComponent extends Component {


    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            year: '',
            month: '',
            valid: true,
        }
    }


    handleChange(e, unit) {
        if (unit === 0) {
            this.setState({
                year: e
            }, () => {
                this.props.handleChange(this.props.index, `${this.state.year},${this.state.month}`);
            });
        } else {
            this.setState({
                month: e
            }, ()=> {
                this.props.handleChange(this.props.index, `${this.state.year},${this.state.month}`);
            });
        }

    }

    componentWillMount() {
        if (this.props.value !== '') {
            const timeArray = this.props.value.split(',');
            this.setState({
                year: timeArray[0],
                month: timeArray[1]
            });
        }
    }

    componentWillReceiveProps(props) {
        const timeArray = props.value.split(',');
        this.setState({
            year: timeArray[0],
            month: timeArray[1]
        });
    }


    render() {
        const { func , value, title, id } = this.props;
        return (
            <Content style={{top: 10}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <Item>
                        <Input  type="text" value={this.state.year} onChangeText={(text) => {this.handleChange(text, 0)}}/>
                        <Text>年</Text>
                        <Input  type="text" value={this.state.month} onChangeText={(text) => {this.handleChange(text, 1)}}/>
                        <Text>月</Text>
                    </Item>
                </Form>
            </Content>
        )
    }
}