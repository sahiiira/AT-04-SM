import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TouchableOpacity, View, Dimensions, Text } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      buttons: [7, 8, 9, '÷', 4, 5, 6, '×', 1, 2, 3, '-', 0, '.', '=', '+'],
      equation: '',
      result: '',
    }
  }

  round(num, decimalPlaces = 0) {
    num = Math.round(num + "e" + decimalPlaces);
    return Number(num + "e" + -decimalPlaces);
  }

  operation(equationArray) {

    for (var i = 0; i <= equationArray.length; i++) {
      if (equationArray[i] == '×') {
        var operation = this.round(Number(equationArray[i - 1]) * Number(equationArray[i + 1]), 5);
        equationArray.splice(i - 1, 3, operation);
        i = 0;
      }

      if (equationArray[i] == '÷') {
        var operation = this.round(Number(equationArray[i - 1]) / Number(equationArray[i + 1]), 5);
        equationArray.splice(i - 1, 3, operation);
        i = 0;
      }
    }

    for (var i = 0; i <= equationArray.length; i++) {

      if (equationArray[i] == '+') {
        var operation = this.round(Number(equationArray[i - 1]) + Number(equationArray[i + 1]), 5);
        equationArray.splice(i - 1, 3, operation);
        i = 0;
      }

      if (equationArray[i] == '-') {
        var operation = this.round(Number(equationArray[i - 1]) - Number(equationArray[i + 1]), 5);
        equationArray.splice(i - 1, 3, operation);
        i = 0;
      }
    }
    console.log(equationArray[0]);
    return equationArray;
  }


  handleInput(char) {
    var equationArray = this.state.equation.split(" ");

    if (char == '=') {
      if (this.operation(equationArray) == 'NaN') {

        this.setState({
          result: 'Formato inválido',
          equation: '',
        })
      } else {
        equationArray = this.operation(equationArray);

        this.setState({
          result: equationArray,
          equation: '',
        })
      }
    } else {

      if (char == '+' || char == '-' || char == '÷' || char == '×') {

        if (this.state.equation[0] === undefined) {

          this.setState({
            equation: Number(this.state.result) + " " + char + " ",
          })

        } else {
          this.setState({
            equation: this.state.equation + " " + char + " ",
          })
        }

      } else if (char == '.') {

        if (this.state.equation[this.state.equation.length - 1] === undefined || this.state.equation[this.state.equation.length - 1] === '') {

          this.setState({
            equation: 0 + char,
          })

        } else if (char == '.') {
          this.setState({
            equation: this.state.equation + char,
          })
        }

      } else {
        this.setState({
          equation: this.state.equation + char,
        })
      }
    }

    var equationString = this.state.equation.split(" ").join("");
    var lastChar = equationString[equationString.length - 1];
    if ((lastChar == '-' || lastChar == '+' || lastChar == '÷' || lastChar == '×')
      && (char == '-' || char == '+' || char == '÷' || char == '×')) {
      var newEquation = this.state.equation.slice(0, -2) + char + " ";
      this.setState({
        equation: newEquation,
      })
    }

    if (lastChar == '.' && char == '.') {
      var newEquation = this.state.equation.slice(0, -1) + char;
      this.setState({
        equation: newEquation,
      })
    }
  }


  render() {
    return (
      <View style={styles.container}>

        <View style={styles.result}>
          <Text style={styles.equationText}>
            {this.state.equation}
          </Text>
          <Text style={styles.resultText}>
            {this.state.result}
          </Text>
        </View>

        <View style={styles.buttonDrawer}>
          {this.state.buttons.map((button) =>
            <TouchableOpacity onPress={() => this.handleInput(button)} key={button} style={[styles.button, { backgroundColor: button == '=' ? '#D16141' : '#121212' }]}>
              <Text style={[styles.buttonChar, { color: typeof button == 'number' || button == '=' ? '#fff' : '#D16141' }]}>
                {button}
              </Text>
            </TouchableOpacity>)}
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 12,
  },
  buttonDrawer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    minWidth: windowWidth / 4,
    minHeight: windowWidth / 4,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 6,
    borderRadius: 100,
  },
  buttonChar: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    flex: 1,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 32,
  },
  equationText: {
    color: '#6e6e6e',
    fontFamily: 'sans-serif-medium',
    fontSize: 26,
    margin: 12,
  },
  resultText: {
    color: '#fff',
    fontFamily: 'sans-serif-medium',
    fontSize: 52,
    margin: 12,
    margin: 2,
  }
});
