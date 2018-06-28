import React, { Component } from 'react';
import { AsyncStorage, ToastAndroid , Alert} from 'react-native';
import { Container, Tab, Tabs, ScrollableTab, Button, Text, Header, Left, Body, Right, Content, Title, Icon, Separator, View} from 'native-base';
import moment from 'moment';
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
            answers: '',
            hide_woman: false,
            completion: [],
            complete_Rate: null
        };
        this.virtualState = {
            answers: '',
            completion: [],
            hide_state: [],
            complete_Rate: null
        };
        this.generateTable = this.generateTable.bind(this);
        this.generateTable_2 = this.generateTable_2.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.generateRadio = this.generateRadio.bind(this);
        this.generateCheckBox = this.generateCheckBox.bind(this);
        this.hideWoman = this.hideWoman.bind(this);
        this.getPageCompletion = this.getPageCompletion.bind(this);
    }

    hideWoman(e) {
        console.log(this.virtualState.completion);
        if (e > 0) {
            this.setState({
                hide_woman: false,
                completion: this.state.completion
            })
        } else {
            this.setState({
                hide_woman: true,
                completion: this.state.completion
            })
        }
    }

    componentWillMount() {
        const id = this.props.navigation.getParam('id', 'NO-ID');
        if (id !== 'NO-ID') {
            AsyncStorage.getItem(id, (err, data) => {
                if (data) {
                    this.virtualState.answers = JSON.parse(data).answers;
                    this.virtualState.completion = JSON.parse(data).completion;
                    this.virtualState.complete_Rate = JSON.parse(data).complete_Rate;
                    this.virtualState.hide_state = JSON.parse(data).hide_state;
                    this.setState({
                        answers: JSON.parse(data).answers,
                        completion: this.virtualState.completion,
                        complete_Rate: this.virtualState.complete_Rate
                    }, () => {
                    })
                }
            });
        } else {
            AsyncStorage.getAllKeys((err, keys) => {
                keys = keys.filter((id) => {
                    if(!isNaN(Number(id)))
                        return id;
                });
                AsyncStorage.multiGet(keys, (err, result) => {
                    if(err) {
                        alert(err);
                    } else {
                        if (result.length > 0) {
                            const lastAnswer = result[result.length-1][1];
                            console.log(this.state.answers);
                            const usefulAnswer = JSON.parse(lastAnswer).answers;
                            this.state.answers[0][2] = usefulAnswer[0][2];
                            this.state.answers[0][9] = usefulAnswer[0][9];
                            this.state.answers[0][10] = usefulAnswer[0][10];
                            this.setState({
                                answers: this.state.answers
                            }, () => {
                                console.log(this.state.answers);
                            })
                        }
                    }
                })


            });
        }

        const answerBucket = [];
        for (let child = 0; child < this.allQuestions.length; child ++) {
            answerBucket.push([]);
            this.virtualState.completion.push({
                answered: 0,
                overall: this.allQuestions[child].length
            });
            this.virtualState.hide_state.push([]);
            this.allQuestions[child].forEach(question => {
                this.virtualState.hide_state[child].push({
                    'ID': question.id,
                    'hide': question.hidden
                });
                switch (question.type) {
                    case 'table': {
                        switch (question.id) {
                            case '3.5': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table35Id(question)
                                });
                                break;
                            }
                            case '4.6': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table46Id(question)
                                });
                                break;
                            }
                            case '5.1': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table51Id(question)
                                });
                                break;
                            }
                            case '5.3': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table53Id(question)
                                });
                                break;
                            }
                            case '5.4': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table54Id(question)
                                });
                                break;
                            }
                            case '6.14': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table614Id(question)
                                });
                                break;
                            }
                            case '7.8': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table78Id(question)
                                });
                                break;
                            }

                            case '8.13': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table813Id(question)
                                });
                                break;
                            }
                            case '9.6': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table96Id(question)
                                });
                                break;
                            }
                            case '9.13': {
                                answerBucket[child].push({
                                    "Record_ID": this.switchID(question.id),
                                    "Record_Value": this.table913Id(question)
                                });
                                break;
                            }
                            default: {
                                break;
                            }
                        }
                        break;
                    }
                    case 'table_2': {
                        answerBucket[child].push({
                            "Record_ID": this.switchID(question.id),
                            "Record_Value": this.table715Id(question)
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
                    case 'notification': {
                        answerBucket[child].push({
                            "Record_ID": this.switchID(question.id),
                            "Record_Value": 'nothing'
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
        this.virtualState.answers =answerBucket;
        this.setState({
            answers: answerBucket,
            completion: this.virtualState.completion,
            complete_Rate: 0
        }, () => {
        })
    }

    table35Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID3_5_0_${String.fromCharCode(row + 97)}`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col<config.header.length; col++) {
                IdArray[row].push({
                    "Record_ID": `ID3_5_${col}_${String.fromCharCode((97 + row))}`,
                    "Record_Value": ''
                })
            }
        }
        return IdArray;
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
        return IdArray;
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
        return IdArray;
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
        return IdArray;
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
        return IdArray;
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
        return IdArray;
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
        return IdArray;
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
        return IdArray;
    }

    table813Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID8_13_${row + 1}_0`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col < config.header.length - 1; col++) {
                IdArray[row].push({
                    "Record_ID": `ID8_13_${row+1}_${col}`,
                    "Record_Value": false
                })
            }
            IdArray[row].push({
                "Record_ID": `ID8_13_a_${row+1}`,
                "Record_Value": ''
            })
        }
        return IdArray;
    }

    table96Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID9_6_0_${row + 1}`,
                "Record_Value": config.column_title[row]
            });
            for (let col = 1; col < config.header.length - 1; col++) {
                IdArray[row].push({
                    "Record_ID": `ID9_6_${String.fromCharCode(96 + col)}_${row + 1}`,
                    "Record_Value": ''
                })
            }
            IdArray[row].push({
                "Record_ID": `ID9_6_c_${row+1}`,
                "Record_Value": false
            })
        }
        return IdArray;
    }

    table913Id(question) {
        const config = question.configuration;
        const IdArray = [];
        for (let row = 0; row < config.column_title.length; row++) {
            IdArray.push([]);
            IdArray[row].push({
                "Record_ID": `ID9_13_0_${row + 1}`,
                "Record_Value": config.column_title[row]
            });
                IdArray[row].push({
                    "Record_ID": `ID9_13_${row + 1}`,
                    "Record_Value": false
                });
            IdArray[row].push({
                "Record_ID": `ID9_13_a_${row+1}`,
                "Record_Value": ''
            })
        }
        return IdArray;
    }

    handleChange(index, answer, hide) {
        console.log(this.virtualState.answers);
        this.virtualState.answers[index] = answer;
        this.virtualState.hide_state[index] = hide;
    }

    getPageCompletion(page, overall, answered) {
        this.virtualState.completion[page].overall = overall;
        this.virtualState.completion[page].answered = answered;
        this.state.completion[page] = this.virtualState.completion[page];
        let allOverall = 0;
        let allAnswered = 0;
        this.virtualState.completion.forEach(item => {
            allOverall = allOverall + item.overall;
            allAnswered = allAnswered + item.answered
        });
        this.virtualState.complete_Rate = Math.round((allAnswered/allOverall)*100) + '%';
        this.setState({
            completion: this.state.completion,
            complete_Rate: this.virtualState.complete_Rate
        }, () => {
        })
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
        return tableAnswer;
    }

    generateTable_2(question) {
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
        const invalidArray = [];
        const saveId = this.virtualState.answers[0][0].Record_Value;
        const Idnumber = this.virtualState.answers[0][5].Record_Value;
        const saveName = this.virtualState.answers[0][1].Record_Value;
        const idReg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if (saveId.length !== 8) {
            invalidArray.push('体检编号必须为8位');
        }
        if (idReg.test(Idnumber) === false || Idnumber === '') {
            invalidArray.push('未输入合法的身份证信息');
        }
        if (saveName === '') {
            invalidArray.push('未输入姓名');
        }
        if (invalidArray.length !== 0) {
            Alert.alert(
                '提示',
                `当前表单存在以下问题:
                ${invalidArray.join('，')}。为保证体检表有效，请完善后再暂存。`,
                [
                    {text:'取消', onPress: () => console.log('取消了'), style: 'cancel'},
                ]
            )
        } else {
             this.virtualState.status = 0;
             this.virtualState.updateTime = moment().format('YYYY-MM-DD HH:mm:ss');
             console.log(this.virtualState);
             AsyncStorage.setItem(saveId, JSON.stringify(this.virtualState), (error) => {
                 if (error) {
                     alert(error);
                 } else {
                     ToastAndroid.show('已保存', ToastAndroid.SHORT);
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
                    <Title>{`健康体检调查表 (${this.state.complete_Rate})`}</Title>
                    </Body>
                    <Right />
                </Header>
                <Tabs renderTabBar={()=> <ScrollableTab />}>
                    <Tab heading={`一、一般信息 (${this.state.completion[0].answered}/${this.state.completion[0].overall})`} key={'1'}>
                        <Page_1 title={"一"} answer = {this.state.answers[0]} handleChange={this.handleChange} hideWoman={this.hideWoman} submitCompletion={this.getPageCompletion}/>
                    </Tab>
                    <Tab heading={`二、饮茶及咖啡情况 (${this.state.completion[1].answered}/${this.state.completion[1].overall})`} key={'2'}>
                        <Page_2 answer = {this.state.answers[1]} handleChange={this.handleChange} submitCompletion={this.getPageCompletion}/>
                    </Tab>
                    <Tab heading={`三、饮酒情况 (${this.state.completion[2].answered}/${this.state.completion[2].overall})`} key={'3'}>
                        <Page_3 answer = {this.state.answers[2]} handleChange={this.handleChange}  submitCompletion={this.getPageCompletion}/>
                    </Tab>
                    <Tab heading={`四、吸烟情况 (${this.state.completion[3].answered}/${this.state.completion[3].overall})`} key={'4'}>
                        <Page_4 answer = {this.state.answers[3]} handleChange={this.handleChange} submitCompletion={this.getPageCompletion}/>
                    </Tab>
                    <Tab heading={`五、膳食情况 (${this.state.completion[4].answered}/${this.state.completion[4].overall})`} key={'5'}>
                        <Page_5 answer = {this.state.answers[4]} handleChange={this.handleChange} submitCompletion={this.getPageCompletion}/>
                    </Tab>
                    <Tab heading={`六、空气污染 (${this.state.completion[5].answered}/${this.state.completion[5].overall})`} key={'6'}>
                        <Page_6 answer = {this.state.answers[5]} handleChange={this.handleChange} submitCompletion={this.getPageCompletion}/>
                    </Tab>
                    <Tab heading={`七、健康状况 (${this.state.completion[6].answered}/${this.state.completion[6].overall})`} key={'7'}>
                        <Page_7 answer = {this.state.answers[6]} handleChange={this.handleChange} submitCompletion={this.getPageCompletion}/>
                    </Tab>
                    <Tab heading={`八、体力活动 (${this.state.completion[7].answered}/${this.state.completion[7].overall})`} key={'8'}>
                        <Page_8 answer = {this.state.answers[7]} handleChange={this.handleChange} submitCompletion={this.getPageCompletion}/>
                    </Tab>
                    <Tab heading={`九、女性生育史 (${this.state.completion[8].answered}/${this.state.completion[8].overall})`} key={'9'} >
                        <Page_9 answer = {this.state.answers[8]} handleChange={this.handleChange} hidden={this.state.hide_woman} submitCompletion={this.getPageCompletion}/>
                    </Tab>
                    <Tab heading={`十、精神及生活质量 (${this.state.completion[9].answered}/${this.state.completion[9].overall})`} key={'10'}>
                        <Page_10 answer = {this.state.answers[9]} handleChange={this.handleChange} submitCompletion={this.getPageCompletion}/>
                    </Tab>
                </Tabs>
                <Button full onPress={this.setContent}>
                    <Icon name='folder'/>
                    <Text>暂存</Text>
                </Button>
                {/*<Button bordered >
                    <Text>暂存</Text>
                </Button>*/}
            </Container>
        );
    }
}


