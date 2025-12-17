import { forwardRef, useEffect, useRef } from 'react';
import { NetworkData } from '../types';
import { getEnergyAtTime } from '../utils/dataLoader';

interface Packet {
  id: number;
  startNode: number;
  endNode: number;
  path: number[];
  progress: number;
  isEfficient: boolean;
}

interface NetworkCanvasProps {
  data: NetworkData;
  packets: Packet[];
  currentTime: number;
  selectedNodes: { from: number; to: number } | null;
  onNodeSelect: (nodeId: number) => void;
}

const NetworkCanvas = forwardRef<HTMLCanvasElement, NetworkCanvasProps>(
  ({ data, packets, currentTime, selectedNodes, onNodeSelect }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !containerRef.current) return;

      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = containerRef.current.clientWidth;
      canvas.height = containerRef.current.clientHeight;

      const padding = 40;
      const maxX = Math.max(...data.positions.map(p => p.x));
      const maxY = Math.max(...data.positions.map(p => p.y));

      const scaleX = (canvas.width - padding * 2) / maxX;
      const scaleY = (canvas.height - padding * 2) / maxY;

      const getScreenPos = (x: number, y: number) => ({
        x: padding + x * scaleX,
        y: padding + y * scaleY
      });

      ctx.fillStyle = '#f9fafb';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const drawEdges = () => {
        ctx.strokeStyle = '#e5e7eb';
        ctx.lineWidth = 1;

        for (let i = 0; i < data.positions.length; i++) {
          for (let j = i + 1; j < data.positions.length; j++) {
            const dist = data.distances.find(
              d => (d.from === i && d.to === j) || (d.from === j && d.to === i)
            );
            if (dist && dist.distance < 100) {
              const p1 = getScreenPos(data.positions[i].x, data.positions[i].y);
              const p2 = getScreenPos(data.positions[j].x, data.positions[j].y);
              ctx.beginPath();
              ctx.moveTo(p1.x, p1.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.stroke();
            }
          }
        }
      };

      const drawPackets = () => {
        packets.forEach(packet => {
          if (packet.path.length < 2) return;

          for (let i = 0; i < packet.path.length - 1; i++) {
            const fromNode = packet.path[i];
            const toNode = packet.path[i + 1];
            const fromPos = getScreenPos(data.positions[fromNode].x, data.positions[fromNode].y);
            const toPos = getScreenPos(data.positions[toNode].x, data.positions[toNode].y);

            const segmentLength = packet.path.length - 1;
            const currentSegment = i + packet.progress;

            if (currentSegment >= i && currentSegment < i + 1) {
              const segmentProgress = currentSegment - i;
              const x = fromPos.x + (toPos.x - fromPos.x) * segmentProgress;
              const y = fromPos.y + (toPos.y - fromPos.y) * segmentProgress;

              ctx.fillStyle = packet.isEfficient ? '#14b8a6' : '#3b82f6';
              ctx.beginPath();
              ctx.arc(x, y, 6, 0, Math.PI * 2);
              ctx.fill();

              ctx.strokeStyle = '#ffffff';
              ctx.lineWidth = 2;
              ctx.beginPath();
              ctx.arc(x, y, 6, 0, Math.PI * 2);
              ctx.stroke();
            }
          }
        });
      };

      const drawNodes = () => {
        data.positions.forEach(node => {
          const screenPos = getScreenPos(node.x, node.y);
          const energy = getEnergyAtTime(data.energy, currentTime, node.id);
          const energyPercent = Math.max(0, energy / 20);

          const isLowEnergy = energy < 5;
          const isSelected = selectedNodes && (selectedNodes.from === node.id || selectedNodes.to === node.id);

          let fillColor = '#f0f9ff';
          if (isSelected) fillColor = '#fef08a';
          if (isLowEnergy) fillColor = '#fecaca';

          ctx.fillStyle = fillColor;
          ctx.beginPath();
          ctx.arc(screenPos.x, screenPos.y, 8, 0, Math.PI * 2);
          ctx.fill();

          ctx.strokeStyle = isLowEnergy ? '#dc2626' : isSelected ? '#ca8a04' : '#0891b2';
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(screenPos.x, screenPos.y, 8, 0, Math.PI * 2);
          ctx.stroke();

          const innerRadius = 6 * energyPercent;
          ctx.fillStyle = '#14b8a6';
          ctx.beginPath();
          ctx.arc(screenPos.x, screenPos.y, innerRadius, 0, Math.PI * 2);
          ctx.fill();

          if (data.numNodes <= 50) {
            ctx.fillStyle = '#1f2937';
            ctx.font = 'bold 10px Arial';
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(node.id.toString(), screenPos.x, screenPos.y);
          }
        });
      };

      drawEdges();
      drawPackets();
      drawNodes();
    }, [data, packets, currentTime, selectedNodes]);

    const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
      const canvas = canvasRef.current;
      if (!canvas || !containerRef.current) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const padding = 40;
      const maxX = Math.max(...data.positions.map(p => p.x));
      const maxY = Math.max(...data.positions.map(p => p.y));

      const scaleX = (canvas.width - padding * 2) / maxX;
      const scaleY = (canvas.height - padding * 2) / maxY;

      for (const node of data.positions) {
        const screenX = padding + node.x * scaleX;
        const screenY = padding + node.y * scaleY;
        const dist = Math.sqrt((x - screenX) ** 2 + (y - screenY) ** 2);

        if (dist < 12) {
          onNodeSelect(node.id);
          return;
        }
      }
    };

    return (
      <div
        ref={containerRef}
        className="w-full h-full bg-gradient-to-br from-blue-50 to-gray-50 cursor-pointer relative"
      >
        <canvas
          ref={canvasRef}
          onClick={handleCanvasClick}
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  }
);

NetworkCanvas.displayName = 'NetworkCanvas';

export default NetworkCanvas;
