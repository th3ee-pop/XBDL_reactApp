/**
 * Created by th3ee on 2018/7/11.
 */
import React, { Component } from 'react';
import {Content, Form, Input, Label, Item , Icon, Text, View} from 'native-base';



export default class InputWeekComponent extends Component {


    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.transToWeek = this.transToWeek.bind(this);
        this.state = {
            year: '',
            month: '',
            week: '',
            valid_year: true,
            valid_month: true,
            valid_week: true
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
                    this.props.handleChange(this.props.index, this.transToWeek(this.state.year, this.state.month, this.state.week).toString());
                });
            } else {
                this.setState({
                    year: e,
                    valid_year: true
                }, () => {
                    this.props.handleChange(this.props.index, this.transToWeek(this.state.year, this.state.month, this.state.week).toString());
                });
            }

        } else if (unit === 1) {
            if (e !== '' && e > 12) {
                this.setState({
                    month: e,
                    valid_month: false
                }, ()=> {
                    this.props.handleChange(this.props.index, this.transToWeek(this.state.year, this.state.month, this.state.week).toString());
                });
            } else {
                this.setState({
                    month: e,
                    valid_month: true
                }, ()=> {
                    this.props.handleChange(this.props.index, this.transToWeek(this.state.year, this.state.month, this.state.week).toString());
                });
            }

        } else {
            if (e !== '' && e > 4) {
                this.setState({
                    week: e,
                    valid_week: false
                }, ()=> {
                    this.props.handleChange(this.props.index, this.transToWeek(this.state.year, this.state.month, this.state.week).toString());
                });
            } else {
                this.setState({
                    week: e,
                    valid_week: true
                }, ()=> {
                    this.props.handleChange(this.props.index, this.transToWeek(this.state.year, this.state.month, this.state.week).toString());
                });
            }
        }

    }

    transToWeek(year?, month?, week?) {
        console.log(year);
        console.log(month);
        console.log(week);
        if (year && !month && !week) {
            return parseInt(year)*12*4;
        } else if (!year && month && !week) {
            return parseInt(month)*4;
        }  else if (!year && !month && week){
            return parseInt(week);
        } else if (year && month && !week){
            return parseInt(year)*12*4 + parseInt(month)*4;
        } else if (year && week && !month) {
            return parseInt(year)*12*4 + parseInt(week);
        } else if (!year && month && week) {
            return parseInt(month)*4 + parseInt(week);
        } else if (year && month && week) {
            return parseInt(year)*12*4+parseInt(month)*4+parseInt(week)
        } else {
            return 0;
        }
    }

    componentWillMount() {
        if (this.props.value !== '') {
            console.log('valid');
            let weekNum = parseInt(this.props.value);
            let month;
            let year;
            if (weekNum > 4) {
                month = parseInt(weekNum/4);
                if (month > 11) {
                    year = parseInt(month/12);
                    month = month%12;
                    weekNum = weekNum-year*12*4-month*4;
                } else {
                    year = 0;
                    weekNum = weekNum - month*4;
                }
            } else {
                month = year = 0;
            }


            this.setState({
                year: year.toString(),
                month: month.toString(),
                week: weekNum.toString()
            });
        }
    }

    componentWillReceiveProps(props) {
        console.log(props.value);
        if (props.value !== '') {
            console.log('valid');
            let weekNum = parseInt(props.value);
            let month;
            let year;
            if (weekNum > 4) {
                month = parseInt(weekNum/4);
                if (month > 11) {
                    year = parseInt(month/12);
                    month = month%12;
                    weekNum = weekNum-year*12*4-month*4;
                } else {
                    year = 0;
                    weekNum = weekNum - month*4;
                }
            } else {
                month = year = 0;
            }


            this.setState({
                year: year.toString(),
                month: month.toString(),
                week: weekNum.toString()
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
                        <Text>个月,  </Text>
                        <Input  type="text" value={this.state.week} onChangeText={(text) => {this.handleChange(text, 2)}}/>
                        {
                            this.state.valid_week ? (
                                <View/>
                            ) : (<View>
                                    <Text style={{color:'red'}}>
                                        {'不合法的周数'}
                                    </Text>
                                </View>
                            )
                        }
                        <Text>周</Text>
                    </Item>
                </Form>
            </Content>) : (<View/>)

        )
    }
}