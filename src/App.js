import './App.css';
import Header from './components/Layout/Header';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
