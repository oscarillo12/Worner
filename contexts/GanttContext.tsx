import React, { createContext, useContext, useMemo, ReactNode } from 'react';
import { GanttTask } from '../types';

interface GanttContextType {
  tasks: GanttTask[];
  projectStartDate: Date;
  projectEndDate: Date;
  totalDays: number;
  getTaskById: (id: number) => GanttTask | undefined;
}

const GanttContext = createContext<GanttContextType | undefined>(undefined);

interface GanttProviderProps {
  children: ReactNode;
  tasks: GanttTask[];
  projectStartDate: string;
}

export const GanttProvider: React.FC<GanttProviderProps> = ({ children, tasks, projectStartDate }) => {
  const startDate = useMemo(() => new Date(projectStartDate + 'T00:00:00'), [projectStartDate]);
  
  const totalDays = useMemo(() => {
    return Math.max(...tasks.map(t => t.end));
  }, [tasks]);

  const endDate = useMemo(() => {
    const date = new Date(startDate);
    date.setDate(date.getDate() + totalDays);
    return date;
  }, [startDate, totalDays]);

  const getTaskById = (id: number) => tasks.find(task => task.id === id);

  const value = {
    tasks,
    projectStartDate: startDate,
    projectEndDate: endDate,
    totalDays,
    getTaskById,
  };

  return <GanttContext.Provider value={value}>{children}</GanttContext.Provider>;
};

export const useGantt = (): GanttContextType => {
  const context = useContext(GanttContext);
  if (!context) {
    throw new Error('useGantt must be used within a GanttProvider');
  }
  return context;
};
