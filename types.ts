export interface GanttTask {
  id: number;
  name: string;
  start: number; // Day number from project start
  end: number;   // Day number from project start
  progress: number; // Percentage 0-100
  dependencies: number[];
  isCritical: boolean;
  phase: string;
}

export interface ProjectData {
  name: string;
  location: string;
  contractor: string;
  client: string;
  startDate: string; // YYYY-MM-DD
  durationDays: number;
  areaSqM: number;
  awardedAmountCLP: number;
}

export interface ChatMessage {
  sender: 'user' | 'gemini';
  text: string;
}

export interface ProjectMetrics {
  scope: { value: string; label: string };
  time: { value: string; label: string; progress: number };
  cost: { value: string; label: string };
  quality: { value: string; label: string };
}
