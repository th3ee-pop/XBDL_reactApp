import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { QuestionList }from './questionList';
import { Container, Content, Text, Item, View, Button, Form, Label, Input} from 'native-base';
import NormalInputComponent from './components/input-normal';
import RadioGroupComponent from './components/radio-group';
import MyDatePicker from './components/date-picker';
import CheckBoxComponent from './components/check-box';
import TableComponent from './components/table';

export default class Touchables extends Component {

    questions = new QuestionList().questions[0];

    constructor(props) {
        super(props);
        this.state = {
            answers: {
            }
        };
        this.virtualState= {
            answers: {

            }
        };

        this.handleChange = this.handleChange.bind(this);
    }


    componentWillMount() {
        AsyncStorage.getItem('PID1').then((result) => {
            if(result) {
                console.log('had');
                this.questions.forEach(question => {
                    this.state.answers[question.id] = JSON.parse(result).answers[question.id];
                    this.virtualState.answers[question.id] = JSON.parse(result).answers[question.id];
                    console.log(JSON.parse(result)[question.id])
                });
                this.setState({
                    answers: this.state.answers
                }, () => {
                    console.log(this.state);
                })
            } else {
                console.log('no');
                this.questions.forEach(question => {
                    if (question.type === 'table') {
                        this.state.answers[question.id] = [];
                        this.virtualState.answers[question.id] = [];
                        for (let row = 0; row < question.configuration.column_title.length; row ++) {
                            this.state.answers[question.id].push([]);
                            this.virtualState.answers[question.id].push([]);
                            for (let col = 0; col < question.configuration.column_type.length; col ++) {
                                switch (question.configuration.column_type[col]) {
                                    case 'check':
                                        this.state.answers[question.id][row].push(false);
                                        this.virtualState.answers[question.id][row].push(false);
                                        break;
                                    case 'input':
                                        this.state.answers[question.id][row].push('');
                                        this.virtualState.answers[question.id][row].push('');
                                        break;
                                    default:
                                        break;
                                }
                            }
                        }
                    } else {
                        this.state.answers[question.id] = '';
                        this.virtualState.answers[question.id] = '';
                    }

                });
                this.setState({
                    answers: this.state.answers
                }, ()=> {
                })
            }
        });
    }

    handleChange(aid, answers) {
        this.virtualState.answers[aid] = answers;
        console.log(this.virtualState);
       // this.state.answers[aid] = answers;
        /*this.setState({
           answers: this.state.answers
        }, ()=> {
            console.log(this.state);
        });*/
    }


    setContent = () => {
        AsyncStorage.setItem('PID1', JSON.stringify(this.virtualState), (error) => {
            console.log(error);
            console.log('111');
        })
    };

    getContent = () => {
        console.log('getting');
        try {
            AsyncStorage.getItem('PID1', (result) => {
                alert(result);
                console.log(result);
                this.setState({
                    answer: result
                })
            });
        } catch (e) {
            console.log(e);
        }
    };

    switch_Widget = (widget) => {
        switch (widget.type)
        {
            case 'input':
                return ( <NormalInputComponent handleChange={this.handleChange} value={this.state.answers[widget.id]} title = {widget.tittle} id = {widget.id} />);

            case 'radio':
                return (
                    <RadioGroupComponent handleChange={this.handleChange} value={this.state.answers[widget.id]} title = {widget.tittle} id = {widget.id} options = {widget.content}/>
                );
            case 'date':
                return (
                    <MyDatePicker handleChange={this.handleChange} value={this.state.answers[widget.id]} title = {widget.tittle} id = {widget.id}/>
                );
            case 'checkbox':
                return (
                    <CheckBoxComponent handleChange={this.handleChange} value={this.state.answers[widget.id]} title = {widget.tittle} id = {widget.id} options = {widget.content}/>
                );
            case 'table':
                return (
                    <TableComponent handleChange={this.handleChange}  title = {widget.tittle} id = {widget.id} configuration = {widget.configuration} value={this.state.answers[widget.id]}/>
                );
            default:
                return (<Text>
                    other
                    </Text>
                    )
        }
    };

