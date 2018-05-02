import React, { Component } from 'react';
import { AsyncStorage, Picker } from 'react-native';
import { QuestionList }from '../questionList';
import { Container, Content, Text, Item, View, Button, Form, Label, Input} from 'native-base';
import NormalInputComponent from '../components/input-normal';
import RadioGroupComponent from '../components/radio-group';
import MyDatePicker from '../components/date-picker';
import CheckBoxComponent from '../components/check-box';
import TableComponent from '../components/table';

export default class Page_10 extends Component {

    myQuestions = new QuestionList().questions[9];

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
        this.initialAnswers = this.initialAnswers.bind(this);
    }


    componentWillMount() {
        console.log(this.state);
        console.log('mounting');
        AsyncStorage.getItem('PID2').then((result) => {
            if(result) {
                console.log('had');
                this.myQuestions.forEach(question => {
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
                this.initialAnswers(this.myQuestions);
                this.setState({
                    answers: this.virtualState.answers
                }, ()=> {
                })
            }
        });
    }

    handleChange(aid, answers) {
        this.virtualState.answers[aid] = answers;
        console.log(this.virtualState);
    }


    setContent = () => {
        AsyncStorage.setItem('PID2', JSON.stringify(this.virtualState), (error) => {
            console.log(error);
            console.log('111');
        })
    };

    getContent = () => {
        console.log('getting');
        try {
            AsyncStorage.getItem('PID2', (result) => {
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

    initialAnswers(questions) {
        questions.forEach(question => {
            if (question.type === 'table') {
                /*if (!switching) {
                    this.state.answers[question.id] = [];
                }*/
                this.virtualState.answers[question.id] = [];
                for (let row = 0; row < question.configuration.column_title.length; row ++) {
                    /*if (!switching) {
                        this.state.answers[question.id].push([]);
                    }*/
                    this.virtualState.answers[question.id].push([]);
                    if (question.configuration.reverse) {
                        for (let col = 0; col<question.configuration.header.length; col ++) {
                            switch (question.configuration.column_type[row]) {
                                case 'check':
                                    //  this.state.answers[question.id][row].push(false);
                                    this.virtualState.answers[question.id][row].push(false);
                                    break;
                                case 'input':
                                    //  this.state.answers[question.id][row].push('');
                                    this.virtualState.answers[question.id][row].push('');
                                    break;
                                case 'date':
                                    //  this.state.answers[question.id][row].push('');
                                    this.virtualState.answers[question.id][row].push('');
                                    break;
                                default:
                                    break;
                            }
                        }
                    } else {
                        for (let col = 0; col<question.configuration.column_type.length; col ++) {
                            switch (question.configuration.column_type[col]) {
                                case 'check':
                                    //   this.state.answers[question.id][row].push(false);
                                    this.virtualState.answers[question.id][row].push(false);
                                    break;
                                case 'input':
                                    //    this.state.answers[question.id][row].push('');
                                    this.virtualState.answers[question.id][row].push('');
                                    break;
                                case 'date':
                                    //   this.state.answers[question.id][row].push('');
                                    this.virtualState.answers[question.id][row].push('');
                                    break;
                                default:
                                    break;
                            }
                        }
                    }
                }
            } else {
                //   this.state.answers[question.id] = '';
                this.virtualState.answers[question.id] = '';
            }
        })
    }

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
        return (
            <Container>
                <Content>
                    {
                        this.myQuestions.map((d, index) => (
                            <Item key={index}>
                                {this.switch_Widget(d)}
                            </Item>
                        ))
                    }

                </Content>

            </Container>
        );
    }
}


