import React, { Component } from 'react';
import {Content, Form, Input, Label } from 'native-base';



export default class NormalInputComponent extends Component {

    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            input_value: this.props.value
        }
    }


    handleChange(e) {
        this.setState({
            input_value: e
        }, () => {
            console.log(e);
            this.props.handleChange(this.props.id, e)
        })
    }


    render() {
        const { func , value, title, id } = this.props;
        return (
            <Content style={{top: 10}}>
                <Form>
                        <Label>
                            {id + ' ' + title}
                        </Label>
                        <Input type="text" value={this.state.input_value} onChangeText={(text) => {this.handleChange(text)}}/>
                </Form>
            </Content>
        )
    }
}