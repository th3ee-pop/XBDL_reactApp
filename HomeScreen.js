import React, { Component } from 'react';
import {Text, View, AsyncStorage, ListView ,Alert, ToastAndroid, NetInfo} from 'react-native';
import {Container, Header, Title, Content, List, ListItem, Left, Right, Icon, Body, Button, SwipeRow,Footer, FooterTab,Segment, Spinner, Tab, Tabs, TabHeading, Row} from 'native-base';
import {QuestionList} from "./questionList";
import { modelList } from "./qlmodel";


export default class HomeScreen extends Component {

    static navigationOptions = {
        drawerLabel:'本地体检表管理',
    };

    tableModel = new modelList();
    authMap = {
        1: '总管理员',
        2: '本省管理员',
        3: '高级用户',
        4: '普通用户'
    };

    constructor(props) {
        super (props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.us = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            Page1: '基本信息',
            Page2: '现病史',
            list: [],
            uploaded_list: [],
            logged_user: null,
            isConnected: null,
            loading: true,
            display: 1
        };
        this.switchPage = this.switchPage.bind(this);
    }

    componentWillMount() {
        AsyncStorage.getItem('_user', (err, user) => {
            if(err) {
            } else {
                if(user) {
                    this.setState({
                        logged_user: JSON.parse(user)
                    })
                }
            }
        });
        // check if the user has logged

        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({
                isConnected: isConnected
            })
        });
        AsyncStorage.getAllKeys((err, keys) => {
            keys = keys.filter((id) => {
                if(!isNaN(Number(id)))
                    return id;
            });
            AsyncStorage.multiGet(keys, (err, result) => {
                if(err) {
                    alert(err);
                } else {
                    const notUpload = result.filter((item) => {
                        if(JSON.parse(item[1]).status === 0)
                        return item;
                    });
                    const Uploaded = result.filter((item) => {
                        if(JSON.parse(item[1]).status === 1)
                        return item;
                    });
                    this.setState({
                        list: notUpload,
                        uploaded_list: Uploaded,
                        loading: false
                    })
                }
            })


        });
        // get the localStorage and divide them into two groups.
    }

    removeItem(id, secId, rowId, rowMap) {
        Alert.alert(
            '提示',
            '将记录从本地删除将不可恢复，确定要删除？',
            [
                {text:'取消', onPress: () => console.log('取消了'), style: 'cancel'},
                {text: '确定', onPress: () => {
                        AsyncStorage.removeItem(id[0], (err) => {
                            if (err) {
                                alert('删除失败');
                            } else {
                                rowMap[`${secId}${rowId}`].props.closeRow();
                                if (JSON.parse(id[1]).status === 0) {
                                    const newData = [...this.state.list];
                                    newData.splice(rowId, 1);
                                    this.setState({ list: newData }, () => {
                                        ToastAndroid.show('删除成功', ToastAndroid.SHORT);
                                    });
                                } else {
                                    const newData = [...this.state.uploaded_list];
                                    newData.splice(rowId, 1);
                                    this.setState({ uploaded_list: newData }, () => {
                                        ToastAndroid.show('删除成功', ToastAndroid.SHORT);
                                    });
                                }
                            }
                        })
                    }}
            ]
        )

    }
    //remove item from localStorage.
    checkIfConnected(id) {
        if (this.state.isConnected === true) {
            this.checkAndUpload(id);
        } else {
            ToastAndroid.show('您当前不处于网络环境下', ToastAndroid.SHORT);
        }
    }

    checkAndUpload(id) {
        AsyncStorage.getItem('_user', (err, data) => {
            if (err) {
                console.log(err);
            } else {
                if (data) {
                    this.uploadItem(id);
                } else {
                    Alert.alert(
                        '提示',
                        '上传功能需要您先登录。',
                        [
                            {text:'取消', onPress: () => console.log('取消了'), style: 'cancel'},
                            {text: '去登录', onPress: () => {
                                    this.props.navigation.navigate('LocalInfo');
                                }}
                        ]
                    )
                }
            }
        })
    }

    uploadExisted(id) {
        Alert.alert(
            '提示',
            '该记录已经上传过，继续上传可能会造成重复。确定要继续上传吗？',
            [
                {text:'取消', onPress: () => console.log('取消了'), style: 'cancel'},
                {text: '继续上传', onPress: () => {
                        this.checkIfConnected(id);
                    }}
            ]
        )
    }

    uploadItem(id) {
        ToastAndroid.show('正在上传', ToastAndroid.SHORT);
        AsyncStorage.getItem(id, (err, data) => {
            if (err) alert(err);
            else {
                const itemData = JSON.parse(data).answers;
                const allTableData = this.generateAvailable(itemData);
                allTableData.unshift({
                    "Record_ID": 'ID0_0',
                    "Record_Value": this.tableModel.questions
                });
                allTableData.unshift({
                    "Record_ID": 'ID0_2',
                    "Record_Value": '未完成'
                });
                allTableData.unshift({
                    "Record_ID": 'ID0_3',
                    "Record_Value": this.state.logged_user.province
                });
                allTableData.unshift({
                    "Record_ID": 'ID0_4',
                    "Record_Value": '2018年5月24日14时2分'
                });
                allTableData.unshift({
                    "Record_ID": 'ID0_5',
                    "Record_Value": this.state.logged_user.name
                });

                fetch("http://39.106.142.184:9501/healthexamination/recordop/", {
                    method: 'PUT',
                    body: JSON.stringify({
                        Records: allTableData
                    }),
                    headers: {
                        "X-CSRFToken": this.state.logged_user.TOKEN,
                        'Content-Type': 'application/json;charset=utf-8',
                    }
                })
                    .then(response => response.json())
                    .then((result) => {
                        if (result.Return === 2 || result.Return === 5) {
                            Alert.alert(
                                '提示',
                                '会话过期或其它设备登录，如需继续上传，您可能需要重新登录。',
                                [
                                    {text:'取消', onPress: () => console.log('取消了'), style: 'cancel'},
                                    {text: '去登录', onPress: () => {
                                            AsyncStorage.removeItem('_user', (err) => {
                                                if(err) {
                                                    alert(err)
                                                } else {
                                                    this.props.navigation.navigate('LocalInfo');
                                                }
                                            });
                                        }}
                                ]
                            )
                        } else if (result.Return === 0) {
                            ToastAndroid.show('上传成功', ToastAndroid.SHORT);
                            const newData = JSON.parse(data);
                            if (newData.status !== 1) {
                                newData.status = 1;
                                AsyncStorage.setItem(id, JSON.stringify(newData), (err) => {
                                    if(err) {
                                        ToastAndroid.show(err, ToastAndroid.SHORT);
                                    } else {
                                        this.state.list.forEach((item, index )=> {
                                            if(item[0] === id) {
                                                this.state.list.splice(index, 1);
                                            }
                                        });
                                        this.state.uploaded_list.push([id, JSON.stringify(newData)]);
                                        this.setState({
                                            list: this.state.list,
                                            uploaded_list: this.state.uploaded_list
                                        })
                                    }
                                })
                            }
                        } else if (result.Return === 1) {
                            ToastAndroid.show('上传失败，未知错误。', ToastAndroid.SHORT);
                        }
                    }).catch(err => {
                    ToastAndroid.show('您当前不处于网络环境下或网络不佳', ToastAndroid.SHORT);
                })
            }
        })
    }

    generateAvailable(data) {
        const sendData = [];
        data.forEach((page, index) => {
            page.forEach((item, id1) => {
                if(Array.isArray(item.Record_Value)) {
                    sendData.push(...this.disassembleTable(item));
                } else {
                    if (item.Record_Value !== '') {
                        if (item.Record_Value === 'nothing') {

                        } else {
                            sendData.push(item);
                        }
                    }
                }
            })
        });
        return sendData;
    }

    disassembleTable(data) {
        if(Array.isArray(data.Record_Value[0])) {
            const tableData = data.Record_Value;
            switch (data.Record_ID) {
                case 'ID5_1': {
                    tableData.forEach((row, index) => {
                        if (index === 29) {
                            const checkRow = row.splice(1, 5);
                            checkRow.forEach((d, col) => {
                                if(d.Record_Value === true) {
                                    row.push({
                                        "Record_ID": `ID5_1_${index + 1}`,
                                        "Record_Value": col
                                    })
                                }
                            })
                        } else {
                            const checkRow = row.splice(0, 6);
                            checkRow.forEach((d, col) => {
                                if(d.Record_Value === true) {
                                    row.push({
                                        "Record_ID": `ID5_1_${index + 1}`,
                                        "Record_Value": col - 1
                                    })
                                }
                            })
                        }
                    });
                   // console.log(tableData);
                    break;
                }
                case 'ID5_4': {
                    tableData.forEach((row, index) => {
                            const checkRow = row.splice(0, 6);
                            checkRow.forEach((d, col) => {
                                if(d.Record_Value === true) {
                                    row.push({
                                        "Record_ID": `ID5_4_${index + 1}`,
                                        "Record_Value": col - 1
                                    })
                                }
                            })
                    });
                    break;
                }
                case 'ID7_8': {
                    tableData.forEach((row, index) => {
                        if (index !== 25 && index !== 26) {
                            row.splice(0, 1);
                        }
                    });
                    break;
                }
                case 'ID8_13': {
                    tableData.forEach((row, index) => {
                        const checkRow = row.splice(0, 6);
                        checkRow.forEach((d, col) => {
                            if(d.Record_Value === true) {
                                row.push({
                                    "Record_ID": `ID8_13_${index + 1}`,
                                    "Record_Value": col - 1
                                })
                            }
                        })
                    });
                    break;
                }
                default: {
                    tableData.forEach((row) => {
                        row.shift();
                    });
                    break;
                }
            }
            const tableDataPair = [];
            tableData.forEach((row) => {
                tableDataPair.push(...row);
            });
            return tableDataPair;
        } else {
            const goodData = [];
            data.Record_Value.forEach((option) => {
                if (option.Record_Value === true) {
                    goodData.push(option);
                }
            });
            return goodData;
        }
    }

    switchPage(page) {
        this.setState({
            display: page
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
                    <Right>
                        <Button transparent onPress={() => {
                            this.props.navigation.navigate('Details', {
                                id: 'NO-ID'
                            })
                        }}>
                            <Icon name='md-add' />
                        </Button>
                    </Right>
                </Header>

                <Content>
                    {
                        this.state.display === 1 ? (
                            <Container>
                                <View style={{marginTop: 15, marginBottom: 10}}>
                                    <Title style={{color: '#888888'}}>
                                        {`本地未上传记录${this.state.list.length}条：`}
                                    </Title>
                                </View>
                                {
                                    this.state.loading ? (
                                        <Spinner color='blue'/>
                                    ) : (
                                        <List key={'list1'}
                                            dataSource={this.ds.cloneWithRows(this.state.list)}
                                            renderRow={(data) =>
                                                <ListItem style={{alignItems: 'center'}} onPress={() => {
                                                    this.props.navigation.navigate('Details', {
                                                        id: data[0]
                                                    })
                                                }}>
                                                    <Text> {`${JSON.parse(data[1]).updateTime.substr(0, 10)}录入，编号:${data[0]}`} </Text>
                                                </ListItem>}
                                            renderLeftHiddenRow={data =>
                                                (<Button full onPress={() => {
                                                    this.checkAndUpload(data[0])
                                                }}>
                                                    <Icon active name="md-arrow-round-up"/>
                                                </Button>)}
                                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                                (<Button full danger
                                                         onPress={_ => this.removeItem(data, secId, rowId, rowMap)}>
                                                    <Icon active name="trash"/>
                                                </Button>)}
                                            leftOpenValue={75}
                                            rightOpenValue={-75}
                                        />
                                    )
                                }
                            </Container>
                        ) : (
                            <Container>
                                <View style={{marginTop: 15, marginBottom: 10}}>
                                    <Title style={{color: '#888888'}}>
                                        {`本地已上传记录${this.state.uploaded_list.length}条：`}
                                    </Title>
                                </View>
                                {
                                    this.state.loading ? (
                                        <Spinner color='blue'/>
                                    ) : (
                                        <List key={'list2'}
                                            dataSource={this.us.cloneWithRows(this.state.uploaded_list)}
                                            renderRow={(data) =>
                                                <ListItem style={{alignItems: 'center'}} onPress={() => {
                                                    this.props.navigation.navigate('Details', {
                                                        id: data[0]
                                                    })
                                                }}>
                                                    <Text> {`${JSON.parse(data[1]).updateTime.substr(0, 10)}录入，编号:${data[0]}`} </Text>
                                                </ListItem>}
                                            renderLeftHiddenRow={data =>
                                                (<Button full onPress={() => {
                                                    this.uploadExisted(data[0])
                                                }}>
                                                    <Icon active name="md-arrow-round-up"/>
                                                </Button>)}
                                            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                                                (<Button full danger
                                                         onPress={_ => this.removeItem(data, secId, rowId, rowMap)}>
                                                    <Icon active name="trash"/>
                                                </Button>)}
                                            leftOpenValue={75}
                                            rightOpenValue={-75}
                                        />
                                    )
                                }
                            </Container>
                        )
                    }

                </Content>
                <Footer style={{alignItems: 'center'}}>
                    <Row>
                        <FooterTab>
                            <Button active={this.state.display === 1} onPress={() => this.switchPage(1)}>
                                <Icon name="archive" />
                                <Text style={{color: '#ffffff'}}>{'未上传'}</Text>
                            </Button>
                            <Button active={this.state.display === 2} onPress={() => this.switchPage(2)}>
                                <Icon name="cloud" />
                                <Text style={{color: '#ffffff'}}>{'已上传'}</Text>
                            </Button>
                        </FooterTab>
                    </Row>
                    {/*<Row>
                    <Text style={{color: '#ffffff'}}>
                        {
                            this.state.logged_user===null ? (
                                '未登录'
                            ) : (
                                `当前用户:${this.state.logged_user.name}    所属省份:${this.state.logged_user.province}    权限:${this.authMap[this.state.logged_user.group]}`
                            )
                        }
                    </Text>
                    </Row>*/}
                </Footer>
            </Container>
        );
    }
}