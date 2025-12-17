import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import NetworkSimulation from './pages/NetworkSimulation';
import Algorithms from './pages/Algorithms';
import Results from './pages/Results';
import Comparison from './pages/Comparison';
import About from './pages/About';

function App() {
  const [selectedNetworkSize, setSelectedNetworkSize] = useState<50 | 100 | 150>(50);

  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar networkSize={selectedNetworkSize} onNetworkSizeChange={setSelectedNetworkSize} />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/simulation" element={<NetworkSimulation networkSize={selectedNetworkSize} />} />
            <Route path="/algorithms" element={<Algorithms />} />
            <Route path="/results" element={<Results networkSize={selectedNetworkSize} />} />
            <Route path="/comparison" element={<Comparison networkSize={selectedNetworkSize} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
