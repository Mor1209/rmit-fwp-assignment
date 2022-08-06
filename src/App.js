import './App.css';
import NavBar from './components/Layout/Navbar';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage/LandingPage';

function App() {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
