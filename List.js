import React, { Component } from 'react';
import { QuestionList }from './questionList';
import { Container, Content, Text, Item, View, Button } from 'native-base';
import NormalInputComponent from './components/input-normal';
import RadioGroupComponent from './components/radio-group';
import MyDatePicker from './components/date-picker';
import CheckBoxComponent from './components/check-box';

export default class Touchables extends Component {

    constructor(props) {
        super(props);
        this.state = {
            answer: {}
        };
        this.virtualState = {
        };
        this.handleChange = this.handleChange.bind(this);
    }

    questions = new QuestionList().questions[0];
    componentDidMount() {
        this.questions.forEach(question => this.state.answer[question.id] = '');
        this.questions.forEach(question => this.virtualState[question.id] = '');
        console.log(this.virtualState);
        console.log(this.state);
        this.setState({
            answer: this.state.answer
        }, ()=> {
            console.log(this.state)
        })
    }

    handleChange(aid, answers) {
        /*this.setState(
            {
           [aid]: answers
        });*/
        this.virtualState[aid] = answers;
        console.log(this.virtualState);
    }

    updateState = () => {
        console.log(this.virtualState);
        console.log(this.state);
        this.setState({
            answer: this.virtualState
        }, () => {
            console.log(this.state);
            console.log(this.virtualState);
        })
    };

    switch_Widget = (widget) => {
        switch (widget.type)
        {
            case 'input':
                return ( <NormalInputComponent handleChange={this.handleChange} value={this.virtualState[widget.id]} title = {widget.tittle} id = {widget.id} />);

            case 'radio':
                return (
                    <RadioGroupComponent handleChange={this.handleChange} value={this.virtualState[widget.id]} title = {widget.tittle} id = {widget.id} options = {widget.content}/>
                );
            case 'date':
                return (
                    <MyDatePicker title = {widget.tittle} id = {widget.id}/>
                );
            case 'checkbox':
                return (
                    <CheckBoxComponent title = {widget.tittle} id = {widget.id} options = {widget.content}/>
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
        return (
            <Container>
                <View>
                    <Button light onPress={this.updateState}><Text> Light </Text></Button>
                </View>
                <Content>
                    {/*<Item>
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
                            this.questions.map(d => (
                                <Item key={d.tittle}>
                                    {this.switch_Widget(d)}
                                </Item>
                            ))
                        }
                </Content>

            </Container>
        );
    }
}


