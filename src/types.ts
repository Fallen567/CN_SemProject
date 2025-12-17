export interface NodePosition {
  id: number;
  x: number;
  y: number;
}

export interface EnergyData {
  time: number;
  node: number;
  energy: number;
}

export interface DistanceData {
  from: number;
  to: number;
  distance: number;
}

export interface NetworkData {
  positions: NodePosition[];
  energy: EnergyData[];
  distances: DistanceData[];
  numNodes: number;
}

export interface SimulationState {
  isRunning: boolean;
  currentTime: number;
  selectedNetworkSize: number;
}
