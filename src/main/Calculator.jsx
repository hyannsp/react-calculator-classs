import React , { Component } from "react";
import './Calculator.css'
import Buttons from "../components/Buttons";
import Display from "../components/Display";

const initialState = {
    displayValue: '0',
    clearDisplay: false,
    operation: null,
    values: [0,0],
    current: 0
}

export default class Calculator extends Component {

    constructor(props){
        super(props)

        this.clearMemory= this.clearMemory.bind(this)
        this.setOperation= this.setOperation.bind(this)
        this.addDigit= this.addDigit.bind(this)
    }

    state = {...initialState}

    clearMemory(){
        this.setState({...initialState})
    }

    setOperation(operation){
        if(this.state.current === 0 ){
            this.setState({operation, current: 1, clearDisplay: true})
        }else{
            const equals = operation === '='
            const currentOperation = this.state.operation

            const values = [...this.state.values]
            switch(currentOperation){
                case '+':
                    values[0] = values[0] + values[1]
                    break
                case '-':
                    values[0] = values[0] - values[1]
                    break
                case 'x':
                    values[0] = values[0] * values[1]
                    break
                case '÷':
                    values[0] = values[0] / values[1]
                    break
                default:
                    break;
            }
            values[1] = 0
            this.setState({
                displayValue: values[0],
                operation: equals ? null : operation,
                current: equals ? 0 : 1,
                clearDisplay: !equals,
                values
            })
        }
    }

    addDigit(n) {
        if (n === '.' && this.state.displayValue.includes('.')) {
            return;
        }
        if (n === '⌫') {
            if (this.state.displayValue.length === 1) {
                this.setState({ ...initialState });
                return;
            } else {
                if(this.state.current === 0){
                    return
                }
                const displayValue = this.state.displayValue.slice(0, -1);
                this.setState({ displayValue });
    
                // Atualizar os valores nas operações anteriores
                const current = this.state.current;
                const values = [...this.state.values];
                values[current] = parseFloat(displayValue);
                this.setState({ values });
                
                return;
            }
        }
        const clearDisplay = this.state.displayValue === '0' || this.state.clearDisplay;
        const currentValue = clearDisplay ? '' : this.state.displayValue;
        const newDisplayValue = currentValue + n;
        this.setState({ displayValue: newDisplayValue, clearDisplay: false });
    
        if (n !== '.' && n !== 'del') {
            const i = this.state.current;
            const newValue = parseFloat(newDisplayValue);
            const values = [...this.state.values];
            values[i] = newValue;
            this.setState({ values });
            console.log(values);
        }
    }

    render() {

        return (
            <div className="calculator">
                <Display value={this.state.displayValue}/>
                <Buttons label = "AC" click={()=>this.clearMemory()}  operation double/>
                <Buttons label = "⌫" click={this.addDigit} operation/>
                <Buttons label = "÷" click={this.setOperation} operation/>
                <Buttons label = "7" click={this.addDigit}/>
                <Buttons label = "8" click={this.addDigit}/>
                <Buttons label = "9" click={this.addDigit}/>
                <Buttons label = "x" click={this.setOperation} operation/>
                <Buttons label = "4" click={this.addDigit}/>
                <Buttons label = "5" click={this.addDigit}/>
                <Buttons label = "6" click={this.addDigit}/>
                <Buttons label = "-"click= {this.setOperation} operation/>
                <Buttons label = "1" click={this.addDigit}/>
                <Buttons label = "2" click={this.addDigit}/>
                <Buttons label = "3" click={this.addDigit}/>
                <Buttons label = "+"click= {this.setOperation} operation/>
                <Buttons label = "0" click={this.addDigit} double/>
                <Buttons label = "." click={this.addDigit}/>
                <Buttons label = "="click= {this.setOperation} operation/>
            </div>
        )
    }
}