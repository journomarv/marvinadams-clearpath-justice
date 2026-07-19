import { useState } from 'react';
import GlobalStyle, { globalStyles } from './styles/GlobalStyle';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ImpactPage from './pages/ImpactPage';
import CheckerPage from './pages/CheckerPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const renderPage = () => {
    switch (currentPage) {
      case 'home': return <HomePage setCurrentPage={setCurrentPage} />;
      case 'about': return <AboutPage />;
      case 'impact': return <ImpactPage />;
      case 'checker': return <CheckerPage />;
      default: return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };
  return (<><style>{globalStyles}</style><GlobalStyle /><NavBar currentPage={currentPage} setCurrentPage={setCurrentPage} /><main>{renderPage()}</main><Footer /></>);
}
