import React, { useState, useMemo } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Comparison() {
  const [selectedTimeSlice, setSelectedTimeSlice] = useState(50);

  // Algorithm comparison data
  const comparisonData = useMemo(() => {
    return [
      { algorithm: 'A0', hops: 8.2, routeChanges: 45, lifetime: 20 },
      { algorithm: 'A1', hops: 9.1, routeChanges: 38, lifetime: 35 },
      { algorithm: 'A2', hops: 10.5, routeChanges: 32, lifetime: 55 },
      { algorithm: 'A3', hops: 9.8, routeChanges: 28, lifetime: 62 },
      { algorithm: 'A4', hops: 10.2, routeChanges: 22, lifetime: 75 }
    ];
  }, []);

  // Energy heatmap simulation
  const generateHeatmapData = (algorithm: string, timeSlice: number) => {
    const nodes = [];
    for (let i = 0; i < 50; i++) {
      const baseEnergy = 100 - (i % 20) * 3;
      let energyUsed = baseEnergy - Math.max(0, baseEnergy - (timeSlice * 0.5));
      
      // Adjust based on algorithm
      if (algorithm === 'A0') energyUsed *= 1.3; // A0 uses more energy (single path)
      if (algorithm === 'A1') energyUsed *= 1.2;
      if (algorithm === 'A2') energyUsed *= 1.0;
      if (algorithm === 'A3') energyUsed *= 0.85; // Better distribution
      if (algorithm === 'A4') energyUsed *= 0.7; // Best distribution

      nodes.push({
        id: i,
        x: Math.random() * 500,
        y: Math.random() * 500,
        energy: Math.max(0, 100 - energyUsed)
      });
    }
    return nodes;
  };

  const getNodeColor = (energy: number) => {
    if (energy > 70) return '#22c55e';
    if (energy > 40) return '#eab308';
    return '#ef4444';
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Algorithm Comparison</h1>

        {/* Hop Count Comparison */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Average Hop Count by Algorithm</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="algorithm" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="hops" fill="#3b82f6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Route Changes Comparison */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Route Changes Over Simulation</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="algorithm" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="routeChanges" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Network Lifetime Comparison */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-bold mb-4">Network Lifetime (Time Units)</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={comparisonData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="algorithm" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="lifetime" stroke="#f59e0b" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Energy Heatmaps */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-bold mb-4">Energy Distribution Heatmaps (Time: {selectedTimeSlice}%)</h2>
          
          <div className="mb-4">
            <input
              type="range"
              min="0"
              max="100"
              value={selectedTimeSlice}
              onChange={(e) => setSelectedTimeSlice(Number(e.target.value))}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-5 gap-4">
            {['A0', 'A1', 'A2', 'A3', 'A4'].map(algo => {
              const nodes = generateHeatmapData(algo, selectedTimeSlice);
              return (
                <div key={algo} className="border rounded p-2">
                  <p className="font-bold text-center mb-2">{algo}</p>
                  <svg width="100%" height="200" viewBox="0 0 500 500" className="border border-gray-300 bg-blue-50 rounded">
                    {nodes.map(node => (
                      ircle
                        key={node.id}
                        cx={node.x}
                        cy={node.y}
                        r="4"
                        fill={getNodeColor(node.energy)}
                        opacity={node.energy > 0 ? 1 : 0.3}
                      />
                    ))}
                  </svg>
                  <p className="text-xs text-center mt-2 text-gray-600">
                    Avg Energy: {(nodes.reduce((sum, n) => sum + n.energy, 0) / nodes.length).toFixed(1)}%
                  </p>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>High (&gt;70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <span>Medium (40-70%)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>Low (&lt;40%)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
