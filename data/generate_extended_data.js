import fs from 'fs';

function generatePositions(numNodes, maxX = 250, maxY = 200) {
  let csv = 'node,x,y\n';
  for (let i = 0; i < numNodes; i++) {
    const x = Math.random() * maxX;
    const y = Math.random() * maxY;
    csv += `${i},${x.toFixed(4)},${y.toFixed(4)}\n`;
  }
  return csv;
}

function calculateDistance(x1, y1, x2, y2) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function generateDistances(positions) {
  const lines = positions.trim().split('\n');
  const nodes = [];

  for (let i = 1; i < lines.length; i++) {
    const [id, x, y] = lines[i].split(',');
    nodes.push({ id: parseInt(id), x: parseFloat(x), y: parseFloat(y) });
  }

  let csv = 'i,j,distance\n';
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i + 1; j < nodes.length; j++) {
      const dist = calculateDistance(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      csv += `${nodes[i].id},${nodes[j].id},${dist.toFixed(4)}\n`;
    }
  }
  return csv;
}

function generateEnergy(numNodes, timeSteps = 20) {
  let csv = 'time,node,remaining_energy_j\n';
  const startTime = 0.2;
  const timeStep = 1.0;

  for (let t = 0; t < timeSteps; t++) {
    const time = startTime + (t * timeStep);
    for (let node = 0; node < numNodes; node++) {
      const initialEnergy = 20;
      const decayRate = 0.05 + (Math.random() * 0.02);
      const energy = Math.max(3, initialEnergy - (t * decayRate));
      csv += `${time.toFixed(1)},${node},${energy.toFixed(4)}\n`;
    }
  }
  return csv;
}

// Generate 100-node dataset
const pos100 = generatePositions(100);
fs.writeFileSync('data/impn100_static_positions.csv', pos100);
const dist100 = generateDistances(pos100);
fs.writeFileSync('data/impn100_static_distances.csv', dist100);
const energy100 = generateEnergy(100);
fs.writeFileSync('data/impn100_static_energy.csv', energy100);

// Generate 150-node dataset
const pos150 = generatePositions(150);
fs.writeFileSync('data/impn150_static_positions.csv', pos150);
const dist150 = generateDistances(pos150);
fs.writeFileSync('data/impn150_static_distances.csv', dist150);
const energy150 = generateEnergy(150);
fs.writeFileSync('data/impn150_static_energy.csv', energy150);

console.log('Generated extended datasets: 100-node and 150-node networks');
