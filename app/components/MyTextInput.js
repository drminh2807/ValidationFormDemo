import React, { Component } from 'react';
import {
  View,
  TextInput,
  Text,
  TextInputProperties,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native'
import validate from './validate_wrapper';

export interface MyTextInputProperties extends TextInputProperties {
  error: String,
  required: Boolean,
  validationType: String,
}
export default class MyTextInput extends Component<MyTextInputProperties> {
  state = {
    showClearButton: false,
    errorMessage: ''
  }
  render() {
    return (
      <View>
        <View style={styles.textInputView}>
          <TextInput
            style={styles.textInput}
            {...this.props}
            clearButtonMode='never'
            onFocus={this.onFocus}
            onBlur={this.onBlur}
            onChangeText={this.onChangeText}
          />
          {
            this.state.showClearButton
              ? <TouchableOpacity
                onPress={this.onClearPress}
                style={styles.clearButton}>
                <Image source={require('../res/img/ic_textinput_clear.png')} />
              </TouchableOpacity>
              : null
          }
        </View>
        {
          this.state.errorMessage
            ? <Text style={{ color: 'red' }}>{this.state.errorMessage}</Text>
            : null
        }

      </View>
    );
  }

  onFocus = () => {
    if (this.props.value.length > 0 && this.props.clearButtonMode) {
      this.setState({ showClearButton: true })
    }
    if (this.props.onFocus) {
      this.props.onFocus()
    }
  }
  onBlur = () => {
    this.setState({ errorMessage: this.validate() })
    if (this.props.clearButtonMode) {
      this.setState({ showClearButton: false })
    }
    if (this.props.onBlur) {
      this.props.onBlur()
    }
  }
  onChangeText = (text) => {
    this.setState({ showClearButton: this.props.clearButtonMode && text.length > 0 })
    this.props.onChangeText(text)
  }
  onClearPress = () => {
    this.setState({ showClearButton: false })
    this.props.onChangeText('')
  }
  validate = () => {
    const errorMessage = validate(this.props.validationType, this.props.value, this.props.required)
    this.setState({ errorMessage })
    return errorMessage
  }
}
const styles = StyleSheet.create({
  textInputView: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'gray',
    height: 50,
    width: 300,
    alignItems: 'center',
  },
  textInput: {
    flex: 1,
  },
  clearButton: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
})