import React, { Component } from 'react';
import { StyleSheet , View, ScrollView, TextInput, ActivityIndicator} from 'react-native';
import {Content, Form, Input, Label, Item, Text } from 'native-base';
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

    /*componentWillReceiveProps(props) {
        console.log(props.configuration);
        const header = props.configuration.header;
        const column = props.configuration.column_title;
        const type = props.configuration.column_type;
        const tableData = [];
        if (props.configuration.reverse) {
            console.log('reverse');
            for (let row = 0; row < type.length; row ++) {
                tableData.push([{
                    type: 'text',
                    name: `${column[row]}_${header[0]}`
                }]);
                for (let col = 1; col < header.length; col++) {
                    tableData[row].push({
                        type: type[row],
                        name: `${column[row]}_${header[col]}`
                    })
                }
            }
        } else {
            console.log('not re');
            for (let row = 0; row < column.length; row ++) {
                tableData.push([]);
                console.log(tableData[row]);
                for (let col = 0; col < type.length; col ++) {
                    tableData[row].push({
                        type: type[col],
                        name: `${column[row]}_${header[col]}`
                    });
                    console.log(tableData[row]);
                }
            }
        }
        if (props.configuration.special_row) {
            props.configuration.special_row.forEach(row => {
                tableData[row].splice(0, 1, {
                    type: 'else',
                    name: `${column[row]}_${header[0]}`
                });
            })
        }
        this.setState({
            tableHead: header,
            tableData: tableData,
            answers: props.value,
            loading: false
        }, () => {
            console.log(this.state);
        })
    }*/

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
                    <DatePicker
                        style={{width: 125, paddingTop:10}}
                        date="2000-01-01"
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
                        onDateChange={(date) => {this.changeInputValue(date, index)}}
                    />
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