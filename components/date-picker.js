import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
    constructor(props){
        super(props);
        this.state = {date:"2018-04-03"}
    }

    render(){
        const { title, id } = this.props;

        return (
            <Content style={{top: 10, height: 100}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <DatePicker
                        style={{width: 200, paddingTop:10, left: 20}}
                        date={this.state.date}
                        mode="date"
                        placeholder="select date"
                        format="YYYY-MM-DD"
                        minDate="2018-04-03"
                        maxDate="2030-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateIcon: {
                                position: 'absolute',
                                left: 0,
                                top: 4,
                                marginLeft: 0
                            },
                            dateInput: {
                                marginLeft: 36
                            }
                            // ... You can check the source to find the other keys.
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                </Form>
            </Content>
        )
    }
}