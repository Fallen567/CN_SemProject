import { Info } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex items-center gap-3 mb-12">
          <Info className="w-8 h-8 text-teal-600" />
          <h1 className="text-4xl font-bold text-gray-900">About Green Net</h1>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Project Overview</h2>
          <p className="text-gray-700 mb-4">
            Green Net is a comprehensive simulation framework designed to demonstrate and analyze
            energy-efficient routing algorithms in wireless ad-hoc networks. This project serves
            as an educational tool for understanding how adaptive routing can significantly
            extend network lifetime while maintaining performance.
          </p>
          <p className="text-gray-700">
            The simulator compares traditional shortest-path routing (Dijkstra's algorithm)
            with energy-aware routing approaches, providing real-time visualization and detailed
            analytics to illustrate the benefits of energy-conscious network design.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Key Objectives</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">Demonstrate energy-efficient routing in practice</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">Compare algorithm performance across network sizes</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">Visualize packet routing and energy depletion</span>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-600 font-bold flex-shrink-0">✓</span>
                <span className="text-gray-700">Provide comprehensive analytics and metrics</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Technical Stack</h2>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <span className="font-semibold text-gray-900 w-24">Frontend:</span>
                <span className="text-gray-700">React + TypeScript</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-gray-900 w-24">Styling:</span>
                <span className="text-gray-700">Tailwind CSS</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-gray-900 w-24">Charts:</span>
                <span className="text-gray-700">Chart.js + react-chartjs-2</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-gray-900 w-24">Routing:</span>
                <span className="text-gray-700">React Router</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-gray-900 w-24">Build:</span>
                <span className="text-gray-700">Vite</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Simulation Parameters</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Network Configuration</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <dt className="text-gray-600">Network Sizes:</dt>
                  <dd className="font-semibold text-gray-900">50, 100, 150 nodes</dd>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <dt className="text-gray-600">Network Type:</dt>
                  <dd className="font-semibold text-gray-900">Wireless ad-hoc</dd>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <dt className="text-gray-600">Coverage Area:</dt>
                  <dd className="font-semibold text-gray-900">250m × 200m</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Link Range:</dt>
                  <dd className="font-semibold text-gray-900">~100m (variable)</dd>
                </div>
              </dl>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Energy Parameters</h3>
              <dl className="space-y-2 text-sm">
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <dt className="text-gray-600">Initial Energy:</dt>
                  <dd className="font-semibold text-gray-900">20.0 J/node</dd>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <dt className="text-gray-600">Energy Decay Rate:</dt>
                  <dd className="font-semibold text-gray-900">~0.05-0.07 J/s</dd>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-2">
                  <dt className="text-gray-600">Critical Threshold:</dt>
                  <dd className="font-semibold text-gray-900">5.0 J</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-gray-600">Simulation Duration:</dt>
                  <dd className="font-semibold text-gray-900">20 seconds</dd>
                </div>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Methodology</h2>
          <div className="space-y-4 text-gray-700">
            <p>
              The simulation uses pre-computed network topology and energy consumption data
              generated from a realistic wireless sensor network simulator. The framework
              implements two routing algorithms that operate on this data:
            </p>
            <ol className="space-y-3 ml-4">
              <li className="flex gap-3">
                <span className="font-semibold text-teal-600 flex-shrink-0">1.</span>
                <span><strong>Dijkstra's Shortest Path:</strong> Standard algorithm that always selects the shortest distance path regardless of node energy states.</span>
              </li>
              <li className="flex gap-3">
                <span className="font-semibold text-teal-600 flex-shrink-0">2.</span>
                <span><strong>Energy-Aware Routing:</strong> Adaptive algorithm that considers both path distance and remaining node energy, calculating routing cost as: distance / remaining_energy.</span>
              </li>
            </ol>
            <p className="mt-4">
              The simulator visualizes packet routing in real-time, showing how each algorithm
              behaves over time and providing comprehensive statistics on network performance,
              energy consumption, and packet delivery metrics.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-teal-50 rounded-lg border border-teal-200 p-8">
            <h2 className="text-xl font-bold text-teal-900 mb-4">Expected Results</h2>
            <ul className="space-y-2 text-sm text-teal-800">
              <li>✓ Energy-aware routing extends network lifetime by 35-40%</li>
              <li>✓ More balanced energy consumption across nodes</li>
              <li>✓ Slightly longer paths on average (2-5% increase)</li>
              <li>✓ Better load distribution prevents node starvation</li>
              <li>✓ Improved packet delivery rates in later stages</li>
            </ul>
          </div>

          <div className="bg-blue-50 rounded-lg border border-blue-200 p-8">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Limitations</h2>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• Based on simulated network data, not real deployment</li>
              <li>• Assumes stable network topology during simulation</li>
              <li>• Does not model packet collisions or MAC-layer interference</li>
              <li>• Energy model is simplified for demonstration</li>
              <li>• Does not account for node mobility</li>
            </ul>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">References & Further Reading</h2>
          <div className="space-y-3 text-sm">
            <p className="text-gray-700">
              This project is inspired by foundational research in wireless sensor networks and
              energy-efficient routing protocols. Key concepts include:
            </p>
            <ul className="space-y-2 ml-4 text-gray-700">
              <li>• Dijkstra, E. W. (1959). "A note on two problems in connexion with graphs"</li>
              <li>• S. Singh et al. (1998). "Power-aware routing in mobile ad hoc networks"</li>
              <li>• C. K. Toh. (2001). "Ad hoc mobile wireless networks: Protocols and systems"</li>
              <li>• Akyildiz et al. (2002). "Wireless Sensor Networks: a survey" - IEEE Communications Surveys</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 p-6 bg-gray-100 rounded-lg text-center text-sm text-gray-600">
          <p>
            Green Net - Energy-Efficient Routing Simulator v1.0
          </p>
          <p className="mt-2">
            A university research project demonstrating adaptive routing for wireless networks
          </p>
        </div>
      </div>
    </div>
  );
}
