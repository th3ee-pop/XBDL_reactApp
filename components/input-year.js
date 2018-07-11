import React, { Component } from 'react';
import {Content, Form, Input, Label, Item , Icon, Text, View} from 'native-base';



export default class InputYearComponent extends Component {


    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.transToMonth = this.transToMonth.bind(this);
        this.state = {
            year: '',
            month: '',
            valid_year: true,
            valid_month: true
        }
    }


    handleChange(e, unit) {
        if (unit === 0) {
            const yearReg = /^\d{0,2}$/;
            if (yearReg.test(e) === false && e !== '') {
                this.setState({
                    year: e,
                    valid_year: false
                }, () => {
                    this.props.handleChange(this.props.index, this.transToMonth(this.state.year, this.state.month).toString());
                });
            } else {
                this.setState({
                    year: e,
                    valid_year: true
                }, () => {
                    this.props.handleChange(this.props.index, this.transToMonth(this.state.year, this.state.month).toString());
                });
            }

        } else {
            if (e !== '' && e > 12) {
                this.setState({
                    month: e,
                    valid_month: false
                }, ()=> {
                    this.props.handleChange(this.props.index, this.transToMonth(this.state.year, this.state.month).toString());
                });
            } else {
                this.setState({
                    month: e,
                    valid_month: true
                }, ()=> {
                    this.props.handleChange(this.props.index, this.transToMonth(this.state.year, this.state.month).toString());
                });
            }

        }

    }

    transToMonth(year?, month?) {
        console.log(year);
        console.log(month);
        if (year && !month) {
            return parseInt(year)*12;
        } else if (!year && month) {
            return parseInt(month);
        }  else if (year && month){
            return parseInt(year)*12 + parseInt(month);
        } else {
            return 0;
        }
    }

    componentWillMount() {
        if (this.props.value !== '') {
            console.log('valid');
            const monthNum = parseInt(this.props.value);
            const year = parseInt(monthNum/12);
            const month = monthNum%12;
            this.setState({
                year: year.toString(),
                month: month.toString()
            });
        }
    }

    componentWillReceiveProps(props) {
        if (props.value !== '') {
            const monthNum = parseInt(props.value);
            const year = parseInt(monthNum/12);
            const month = monthNum%12;
            this.setState({
                year: year.toString(),
                month: month.toString()
            });
        }
    }


    render() {
        const { func , value, title, id } = this.props;
        return (this.props.hidden === false ? (<Content style={{top: 10}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <Item>
                        <Input  type="text" value={this.state.year} onChangeText={(text) => {this.handleChange(text, 0)}}/>
                        {
                            this.state.valid_year ? (
                                <View/>
                            ) : (<View>
                                    <Text style={{color:'red'}}>
                                        {'不合法的年数'}
                                    </Text>
                                </View>
                            )
                        }
                        <Text>{'年，    '}</Text>
                        <Input  type="text" value={this.state.month} onChangeText={(text) => {this.handleChange(text, 1)}}/>
                        {
                            this.state.valid_month ? (
                                <View/>
                            ) : (<View>
                                    <Text style={{color:'red'}}>
                                        {'不合法的月数'}
                                    </Text>
                                </View>
                            )
                        }
                        <Text>个月</Text>
                    </Item>
                </Form>
            </Content>) : (<View/>)

        )
    }
}