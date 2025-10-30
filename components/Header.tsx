import React from 'react';
import { projectData } from '../constants';
import { BuildingOfficeIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center border-b-4 border-blue-600">
      <div className="flex items-center space-x-3">
        <div className="bg-blue-600 p-2 rounded-lg text-white">
          <BuildingOfficeIcon className="h-8 w-8" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold text-gray-800">{projectData.name}</h1>
          <p className="text-sm text-gray-500">{projectData.contractor}</p>
        </div>
      </div>
      <img src="https://picsum.photos/150/40?random=1" alt="Wörner Logo" className="h-10 hidden sm:block rounded"/>
    </header>
  );
};
