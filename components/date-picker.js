import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label , Icon, Button, View} from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { DatePickerAndroid } from 'react-native';

export default class MyDatePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:""
        };
        this.setDate = this.setDate.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
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

    componentWillMount() {
        this.setState({
            date: this.props.value
        });
    }

    async openDatePicker(option) {
        const dateArray = this.state.date.split('-');
        console.log(parseInt(dateArray[0]));
        console.log(parseInt(dateArray[1]));
        console.log(parseInt(dateArray[2]));
        try {
            let {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2])),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = '';
                if (month < 9) {
                    date = `${year}-0${month+1}-${day}`;
                } else {
                   date = `${year}-${month+1}-${day}`;
                }

                this.setDate(date);
            }
        } catch ({code, message}) {
            console.warn('无法打开日期选择',message);
        }
    }

    render(){
        const { title, id } = this.props;

        return (
            <Content style={{top: 10, height: 80}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <View style={{flex: 1, flexDirection: 'row', }}>
                        <Button transparent onPress={this.openDatePicker} >
                            <Icon name={'md-calendar'} />
                        </Button>
                        <Input  type="text" value={this.state.date} onChangeText={(text) => {this.setDate(text)}}/>
                    </View>

                    {/*<DatePicker
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
                    />*/}
                </Form>
            </Content>
        )
    }
}