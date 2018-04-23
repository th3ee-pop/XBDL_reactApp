import React, { Component } from 'react';
import { StyleSheet , View, ScrollView, TextInput} from 'react-native';
import {Content, Form, Input, Label, Item, Text } from 'native-base';
import CheckBox from 'react-native-check-box';
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

            ]
        };
        this.changeOption = this.changeOption.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
    }

    componentWillReceiveProps(props) {
        console.log(props);
        const header = props.configuration.header;
        const column = props.configuration.column_title;
        const type = props.configuration.column_type;
        const tableData = [];
        for (let row = 0; row < column.length; row ++) {
            tableData.push([]);
            for (let col = 0; col < type.length; col ++) {
                tableData[row].push({
                  type: type[col],
                  name: `${column[row]}_${header[col]}`
                })
            }
        }
        const set1 = this.setState({
            tableHead: header
        });
        const set2 = this.setState({
            tableData: tableData
        });
        const set3 = this.setState({
            answers: props.value
        });

        Promise.all([set1, set2, set3]).then(() => {
            console.log(this.state);
        })
    }

    changeOption = (index, cellIndex) => {
        this.state.answers[index][cellIndex - 1] = !this.state.answers[index][cellIndex - 1];
        this.setState({
            answers: this.state.answers
        }, () => {
            console.log(this.state.answers);
            this.props.handleChange(this.props.id, this.state.answers);
        })

    };

    changeInputValue = (value, index, cellIndex) => {
        this.state.answers[index][cellIndex - 1] = value;
        this.setState({
            answers: this.state.answers
        }, () => {
            console.log(this.state.answers);
            this.props.handleChange(this.props.id, this.state.answers);
        })

    };

    switch_Widget = (widget, index, cellIndex) => {
        switch (widget.type)
        {
            case 'input':
                return (
                    <TextInput value={this.state.answers[index][cellIndex-1]} onChangeText={(value) => {this.changeInputValue(value, index, cellIndex)}}/>
                );

            case 'check':
                return (
                    <CheckBox isChecked={this.state.answers[index][cellIndex-1]} onClick={() => {this.changeOption(index, cellIndex)}} style={{padding: 10}}/>
                );
            default:
                return (<Text style={{marginLeft:10}}>
                        {widget.name.split('_')[0]}
                    </Text>
                )
        }
    };

    render() {
        console.log(this.state);
        return (
            <Content style={{top: 10, bottom: 20}}>
            <View style={{top: 10}}>
                <Form>
                    <Label>
                        1.8 表单
                    </Label>
                <Table borderStyle={{borderColor: 'transparent'}}>
                    <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                    {
                        this.state.tableData.map((rowData, index) => (

                            <TableWrapper key={index} style={styles.row}>
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