export interface NodeData {
  id: number;
  x: number;
  y: number;
}

export interface EnergyData {
  nodeId: number;
  timestamp: number;
  energy: number;
}

// Parse CSV string to array of objects
export const parseCSV = (csvString: string): Record<string, string>[] => {
  const lines = csvString.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const data: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(',').map(v => v.trim());
    const obj: Record<string, string> = {};
    
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    
    data.push(obj);
  }

  return data;
};

// Load node positions from CSV
export const loadNodePositions = (csvString: string): NodeData[] => {
  const data = parseCSV(csvString);
  return data.map(row => ({
    id: parseInt(row.node || row.id || '0'),
    x: parseFloat(row.x || '0'),
    y: parseFloat(row.y || '0')
  }));
};

// Load energy data from CSV
export const loadEnergyData = (csvString: string): EnergyData[] => {
  const data = parseCSV(csvString);
  return data.map(row => ({
    nodeId: parseInt(row.node || row.nodeId || '0'),
    timestamp: parseInt(row.time || row.timestamp || '0'),
    energy: parseFloat(row.energy || '0')
  }));
};

// Handle file upload and return CSV content
export const handleFileUpload = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        resolve(event.target.result as string);
      }
    };
    reader.onerror = reject;
    reader.readAsText(file);
  });
};

// Sample CSV data (built-in)
export const SAMPLE_NODES_CSV = `node,x,y
0,50,100
1,120,80
2,200,150
3,75,250
4,180,200
5,300,100
6,250,280
7,100,350
8,280,50
9,350,200
10,50,200
11,150,100
12,200,280
13,320,150
14,100,80
15,230,200
16,180,50
17,300,300
18,70,150
19,220,100
20,380,220
21,90,50
22,270,100
23,110,420
24,340,380
25,60,300
26,400,150
27,140,200
28,320,80
29,200,50
30,100,420
31,250,420
32,380,300
33,40,180
34,420,100
35,160,350
36,300,200
37,70,280
38,350,50
39,200,380
40,80,100
41,350,280
42,120,380
43,400,300
44,60,50
45,280,350
46,150,280
47,320,200
48,100,200
49,380,80`;

export const SAMPLE_ENERGY_CSV = `node,time,energy
0,0,100
0,10,95
0,20,88
0,30,80
0,40,70
1,0,98
1,10,92
1,20,85
1,30,78
1,40,68
2,0,96
2,10,90
2,20,82
2,30,75
2,40,65`;
