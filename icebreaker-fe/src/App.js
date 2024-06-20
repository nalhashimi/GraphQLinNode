import logo from './logo.svg';
import './App.css';
import LoginPage from './pages/Auth/Login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <LoginPage
              loading={false}
            />
      </header>
    </div>
  );
}

export default App;
