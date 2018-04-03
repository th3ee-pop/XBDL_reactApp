import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import { StyleSheet } from 'react-native';


export default class NormalInputComponent extends Component {

    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        console.log(e);
        this.props.handleChange(this.props.id, e)
    }


    render() {
        const { func , value, title, id } = this.props;
        return (
            <Content style={{top: 10}}>
                <Form>
                        <Label>
                            {id + ' ' + title}
                        </Label>
                        <Input type="text" value={value} onChangeText={(text) => {this.handleChange(text)}}/>
                </Form>
            </Content>
        )
    }
}