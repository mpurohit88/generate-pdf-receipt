import React from 'react';
import logo from './logo.svg';
import './App.css';

import axios from 'axios';
import { saveAs } from 'file-saver';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Adrian',
      receiptId: 0,
      price1: 0,
      price2: 0,
    }
  }

  handleChange = ({ target: { value, name } }) => this.setState({ [name]: value });

  createAndDownloadPdf = () => {
    axios.post('http://localhost:5000/create-pdf', this.state).then(() => axios.get('http://localhost:5000/fetch-pdf', { responseType: 'blob' }))
      .then((res) => {
        const pdfBlob = new Blob([res.data], { type: 'application/pdf' });
        saveAs(pdfBlob, 'generatedDocument.pdf')
      });
  }

  render() {
    return (
      <div className="App">
        <input type="text" placeholder="Name" name="name" onChange={this.handleChange} />
        <input type="number" placeholder="Receipt ID" name="receiptId" onChange={this.handleChange} />
        <input type="number" placeholder="Price 1" name="price1" onChange={this.handleChange} />
        <input type="number" placeholder="Price 2" name="price2" onChange={this.handleChange} />
        <button onClick={this.createAndDownloadPdf}>Download PDF</button>
      </div>
    );
  }
}
