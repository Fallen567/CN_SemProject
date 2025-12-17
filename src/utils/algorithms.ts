// Routing algorithms for energy-efficient networks
export interface Node {
  id: number;
  x: number;
  y: number;
  energy: number;
}

export interface GraphEdge {
  from: number;
  to: number;
  distance: number;
  hopCount: number;
}

export interface RouteResult {
  path: number[];
  hops: number;
  energyCost: number;
  hopsByNode: number[];
}

// Calculate Euclidean distance between nodes
export const calculateDistance = (x1: number, y1: number, x2: number, y2: number): number => {
  return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
};

// Build distance matrix from node positions
export const buildDistanceMatrix = (nodes: Node[]): number[][] => {
  const n = nodes.length;
  const matrix: number[][] = Array(n).fill(null).map(() => Array(n).fill(Infinity));
  
  for (let i = 0; i < n; i++) {
    matrix[i][i] = 0;
    for (let j = i + 1; j < n; j++) {
      const dist = calculateDistance(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
      matrix[i][j] = dist;
      matrix[j][i] = dist;
    }
  }
  return matrix;
};

// A0: Dijkstra - Shortest path only (ignores energy)
export const dijkstraRoute = (
  start: number,
  end: number,
  distances: number[][]
): RouteResult => {
  const n = distances.length;
  const dist = Array(n).fill(Infinity);
  const prev = Array(n).fill(-1);
  const visited = Array(n).fill(false);
  
  dist[start] = 0;
  
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
        u = j;
      }
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited[u] = true;
    
    for (let v = 0; v < n; v++) {
      if (distances[u][v] !== Infinity && dist[u] + distances[u][v] < dist[v]) {
        dist[v] = dist[u] + distances[u][v];
        prev[v] = u;
      }
    }
  }
  
  const path: number[] = [];
  let current = end;
  while (current !== -1) {
    path.unshift(current);
    current = prev[current];
  }
  
  return {
    path,
    hops: path.length - 1,
    energyCost: dist[end],
    hopsByNode: path
  };
};

// A1: Distance + Residual Energy (simple energy-aware)
export const energyAwareRoute = (
  start: number,
  end: number,
  distances: number[][],
  nodeEnergies: number[]
): RouteResult => {
  const n = distances.length;
  const dist = Array(n).fill(Infinity);
  const prev = Array(n).fill(-1);
  const visited = Array(n).fill(false);
  
  dist[start] = 0;
  
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
        u = j;
      }
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited[u] = true;
    
    for (let v = 0; v < n; v++) {
      if (distances[u][v] !== Infinity) {
        // Cost = distance + penalty for low energy
        const energyPenalty = nodeEnergies[v] < 20 ? 50 : 0;
        const cost = distances[u][v] + energyPenalty;
        
        if (dist[u] + cost < dist[v]) {
          dist[v] = dist[u] + cost;
          prev[v] = u;
        }
      }
    }
  }
  
  const path: number[] = [];
  let current = end;
  while (current !== -1) {
    path.unshift(current);
    current = prev[current];
  }
  
  return {
    path,
    hops: path.length - 1,
    energyCost: dist[end],
    hopsByNode: path
  };
};

// A2: Minimum Energy Path (total transmit energy along path)
export const minimumEnergyRoute = (
  start: number,
  end: number,
  distances: number[][],
  nodeEnergies: number[]
): RouteResult => {
  const n = distances.length;
  // Cost function: distance * (residual energy required / available)
  const getTransmitCost = (fromIdx: number, toIdx: number): number => {
    const dist = distances[fromIdx][toIdx];
    const txPower = dist * 0.1; // Transmit power proportional to distance
    const availableEnergy = Math.max(nodeEnergies[fromIdx], 1);
    return txPower / (availableEnergy / 100);
  };
  
  const dist = Array(n).fill(Infinity);
  const prev = Array(n).fill(-1);
  const visited = Array(n).fill(false);
  
  dist[start] = 0;
  
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
        u = j;
      }
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited[u] = true;
    
    for (let v = 0; v < n; v++) {
      if (distances[u][v] !== Infinity) {
        const cost = getTransmitCost(u, v);
        if (dist[u] + cost < dist[v]) {
          dist[v] = dist[u] + cost;
          prev[v] = u;
        }
      }
    }
  }
  
  const path: number[] = [];
  let current = end;
  while (current !== -1) {
    path.unshift(current);
    current = prev[current];
  }
  
  return {
    path,
    hops: path.length - 1,
    energyCost: dist[end],
    hopsByNode: path
  };
};

