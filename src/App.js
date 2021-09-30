import Web3 from 'web3';
import './App.css';
import BalanceOf from './components/BalanceOf';
import Header from './components/Header';
function App() {
  return (
    <div className="App">
     <Header/>
     <BalanceOf/>
    </div>
  );
}

export default App;
