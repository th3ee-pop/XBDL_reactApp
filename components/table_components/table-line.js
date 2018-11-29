import React, { Component } from 'react';
import { StyleSheet , View, ScrollView, TextInput, ActivityIndicator, DatePickerAndroid} from 'react-native';
import {Content, Form, Input, Label, Item, Text, Button, Icon } from 'native-base';
import CheckBox from 'react-native-check-box';
import DatePicker from 'react-native-datepicker'
import { Table, TableWrapper, Row, Cell } from 'react-native-table-component';



export default class TableLineComponent extends Component {


    constructor(props) {
        super (props);
        this.state = {
            tableData: [

            ],
            answers: [

            ],
            valid: [

            ],
            loading: true
        };
        this.changeOptionSingle = this.changeOptionSingle.bind(this);
        this.changeInputValue = this.changeInputValue.bind(this);
        this.openDatePicker = this.openDatePicker.bind(this);
        this.switch_Widget = this.switch_Widget.bind(this);
        this.checkValid = this.checkValid.bind(this);
        this.check51Valid = this.check51Valid.bind(this);
        this.changeDateValue = this.changeDateValue.bind(this);
        this.changeOptionDoubleTrue = this.changeOptionDoubleTrue.bind(this);
        this.changeOptionDoubleFalse = this.changeOptionDoubleFalse.bind(this);
    }
    componentWillMount() {
        const props = this.props;
        const validArray = [];
        this.props.config.forEach(d => {
            validArray.push(true)
        });
        this.setState({
            tableData: props.config,
            answers: props.answer,
            valid: validArray
        })

    }

    componentWillReceiveProps(props) {
        this.setState({
            answers: props.answer
        }, () => {
        })
    }


    changeOptionDoubleTrue = (index, method) => {
        this.state.answers[index].Record_Value = true;
        this.setState({
            answers: this.state.answers
        }, () => {
            this.props.handleChange(this.props.index, this.state.answers);
        })
    };

    changeOptionDoubleFalse = (index, method) => {
        this.state.answers[index].Record_Value = false;
        this.setState({
            answers: this.state.answers
        }, () => {
            this.props.handleChange(this.props.index, this.state.answers);
        })
    };

    changeOptionSingle = (index, method) => {
        this.state.answers[index].Record_Value = !this.state.answers[index].Record_Value;
        if (method === 'single') {
            this.state.answers.forEach((option, opt_index) => {
                if (opt_index !== index && typeof option.Record_Value === "boolean") {
                    this.state.answers[opt_index].Record_Value = false;
                }
            });
        }
        this.setState({
            answers: this.state.answers
        }, () => {
            this.props.handleChange(this.props.index, this.state.answers);
        })
    };

    changeInputValue = (value, index, localIndex) => {
        this.state.answers[index].Record_Value = value;
        this.setState({
            answers: this.state.answers
        }, () => {
            if (this.props.sourceTable === '5.1') {
                this.check51Valid(value, index, localIndex);
            } else {
                this.checkValid(value, index);
            }
            this.props.handleChange(this.props.index, this.state.answers);
        });
    };

    changeDateValue =  (value, index) => {
        this.state.answers[index].Record_Value = value;
        this.setState({
            answers: this.state.answers
        }, () => {
            const DateReg =  /^(?:(?!0000)[0-9]{4}-(?:(?:0[1-9]|1[0-2])-(?:0[1-9]|1[0-9]|2[0-8])|(?:0[13-9]|1[0-2])-(?:29|30)|(?:0[13578]|1[02])-31)|(?:[0-9]{2}(?:0[48]|[2468][048]|[13579][26])|(?:0[48]|[2468][048]|[13579][26])00)-02-29)$/;
            if(DateReg.test(value) === false && value!=='') {
                this.state.valid[index] = false;
                this.setState({
                    valid: this.state.valid
                })
            } else {
                this.state.valid[index] = true;
                this.setState({
                    valid: this.state.valid
                })
            }
            this.props.handleChange(this.props.index, this.state.answers);
        });
    };

