import React, { useRef, useLayoutEffect, useState, useMemo } from 'react';
import { TaskBar } from './TaskBar';
import { useGantt } from '../contexts/GanttContext';

const MONTH_NAMES = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export const GanttChart: React.FC = () => {
  const { tasks, projectStartDate, totalDays, getTaskById } = useGantt();
  const chartAreaRef = useRef<HTMLDivElement>(null);
  const [chartWidth, setChartWidth] = useState(0);

  const rowHeight = 40; // height of each task row
  const taskListWidth = 300; // width of the task list sidebar

  useLayoutEffect(() => {
    if (!chartAreaRef.current) return;
    
    const observer = new ResizeObserver(entries => {
      if (entries[0]) {
        setChartWidth(entries[0].contentRect.width);
      }
    });

    observer.observe(chartAreaRef.current);
    setChartWidth(chartAreaRef.current.offsetWidth); // initial size

    return () => observer.disconnect();
  }, []);
  
  const taskPositions = useMemo(() => {
    const positions = new Map<number, { x: number; y: number; width: number }>();
    if (chartWidth === 0) return positions;
    
    const dayWidth = chartWidth / totalDays;

    tasks.forEach((task, index) => {
        const y = (index * rowHeight) + (rowHeight / 2);
        const startX = task.start * dayWidth;
        const endX = task.end * dayWidth;
        positions.set(task.id, { x: startX, y, width: endX - startX });
    });
    return positions;
  }, [tasks, totalDays, chartWidth]);


  const renderMonths = () => {
    const months = [];
    let currentMonth = -1;
    for (let day = 0; day < totalDays; day++) {
        const date = new Date(projectStartDate);
        date.setDate(date.getDate() + day);
        const month = date.getMonth();
        if (month !== currentMonth) {
            currentMonth = month;
            months.push({ 
                name: `${MONTH_NAMES[month]} '${date.getFullYear().toString().slice(-2)}`, 
                startDay: day 
            });
        }
    }
    return months.map((month, i) => {
        const nextMonthStart = i + 1 < months.length ? months[i + 1].startDay : totalDays;
        const width = ((nextMonthStart - month.startDay) / totalDays) * 100;
        return (
            <div key={month.name} style={{ width: `${width}%` }} className="text-center text-sm font-semibold border-r border-gray-200 py-2">
                {month.name}
            </div>
        );
    });
  };

  const getPathD = (startPos: { x: number; y: number }, endPos: { x: number; y: number }) => {
    const offset = 20;
    const midX = startPos.x + offset;
    return `M ${startPos.x} ${startPos.y} H ${midX} V ${endPos.y} H ${endPos.x}`;
  };

  const renderDependencies = (isCritical: boolean) => {
    return tasks.flatMap(task =>
      task.dependencies.map(depId => {
        const startTask = getTaskById(depId);
        const endTaskPos = taskPositions.get(task.id);

        if (startTask && endTaskPos) {
          const isLinkCritical = startTask.isCritical && task.isCritical;
          if (isLinkCritical !== isCritical) return null;

          const startTaskPos = taskPositions.get(depId);
          if (startTaskPos) {
            const startPos = { x: startTaskPos.x + startTaskPos.width, y: startTaskPos.y };
            const endPos = { x: endTaskPos.x, y: endTaskPos.y };
            return (
              <path
                key={`${depId}-${task.id}`}
                d={getPathD(startPos, endPos)}
                stroke={isCritical ? "#ef4444" : "#a0aec0"}
                strokeWidth={isCritical ? "2" : "1.5"}
                fill="none"
                markerEnd={isCritical ? "url(#criticalArrowhead)" : "url(#arrowhead)"}
              />
            );
          }
        }
        return null;
      })
    );
  };

  return (
    <div className="relative w-full overflow-x-auto">
      <div style={{minWidth: '1200px'}}>
        <div className="flex sticky top-0 bg-white z-10">
          <div style={{ width: `${taskListWidth}px` }} className="flex-shrink-0 font-bold border-b-2 border-gray-300 p-2">Tarea</div>
          <div className="flex-grow border-b-2 border-gray-300">
            <div className="flex h-full">{renderMonths()}</div>
          </div>
        </div>
        <div className="flex">
          <div style={{ width: `${taskListWidth}px` }} className="flex-shrink-0 border-r-2 border-gray-300">
            {tasks.map(task => (
              <div key={task.id} style={{height: `${rowHeight}px`}} className="p-2 border-b border-gray-200 truncate text-sm flex items-center">
                {task.name}
              </div>
            ))}
          </div>
          <div className="relative flex-grow" ref={chartAreaRef} style={{height: tasks.length * rowHeight}}>
            {tasks.map((task, index) => (
              <div key={task.id} className="absolute w-full" style={{ top: `${index * rowHeight}px`, height: `${rowHeight}px` }}>
                 <TaskBar task={task} />
              </div>
            ))}
            <svg className="absolute top-0 left-0 w-full h-full pointer-events-none" style={{ zIndex: 5 }}>
              <defs>
                <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#a0aec0" />
                </marker>
                <marker id="criticalArrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                  <polygon points="0 0, 10 3.5, 0 7" fill="#ef4444" />
                </marker>
              </defs>
              <g>{renderDependencies(false)}</g>
              <g>{renderDependencies(true)}</g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};