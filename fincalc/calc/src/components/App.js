import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';

import Header from './layout/Header';
import Footer from './layout/Footer';
import data from './Data';
import SelectCurrency from './Currency';

class App extends Component {

    constructor(props){
        super(props);
    
        this.state = {
          currencies: data.currencies,
          currencyA: data.currencies[0],
          currencyB: data.currencies[1],
          currencyAval: data.currencies[0].sellRate,
          currencyBval: data.currencies[1].sellRate
        }
    
        this.onSelectCurrency = this.onSelectCurrency.bind(this);
    
      };
    
      onSelectCurrency(code){
        //console.log('selecting currency: '+code);
        const {currencies, currencyAval} = this.state;
        const currency = currencies.filter(currency => currency.code === code);
        this.setState({
          currencyB: currency[0], // this is an array with one item
          currencyBval: currencyAval * currency[0].sellRate
        })
      };
    
      onChangeHandler(e, currency){
    
        const {currencyA, currencyB} = this.state;
    
        if(currency === 'A'){
          
          const newValueA = e.target.value;
          this.setState({
            currencyAval: newValueA,
            currencyBval: newValueA * currencyB.sellRate
          })
    
        } else if(currency === 'B'){
          
          const newValueB = e.target.value;
          this.setState({
            currencyAval: newValueB / currencyB.sellRate,
            currencyBval: newValueB
          })
    
        }
    
      };

      state = {
        csym:'',
        esym:'',
        camt: '',
        erte:''
    };

    handleSubmit = event =>{
        event.preventDefault();

        const exchange = {
            csym: this.refs.Acode.innerHTML,
            esym: this.refs.Bcode.innerHTML,
            camt: event.target.elements.Ainput.value,
            erte: event.target.elements.Binput.value
        }

        Axios.post('http://127.0.0.1:8000/api/fin/', exchange)
            .then(res => {
                console.log(res);
                console.log(res.data);
            });      
    };

    render() { 
        const {currencies, currencyA, currencyB, currencyAval, currencyBval} = this.state;
    return (
      <div>
        <Header />
        <form onSubmit={this.handleSubmit}>
        <div className="content">
          <div className="row row-select-currency">
            <div className="col-md-6 col-md-offset-3">
              <h3>Select Currency</h3>
              <p>
                {
                  //Select currency
                }
                <SelectCurrency currencies={currencies} onSelectCurrency={this.onSelectCurrency} />
              </p>
            </div>
          </div>
          
          <div className="row">
            <div className="col-sm-6 currency-from-input">
              <h3 className={`currency-flag ${currencyA.code}`}>{currencyA.name}</h3>
              {
                  //Currency A input
              }
              <div className="input-group">
                <span className="input-group-addon">{currencyA.sign}</span>
                <input name="Ainput" type="number" value={currencyAval} className="form-control" aria-describedby="basic-addon2" step="1" pattern="\d\.\d{2}" onChange={(e) => {
                  this.onChangeHandler(e, 'A');
                }} />
                <span ref="Acode" className="input-group-addon" id="basic-addon2">{currencyA.code}</span>
              </div>

            </div>
            <div className="col-sm-6 currency-to-input">
              <h3 className={`currency-flag ${currencyB.code}`}>{currencyB.name}</h3>
              {
                  //Currency B input
              }
              <div className="input-group">
                <span className="input-group-addon">{currencyB.sign}</span>
                <input name="Binput" type="number" value={currencyBval} className="form-control" aria-describedby="basic-addon3" step="1" pattern="\d\.\d{2}"  onChange={(e) => {
                  this.onChangeHandler(e, 'B');
                }}/>
                <span ref="Bcode" className="input-group-addon" id="basic-addon3">{currencyB.code}</span>
              </div>

            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              {
                  //Update to currently selected currency
              }
              <p>
                Exchange Rate {`${currencyA.sign} ${currencyA.sellRate} ${currencyA.code}`} = {`${currencyB.sign} ${currencyB.sellRate} ${currencyB.code}`}
              </p>
            </div>
          </div>
        </div>
            <button type='submit'>Save</button>
        </form>
      </div>
    )
  }
}
ReactDOM.render(<App />, document.getElementById('app'));