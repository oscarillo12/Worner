import React, { useState } from 'react';
import { GanttTask } from '../types';
import { useGantt } from '../contexts/GanttContext';
import { phaseColors } from '../constants';

interface TaskBarProps {
  task: GanttTask;
}

export const TaskBar: React.FC<TaskBarProps> = ({ task }) => {
  const { totalDays } = useGantt();
  const [isHovered, setIsHovered] = useState(false);

  const left = (task.start / totalDays) * 100;
  const width = ((task.end - task.start) / totalDays) * 100;
  
  const colorInfo = phaseColors[task.phase] || { bg: "bg-gray-400" };
  
  const criticalPathClass = task.isCritical ? 'ring-2 ring-red-500' : 'border border-gray-300';

  return (
    <div
      id={`task-bar-${task.id}`}
      className="absolute flex items-center h-10 px-2 group"
      style={{ left: `${left}%`, width: `${width}%` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className={`relative w-full h-6 rounded-md shadow-sm ${criticalPathClass} overflow-hidden ${colorInfo.bg} opacity-80`}>
        <div 
          className="absolute top-0 left-0 h-full bg-blue-400 opacity-60" 
          style={{ width: `${task.progress}%` }}
        ></div>
      </div>
      {isHovered && (
        <div className="absolute bottom-full mb-2 w-max p-2 text-xs bg-gray-800 text-white rounded-md shadow-lg z-20 pointer-events-none">
          <p className="font-bold">{task.name}</p>
          <p>Día {task.start} - {task.end}</p>
          <p>Progreso: {task.progress}%</p>
          {task.isCritical && <p className="text-red-300 font-bold">Ruta Crítica</p>}
        </div>
      )}
    </div>
  );
};