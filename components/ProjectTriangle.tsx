import React from 'react';
import { ChartPieIcon, CheckBadgeIcon, ScaleIcon, ClockIcon } from './Icons';
import { projectMetrics } from '../constants';

const MetricCard: React.FC<{ icon: React.ReactNode; metric: string; value: string; progress?: number }> = ({ icon, metric, value, progress }) => (
    <div className="flex flex-col items-center justify-center text-center">
        <div className="p-3 bg-blue-100 text-blue-600 rounded-full mb-2">
            {icon}
        </div>
        <p className="text-xs font-semibold text-gray-500">{metric}</p>
        <p className="text-base font-bold text-gray-800">{value}</p>
        {progress !== undefined && (
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1">
                <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${progress}%` }}></div>
            </div>
        )}
    </div>
);

export const ProjectTriangle: React.FC = () => {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-200">
            <h3 className="text-lg font-bold text-center mb-6">Balance del Proyecto</h3>
            <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <div className="col-span-2 flex justify-center">
                    <MetricCard icon={<ScaleIcon className="h-6 w-6"/>} metric={projectMetrics.scope.label} value={projectMetrics.scope.value} />
                </div>
                
                <MetricCard icon={<ClockIcon className="h-6 w-6"/>} metric={projectMetrics.time.label} value={projectMetrics.time.value} progress={projectMetrics.time.progress} />
                <MetricCard icon={<ChartPieIcon className="h-6 w-6"/>} metric={projectMetrics.cost.label} value={projectMetrics.cost.value} />
                
                <div className="col-span-2 flex justify-center">
                     <MetricCard icon={<CheckBadgeIcon className="h-6 w-6"/>} metric={projectMetrics.quality.label} value={projectMetrics.quality.value} />
                </div>
            </div>
             <p className="text-center text-xs text-gray-500 mt-6">Equilibrio entre las restricciones clave del proyecto.</p>
        </div>
    );
};
