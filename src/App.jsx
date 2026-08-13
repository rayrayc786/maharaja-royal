import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { CustomCursor } from './components/CustomCursor/CustomCursor';
import { PageLoader } from './components/PageLoader/PageLoader';
import { ScrollToTop } from './components/ScrollToTop/ScrollToTop';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { Home } from './pages/Home/Home';
import { Menus } from './pages/Menus/Menus';
import { DessertBoutique } from './pages/Desserts/DessertBoutique';
import { OurStory } from './pages/OurStory/OurStory';
import { ReservationModal } from './components/ReservationModal/ReservationModal';

function App() {
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Initialize smooth scrolling
  useLenis();

  return (
    <Router>
      <ScrollToTop />
      <CustomCursor />
      
      {loading ? (
        <PageLoader onComplete={() => setLoading(false)} />
      ) : (
        <div className="app-content" style={{ opacity: 0, animation: 'fadeIn 1s forwards' }}>
          <Header onReserve={() => setIsModalOpen(true)} />
          
          <main>
            <Routes>
              <Route path="/" element={<Home onReserve={() => setIsModalOpen(true)} />} />
              <Route path="/menus" element={<Menus />} />
              <Route path="/desserts" element={<DessertBoutique />} />
              <Route path="/our-story" element={<OurStory />} />
            </Routes>
          </main>

          <Footer />
          <ReservationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
      )}
      
      <style>{`
        @keyframes fadeIn {
          to { opacity: 1; }
        }
      `}</style>
    </Router>
  );
}

export default App;
