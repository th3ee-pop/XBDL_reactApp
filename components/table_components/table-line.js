import React, { Component } from 'react';
import { StyleSheet , View, ScrollView, TextInput, ActivityIndicator, DatePickerAndroid} from 'react-native';
import {Content, Form, Input, Label, Item, Text, Button, Icon } from 'native-base';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-datepicker'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import TableInputComponent from './table-input';



export default class TableLineComponent extends Component {


    constructor(props) {
        super (props);
        this.state = {
            tableData: [

            ],
            answers: [

            ],
            loading: true
        };
        this.changeOptionSingle = this.changeOptionSingle.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
    }
    componentWillMount() {
        const props = this.props;
        this.setState({
            tableData: props.config,
            answers: props.answer
        }, () => {
        })

    }

    componentWillReceiveProps(props) {
        this.setState({
            answers: props.answer
        }, () => {
        })
    }


    changeOptionSingle = (index, method) => {
        this.state.answers[index].Record_Value = !this.state.answers[index].Record_Value;
        if (method === 'single') {
            this.state.answers.forEach((option, opt_index) => {
                if (opt_index !== index && typeof option.Record_Value === "boolean") {
                    this.state.answers[opt_index].Record_Value = false;
                }
            });
        }
        this.setState({
            answers: this.state.answers
        }, () => {
            this.props.handleChange(this.props.index, this.state.answers);
        })
    };



    changeInputValue = (value, index) => {
        this.state.answers[index].Record_Value = value;
        this.setState({
            answers: this.state.answers
        }, () => {
            this.props.handleChange(this.props.index, this.state.answers);
        });
    };

    async openDatePicker(index) {
        console.log(index);
        const dateArray = this.state.answers[index].Record_Value.split('-');
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
                this.changeInputValue(date, index);
            }
        } catch ({code, message}) {
            console.warn('无法打开日期选择',message);
        }
    }



    switch_Widget = (widget, index) => {
        switch (widget.type)
        {
            case 'input':
                return (
                    <TextInput value={this.state.answers[index].Record_Value}  onChangeText={(value) => {this.changeInputValue(value, index)}}/>
                );

            case 'check':
                return (
                    <CheckBox isChecked={this.state.answers[index].Record_Value} onClick={() => {this.changeOptionSingle(index, this.props.method)}} style={{padding: 10}}/>
                );
            case 'else':
                return (
                    <TextInput value={this.state.answers[index].Record_Value}  onChangeText={(value) => {this.changeInputValue(value, index)}}/>
                );
            case 'date':
                return (
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button transparent onPress={() => this.openDatePicker(index)} >
                            <Icon name={'md-calendar'} />
                        </Button>
                        <Input  type="text" value={this.state.answers[index].Record_Value} onChangeText={(value) => {this.changeInputValue(value, index)}}/>
                    </View>
                );
            default:
                return (<Text style={{marginLeft:10}}>
                        {widget.name.split('_')[0]}
                    </Text>
                )
        }
    };

    render() {
        return (
                                    <TableWrapper style={[styles.row, this.props.index%2 && {backgroundColor: '#F0F0F0'}]}>
                                        {
                                            this.state.tableData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={this.switch_Widget(cellData, cellIndex)} textStyle={styles.text}/>
                                            ))
                                        }
                                    </TableWrapper>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  backgroundColor: '#C0C0C0' },
    text: { margin: 6, paddingLeft: 5 },
    row: { flexDirection: 'row'},
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});