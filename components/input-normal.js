import React, { Component } from 'react';
import {Content, Form, Input, Label } from 'native-base';



export default class NormalInputComponent extends Component {


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
        const { func , value, title, id } = this.props;
        return (
            <Content style={{top: 10}}>
                <Form>
                        <Label>
                            {id + ' ' + title}
                        </Label>
                        <Input type="text" value={this.state.value} onChangeText={(text) => {this.handleChange(text)}}/>
                </Form>
            </Content>
        )
    }
}