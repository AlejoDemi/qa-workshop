import './App.css';
import _ from 'lodash'
import Tab from './Tabs/Tab';

function App() {

  document.cookie = 'lets-assume-this-is-the-login-cookie'
  const input = 'http://localhost:3001/images/'
  return (
    <div className="App">
      <Tab />
    </div>
  );
}

export default App;
