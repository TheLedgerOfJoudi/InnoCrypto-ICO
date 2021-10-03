import Web3 from 'web3';
import './App.css';
import MyPanel from './components/PersonalPanel/MyPanel';
import Info from './components/PlatfromInfo/Info';

function App() {
  return (
    <div className="App">
     <Info/>
     <hr/>
     <MyPanel/>
    </div>
  );
}

export default App;
