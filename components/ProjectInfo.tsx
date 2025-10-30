import React from 'react';
import { projectData } from '../constants';
import { CalendarDaysIcon, MapPinIcon, BanknotesIcon, BuildingOffice2Icon, ClockIcon } from './Icons';

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; value: string; className?: string }> = ({ icon, title, value, className }) => (
  <div className={`bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex items-center space-x-4 ${className}`}>
    <div className="bg-blue-100 text-blue-600 p-3 rounded-full">
      {icon}
    </div>
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-lg font-bold text-gray-800">{value}</p>
    </div>
  </div>
);

export const ProjectInfo: React.FC = () => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-CL', { style: 'currency', currency: 'CLP' }).format(amount);
  };
  
  const startDate = new Date(projectData.startDate + 'T00:00:00');
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + projectData.durationDays);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CL', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      <InfoCard icon={<BuildingOffice2Icon className="h-6 w-6" />} title="Superficie" value={`${projectData.areaSqM.toLocaleString('de-DE')} m²`} />
      <InfoCard icon={<BanknotesIcon className="h-6 w-6" />} title="Monto Adjudicado" value={formatCurrency(projectData.awardedAmountCLP)} />
      <InfoCard icon={<ClockIcon className="h-6 w-6" />} title="Duración" value={`${projectData.durationDays} días`} />
      <InfoCard icon={<CalendarDaysIcon className="h-6 w-6" />} title="Inicio Estimado" value={formatDate(startDate)} />
      <InfoCard icon={<MapPinIcon className="h-6 w-6" />} title="Fin Estimado" value={formatDate(endDate)} />
    </div>
  );
};
