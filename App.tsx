import React from 'react';
import { Header } from './components/Header';
import { ProjectInfo } from './components/ProjectInfo';
import { GanttChart } from './components/GanttChart';
import { GeminiChat } from './components/GeminiChat';
import { DetailedProcesses } from './components/DetailedProcesses';
import { ProjectTriangle } from './components/ProjectTriangle';
import { projectData, ganttTasks, phaseColors } from './constants';
import { GanttProvider } from './contexts/GanttContext';

const GanttLegend: React.FC = () => {
  const phases = Object.keys(phaseColors);
  return (
    <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs text-gray-600">
      <span className="font-bold">Leyenda:</span>
      {phases.map(phase => (
        <div key={phase} className="flex items-center gap-1.5">
          <div className={`w-3 h-3 rounded-full ${phaseColors[phase].bg}`}></div>
          <span>{phase}</span>
        </div>
      ))}
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-sm border-2 border-red-500"></div>
        <span>Tarea Crítica</span>
      </div>
       <div className="flex items-center gap-1.5">
        <svg width="16" height="16" viewBox="0 0 16 16" className="inline-block">
            <path d="M1 8 L15 8" stroke="#ef4444" strokeWidth="2" />
        </svg>
        <span>Dependencia Crítica</span>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <GanttProvider tasks={ganttTasks} projectStartDate={projectData.startDate}>
      <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
        <Header />

        <main className="p-4 md:p-6 lg:p-8 space-y-8">
          <ProjectInfo />
          
          <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Cronograma de Obra (Carta Gantt)</h2>
            <GanttChart />
            <GanttLegend />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
               <h2 className="text-2xl font-bold text-gray-800 mb-4 border-b pb-3">Detalle de Procesos Clave</h2>
              <DetailedProcesses />
            </div>
            <div className="flex flex-col gap-8">
              <ProjectTriangle />
              <GeminiChat />
            </div>
          </div>
        </main>
      </div>
    </GanttProvider>
  );
};

export default App;