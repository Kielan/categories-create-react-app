import axios from 'axios';
import React from 'react';
import logo from './logo.svg';
import './App.css';

const API_BASE_PATH = `https://stream-restaurant-menu-svc.herokuapp.com`;

const getAllCategories = () => {
  return axios.get(API_BASE_PATH+`/category`)
}




const MenuCategory = ['Soups and Salad - (SS)', 'Vegetables - (VG)']

const CategoryDetail = () => (
  <div className="col-md-6">
    <h4>Items in Category: (DS)</h4>
    <div>
      <table>
        <thead><tr>{`Name`}</tr><tr>{`Description`}</tr></thead>
        <tbody><tr><td>{`Chocolate Truffle Cake`}</td></tr></tbody>
      </table>
    </div>
  </div>
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      items: []
    };
  }
  componentDidMount() {
    axios.get(API_BASE_PATH+`/category`)
      .then((result) => {
        console.log('componentDidMount result: ', result);
        this.setState({
          isLoaded: true,
          items: result.data
        });
    }, (error) => {
      this.setState({
        isLoaded: true,
        error
      });
    });
  }
  handleClick(e){
    console.log(e.target.name);
  }
  render() {
    const { error, isLoaded, items } = this.state;

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <header className="App-header">
          <h4>Menu Categories</h4>
          <div className="container">
          <div className="row">
            <div className="col-md-4">
              <ul>
                {items.map(item => (
                  <li key={item.name} name={item.name} onClick={this.handleClick}>
                    {item.name} {item.price}
                  </li>
                ))}
              </ul>
            </div>
            <CategoryDetail />
          </div>
          </div>
          </header>
        </div>
      );
    }
  }
}

export default App;
