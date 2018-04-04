import React, { Component } from 'react';
import { Content, Form,Label,Text} from 'native-base';
import RadioModal from 'react-native-radio-master';


export default class RadioGroupComponent extends Component {

    constructor(props) {
        super (props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            selected_option: this.props.value
        }
    }

    handleChange(e) {
        console.log(e);
        this.props.handleChange(this.props.id, e)
    }

    render() {

        const { title, id, options} = this.props;
        return (
            <Content style={{top: 10, marginBottom: 10}}>
                <Form>
                        <Label>
                            {id + ' ' + title}
                        </Label>
                    <RadioModal style={{ flexDirection:'row',
                        flexWrap:'wrap',
                        alignItems:'flex-start',
                        flex:1,
                        padding:5,marginTop:10
                    }}
                    onValueChange={this.handleChange}
                    selectedValue={this.state.selected_option}
                    >
                        {
                            options.map((option, i) => (
                                <Text key={i} value={i.toString()}>
                                    {option}
                                </Text>
                            ))
                        }
                    </RadioModal>
                </Form>
            </Content>
        )
    }
}