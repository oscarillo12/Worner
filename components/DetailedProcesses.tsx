import React, { useState } from 'react';
import { ChevronDownIcon } from './Icons';
import { GanttChart } from './GanttChart';
import { GanttProvider } from '../contexts/GanttContext';
import { hvacTasks, electricalTasks, projectData } from '../constants';


const CollapsibleSection: React.FC<{ title: string; children: React.ReactNode, defaultOpen?: boolean }> = ({ title, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border-b border-gray-200">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center p-3 text-left font-semibold text-gray-700 hover:bg-gray-50"
            >
                <span>{title}</span>
                <ChevronDownIcon className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && <div className="p-4 bg-gray-50 overflow-x-auto">{children}</div>}
        </div>
    );
};

export const DetailedProcesses: React.FC = () => {
  return (
    <div className="space-y-2">
      <CollapsibleSection title="Subproceso: Instalación de HVAC" defaultOpen={true}>
        <p className="text-sm text-gray-600 mb-4">Cronograma detallado para la instalación del sistema de climatización ( calefacción, ventilación y aire acondicionado). Marcas recomendadas: Carrier, Trane o similar.</p>
        <GanttProvider tasks={hvacTasks} projectStartDate={projectData.startDate}>
            <GanttChart />
        </GanttProvider>
      </CollapsibleSection>
       <CollapsibleSection title="Subproceso: Instalación Eléctrica y Luminarias">
        <p className="text-sm text-gray-600 mb-4">Cronograma detallado para la instalación del sistema eléctrico, de datos y luminarias. Se utilizará tecnología LED de alta eficiencia (marca recomendada: Philips o similar).</p>
        <GanttProvider tasks={electricalTasks} projectStartDate={projectData.startDate}>
            <GanttChart />
        </GanttProvider>
      </CollapsibleSection>
       <CollapsibleSection title="Marcos Legales y Normativos Clave">
        <ul className="space-y-2 text-sm list-disc list-inside text-gray-600 p-3">
            <li><span className="font-semibold">RCOP:</span> Reglamento para Contratos de Obras Públicas (D.S. MOP N°75, 2004).</li>
            <li><span className="font-semibold">Ley N° 19.886:</span> Ley de Bases sobre Contratos Administrativos de Suministro y Prestación de Servicios.</li>
            <li><span className="font-semibold">ISO 9001:2015:</span> Sistema de Gestión de la Calidad, requerido para el contrato.</li>
            <li><span className="font-semibold">NCh Eléctricas (ej. NCH 4/2003):</span> Normas Chilenas para instalaciones eléctricas de baja tensión.</li>
            <li><span className="font-semibold">Decreto Supremo N°594:</span> Reglamento sobre condiciones sanitarias y ambientales básicas en los lugares de trabajo.</li>
        </ul>
      </CollapsibleSection>
    </div>
  );
};
