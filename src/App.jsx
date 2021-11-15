import React from 'react';
import './styles/css/main.css'
import Footer from './components/footer/Footer';
import Table from './components/table/TableContainer'

const App = () => {
  return (
    <div className="App">
      <Table/>
      <Footer/>
    </div>
  );
}

export default App;
