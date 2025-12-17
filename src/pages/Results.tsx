import React, { useState, useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const SAMPLE_NODES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 500,
  y: Math.random() * 500
}));

const SAMPLE_ENERGY = Array.from({ length: 50 }, (_, i) => 100 - (i % 20) * 3);

export default function Results() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('A0');

  const timeSeriesData = useMemo(() => {
    const data = [];
    for (let time = 0; time <= 100; time += 5) {
      const point: any = { time };
      
      // Representative nodes
      [0, 10, 20, 30].forEach(nodeId => {
        const energy = Math.max(0, SAMPLE_ENERGY[nodeId] - (time * 0.5));
        point[`node_${nodeId}`] = Math.round(energy);
      });
      
      let avgEnergy = 0;
      for (let i = 0; i < 50; i++) {
        avgEnergy += Math.max(0, SAMPLE_ENERGY[i] - (time * 0.5));
      }
      point.average = Math.round(avgEnergy / 50);
      
      data.push(point);
    }
    return data;
  }, []);

  const metrics = useMemo(() => {
    let firstNodeDeath = -1;
    let halfNodesDead = -1;
    
    for (let time = 0; time <= 100; time += 5) {
      let deadCount = 0;
      for (let i = 0; i < 50; i++) {
        const energy = Math.max(0, SAMPLE_ENERGY[i] - (time * 0.5));
        if (energy === 0) deadCount++;
      }
      
      if (firstNodeDeath === -1 && deadCount > 0) {
        firstNodeDeath = time;
      }
      if (halfNodesDead === -1 && deadCount >= 25) {
        halfNodesDead = time;
      }
    }
    
    return {
      firstNodeDeath: firstNodeDeath === -1 ? 'N/A' : `${firstNodeDeath} units`,
      halfNodesDead: halfNodesDead === -1 ? 'N/A' : `${halfNodesDead} units`,
      networkLifetime: halfNodesDead === -1 ? '100+' : `${halfNodesDead}`
    };
  }, []);

  const COLORS: Record<string, string> = {
    A0: '#3b82f6',
    A1: '#10b981',
    A2: '#f59e0b',
    A3: '#8b5cf6',
    A4: '#ef4444'
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Results Analysis</h1>

        <div className="mb-6 flex gap-2">
          {['A0', 'A1', 'A2', 'A3', 'A4'].map(algo => (
            <button
              key={algo}
              onClick={() => setSelectedAlgorithm(algo)}
              className={`px-4 py-2 rounded font-bold transition-all text-white`}
              style={{ backgroundColor: COLORS[algo] }}
            >
              {algo}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: COLORS[selectedAlgorithm] }}>
            <div className="text-sm text-gray-600 mb-1">First Node Death</div>
            <div className="text-2xl font-bold">{metrics.firstNodeDeath}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: COLORS[selectedAlgorithm] }}>
            <div className="text-sm text-gray-600 mb-1">50% Nodes Dead</div>
            <div className="text-2xl font-bold">{metrics.halfNodesDead}</div>
          </div>
          <div className="bg-white rounded-lg shadow p-6 border-l-4" style={{ borderColor: COLORS[selectedAlgorithm] }}>
            <div className="text-sm text-gray-600 mb-1">Network Lifetime</div>
            <div className="text-2xl font-bold">{metrics.networkLifetime}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Energy Over Time - {selectedAlgorithm}</h2>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" label={{ value: 'Time Units', position: 'insideBottomRight', offset: -5 }} />
              <YAxis label={{ value: 'Energy (%)', angle: -90, position: 'insideLeft' }} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="node_0" stroke="#8884d8" name="Node 0" />
              <Line type="monotone" dataKey="node_10" stroke="#82ca9d" name="Node 10" />
              <Line type="monotone" dataKey="node_20" stroke="#ffc658" name="Node 20" />
              <Line type="monotone" dataKey="node_30" stroke="#ff7c7c" name="Node 30" />
              <Line type="monotone" dataKey="average" stroke="#000" strokeWidth={2} name="Network Average" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Algorithm Characteristics</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="font-bold text-gray-700">Algorithm: {selectedAlgorithm}</p>
              <p className="text-gray-600 mt-2">
                {selectedAlgorithm === 'A0' && 'Shortest path only, ignores energy'}
                {selectedAlgorithm === 'A1' && 'Considers distance and residual energy'}
                {selectedAlgorithm === 'A2' && 'Minimizes total transmission energy'}
                {selectedAlgorithm === 'A3' && 'Balanced with load-balancing'}
                {selectedAlgorithm === 'A4' && 'Aggressively optimized for network lifetime'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
