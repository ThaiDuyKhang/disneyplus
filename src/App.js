import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home'
import './App.css';
import DetailMovie from './components/DetailMovie';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route exact path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/detail/:id" element={<DetailMovie/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
