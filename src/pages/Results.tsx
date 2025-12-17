import React, { useMemo, useState } from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

/* ------------------ TYPES ------------------ */

type Props = {
  networkSize: number;
};

/* ------------------ MAIN COMPONENT ------------------ */

export default function Results({ networkSize }: Props) {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('A0');

  /* ------------------ BASE ENERGY ------------------ */

  const baseEnergy = useMemo(
    () =>
      Array.from({ length: networkSize }, (_, i) => 100 - (i % 20) * 3),
    [networkSize]
  );

  /* ------------------ ENERGY FACTORS ------------------ */

  const energyFactor: Record<string, number> = {
    A0: 1.3,  // Distance-only (Dijkstra)
    A1: 1.15, // Energy-aware
    A2: 1.0,  // Minimum energy
    A3: 0.85, // Load-balanced
    A4: 0.7   // Lifetime optimized
  };

  /* ------------------ TIME SERIES DATA ------------------ */

  const timeSeriesData = useMemo(() => {
    const data: any[] = [];
    const factor = energyFactor[selectedAlgorithm];

    for (let time = 0; time <= 100; time += 5) {
      let avgEnergy = 0;
      const point: any = { time };

      [0, 10, 20, 30].forEach(id => {
        if (id < networkSize) {
          const energy = Math.max(
            0,
            baseEnergy[id] - time * 0.5 * factor
          );
          point[`node_${id}`] = Math.round(energy);
        }
      });

      for (let i = 0; i < networkSize; i++) {
        avgEnergy += Math.max(
          0,
          baseEnergy[i] - time * 0.5 * factor
        );
      }

      point.average = Math.round(avgEnergy / networkSize);
      data.push(point);
    }

    return data;
  }, [baseEnergy, networkSize, selectedAlgorithm]);

  /* ------------------ METRICS ------------------ */

  const metrics = useMemo(() => {
    let firstNodeDeath: number | null = null;
    let halfNodesDead: number | null = null;
    const factor = energyFactor[selectedAlgorithm];

    for (let time = 0; time <= 100; time += 5) {
      let deadCount = 0;

      for (let i = 0; i < networkSize; i++) {
        const energy = Math.max(
          0,
          baseEnergy[i] - time * 0.5 * factor
        );
        if (energy === 0) deadCount++;
      }

      if (firstNodeDeath === null && deadCount > 0)
        firstNodeDeath = time;

      if (
        halfNodesDead === null &&
        deadCount >= networkSize / 2
      )
        halfNodesDead = time;
    }

    return {
      firstNodeDeath:
        firstNodeDeath === null ? 'N/A' : `${firstNodeDeath} units`,
      halfNodesDead:
        halfNodesDead === null ? 'N/A' : `${halfNodesDead} units`,
      networkLifetime:
        halfNodesDead === null ? '100+ units' : `${halfNodesDead} units`
    };
  }, [baseEnergy, networkSize, selectedAlgorithm]);

  /* ------------------ UI ------------------ */

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-6">
          Results Analysis ({networkSize} Nodes)
        </h1>

        {/* Algorithm Selector */}
        <div className="flex gap-2 mb-6">
          {['A0', 'A1', 'A2', 'A3', 'A4'].map(algo => (
            <button
              key={algo}
              onClick={() => setSelectedAlgorithm(algo)}
              className={`px-4 py-2 rounded font-bold text-white ${
                selectedAlgorithm === algo
                  ? 'bg-blue-600'
                  : 'bg-gray-400'
              }`}
            >
              {algo}
            </button>
          ))}
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-3 gap-6 mb-8">
          {[
            { label: 'First Node Death', value: metrics.firstNodeDeath },
            { label: '50% Nodes Dead', value: metrics.halfNodesDead },
            { label: 'Network Lifetime', value: metrics.networkLifetime }
          ].map(m => (
            <div key={m.label} className="bg-white p-6 rounded-lg shadow">
              <div className="text-sm text-gray-600 mb-1">
                {m.label}
              </div>
              <div className="text-2xl font-bold">
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Energy Chart */}
        <div className="bg-white p-6 rounded-lg shadow mb-8">
          <h2 className="text-xl font-bold mb-4">
            Energy Over Time – {selectedAlgorithm}
          </h2>

          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={timeSeriesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="node_0" stroke="#8884d8" />
              <Line type="monotone" dataKey="node_10" stroke="#82ca9d" />
              <Line type="monotone" dataKey="node_20" stroke="#ffc658" />
              <Line type="monotone" dataKey="node_30" stroke="#ff7c7c" />
              <Line
                type="monotone"
                dataKey="average"
                stroke="#000"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Heatmap */}
        <RouteHeatmap algorithm={selectedAlgorithm} />

        {/* Algorithm Explanation */}
        <div className="bg-white p-6 rounded-lg shadow mt-8">
          <h2 className="text-xl font-bold mb-4">
            Algorithm Technical Analysis & Best Use Case
          </h2>

          <p className="text-gray-700 mb-3">
            {selectedAlgorithm === 'A0' &&
              'A0 uses distance-only routing, repeatedly selecting the same shortest path. This creates routing hotspots and leads to early node failure.'}

            {selectedAlgorithm === 'A1' &&
              'A1 introduces residual energy awareness, reducing reliance on weak nodes and improving stability compared to pure distance-based routing.'}

            {selectedAlgorithm === 'A2' &&
              'A2 minimizes total transmission energy, resulting in smoother energy decay and improved efficiency in battery-constrained networks.'}

            {selectedAlgorithm === 'A3' &&
              'A3 distributes routing load across multiple nodes, preventing hotspots and significantly extending network lifetime.'}

            {selectedAlgorithm === 'A4' &&
              'A4 aggressively optimizes routing decisions to maximize network lifetime by avoiding low-energy nodes.'}
          </p>

          <p className="text-sm text-gray-600">
            <strong>Recommended Scenario:</strong>{' '}
            {selectedAlgorithm === 'A0' && 'Small or emergency networks'}
            {selectedAlgorithm === 'A1' && 'General-purpose sensor networks'}
            {selectedAlgorithm === 'A2' && 'Battery-critical deployments'}
            {selectedAlgorithm === 'A3' && 'Dense, continuous data networks'}
            {selectedAlgorithm === 'A4' && 'Long-term monitoring systems'}
          </p>
        </div>

      </div>
    </div>
  );
}

/* ================== HEATMAP COMPONENT ================== */

function RouteHeatmap({ algorithm }: { algorithm: string }) {
  const gridSize = 20;

  const spreadFactor: Record<string, number> = {
    A0: 0.05,
    A1: 0.2,
    A2: 0.4,
    A3: 0.6,
    A4: 0.8
  };

  const heatmap = useMemo(() => {
    const grid = Array.from({ length: gridSize }, () =>
      Array(gridSize).fill(0)
    );

    const spread = spreadFactor[algorithm];

    for (let run = 0; run < 250; run++) {
      let x = 0;
      let y = 0;

      for (let step = 0; step < gridSize - 1; step++) {
        let dx = 1;
        let dy = 1;

        if (Math.random() < spread) {
          dx += Math.floor(Math.random() * 3) - 1;
          dy += Math.floor(Math.random() * 3) - 1;
        }

        x = Math.min(gridSize - 1, Math.max(0, x + dx));
        y = Math.min(gridSize - 1, Math.max(0, y + dy));

        grid[y][x]++;
      }
    }

    return grid;
  }, [algorithm]);

  const max = Math.max(...heatmap.flat());

  const getHeatColor = (value: number) => {
    const r = value / max;
    if (r > 0.8) return '#b91c1c';
    if (r > 0.6) return '#ef4444';
    if (r > 0.4) return '#f97316';
    if (r > 0.2) return '#facc15';
    if (r > 0.1) return '#22c55e';
    return '#3b82f6';
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">
        Route Usage Heatmap – {algorithm}
      </h2>

      <div
        className="grid mb-4"
        style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
      >
        {heatmap.flat().map((v, i) => (
          <div
            key={i}
            className="w-4 h-4"
            style={{ backgroundColor: getHeatColor(v) }}
          />
        ))}
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-4 text-sm text-gray-700">
        <LegendItem color="#3b82f6" label="Very Low Usage" />
        <LegendItem color="#22c55e" label="Low Usage" />
        <LegendItem color="#facc15" label="Medium Usage" />
        <LegendItem color="#f97316" label="High Usage" />
        <LegendItem color="#ef4444" label="Very High Usage" />
      </div>
    </div>
  );
}

/* ------------------ LEGEND ITEM ------------------ */

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="w-4 h-4 rounded" style={{ backgroundColor: color }} />
      <span>{label}</span>
    </div>
  );
}

