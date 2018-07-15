import React, { Component } from 'react';
import {Text, View, AsyncStorage, Alert, ToastAndroid, StyleSheet} from 'react-native';
import {Container, Header, Title, Content, List, ListItem, Left, Right, Icon, Body, Button, Item, Input, Toast, Separator, Footer, FooterTab, Spinner} from 'native-base';


export default class LocalInfo extends Component {

    static navigationOptions = {
        drawerLabel:'录入者信息',
    };
    authMap = {
        1: '总管理员',
        2: '本省管理员',
        3: '高级用户',
        4: '普通用户'
    };
    constructor(props) {
        super (props);
        this.state = {
            username: '',
            password: '',
            logged_user: null,
            showToast: false,
            loading: false
        };
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem('_user', (error, result) => {
            if (error) {
                console.log(error)
            } else {
                this.setState({
                    logged_user: JSON.parse(result)
                })
            }
        })
    }

    handleChange(e, key) {
        this.setState({
            [key]: e
        })
    }

    login() {

        if(this.state.username === '' || this.state.password === '') {
            ToastAndroid.show('请完善登录信息', ToastAndroid.SHORT);
        } else {
            this.setState({
                loading: true
            });
            const userInfo = {
                username: this.state.username,
                password: this.state.password
            };
           fetch('http://39.106.142.184:9501/account/login/', {
               method: 'post',
               body: JSON.stringify(userInfo)
           }
           )
               .then((res) => res.json())
               .then((jsonData) => {
                   if(jsonData.Return === 1) {
                       this.setState({
                           loading: false
                       }, () => {
                           ToastAndroid.show('用户名或密码错误', ToastAndroid.SHORT);
                       });
                   } else {
                       this.setState({
                           loading:false
                       }, () => {
                           AsyncStorage.setItem('_user', JSON.stringify(jsonData), (error => {
                               if(error) {
                                   alert(error);
                               } else {
                                   this.setState({
                                       logged_user:jsonData
                                   }, () => {
                                       ToastAndroid.show('登录成功', ToastAndroid.SHORT);
                                       this.props.navigation.navigate('Home');
                                   })
                               }
                           }))
                       });
                   }

               })
               .catch((err) => {
                   this.setState({
                       loading: false
                   });
                   ToastAndroid.show(err, ToastAndroid.SHORT);
               })
        }
    }

    logout() {
        AsyncStorage.removeItem('_user', (err) => {
            if(err) {
                alert(err)
            } else {
                this.setState({
                    logged_user: null
                }, () => {
                    ToastAndroid.show('已登出', ToastAndroid.SHORT);
                })
            }
        })
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
                {
                    this.state.logged_user === null ? (
                        <Content>
                            {
                                this.state.loading && <View style={styles.loading}>
                                    <Spinner/>
                                    <Text>{'登录中，请等待'}</Text>
                                </View>
                            }
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
                    ):(
                        <Content>
                            <Separator bordered>
                                <Text></Text>
                            </Separator>
                                <ListItem icon>
                                    <Left>
                                        <Icon name={"md-person"}/>
                                    </Left>
                                    <Body>
                                    <Text>用户名</Text>
                                    </Body>
                                    <Right>
                                        <Text>{this.state.logged_user.name}</Text>
                                    </Right>
                                </ListItem>
                                <ListItem icon>
                                    <Left>
                                        <Icon name={"md-home"}/>
                                    </Left>
                                    <Body>
                                    <Text>所属省份</Text>
                                    </Body>
                                    <Right>
                                        <Text>{this.state.logged_user.province}</Text>
                                    </Right>
                                </ListItem>
                            <ListItem icon>
                                <Left>
                                    <Icon name={"md-finger-print"}/>
                                </Left>
                                <Body>
                                <Text>用户权限</Text>
                                </Body>
                                <Right>
                                    <Text>{this.authMap[this.state.logged_user.group]}</Text>
                                </Right>
                            </ListItem>
                        </Content>
                    )
                }
                {
                    this.state.logged_user === null ? (
                        <View/>
                    ) : (
                        <Footer>
                        <FooterTab>
                        <Button vertical onPress={this.logout}>
                    <Icon name="undo" />
                    <Text style={{color: '#ffffff'}}>退出登录</Text>
                    </Button>
                    </FooterTab>
                    </Footer>
                    )
                }

            </Container>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000
    }
});