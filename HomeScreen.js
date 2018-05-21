import React, { Component } from 'react';
import {Text, View, AsyncStorage, ListView} from 'react-native';
import {Container, Header, Title, Content, List, ListItem, Left, Right, Icon, Body, Button, SwipeRow} from 'native-base';


export default class HomeScreen extends Component {

    static navigationOptions = {
        drawerLabel:'本地体检表管理',
    };

    constructor(props) {
        super (props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            Page1: '基本信息',
            Page2: '现病史',
            list: []
        }
    }

    componentWillMount() {
        AsyncStorage.getAllKeys((err, keys) => {
            console.log(keys);
            this.setState({
                list: keys
            }, () => {
                console.log(this.state);
            })
        });
    }

    removeItem(id, secId, rowId, rowMap) {
        console.log(secId);
        console.log(rowId);
        console.log(rowMap);
        AsyncStorage.removeItem(id, (err) => {
            if (err) {
                alert('删除失败');
            } else {
                alert('删除成功');
                rowMap[`${secId}${rowId}`].props.closeRow();
                const newData = [...this.state.list];
                newData.splice(rowId, 1);
                this.setState({ list: newData }, () => {
                    console.log(this.state);
                });
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
                    <Title>{'体检调查表管理'}</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <View style={{marginTop: 15, marginBottom: 10}}>
                        <Title style={{color: '#888888'}}>
                            {'本地存储记录：'}
                        </Title>
                    </View>
                    <List
                        dataSource={this.ds.cloneWithRows(this.state.list)}
                        renderRow={data =>
                            <ListItem onPress={() => {
                                this.props.navigation.navigate('Details', {
                                    id: data
                                })
                            }}>
                                <Text> {data} </Text>
                            </ListItem>}
                        renderLeftHiddenRow={data =>
                            (<Button full onPress={() => alert(data)}>
                                <Icon active name="md-arrow-round-up" />
                            </Button>)}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            (<Button full danger onPress={_ => this.removeItem(data, secId, rowId, rowMap)}>
                                <Icon active name="trash" />
                            </Button>)}
                        leftOpenValue={75}
                        rightOpenValue={-75}
                    />
               {/* <Button
                    title = 'Add New'
                    onPress={() => this.props.navigation.navigate('Details', {
                        pageInfo: this.state.Page1
                    })}
                />*/}
                </Content>
            </Container>
        );
    }
}