    render() {
        const { params } = this.props.navigation.state;
       // console.log(this.state);
        return (
            <Container>
                <View>
                    <Button light onPress={this.setContent}><Text> setDate </Text></Button>
                </View>
                <View>
                    <Button light onPress={this.getContent}><Text> getDate </Text></Button>
                </View>
                <Content>

                    {/*<Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.2.1']} title = '姓名：' id = '1.2.1' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.2.2']} title = '您所在单位名称：' id = '1.2.2' />
                    </Item>
                    <Item>
                        <RadioGroupComponent handleChange={this.handleChange} value={this.state['1.3']} title = '性别' id = '1.3' options = {[
                            '男',
                            '女'
                        ]}/>
                    </Item>
                    <Item>
                        <CheckBoxComponent title = 'checkbox' id = '1.3.1' options = {[
                            '城镇职工医疗保险',
                            '商业医疗保险',
                            '城镇居民医疗保险',
                            '公费医疗',
                            '新型农村合作医疗保险',
                            '其他 ->转至问题1.5.2.a'
                        ]}/>
                    </Item>
                    <Item>
                        <MyDatePicker title = '出生日期(可以直接输入，格式20xx-xx-xx）' id = '1.4'/>
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.5']} title = '身份证号码（必填）：' id = '1.5' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.5.1']} title = '医保编号（必填）：' id = '1.5.1' />
                    </Item>
                    <Item>
                        <RadioGroupComponent handleChange={this.handleChange} value={this.state['1.5.2']} title = '医保类型' id = '1.5.2' options = {[
                            '城镇职工医疗保险',
                            '商业医疗保险',
                            '城镇居民医疗保险',
                            '公费医疗',
                            '新型农村合作医疗保险',
                            '其他 ->转至问题1.5.2.a'
                        ]}/>
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.5.2.a']} title = '如果选择其他医疗保险，那么是？' id = '1.5.2.a' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.6']} title = '家庭住址（为便于今后长期随访，请详细填写）：' id = '1.6' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.6.1']} title = '居委会/村委会/村医电话：' id = '1.6.1' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.7.1']} title = '手机号码：' id = '1.7.1' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.7.2']} title = '重要联系人的手机号码:' id = '1.7.2' />
                    </Item>
                    <Item>
                        <RadioGroupComponent handleChange={this.handleChange} value={this.state['1.8']} title = '你的民族' id = '1.8' options = {[
                            '汉族',
                            '回族',
                            '维族',
                            '哈萨克',
                            '蒙古',
                            '藏族',
                            '其他 ->转至问题1.8.a'
                        ]}/>
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.1']} title = '体检编号：（此项体检当天填写）' id = '1.1' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.2.1']} title = '姓名：' id = '1.2.1' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.2.2']} title = '您所在单位名称：' id = '1.2.2' />
                    </Item>
                    <Item>
                        <RadioGroupComponent handleChange={this.handleChange} value={this.state['1.3']} title = '性别' id = '1.3' options = {[
                            '男',
                            '女'
                        ]}/>
                    </Item>
                    <Item>
                        <MyDatePicker title = '出生日期(可以直接输入，格式20xx-xx-xx）' id = '1.4'/>
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.5']} title = '身份证号码（必填）：' id = '1.5' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.5.1']} title = '医保编号（必填）：' id = '1.5.1' />
                    </Item>
                    <Item>
                        <RadioGroupComponent handleChange={this.handleChange} value={this.state['1.5.2']} title = '医保类型' id = '1.5.2' options = {[
                            '城镇职工医疗保险',
                            '商业医疗保险',
                            '城镇居民医疗保险',
                            '公费医疗',
                            '新型农村合作医疗保险',
                            '其他 ->转至问题1.5.2.a'
                        ]}/>
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.5.2.a']} title = '如果选择其他医疗保险，那么是？' id = '1.5.2.a' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.6']} title = '家庭住址（为便于今后长期随访，请详细填写）：' id = '1.6' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.6.1']} title = '居委会/村委会/村医电话：' id = '1.6.1' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.7.1']} title = '手机号码：' id = '1.7.1' />
                    </Item>
                    <Item>
                        <NormalInputComponent handleChange={this.handleChange} value={this.state['1.7.2']} title = '重要联系人的手机号码:' id = '1.7.2' />
                    </Item>
                    <Item>
                        <RadioGroupComponent handleChange={this.handleChange} value={this.state['1.8']} title = '你的民族' id = '1.8' options = {[
                            '汉族',
                            '回族',
                            '维族',
                            '哈萨克',
                            '蒙古',
                            '藏族',
                            '其他 ->转至问题1.8.a'
                        ]}/>
                    </Item>*/}
                        {
                            this.questions.map((d, index) => (
                                <Item key={index}>
                                    {this.switch_Widget(d)}
                                </Item>
                            ))
                        }
                        {/*<Item style={{marginBottom: 50}}>
                            <TableComponent/>
                        </Item>*/}
                </Content>

            </Container>
        );
    }
}


