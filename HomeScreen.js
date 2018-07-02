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
    // 这里的tableModel用于在进行上传时，提供网页端题目隐藏情况的questionList，相当于网页端初始化体检表的时候，存的那个json。

    authMap = {
        1: '总管理员',
        2: '本省管理员',
        3: '高级用户',
        4: '普通用户'
    };
    // 这里建立一个dictionary，便于知道现在的用户权限。

    constructor(props) {
        super (props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.us = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 用于初始化已上传和未上传两个list。

        this.state = {
            list: [],
            uploaded_list: [],
            logged_user: null,
            isConnected: null,
            loading: true,
            display: 1
        };
        // 当前页面的功能是显示本地有的所有体检表记录，因此保护以下state:
        // list[]: 所有未上传的体检表列表
        // uploaded_list[]: 所有已经上传的体检表列表
        // logged_user: 当前登录的用户
        // isConnected: 是否连接了网络
        // loading: 用于显示加载“加载中”图标
        // display: 用于判断当前显示“已上传”还是“未上传”

        this.switchPage = this.switchPage.bind(this);
    }


    // 钩子函数，用于在组件加载完成前实现相应功能。
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
        // 从AsyncStorage(类似于浏览器的localStorage，区别在于移动端的storage操作都是异步的，这点在编程时要注意)
        // 如果用户已经登录，获得当前用户的登录信息


        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState({
                isConnected: isConnected
            })
        });
        // 检查是否连接了网络


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
                    }, ()=> {
                        console.log(this.state.uploaded_list);
                    })
                }
            })
        });
        // 这里是获得所有本地存储的记录，并根据status字段，判断它是上传过的还是未上传的，并更新到相应的list数组
    }

    //删除本地记录的方法
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


    //上传的第一步，先检查有没有连接网络，有的话，进行下一步check，否则提示“没有网络”
    checkIfConnected(id) {
        if (this.state.isConnected === true) {
            this.checkAndUpload(id);
        } else {
            ToastAndroid.show('您当前不处于网络环境下', ToastAndroid.SHORT);
        }
    }

    //上传的第二步，检查当前用户有没有登录，有的话，进行下一步，否则提示错误。
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

    // 上传已上传过的条目时，进行提示。
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

    // 发送http请求的上传函数
    uploadItem(id) {
        ToastAndroid.show('正在上传', ToastAndroid.SHORT);
        AsyncStorage.getItem(id, (err, data) => {
            if (err) alert(err);
            else {
                const itemData = JSON.parse(data).answers;
                const itemHideState = JSON.parse(data).hide_state;
                // 从选中的本地记录中，获得数据和题目隐藏的情况

                itemHideState[7].forEach((item, index) => {
                    if(item.ID === '8.0.1' || item.ID === '8.0.2') {
                        itemHideState[7].splice(index, 1);
                    }
                });
                itemHideState[9].splice(14, 1);
                // 去掉表单中的那几个文字性描述，他们是否隐藏不应该体现在网页端。只有第八和第十部分有，是app中新加入的。详见page_eight.js。


                itemHideState.forEach((page, page_index) => {
                    page.forEach((item, item_index) => {
                        this.tableModel.questions[page_index][item_index].hidden = itemHideState[page_index][item_index].hidden
                    })
                });
                // 将我们一开始初始化的json中的hidden情况一一对应填好。


                const allTableData = this.generateAvailable(itemData);
                // 生成那些要发送的答案对儿

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
                // 加入我们一开始初始化的用于隐藏json，完成状态，省份，完成时间，完成者的信息


                for (let i = 0; i < allTableData.length; i++) {
                    if (allTableData[i].Record_ID.substr(0, 7) === 'ID7_8_a' || allTableData[i].Record_ID.substr(0, 7) === 'ID7_8_c' ||allTableData[i].Record_ID.substr(0, 7) === 'ID7_8_d') {
                        if(!allTableData[i].Record_Value)
                        {
                            allTableData.splice(i, 1);
                            i = i-1;
                        }
                    }
                }
                // 填坑，这里网页端的table7_8的存储有点问题，我必须过滤掉所有不是true的选项。

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
                            ) // 发送http请求，如果返回token相关的问题，则提示需要登录
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
                            } // 上传成功，进行相应处理——已上传的如果再上传，则条目依然在uploaded_list，没有上传的则移出list，放进uploaded_list
                        } else if (result.Return === 1) {
                            console.log(result);
                            ToastAndroid.show('上传失败，未知错误。', ToastAndroid.SHORT);
                        } // 上传失败的情况，由于后端对于所有上传失败返回都是1，所以只能提示未知错误(经过实践，大概率是Record_ID不正确)

                    }).catch(err => {
                    ToastAndroid.show('您当前不处于网络环境下或网络不佳', ToastAndroid.SHORT);
                })
            }
        })
    }

    // 用于将格式化的存储数据，拆散成一个个发送给后端的答案ID对儿
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

    // 对于非input和date形式的数据，我们需要特殊处理，因为单选多选和表格涉及的答案都不止一个。
    disassembleTable(data) {
        if(Array.isArray(data.Record_Value[0])) {
            const tableData = data.Record_Value;

            // 首先是表格类，非常复杂，我们得根据各个表格的id情况去填写对应的id和值。
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
        } // 对于单选和多选来说，直接筛选出true的选项发送即可
    }

    // 切换当前的list
    switchPage(page) {
        this.setState({
            display: page
        })
    }

    // 相当于html的内容
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
                                                    <Text> {`${JSON.parse(data[1]).updateTime.substr(0, 10)}录入，编号:${data[0]}，完成度:${JSON.parse(data[1]).complete_Rate}`} </Text>
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
                                                    <Text> {`${JSON.parse(data[1]).updateTime.substr(0, 10)}录入，编号:${data[0]}，完成度:${JSON.parse(data[1]).complete_Rate}`} </Text>
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
                </Footer>
            </Container>
        );
    }
}