// A3: Balanced Energy Routing (adds load-balancing)
export const balancedEnergyRoute = (
  start: number,
  end: number,
  distances: number[][],
  nodeEnergies: number[],
  usageCount: number[]
): RouteResult => {
  const n = distances.length;
  
  const getBalancedCost = (fromIdx: number, toIdx: number): number => {
    const dist = distances[fromIdx][toIdx];
    const txPower = dist * 0.1;
    const availableEnergy = Math.max(nodeEnergies[toIdx], 1);
    const loadPenalty = usageCount[toIdx] * 10; // Penalize heavily used nodes
    return (txPower / (availableEnergy / 100)) + loadPenalty;
  };
  
  const dist = Array(n).fill(Infinity);
  const prev = Array(n).fill(-1);
  const visited = Array(n).fill(false);
  
  dist[start] = 0;
  
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
        u = j;
      }
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited[u] = true;
    
    for (let v = 0; v < n; v++) {
      if (distances[u][v] !== Infinity) {
        const cost = getBalancedCost(u, v);
        if (dist[u] + cost < dist[v]) {
          dist[v] = dist[u] + cost;
          prev[v] = u;
        }
      }
    }
  }
  
  const path: number[] = [];
  let current = end;
  while (current !== -1) {
    path.unshift(current);
    current = prev[current];
  }
  
  return {
    path,
    hops: path.length - 1,
    energyCost: dist[end],
    hopsByNode: path
  };
};

// A4: Aggressively Optimized Energy-Efficient Routing
export const aggressiveOptimizedRoute = (
  start: number,
  end: number,
  distances: number[][],
  nodeEnergies: number[],
  usageCount: number[]
): RouteResult => {
  const n = distances.length;
  
  const getOptimizedCost = (fromIdx: number, toIdx: number): number => {
    const dist = distances[fromIdx][toIdx];
    const txPower = dist * 0.1;
    const availableEnergy = Math.max(nodeEnergies[toIdx], 1);
    const energyEfficiency = availableEnergy / 100;
    const loadPenalty = usageCount[toIdx] * 20;
    const hopPenalty = 5; // Small penalty for extra hops
    
    return (txPower / energyEfficiency) + loadPenalty + hopPenalty;
  };
  
  const dist = Array(n).fill(Infinity);
  const prev = Array(n).fill(-1);
  const visited = Array(n).fill(false);
  
  dist[start] = 0;
  
  for (let i = 0; i < n; i++) {
    let u = -1;
    for (let j = 0; j < n; j++) {
      if (!visited[j] && (u === -1 || dist[j] < dist[u])) {
        u = j;
      }
    }
    if (u === -1 || dist[u] === Infinity) break;
    visited[u] = true;
    
    for (let v = 0; v < n; v++) {
      if (distances[u][v] !== Infinity) {
        const cost = getOptimizedCost(u, v);
        if (dist[u] + cost < dist[v]) {
          dist[v] = dist[u] + cost;
          prev[v] = u;
        }
      }
    }
  }
  
  const path: number[] = [];
  let current = end;
  while (current !== -1) {
    path.unshift(current);
    current = prev[current];
  }
  
  return {
    path,
    hops: path.length - 1,
    energyCost: dist[end],
    hopsByNode: path
  };
};

export const computeRoute = (
  algorithm: string,
  start: number,
  end: number,
  distances: number[][],
  nodeEnergies: number[],
  usageCount: number[] = Array(distances.length).fill(0)
): RouteResult => {
  switch(algorithm) {
    case 'A0':
      return dijkstraRoute(start, end, distances);
    case 'A1':
      return energyAwareRoute(start, end, distances, nodeEnergies);
    case 'A2':
      return minimumEnergyRoute(start, end, distances, nodeEnergies);
    case 'A3':
      return balancedEnergyRoute(start, end, distances, nodeEnergies, usageCount);
    case 'A4':
      return aggressiveOptimizedRoute(start, end, distances, nodeEnergies, usageCount);
    default:
      return dijkstraRoute(start, end, distances);
  }
};