    async openDatePicker(index) {
        const dateArray = this.state.answers[index].Record_Value.split('-');
        try {
            let {action, year, month, day} = await DatePickerAndroid.open({
                date: new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2])),
                maxDate: new Date()
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                let date = '';
                if (month < 9) {
                    date = `${year}-0${month+1}-${day}`;
                } else {
                    date = `${year}-${month+1}-${day}`;
                }
                this.changeDateValue(date, index);
            }
        } catch ({code, message}) {
            console.warn('无法打开日期选择',message);
        }
    }

    checkValid(value, index) {
        switch (this.props.validType) {
            case 'twonum':
                const twoReg = /^\d{0,2}$/;
                if(twoReg.test(value) === false && value!=='') {
                    this.state.valid[index] = false;
                    this.setState({
                        valid: this.state.valid
                    })
                } else {
                    this.state.valid[index] = true;
                    this.setState({
                        valid: this.state.valid
                    })
                }
                break;
            case 'threenum':
                const threeReg = /^\d{0,3}$/;
                if(threeReg.test(value) === false && value!=='') {
                    this.state.valid[index] = false;
                    this.setState({
                        valid: this.state.valid
                    })
                } else {
                    this.state.valid[index] = true;
                    this.setState({
                        valid: this.state.valid
                    })
                }
                break;
            case 'hours':
                const hoursReg = /^\d{0,2}$/;
                if(hoursReg.test(value)=== false && value !== '') {
                    this.state.valid[index] = false;
                    this.setState({
                        valid: this.state.valid
                    })
                } else if (hoursReg.test(value) === true && value > 24) {
                    this.state.valid[index] = false;
                    this.setState({
                        valid: this.state.valid
                    })
                } else
                    {
                    this.state.valid[index] = true;
                    this.setState({
                        valid: this.state.valid
                    })
                }
                break;
            case 'max20':
                const ageReg = /^\d{0,2}$/;
                if(ageReg.test(value) === false && value !== '') {
                    this.state.valid[index] = false;
                    this.setState({
                        valid: this.state.valid
                    })
                } else if (ageReg.test(value) === true && value > 20) {
                    this.state.valid[index] = false;
                    this.setState({
                        valid: this.state.valid
                    })
                }
                    else {
                    this.state.valid[index] = true;
                    this.setState({
                        valid: this.state.valid
                    })
                }
                break;
            case 'floatone':
                const floatOneReg = /^\d{1,2}(\.\d)?$/;
                if (floatOneReg.test(value) === false && value !== '') {
                    this.state.valid[index] = false;
                    this.setState({
                        valid: this.state.valid
                    })
                } else {
                    this.state.valid[index] = true;
                    this.setState({
                        valid: this.state.valid
                    })
                }
                break;
            case 'noChinese':
                if (/[\u4E00-\u9FA5]/i.test(value) === false && value !== '') {
                    this.state.valid[index] = false;
                    this.setState({
                        valid: this.state.valid
                    })
                } else {
                    this.state.valid[index] = true;
                    this.setState({
                        valid: this.state.valid
                    })
                }
                break;
            default:
                break;
        }
    }

    check51Valid(value, index, localIndex) {
      if (localIndex < 22) {
          const twoReg = /^\d{0,2}$/;
          if(twoReg.test(value) === false && value!=='') {
              this.state.valid[index] = false;
              this.setState({
                  valid: this.state.valid
              })
          } else {
              this.state.valid[index] = true;
              this.setState({
                  valid: this.state.valid
              })
          }
      }  else {
          const threeReg = /^\d{0,3}$/;
          if(threeReg.test(value) === false && value!=='') {
              this.state.valid[index] = false;
              this.setState({
                  valid: this.state.valid
              })
          } else {
              this.state.valid[index] = true;
              this.setState({
                  valid: this.state.valid
              })
          }
      }
    };


    switch_Widget = (widget, index) => {

        switch (widget.type)
        {
            case 'input':
                return (
                    <View>
                    <TextInput value={this.state.answers[index].Record_Value}  onChangeText={(value) => {this.changeInputValue(value, index, this.props.index)}}/>
                        {this.state.valid[index] ? (<View/>) : (<Text style={{color:'red'}}>
                        {'  所填内容有误'}
                    </Text>)}
                    </View>
                );

            case 'check':
                return (
                    <CheckBox isChecked={this.state.answers[index].Record_Value} onClick={() => {this.changeOptionSingle(index, this.props.method)}} style={{padding: 10}}/>
                );
            case 'co-check':
                return (
                    <View >
                      <CheckBox rightText={'是'}  onClick={() => {this.changeOptionDoubleTrue(index, this.props.method)}}  isChecked={this.state.answers[index].Record_Value === 'unselected' ? false : this.state.answers[index].Record_Value} />
                      <CheckBox rightText={'否'}  onClick={() => {this.changeOptionDoubleFalse(index, this.props.method)}}  isChecked={this.state.answers[index].Record_Value === 'unselected' ? false : !this.state.answers[index].Record_Value} />
                    </View>);
            case 'else':
                return (
                    <TextInput value={this.state.answers[index].Record_Value}  onChangeText={(value) => {this.changeInputValue(value, index)}}/>
                );
            case 'date':
                return (
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <Button transparent onPress={() => this.openDatePicker(index)} >
                            <Icon name={'md-calendar'} />
                        </Button>
                        <Input  type="text" value={this.state.answers[index].Record_Value} onChangeText={(value) => {this.changeDateValue(value, index)}}/>
                        {this.state.valid[index] ? (<View/>) : (<Text style={{color:'red'}}>
                            {'  日期格式有误'}
                        </Text>)}
                    </View>
                );
            default:
                return (<Text style={{marginLeft:10}}>
                        {widget.name.split('_')[0]}
                    </Text>
                )
        }
    };

    render() {
        return (
                                    <TableWrapper style={[styles.row, this.props.index%2 && {backgroundColor: '#F0F0F0'}]}>
                                        {
                                            this.state.tableData.map((cellData, cellIndex) => (
                                                <Cell key={cellIndex} data={this.switch_Widget(cellData, cellIndex)} textStyle={styles.text}/>
                                            ))
                                        }
                                    </TableWrapper>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: {  backgroundColor: '#C0C0C0' },
    text: { margin: 6, paddingLeft: 5 },
    row: { flexDirection: 'row'},
    btn: { width: 58, height: 18, backgroundColor: '#78B7BB',  borderRadius: 2 },
    btnText: { textAlign: 'center', color: '#fff' }
});