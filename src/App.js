import Web3 from 'web3';
import './App.css';
import BalanceOf from './components/BalanceOf';
import Header from './components/Header';
import Transfer from './components/Transfer';
function App() {
  return (
    <div className="App">
     <Header/>
     <BalanceOf/>
     <Transfer/>
    </div>
  );
}

export default App;
