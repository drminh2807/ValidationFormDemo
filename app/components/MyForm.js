import React, { Component } from 'react';
import {
    View,
    Button,
} from 'react-native';
import MyTextInput from './MyTextInput';
import validation from './validation'
import validate from './validate_wrapper'
export default class MyForm extends Component {
    state = {
        email: '',
        password: '',
    }
    onValidatePress = () => {
        const emailError = this.emailInput.validate()
        const passwordError = this.pwdInput.validate()

        if (!emailError && !passwordError) {
            alert('Details are valid!')
        }
    }
    render() {
        return (
            <View>
                <MyTextInput
                    required={true}
                    ref={ref => { this.emailInput = ref }}
                    value={this.state.email}
                    clearButtonMode='while-editing'
                    onChangeText={value => this.setState({ email: value.trim() })}
                    placeholder='Email'
                    validationType='email'
                />
                <MyTextInput
                    required={true}
                    ref={ref => { this.pwdInput = ref }}
                    placeholder='Password'
                    clearButtonMode='while-editing'
                    value={this.state.password}
                    onChangeText={value => this.setState({ password: value.trim() })}
                    validationType='password'
                    secureTextEntry={true} />
                <Button
                    title='Validate'
                    onPress={this.onValidatePress} />
            </View>
        )
    }
}