import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Tab, Tabs, ScrollableTab, Button, Text, Header, Left, Body, Right, Content, Title, Icon} from 'native-base';
import {QuestionList} from './questionList';
import Page_1 from './pages/page_first';
import Page_2 from './pages/page_two';
import Page_3 from './pages/page_three';
import Page_4 from './pages/page_four';
import Page_5 from './pages/page_five';
import Page_6 from './pages/page_six';
import Page_7 from './pages/page_seven';
import Page_8 from './pages/page_eight';
import Page_9 from './pages/page_nine';
import Page_10 from './pages/page_ten';
export default class ExaminationView extends Component {

    static navigationOptions = {
        //标题
        drawerLabel:'表单详情',
        //图标
    };

    allQuestions = new QuestionList().questions;
   // itemId = this.props.getParam('id', 'NO-ID');
    constructor(props) {
        super(props);
        this.state = {
            answers: ''
        };
        this.virtualState = {
            answers: ''
        };
        this.generateTable = this.generateTable.bind(this);
        this.generateTable_2 = this.generateTable_2.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateRadio = this.generateRadio.bind(this);
        this.generateCheckBox = this.generateCheckBox.bind(this);
    }

    componentWillUpdate() {
        console.log('update');
    }

    componentWillMount() {
       // console.log(this.itemId);
        this.table46Id(this.allQuestions[3][6]);
        this.table51Id(this.allQuestions[4][0]);
        this.table53Id(this.allQuestions[4][3]);
        this.table54Id(this.allQuestions[4][4]);
        this.table614Id(this.allQuestions[5][23]);
        this.table78Id(this.allQuestions[6][12]);
        this.table715Id(this.allQuestions[6][25]);
        console.log(this.props.navigation.getParam('id', 'NO-ID'));
        const id = this.props.navigation.getParam('id', 'NO-ID');
        if (id !== 'NO-ID') {
            AsyncStorage.getItem(id, (err, data) => {
                if (data) {
                    this.virtualState.answers = JSON.parse(data).answers;
                    this.setState({
                        answers: JSON.parse(data).answers
                    }, () => {
                    })
                } else {
                    console.log('new');
                }

            });
        }

        const answerBucket = [];
        for (let child = 0; child < this.allQuestions.length; child ++) {
            answerBucket.push([]);
            this.allQuestions[child].forEach(question => {

                switch (question.type) {
                    case 'table': {
                        answerBucket[child].push({
                            "Record_ID": this.switchID(question.id),
                            "Record_Value": this.generateTable(question)
                        });
                        break;
                    }
                    case 'table_2': {
                        answerBucket[child].push({
                            "Record_ID": this.switchID(question.id),
                            "Record_Value": this.generateTable_2(question)
                        });
                        break;
                    }
                    case 'radio': {
                        answerBucket[child].push({
                            "Record_ID": this.switchID(question.id),
                            "Record_Value": this.generateRadio(question)
                        });
                        break;
                    }
                    case 'checkbox': {
                        answerBucket[child].push({
                            "Record_ID": this.switchID(question.id),
                            "Record_Value": this.generateCheckBox(question)
                        });
                        break;
                    }
                    default: {
                        answerBucket[child].push({
                            "Record_ID": this.switchID(question.id),
                            "Record_Value": ''
                        });
                        break;
                    }
                }
            })
        }
        console.log(answerBucket);
        this.virtualState.answers =answerBucket;
        this.setState({
            answers: answerBucket
        }, () => {
            console.log(this.state);
            console.log(this.virtualState);
        })
    }

