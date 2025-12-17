import React, { useState } from 'react';
import { BarChart, LineChart } from 'lucide-react';

const ALGORITHMS = {
  A0: {
    name: 'Dijkstra (Shortest Path Only)',
    level: 'Foundation',
    color: 'bg-blue-100 border-blue-300',
    costFormula: 'Cost = Hop Count OR Distance',
    howWorks: [
      'Finds path with minimum hop count or distance',
      'Uses classic Dijkstra algorithm',
      'Ignores remaining node energy completely'
    ],
    whyBetter: null,
    pros: ['Simple', 'Guaranteed shortest path'],
    cons: ['Exhausts high-traffic nodes', 'Reduces network lifetime']
  },
  A1: {
    name: 'Distance + Residual Energy',
    level: 'Step 1',
    color: 'bg-green-100 border-green-300',
    costFormula: 'Cost = Distance + Energy Penalty',
    howWorks: [
      'Combines distance with energy awareness',
      'Adds penalty when node energy < 20%',
      'Avoids dead-end routes via low-energy nodes'
    ],
    whyBetter: ['Extends network lifetime vs A0', 'Trade-off: Slightly longer paths'],
    pros: ['Balances distance & energy', 'Avoids energy-depleted nodes'],
    cons: ['Still uses heavily-trafficked nodes']
  },
  A2: {
    name: 'Minimum Energy Path',
    level: 'Step 2',
    color: 'bg-yellow-100 border-yellow-300',
    costFormula: 'Cost = Total Transmit Energy Along Path',
    howWorks: [
      'Minimizes total transmission energy required',
      'Allows extra hops if they reduce total energy',
      'Accounts for node battery capacity'
    ],
    whyBetter: ['Better vs A1: Prioritizes total energy consumption', 'Can choose longer but less power-demanding paths'],
    pros: ['Minimizes total energy use', 'Longer network lifetime'],
    cons: ['May produce longer routes', 'More latency']
  },
  A3: {
    name: 'Balanced Energy Routing',
    level: 'Step 3',
    color: 'bg-purple-100 border-purple-300',
    costFormula: 'Cost = Energy Cost + Load Penalty',
    howWorks: [
      'Adds load-balancing to avoid overusing same nodes',
      'Penalizes nodes that have already spent energy',
      'Pushes traffic away from heavily-used paths'
    ],
    whyBetter: ['Better vs A2: Spreads traffic across network', 'Prevents single-path bottlenecks'],
    pros: ['Distributes load evenly', 'More route diversity'],
    cons: ['May use more total hops']
  },
  A4: {
    name: 'Aggressively Optimized Energy-Efficient',
    level: 'Step 4 - Strongest',
    color: 'bg-red-100 border-red-300',
    costFormula: 'Cost = Energy + Load + Hop Penalty',
    howWorks: [
      'Combines distance, residual energy, and load-balancing',
      'Maximizes overall network lifetime',
      'Adapts to current network state'
    ],
    whyBetter: ['Best overall: All optimizations combined', 'Longest network lifetime'],
    pros: ['Longest network lifetime', 'Best energy distribution'],
    cons: ['Most complex calculations']
  }
};

export default function Algorithms() {
  const [selectedAlgo, setSelectedAlgo] = useState('A0');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-4">Routing Algorithms Ladder</h1>
          <p className="text-blue-100 text-lg">Energy-Efficient Routing for Ad-Hoc Networks (A0-A4)</p>
        </div>
      </div>

      {/* Algorithm Selection */}
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-5 gap-4 mb-8">
          {Object.entries(ALGORITHMS).map(([key, algo]) => (
            <button
              key={key}
              onClick={() => setSelectedAlgo(key)}
              className={`p-4 rounded-lg border-2 transition-all ${
                selectedAlgo === key
                  ? `${algo.color} border-current shadow-lg scale-105`
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-bold text-lg">{key}</div>
              <div className="text-xs text-gray-600">{algo.level}</div>
            </button>
          ))}
        </div>

        {/* Detailed View */}
        {ALGORITHMS[selectedAlgo as keyof typeof ALGORITHMS] && (
          <div className={`${ALGORITHMS[selectedAlgo as keyof typeof ALGORITHMS].color} border-2 rounded-xl p-8`}>
            <h2 className="text-3xl font-bold mb-2">
              {ALGORITHMS[selectedAlgo as keyof typeof ALGORITHMS].name}
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              {ALGORITHMS[selectedAlgo as keyof typeof ALGORITHMS].costFormula}
            </p>

            {/* How It Works */}
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <BarChart className="w-5 h-5" /> How It Works
              </h3>
              <ul className="space-y-2 ml-7">
                {ALGORITHMS[selectedAlgo as keyof typeof ALGORITHMS].howWorks.map((point, i) => (
                  <li key={i} className="text-gray-700 flex items-start gap-3">
                    <span className="text-blue-600 font-bold">•</span>
                    {point}
                  </li>
                ))}
              </ul>
            </div>

            {/* Why It's Better */}
            {ALGORITHMS[selectedAlgo as keyof typeof ALGORITHMS].whyBetter && (
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <LineChart className="w-5 h-5" /> Why It's Better Than Previous
                </h3>
                <ul className="space-y-2 ml-7">
                  {ALGORITHMS[selectedAlgo as keyof typeof ALGORITHMS].whyBetter!.map((point, i) => (
                    <li key={i} className="text-gray-700 flex items-start gap-3">
                      <span className="text-green-600 font-bold">✓</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Comparison Table */}
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="font-bold text-green-700 mb-3">Pros</h4>
                <ul className="space-y-2">
                  {ALGORITHMS[selectedAlgo as keyof typeof ALGORITHMS].pros.map((pro, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-green-600">✓</span> {pro}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-red-700 mb-3">Cons</h4>
                <ul className="space-y-2">
                  {ALGORITHMS[selectedAlgo as keyof typeof ALGORITHMS].cons.map((con, i) => (
                    <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                      <span className="text-red-600">✕</span> {con}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
