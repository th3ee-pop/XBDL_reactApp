import React, { Component } from 'react';
import { AsyncStorage, Picker } from 'react-native';
import { QuestionList }from '../questionList';
import { Container, Content, Text, Item, View, Button, Form, Label, Input} from 'native-base';
import NormalInputComponent from '../components/input-normal';
import RadioGroupComponent from '../components/radio-group';
import MyDatePicker from '../components/date-picker';
import CheckBoxComponent from '../components/check-box';
import TableComponent from '../components/table';

export default class Page_3 extends Component {

    myQuestions = new QuestionList().questions[2];

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
        this.virtualState.answers = this.props.answer;
        this.setState({
            answers: this.props.answer
        }, () => {
        })
        /*AsyncStorage.getItem('PID2').then((result) => {
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
        });*/
    }

    handleChange(index, answers) {
        this.virtualState.answers[index].Record_Value = answers;
        console.log(this.virtualState);
        this.props.handleChange(2, this.virtualState.answers);
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

    switch_Widget = (widget, index) => {
        switch (widget.type)
        {
            case 'input':
                return ( <NormalInputComponent index={index} handleChange={this.handleChange} value={this.state.answers[index].Record_Value} title = {widget.tittle} id = {widget.id} />);

            case 'radio':
                return (
                    <RadioGroupComponent index={index} handleChange={this.handleChange} value={this.state.answers[index].Record_Value} title = {widget.tittle} id = {widget.id} options = {widget.content}/>
                );
            case 'date':
                return (
                    <MyDatePicker index={index} handleChange={this.handleChange} value={this.state.answers[index].Record_Value} title = {widget.tittle} id = {widget.id}/>
                );
            case 'checkbox':
                return (
                    <CheckBoxComponent index={index} handleChange={this.handleChange} value={this.state.answers[index].Record_Value} title = {widget.tittle} id = {widget.id} options = {widget.content}/>
                );
            case 'table':
                return (
                    <TableComponent index={index} handleChange={this.handleChange}  title = {widget.tittle} id = {widget.id} configuration = {widget.configuration} value={this.state.answers[index].Record_Value}/>
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
                            <Item  key={index}>
                                {this.switch_Widget(d, index)}
                            </Item>
                        ))
                    }

                </Content>

            </Container>
        );
    }
}


