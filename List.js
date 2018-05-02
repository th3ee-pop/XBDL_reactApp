import React, { Component } from 'react';
import { AsyncStorage, Picker } from 'react-native';
import { QuestionList }from './questionList';
import { Container, Content, Text, Item, View, Button, Form, Label, Input,Header, Tab, Tabs, ScrollableTab } from 'native-base';
import NormalInputComponent from './components/input-normal';
import RadioGroupComponent from './components/radio-group';
import MyDatePicker from './components/date-picker';
import CheckBoxComponent from './components/check-box';
import TableComponent from './components/table';
import Page_1 from './pages/page_first';
import Page_2 from './pages/page_two';
import Page_3 from './pages/page_three';
import Page_4 from './pages/page_four';
import Page_5 from './pages/page_five';
import Page_6 from './pages/page_six';
import Page_7 from './pages/page_seven';
import Page_8 from './pages/page_eight';
import Page_9 from './pages/page_nine';
import Page_10 from './pages/page_ten';
export default class Touchables extends Component {


    render() {
        const { params } = this.props.navigation.state;
        return (
            <Container>
                <Tabs renderTabBar={()=> <ScrollableTab />}>
                    <Tab heading="一般信息">
                        <Page_1 />
                    </Tab>
                    <Tab heading="饮茶及咖啡情况">
                        <Page_2/>
                    </Tab>
                    <Tab heading="饮酒情况">
                        <Page_3/>
                    </Tab>
                    <Tab heading="吸烟情况">
                        <Page_4/>
                    </Tab>
                    <Tab heading="膳食情况">
                        <Page_5/>
                    </Tab>
                    <Tab heading="空气污染">
                        <Page_6/>
                    </Tab>
                    <Tab heading="健康状况">
                        <Page_7/>
                    </Tab>
                    <Tab heading="体力活动">
                        <Page_8/>
                    </Tab>
                    <Tab heading="女性生育史">
                        <Page_9/>
                    </Tab>
                    <Tab heading="精神及生活质量">
                        <Page_10/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}


