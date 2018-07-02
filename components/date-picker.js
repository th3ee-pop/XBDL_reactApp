import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Label , Icon, Button, View, Text} from 'native-base';
import moment from 'moment';
import DatePicker from 'react-native-datepicker'
import { DatePickerAndroid } from 'react-native';

export default class MyDatePicker extends Component {
    constructor(props){
        super(props);
        this.state = {
            date:"",
            valid: true
        };
        this.setDate = this.setDate.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
    }

    setDate(date) {
        const dateReg = /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
        if(dateReg.test(date) === false && date!=='') {
            this.setState({
                date: date,
                valid: false,
            })} else {
            this.setState({
                date: date,
                valid: true,
            });
        }
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
        try {
            let {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2])),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = '';
                if (month < 9) {
                    date = `${year}-0${month+1}-${day > 9?day:'0'+day}`;
                } else {
                   date = `${year}-${month+1}-${day > 9?day:'0'+day}`;
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
            this.props.hidden === false ? (<Content style={{top: 10, height: 80}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <View style={{flex: 1, flexDirection: 'row', }}>
                        <Button transparent onPress={this.openDatePicker} >
                            <Icon name={'md-calendar'} />
                        </Button>
                        <Input  type="text" value={this.state.date} onChangeText={(text) => {this.setDate(text)}}/>
                        {
                            this.state.valid ? (
                                <View/>
                            ) : (<View>
                                    <Text style={{color:'red'}}>
                                        {'日期格式有误'}
                                    </Text>
                                </View>
                            )
                        }
                    </View>
                </Form>
            </Content>): (<View/>)
        )
    }
}