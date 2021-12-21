import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App d-flex flex-column justify-content-center" style={{position: 'relative', background: 'transparent', height: '100vh', width: '100vw', overflowY: 'hidden', overflowX: 'hidden', alignItems: 'center'}}>

      <Dashboard />
    </div>
  );
}

export default App;
