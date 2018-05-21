import React, { Component } from 'react';
import {Text, View, AsyncStorage} from 'react-native';
import {Container, Header, Title, Content, List, ListItem, Left, Right, Icon, Body, Button, Item, Input} from 'native-base';


export default class LocalInfo extends Component {

    static navigationOptions = {
        drawerLabel:'录入者信息配置',
    };

    constructor(props) {
        super (props);
        this.state = {
            username: '',
            password: ''
        }
        this.login = this.login.bind(this);
    }

    componentWillMount() {

    }

    handleChange(e, key) {
        this.setState({
            [key]: e
        }, () => {
            console.log(this.state);
        })
    }

    login() {
        console.log(this.state);
        if(this.state.username === '' || this.state.password === '') {
            alert('请完善登录信息');
        } else {
           fetch('http://59.110.52.133:9500/account/login/', {
               method: 'post',
               body: JSON.stringify({
                   username: this.state.username,
                   password: this.state.password})}
                   ).then((res) => res.json())
               .then((jsonData) => {
                   console.log(jsonData);
               })
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('DrawerOpen')
                        }}>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                    <Title>{'个人信息'}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{flex:1, alignItems: 'center', paddingTop: 100}}>
                    <View style={{width: 300, flexDirection: 'column'}}>
                        <Item>
                            <Icon active name='md-person' />
                            <Input placeholder='用户名' value={this.state.username} onChangeText={(value) => {this.handleChange(value, 'username')}}/>
                        </Item>
                        <Item>
                            <Icon active name='md-eye' />
                            <Input placeholder='密码' value={this.state.password} onChangeText={(value) => {this.handleChange(value, 'password')}}/>
                        </Item>

                    </View>
                        <View style={{marginTop: 20}}>
                        <Button rounded onPress={this.login}><Text style={{color: '#ffffff'}}> {'   登       录   '} </Text></Button>
                        </View>
                    </View>
                </Content>
            </Container>
        );
    }
}