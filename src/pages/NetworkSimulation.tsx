import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Search } from 'lucide-react';
import { computeRoute, buildDistanceMatrix } from '../utils/routingAlgorithms';

const SAMPLE_NODES = Array.from({ length: 50 }, (_, i) => ({
  id: i,
  x: Math.random() * 500,
  y: Math.random() * 500,
  energy: 100
}));

const SAMPLE_ENERGY = Array.from({ length: 50 }, (_, i) => 100 - (i % 20) * 3);

export default function NetworkSimulation() {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [fromNode, setFromNode] = useState('0');
  const [toNode, setToNode] = useState('10');
  const [algorithm, setAlgorithm] = useState('A0');
  const [route, setRoute] = useState<number[]>([]);
  const [routeInfo, setRouteInfo] = useState<any>(null);
  const [nodeEnergies, setNodeEnergies] = useState(SAMPLE_ENERGY);

  // Simulate time progression
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTime(t => (t + 1) % 100);
      setNodeEnergies(prev =>
        prev.map((e, i) => Math.max(0, e - (Math.random() * 0.5)))
      );
    }, 500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleFindRoute = () => {
    const start = parseInt(fromNode);
    const end = parseInt(toNode);
    if (isNaN(start) || isNaN(end) || start < 0 || start > 49 || end < 0 || end > 49) {
      alert('Invalid node IDs');
      return;
    }
    const distMatrix = buildDistanceMatrix(SAMPLE_NODES);
    const result = computeRoute(algorithm, start, end, distMatrix, nodeEnergies);
    setRoute(result.path);
    setRouteInfo(result);
  };

  const getNodeColor = (energy: number) => {
    if (energy > 70) return '#22c55e';
    if (energy > 40) return '#eab308';
    return '#ef4444';
  };

  const getEnergyLevel = (idx: number) => {
    return Math.max(0, nodeEnergies[idx] - (currentTime * 0.5));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Network Simulation</h1>

        <div className="grid grid-cols-3 gap-6">
          {/* Visualization */}
          <div className="col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-4 border border-gray-200">
              <svg width="100%" height="500" viewBox="0 0 500 500" className="border border-gray-300 rounded bg-gradient-to-br from-blue-50 to-blue-100">
                {/* Draw routed path */}
                {route.length > 1 && (
                  <>
                    {route.slice(0, -1).map((nodeId, i) => {
                      const from = SAMPLE_NODES[nodeId];
                      const to = SAMPLE_NODES[route[i + 1]];
                      return (
                        <line
                          key={`path-${i}`}
                          x1={from.x}
                          y1={from.y}
                          x2={to.x}
                          y2={to.y}
                          stroke="#ef4444"
                          strokeWidth="2"
                        />
                      );
                    })}
                  </>
                )}

                {/* Draw nodes */}
                {SAMPLE_NODES.map((node) => {
                  const energy = getEnergyLevel(node.id);
                  const isOnRoute = route.includes(node.id);
                  return (
                    <g key={node.id}>
                      ircle
                        cx={node.x}
                        cy={node.y}
                        r={isOnRoute ? 8 : 6}
                        fill={getNodeColor(energy)}
                        stroke={isOnRoute ? '#000' : 'none'}
                        strokeWidth={isOnRoute ? 2 : 0}
                        opacity={energy > 0 ? 1 : 0.3}
                      />
                      <text
                        x={node.x}
                        y={node.y}
                        textAnchor="middle"
                        dy="3"
                        fontSize="9"
                        fill="#fff"
                        fontWeight="bold"
                      >
                        {node.id}
                      </text>
                    </g>
                  );
                })}
              </svg>

              {/* Controls */}
              <div className="mt-4 flex items-center gap-4">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  {isPlaying ? 'Pause' : 'Play'}
                </button>
                <button
                  onClick={() => { setCurrentTime(0); setIsPlaying(false); }}
                  className="flex items-center gap-2 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
                >
                  <RotateCcw size={20} /> Reset
                </button>
                <div className="flex-1">
                  <div className="text-sm text-gray-600 mb-1">Time: {currentTime}%</div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={currentTime}
                    onChange={(e) => setCurrentTime(Number(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Energy Legend */}
              <div className="mt-4 flex gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-green-500"></div>
                  <span>High Energy (&gt;70%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-yellow-400"></div>
                  <span>Medium Energy (40-70%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-red-500"></div>
                  <span>Low Energy (&lt;40%)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Route Finder Panel */}
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 h-fit">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <Search size={20} /> Route Finder
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">From Node (0-49)</label>
                <input
                  type="number"
                  min="0"
                  max="49"
                  value={fromNode}
                  onChange={(e) => setFromNode(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">To Node (0-49)</label>
                <input
                  type="number"
                  min="0"
                  max="49"
                  value={toNode}
                  onChange={(e) => setToNode(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Algorithm</label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="A0">A0 - Dijkstra</option>
                  <option value="A1">A1 - Energy-Aware</option>
                  <option value="A2">A2 - Min Energy</option>
                  <option value="A3">A3 - Balanced</option>
                  <option value="A4">A4 - Optimized</option>
                </select>
              </div>

              <button
                onClick={handleFindRoute}
                className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700"
              >
                Find Route
              </button>

              {/* Route Info */}
              {routeInfo && (
                <div className="mt-6 border-t pt-4">
                  <div className="bg-blue-50 rounded p-3 space-y-2 text-sm">
                    <div><strong>Hops:</strong> {routeInfo.hops}</div>
                    <div><strong>Energy Cost:</strong> {routeInfo.energyCost.toFixed(2)}</div>
                    <div><strong>Route:</strong> {routeInfo.path.join(' → ')}</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
