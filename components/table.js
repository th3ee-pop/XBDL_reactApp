import React, { Component } from 'react';
import { StyleSheet , View, ScrollView, TextInput, ActivityIndicator} from 'react-native';
import {Content, Form, Input, Label, Item, Text } from 'native-base';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import TableLineComponent from './table_components/table-line';
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button';
import Checkbox from 'react-native-check-box';



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
            loading: true,
        };
        this.virtualState = {
            answers: [
            ],
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSkip = this.handleSkip.bind(this);
    }
    componentWillMount() {
        const props = this.props;
        const header = props.configuration.header;
        const column = props.configuration.column_title;
        const type = props.configuration.column_type;
        const tableData = [];
        for (let row = 0; row < column.length; row ++) {
                tableData.push([]);
                for (let col = 0; col < type.length; col ++) {
                    tableData[row].push({
                        type: type[col],
                        name: `${column[row]}_${header[col]}`,
                    });
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
        this.virtualState.answers = props.value;
        console.log(props.value);
        if (props.id === '7.8') {
            if (props.value[27][1].Record_Value)
            this.props.generateHideSignal('7.8', [-13]);
        }
        this.setState({
            tableHead: header,
            tableData: tableData,
            answers: props.value,
            loading: false,
        }, () => {
            console.log(this.state.answers);
        })
    }

    handleChange(index, answer) {
        if(this.props.id === '7.8') {
            console.log(this.props.index);
            console.log(answer[0]);
            if (answer[0].Record_ID === 'ID7_8_0_28') {
                console.log(answer[1].Record_Value);
                answer[1].Record_Value ? this.props.generateHideSignal( '7.8' , [-13, -14]) : this.props.generateHideSignal( '7.8' , [13, 14])
            }
        }
        this.virtualState.answers[index] = answer;
        this.props.handleChange(this.props.index, this.virtualState.answers);
    }

    handleSkip() {
        this.virtualState.answers[28].Record_Value = !this.virtualState.answers[28].Record_Value;
        console.log(this.virtualState.answers);
        this.props.handleChange(this.props.index, this.virtualState.answers);
    }

    componentWillReceiveProps(props) {
        this.virtualState.answers = props.value;
        this.setState({
            answers: props.value,
            loading: false
        }, () => {
        })
    }


    render() {
        return (this.props.hidden === false ? (<Content style={{marginTop: 10}}>

                <View>

                    <Form>
                        <Label>
                            { this.props.id + ' ' + this.props.title}
                        </Label>
                        <Table borderStyle={{borderColor: 'transparent', paddingBottom: 15}}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                            {
                                this.state.tableData.map((rowData, index) => (
                                    <TableLineComponent method={this.props.id === '7.8' ? 'multi': 'single'} handleChange={this.handleChange} key={index} config={rowData} answer={this.state.answers[index]} index={index}
                                                        validType={this.props.configuration.validType}
                                    />
                                ))
                            }
                        </Table>
                        {
                            this.state.answers[28] ? (<Checkbox
                                rightText={'以上情况都没有'}
                                style={{flex: 1}}
                                isChecked={this.state.answers[28].Record_Value} onClick={() => {
                                    this.handleSkip()
                            }}/>) : (<View/>)
                        }

                    </Form>

                </View>
            </Content>) : (<View/>)
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  backgroundColor: '#C0C0C0', paddingBottom: 5 },
    text: { margin: 6, paddingLeft: 5 },
    row: { flexDirection: 'row' },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});