    table46Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID4_6_${row}`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col<config.header.length; col++) {
                IdArray[row].push({
                    "Record_ID": `ID4_6_${String.fromCharCode((97 + row))}`,
                    "Record_Value": ''
                })
            }
        }
        console.log(IdArray);
    }

    table51Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID5_1_${row + 1}_0`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col<config.header.length - 1; col++) {
                IdArray[row].push({
                    "Record_ID": `ID5_1_${row + 1}_${col}`,
                    "Record_Value": false
                })
            }
            IdArray[row].push({
                "Record_ID": `ID5_1_${row + 1}_b`,
                "Record_Value": ''
            })
        }
        IdArray[29][0].Record_ID = 'ID5_1_30_o';
        IdArray[29][0].Record_Value = '';
        console.log(IdArray);
    }

    table53Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID5_3_${row}_0`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col<config.header.length; col++) {
                IdArray[row].push({
                    "Record_ID": `ID5_3_${row+1}`,
                    "Record_Value": ''
                })
            }
        }
        IdArray[2][1].Record_ID = 'ID5_3_4';
        console.log(IdArray);
    }

    table54Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID5_4_${row + 1}_0`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col<config.header.length; col++) {
                IdArray[row].push({
                    "Record_ID": `ID5_4_${row + 1}_${col}`,
                    "Record_Value": false
                })
            }
        }
        console.log(IdArray);
    }

    table614Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID6_14_${row + 1}_0`,
                "Record_Value": config.column_title[row]
            });
            IdArray[row].push({
                "Record_ID": `ID6_14_${row + 1}`,
                "Record_Value": false,
            });
            IdArray[row].push({
                "Record_ID": `ID6_14_${String.fromCharCode(97+row)}`,
                "Record_Value": '',
            });
        }
        console.log(IdArray);
    }

    table78Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID7_8_0_${row+1}`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col < config.header.length; col++) {
                if(config.column_type[col] === 'check') {
                    IdArray[row].push({
                        "Record_ID": `ID7_8_${String.fromCharCode(col+96)}_${row+1}`,
                        "Record_Value": false
                    })
                } else {
                    IdArray[row].push({
                        "Record_ID": `ID7_8_${String.fromCharCode(col+96)}_${row+1}`,
                        "Record_Value": ''
                    })
                }
            }
        }
        IdArray[25][0].Record_ID = 'ID7_8_h_26';
        IdArray[25][0].Record_Value = '';
        IdArray[26][0].Record_ID = 'ID7_8_h_27';
        IdArray[26][0].Record_Value = '';
        console.log(IdArray);
    }

    table715Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID7_15_${String.fromCharCode(row+97)}_0`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col < config.header.length; col++) {
                if(config.column_type[row] === 'check') {
                    IdArray[row].push({
                        "Record_ID": `ID7_15_${String.fromCharCode(row+97)}_${col}`,
                        "Record_Value": false
                    })
                } else {
                    IdArray[row].push({
                        "Record_ID": `ID7_15_${String.fromCharCode(row+97)}_${col}`,
                        "Record_Value": ''
                    })
                }
            }
        }
        console.log(IdArray);
    }

    handleChange(index, answer) {
        this.virtualState.answers[index] = answer;
        // console.log(this.virtualState.answers);
    }

    generateRadio(question) {
        const radioAnswer = [];
        for (let i = 1; i < question.content.length + 1; i++) {
            radioAnswer.push({
                "Record_ID": this.switchID(question.id, i),
                "Record_Value": false
            })
        }
        return radioAnswer;
    }

    generateCheckBox(question) {
        const checkAnswer = [];
        for (let i=1; i < question.content.length + 1; i++) {
            checkAnswer.push({
                "Record_ID": this.switchID(question.id, i),
                "Record_Value": false
            })
        }
        return checkAnswer;
    }

    generateTable(question) {
        console.log(question.configuration);
        const tableAnswer = [];
        const config = question.configuration;
        for (let row = 0; row< config.column_title.length; row ++) {
            tableAnswer.push([]);
            for (let col = 0; col < config.column_type.length; col ++) {

                if (config.column_type[col] === 'check') {
                    tableAnswer[row].push({
                        "Record_ID": this.switchTableID(question.id, row, col),
                        "Record_Value": false
                    })
                } else if (config.column_type[col] === 'text'){
                    tableAnswer[row].push({
                        "Record_ID":  this.switchTableID(question.id, row, col),
                        "Record_Value": config.column_title[row]
                    })
                }
                else {
                    tableAnswer[row].push({
                        "Record_ID": this.switchTableID(question.id, row, col),
                        "Record_Value": ''
                    })
                }
            }
        }
        if (config.special_row) {
            config.special_row.forEach(row => {
                tableAnswer[row][0].Record_Value = ''
            })
        }
        console.log(tableAnswer);
        return tableAnswer;
    }

    generateTable_2(question) {
        console.log(question.configuration);
        const tableAnswer = [];
        const config = question.configuration;
        for (let row = 0; row< config.column_title.length; row ++) {
            tableAnswer.push([]);
            tableAnswer[row].push({
                "Record_ID": `${question.id}_${row}0`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col < config.header.length; col ++) {
                if (config.column_type[row] === 'check') {
                    tableAnswer[row].push({
                        "Record_ID": `${question.id}_${row}${col}`,
                        "Record_Value": false
                    })}
                else {
                    tableAnswer[row].push({
                        "Record_ID": `${question.id}_${row}${col}`,
                        "Record_Value": ''
                    })
                }
            }
        }
        console.log(tableAnswer);
        return tableAnswer;
    }

    switchID(idstr, index?) {
        const idArray = idstr.split('.');
        index ? idArray.push(index) : null;
        const newId = idArray.join('_');
        return `ID${newId}`;
    }

    switchTableID(idstr, row, column) {
        const idArray = idstr.split('.');
        const columnLetter = String.fromCharCode((97 + row));
        idArray.push(column);
        idArray.push(columnLetter);
        const newId = idArray.join('_');
        return `ID${newId}`;
    }

    setContent = () => {
        console.log(this.virtualState.answers[0][0].Record_Value);
        const saveId = this.virtualState.answers[0][0].Record_Value;
        if (saveId.length !== 8) {
            alert('体检编号必须为8位');
        } else {
             AsyncStorage.setItem(saveId, JSON.stringify(this.virtualState), (error) => {
                 if (error) {
                     alert(error);
                 } else {
                     alert('存储成功！');
                 }

        })
        }

    };



    render() {
        const { params } = this.props.navigation.state;
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>{'健康体检调查表'}</Title>
                    </Body>
                    <Right />
                </Header>
                <Tabs renderTabBar={()=> <ScrollableTab />}>
                    <Tab heading="一般信息">
                        <Page_1 answer = {this.state.answers[0]} handleChange={this.handleChange}/>
                    </Tab>
                    <Tab heading="饮茶及咖啡情况">
                        <Page_2 answer = {this.state.answers[1]} handleChange={this.handleChange}/>
                    </Tab>
                    <Tab heading="饮酒情况">
                        <Page_3 answer = {this.state.answers[2]} handleChange={this.handleChange}/>
                    </Tab>
                    <Tab heading="吸烟情况">
                        <Page_4 answer = {this.state.answers[3]} handleChange={this.handleChange}/>
                    </Tab>
                    <Tab heading="膳食情况">
                        <Page_5 answer = {this.state.answers[4]} handleChange={this.handleChange}/>
                    </Tab>
                    <Tab heading="空气污染">
                        <Page_6 answer = {this.state.answers[5]} handleChange={this.handleChange}/>
                    </Tab>
                    <Tab heading="健康状况">
                        <Page_7 answer = {this.state.answers[6]} handleChange={this.handleChange}/>
                    </Tab>
                    <Tab heading="体力活动">
                        <Page_8 answer = {this.state.answers[7]} handleChange={this.handleChange}/>
                    </Tab>
                    <Tab heading="女性生育史">
                        <Page_9 answer = {this.state.answers[8]} handleChange={this.handleChange}/>
                    </Tab>
                    <Tab heading="精神及生活质量">
                        <Page_10 answer = {this.state.answers[9]} handleChange={this.handleChange}/>
                    </Tab>
                </Tabs>
                <Button bordered onPress={this.setContent}>
                    <Text>暂存</Text>
                </Button>
            </Container>
        );
    }
}


