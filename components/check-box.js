import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Right, Radio, ListItem, Text, View} from 'native-base';
import Checkbox from 'react-native-custom-checkbox';


export default class CheckBoxComponent extends Component {

    constructor(props) {
        super (props);
        this.setArray = this.setArray.bind(this);
    }

    setArray() {

    }

    render() {
        const {id, title, options} = this.props;
        return (
            <Content style={{top: 10, marginBottom: 10}}>
                <Form>
                    <Label>
                        {id + ' ' + title}
                    </Label>
                    <View style={{ paddingTop: 10 }}>
                        {
                            options.map((option) => (
                                <View key={option} style={{ flexDirection: 'row', paddingTop: 10 , paddingLeft: 10}}>
                                    <Checkbox
                                        style={{flex: 1, padding: 10, color: '#666666'}}
                                        checked={false}/>
                                    <Text style={{fontSize: 14, paddingLeft: 5}}>{option}</Text>
                                </View>
                            ))
                        }

                        {/*<View style={{ flexDirection: 'row', paddingTop: 10 }}>
                            <Checkbox
                                style={{flex: 1, padding: 10}}
                                checked={true}/>
                            <Text>content1</Text>
                        </View>*/}
                    </View>


                </Form>
            </Content>
        )
    }
}