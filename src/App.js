import Web3 from 'web3';
import './App.css';
import MyPanel from './components/PersonalPanel/MyPanel';
import Info from './components/PlatfromInfo/Info';
import ThirdPartyPanel from './components/ThirdPartyPanel/ThirdPartyPanel';
function App() {
  return (
    <div className="App">
      <Info />
      <MyPanel />
      <ThirdPartyPanel />
    </div>
  );
}

export default App;
