import React, { Component } from 'react';
import {Content, Form, Input, Label, Item , Icon, Text, View} from 'native-base';



export default class NormalInputComponent extends Component {


    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.sendHideSignal = this.sendHideSignal.bind(this);
        this.state = {
            value: '',
            valid: true,
            info: '',
        }
    }


    handleChange(e) {
        switch (this.props.content[0].validType) {
            case 'idc':
                const idReg =  /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
                if(idReg.test(e) === false) {
                this.setState({
                    value: e,
                    valid: false,
                    info: '身份证号有误'
                })} else {
                    this.setState({
                        value: e,
                        valid: true,
                        info: ''
                });
                }
                break;
            case 'phone':
                const phoneReg = /^1[34578]\d{9}$/;
                if(phoneReg.test(e) === false) {
                    this.setState({
                        value: e,
                        valid: false,
                        info: '手机号码有误'
                    })} else {
                    this.setState({
                        value: e,
                        valid: true,
                        info: ''
                    });
                }
                break;
            case 'home-phone':
                const homePhoneReg = /^(0[0-9]{2,3}-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$/;
                if(homePhoneReg.test(e) === false) {
                    this.setState({
                        value: e,
                        valid: false,
                        info: '电话号码有误'
                    })} else {
                    this.setState({
                        value: e,
                        valid: true,
                        info: ''
                    });
                }
                break;
            case 'twonum':
                const twoReg = /^\d{0,2}$/;
                if(twoReg.test(e) === false && e!=='') {
                    this.setState({
                        value: e,
                        valid: false,
                        info: '不合法的数字'
                    })} else {
                    this.setState({
                        value: e,
                        valid: true,
                        info: ''
                    });
                }
                break;
            case 'threenum':
                const threeReg = /^\d{0,3}$/;
                if(threeReg.test(e) === false && e!=='') {
                this.setState({
                    value: e,
                    valid: false,
                    info: '不合法的数字'
                })} else {
                this.setState({
                    value: e,
                    valid: true,
                    info: ''
                });
            }
            break;
            case 'insurance_num':
                const insReg = /^\d{0,18}$/;
                if(insReg.test(e) === false && e!=='') {
                    this.setState({
                        value: e,
                        valid: false,
                        info: '不合法的编号'
                    })} else {
                    this.setState({
                        value: e,
                        valid: true,
                        info: ''
                    });
                }
                break;
            case 'fivenum':
                const fiveReg = /^\d{0,5}$/;
                if(fiveReg.test(e) === false && e!=='') {
                    this.setState({
                        value: e,
                        valid: false,
                        info: '不合法的数字'
                    })} else {
                    this.setState({
                        value: e,
                        valid: true,
                        info: ''
                    });
                }
                break;
            case 'onenum':
                const oneReg = /^\d+(\.\d+)?$/;
                if(e > 7 || !oneReg.test(e)) {
                    this.setState({
                        value: e,
                        valid: false,
                        info: '不合法的数字'
                    })} else {
                    this.setState({
                        value: e,
                        valid: true,
                        info: ''
                    });
                }
                break;
            case 'floatone':
                const floatOneReg = /^\d{1,2}(\.\d)?$/;
                if(floatOneReg.test(e) === false && e!=='') {
                    this.setState({
                        value: e,
                        valid: false,
                        info: '不合法的数字'
                    })} else {
                    this.setState({
                        value: e,
                        valid: true,
                        info: ''
                    });
                }
                break;
            case 'number':
                const numReg = /^\d{8}$/;
                console.log(Number(e));
                if(numReg.test(Number(e)) === false) {
                    this.setState({
                        value: e,
                        valid: false,
                        info: '体检编号为8位数字'
                    })} else {
                    this.setState({
                        value: e,
                        valid: true,
                        info: ''
                    });
                }
                break;
            default:
                this.setState({
                    value: e,
                    valid: true,
                    info: ''
                });
                break;
        }
        /*this.setState({
            value: e
        });*/
        if (this.props.hiddenList && this.props.hide_value) {
            if (e === this.props.hide_value) {
                this.sendHideSignal(this.props.id, this.props.hiddenList[0]);
            } else {
                const recoverList = this.props.hiddenList[0].map(item => -item);
                console.log(recoverList);
                this.sendHideSignal(this.props.id, recoverList);
            }
        }
       this.props.handleChange(this.props.index, e);
    }

    sendHideSignal(index, id) {
        this.props.generateHideSignal(index, id);
    }

    componentWillMount() {
        if (this.props.hiddenList && this.props.hide_value) {
            if (this.props.value === this.props.hide_value) {
                this.sendHideSignal(this.props.id, this.props.hiddenList[0]);
            }
        }
        this.setState({
            value: this.props.value
        });
    }

    componentWillReceiveProps(props) {
        this.setState({
            value: props.value
        });
    }


    render() {
        const { func , value, title, id, hidden} = this.props;
        return (
            this.props.hidden === false ? ( <Content style={{top: 10}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <Item>
                        <Input type="text" value={this.state.value} onChangeText={(text) => {this.handleChange(text)}}/>
                        {
                            this.state.valid ? (
                                <View/>
                            ) : (<View>
                                    <Text style={{color:'red'}}>
                                        {this.state.info}
                                    </Text>
                                </View>
                            )
                        }

                    </Item>
                </Form>
            </Content>):(<View/>)
        )
       }
}