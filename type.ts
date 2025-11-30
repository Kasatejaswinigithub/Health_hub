export interface User {
  name: string;
  email: string;
  cycleLength: number; // in days
  lastPeriodStart: string; // YYYY-MM-DD
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum Page {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  DASHBOARD = 'DASHBOARD',
  HEALTH_TEST = 'HEALTH_TEST',
  HEALTH_CARE = 'HEALTH_CARE',
  DOCTORS = 'DOCTORS',
  FUN_ZONE = 'FUN_ZONE',
  AI_CHAT = 'AI_CHAT'
}

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  city: string;
  rating: number;
  image: string;
}

export interface QuizQuestion {
  id: number;
  text: string;
}
