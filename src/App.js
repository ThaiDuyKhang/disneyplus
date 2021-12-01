import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Home'
import './App.css';
import DetailMovie from './components/DetailMovie';
import SearchMovie from './components/SearchMovie';

function App() {
  return (
    <div className="App">
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path="/detail/:id" element={<DetailMovie/>}/>
          <Route path="/search" element={<SearchMovie/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
