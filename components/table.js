import React, { Component } from 'react';
import { StyleSheet , View, ScrollView, TextInput, ActivityIndicator} from 'react-native';
import {Content, Form, Input, Label, Item, Text } from 'native-base';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-datepicker'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';



export default class TableComponent extends Component {


    constructor(props) {
        super (props);
        this.state = {
            tableHead: [

            ],
            tableData: [

            ],
            answers: [

            ],
            loading: true
        };
        this.changeOption = this.changeOption.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
    }

    componentWillReceiveProps(props) {
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
    }

    changeOption = (index, cellIndex) => {
        this.state.answers[index][cellIndex - 1] = !this.state.answers[index][cellIndex - 1];
        this.state.answers[index].forEach((option, opt_index) => {
            if (opt_index !== cellIndex - 1 && typeof option === "boolean") {
                this.state.answers[index][opt_index] = false;
            }
        });
        this.setState({
            answers: this.state.answers
        }, () => {
            this.props.handleChange(this.props.id, this.state.answers);
        })
    };

    changeInputValue = (value, index, cellIndex) => {
        this.state.answers[index][cellIndex - 1] = value;
        this.setState({
            answers: this.state.answers
        }, () => {
            this.props.handleChange(this.props.id, this.state.answers);
        })

    };


    switch_Widget = (widget, index, cellIndex) => {
        switch (widget.type)
        {
            case 'input':
                return (
                    <TextInput value={this.state.answers[index][cellIndex-1]}  onChangeText={(value) => {this.changeInputValue(value, index, cellIndex)}}/>
                );

            case 'check':
                return (
                    <CheckBox isChecked={this.state.answers[index][cellIndex-1]} onClick={() => {this.changeOption(index, cellIndex)}} style={{padding: 10}}/>
                );
            case 'else':
                return (
                    <TextInput value={this.state.answers[index][cellIndex-1]} placeholder="其他"  onChangeText={(value) => {this.changeInputValue(value, index, cellIndex)}}/>
                );
            case 'date':
                return (
                    <DatePicker
                        style={{width: 125, paddingTop:15}}
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
                        onDateChange={(date) => {this.changeInputValue(date, index, cellIndex)}}
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
        console.log(this.props.configuration);
        console.log(this.state);
        return (
            <Content style={{top: 10, bottom: 20}}>

            <View style={{top: 10}}>

                <Form>
                    <Label>
                        { this.props.id + ' ' + this.props.title}
                    </Label>
                    {
                        this.state.loading ? (
                            <View style={{alignItems: 'center', height: 100}}>
                                <ActivityIndicator size="small" color="#C0C0C0"/>
                                <Text style={{color:"#C0C0C0"}}>表格正在加载……</Text>
                            </View>
                        ) : ( <View/> )
                    }
                    <Table borderStyle={{borderColor: 'transparent'}}>
                        <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                        {
                            this.state.tableData.map((rowData, index) => (

                                <TableWrapper key={index} style={[styles.row, index%2 && {backgroundColor: '#F0F0F0'}]}>
                                    {
                                        rowData.map((cellData, cellIndex) => (
                                            <Cell key={cellIndex} data={this.switch_Widget(cellData, index, cellIndex)} textStyle={styles.text}/>
                                        ))
                                    }
                                </TableWrapper>
                            ))
                        }
                    </Table>
                </Form>
            </View>
            </Content>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  backgroundColor: '#C0C0C0' },
    text: { margin: 6, paddingLeft: 5 },
    row: { flexDirection: 'row', paddingBottom: 15 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});