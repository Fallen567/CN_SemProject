import React from 'react';
import { Download, Wifi, Zap, TrendingUp, BarChart3 } from 'lucide-react';
import { downloadDashboardZip } from '../utils/zipDownloader';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-blue-900 text-white">
      {/* Hero Section */}
      <div className="pt-20 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 text-6xl">🟢</div>
          <h1 className="text-5xl font-bold mb-4">Green Net</h1>
          <p className="text-2xl text-blue-100 mb-2">
            Energy-Efficient Routing Simulator
          </p>
          <p className="text-blue-200 text-lg mb-8">
            Visualize and analyze 5 adaptive routing algorithms for wireless
            ad-hoc networks
          </p>

          <button
            onClick={downloadDashboardZip}
            className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-bold transition-all transform hover:scale-105 mb-8"
          >
            <Download size={20} />
            Download Dashboard ZIP (Offline)
          </button>

          <p className="text-blue-100 text-sm">
            No server required • Pure frontend • CSV support included
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">Key Features</h2>
        <div className="grid grid-cols-3 gap-8">
          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm border border-blue-700">
            <Zap className="w-12 h-12 mb-4 text-yellow-400" />
            <h3 className="text-xl font-bold mb-2">5 Algorithms</h3>
            <p className="text-blue-100">
              A0 (Dijkstra) through A4 (Aggressively Optimized) routing
              algorithms
            </p>
          </div>

          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm border border-blue-700">
            <Wifi className="w-12 h-12 mb-4 text-cyan-400" />
            <h3 className="text-xl font-bold mb-2">Network Simulation</h3>
            <p className="text-blue-100">
              Interactive visualization with 50 nodes and real-time route
              finding
            </p>
          </div>

          <div className="bg-blue-800 bg-opacity-50 rounded-lg p-6 backdrop-blur-sm border border-blue-700">
            <TrendingUp className="w-12 h-12 mb-4 text-green-400" />
            <h3 className="text-xl font-bold mb-2">Analytics</h3>
            <p className="text-blue-100">
              Energy charts, network lifetime metrics, and algorithm comparisons
            </p>
          </div>
        </div>
      </div>

      {/* Algorithm Ladder */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Algorithm Ladder
        </h2>
        <div className="grid grid-cols-5 gap-4">
          <div className="bg-blue-100 text-gray-900 rounded-lg p-6 text-center border-2 border-blue-300 hover:shadow-lg transition-all">
            <div className="text-3xl font-bold">A0</div>
            <div className="text-sm font-bold mt-2">Dijkstra</div>
            <div className="text-xs text-gray-600 mt-3">Shortest path only</div>
            <div className="text-xs text-gray-500 mt-2">Foundation</div>
          </div>

          <div className="bg-green-100 text-gray-900 rounded-lg p-6 text-center border-2 border-green-300 hover:shadow-lg transition-all">
            <div className="text-3xl font-bold">A1</div>
            <div className="text-sm font-bold mt-2">Energy-Aware</div>
            <div className="text-xs text-gray-600 mt-3">Distance + Energy</div>
            <div className="text-xs text-gray-500 mt-2">Step 1</div>
          </div>

          <div className="bg-yellow-100 text-gray-900 rounded-lg p-6 text-center border-2 border-yellow-300 hover:shadow-lg transition-all">
            <div className="text-3xl font-bold">A2</div>
            <div className="text-sm font-bold mt-2">Min Energy</div>
            <div className="text-xs text-gray-600 mt-3">Total TX Energy</div>
            <div className="text-xs text-gray-500 mt-2">Step 2</div>
          </div>

          <div className="bg-purple-100 text-gray-900 rounded-lg p-6 text-center border-2 border-purple-300 hover:shadow-lg transition-all">
            <div className="text-3xl font-bold">A3</div>
            <div className="text-sm font-bold mt-2">Balanced</div>
            <div className="text-xs text-gray-600 mt-3">Load Balancing</div>
            <div className="text-xs text-gray-500 mt-2">Step 3</div>
          </div>

          <div className="bg-red-100 text-gray-900 rounded-lg p-6 text-center border-2 border-red-300 hover:shadow-lg transition-all">
            <div className="text-3xl font-bold">A4</div>
            <div className="text-sm font-bold mt-2">Optimized</div>
            <div className="text-xs text-gray-600 mt-3">All Optimizations</div>
            <div className="text-xs text-gray-500 mt-2">Best</div>
          </div>
        </div>
      </div>

      {/* Pages Overview */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Explore the Simulator
        </h2>
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-blue-400 hover:bg-opacity-20 transition-all">
            <BarChart3 className="w-10 h-10 mb-3 text-yellow-300" />
            <h3 className="text-lg font-bold mb-2">Algorithms</h3>
            <p className="text-sm text-blue-100">
              Learn how each algorithm works and why it's better than the
              previous one
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-cyan-400 hover:bg-opacity-20 transition-all">
            <Wifi className="w-10 h-10 mb-3 text-cyan-300" />
            <h3 className="text-lg font-bold mb-2">Network Sim</h3>
            <p className="text-sm text-blue-100">
              Visualize nodes and find optimal routes with selected algorithms
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-green-400 hover:bg-opacity-20 transition-all">
            <TrendingUp className="w-10 h-10 mb-3 text-green-300" />
            <h3 className="text-lg font-bold mb-2">Results</h3>
            <p className="text-sm text-blue-100">
              Analyze energy consumption and network lifetime metrics
            </p>
          </div>

          <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-6 border border-purple-400 hover:bg-opacity-20 transition-all">
            <Zap className="w-10 h-10 mb-3 text-purple-300" />
            <h3 className="text-lg font-bold mb-2">Comparison</h3>
            <p className="text-sm text-blue-100">
              Compare algorithms with charts and energy heatmaps
            </p>
          </div>
        </div>
      </div>

      {/* Technical Details */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-lg p-8 border border-blue-400">
          <h2 className="text-2xl font-bold mb-6">Technical Details</h2>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-3">Routing Algorithms</h3>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li>✓ A0: Dijkstra shortest path</li>
                <li>✓ A1: Simple energy-aware routing</li>
                <li>✓ A2: Minimum energy path</li>
                <li>✓ A3: Balanced with load-balancing</li>
                <li>✓ A4: Aggressively optimized</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-3">Features</h3>
              <ul className="space-y-2 text-blue-100 text-sm">
                <li>✓ 50-node network simulation</li>
                <li>✓ Real-time route visualization</li>
                <li>✓ Energy tracking & analysis</li>
                <li>✓ CSV data import support</li>
                <li>✓ 100% frontend - no backend required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-blue-700 mt-16 py-8 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-blue-200 font-bold">
            Green Net Energy-Efficient Routing Simulator
          </p>
          <p className="text-blue-300 text-sm mt-2">
            For wireless ad-hoc network research and education
          </p>
          <p className="text-blue-400 text-xs mt-4">
            Built with React + TypeScript • Charts by Recharts • Fully
            responsive
          </p>
        </div>
      </div>
    </div>
  );
}
