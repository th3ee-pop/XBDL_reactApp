import React, { Component } from 'react';
import {Content, Form, Input, Label, Item , Icon, Text, View} from 'native-base';



export default class NormalInputComponent extends Component {


    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
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
            case 'onenum':
                if(e > 7) {
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
       this.props.handleChange(this.props.index, e);
    }

    componentWillMount() {
        console.log(this.props.hidden);
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