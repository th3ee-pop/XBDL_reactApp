import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label } from 'native-base';
import DatePicker from 'react-native-datepicker'

export default class MyDatePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:""
        };
        this.setDate = this.setDate.bind(this);
    }

    setDate(date) {
        this.setState({
            date: date
        }, () => {
            console.log(this.state)
        });
        this.props.handleChange(this.props.index, date);
    }

    componentWillReceiveProps(props) {
        this.setState({
            date: props.value
        });
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
                        style={{width: 200, paddingTop:15, left: 20}}
                        date={this.state.date}
                        mode="date"
                        placeholder="选择日期"
                        format="YYYY-MM-DD"
                        minDate="1900-01-01"
                        maxDate="2050-01-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                            dateInput: {
                                marginLeft: 3
                            }
                        }}
                        onDateChange={(date) => {this.setDate(date)}}
                    />
                </Form>
            </Content>
        )
    }
}