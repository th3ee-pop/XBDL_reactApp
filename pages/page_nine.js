import React, { Component } from 'react';
import { AsyncStorage, Picker } from 'react-native';
import { QuestionList }from '../questionList';
import { Container, Content, Text, Item, Separator} from 'native-base';
import NormalInputComponent from '../components/input-normal';
import RadioGroupComponent from '../components/radio-group';
import MyDatePicker from '../components/date-picker';
import CheckBoxComponent from '../components/check-box';
import TableComponent from '../components/table';

export default class Page_9 extends Component {

    myQuestions = new QuestionList().questions[8];

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
    }

    handleChange(index, answers) {
        this.virtualState.answers[index].Record_Value = answers;
        console.log(this.virtualState);
        this.props.handleChange(8, this.virtualState.answers);
    }


    switch_Widget = (widget, index) => {
        switch (widget.type)
        {
            case 'input':
                return ( <NormalInputComponent content = {widget.content} index={index} handleChange={this.handleChange} value={this.state.answers[index].Record_Value} title = {widget.tittle} id = {widget.id} />);

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
                            <Item key={index}>
                                {this.switch_Widget(d, index)}
                            </Item>
                        ))
                    }
                    <Separator style={{alignItems: 'center'}}>
                        <Text>
                            本页结束
                        </Text>
                    </Separator>
                </Content>

            </Container>
        );
    }
}


