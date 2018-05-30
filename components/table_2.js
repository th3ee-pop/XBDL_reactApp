import React, { Component } from 'react';
import { StyleSheet , View, ScrollView, TextInput, ActivityIndicator} from 'react-native';
import {Content, Form, Input, Label, Item, Text } from 'native-base';
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';
import TableLineComponent from './table_components/table-line';


export default class Table2Component extends Component {


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
        this.virtualState = {
            answers: [

            ],
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        const props = this.props;
        const header = props.configuration.header;
        const column = props.configuration.column_title;
        const type = props.configuration.column_type;
        const tableData = [];
        for (let row = 0; row < column.length; row ++) {
                tableData.push([]);
                tableData[row].push({
                    type: 'text',
                    name: `${column[row]}_亲属`
                });
                for (let col = 1; col < header.length; col ++) {
                    tableData[row].push({
                        type: type[row],
                        name: `${column[row]}_${header[col]}`
                    });
                }
        }
        this.virtualState.answers = props.value;
        this.setState({
            tableHead: header,
            tableData: tableData,
            answers: props.value,
            loading: false
        }, () => {
        })
    }

    componentWillReceiveProps(props) {
        this.virtualState.answers = props.value;
        this.setState({
            answers: props.value,
            loading: false
        }, () => {
            console.log(this.state);
        })
    }


    handleChange(index, answer) {
        this.virtualState.answers[index] = answer;
        this.props.handleChange(this.props.index, this.virtualState.answers);
    }



    render() {
        return (
            <Content style={{marginTop: 10}}>

                <View>

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
                        <Table borderStyle={{borderColor: 'transparent', paddingBottom: 15}}>
                            <Row data={this.state.tableHead} style={styles.head} textStyle={styles.text}/>
                            {
                                this.state.tableData.map((rowData, index) => (

                                    <TableLineComponent method={'multi'} handleChange={this.handleChange} key={index} config={rowData} answer={this.state.answers[index]} index={index} validType={this.props.configuration.validType}/>
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
    head: {  backgroundColor: '#C0C0C0', paddingBottom: 5 },
    text: { margin: 6, paddingLeft: 5 },
    row: { flexDirection: 'row', paddingBottom: 15 },
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});