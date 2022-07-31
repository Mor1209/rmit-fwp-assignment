import logo from './logo.svg';
import './App.css';
import NavBar from './components/Layout/Navbar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Header />
      <BrowserRouter>
        <Routes>{/* <Route path="about" element={<About />} /> */}</Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
