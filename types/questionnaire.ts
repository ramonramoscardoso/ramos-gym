export interface PersonalInfo {
  age: string;
  weight: string;
  weightUnit: 'kg' | 'lbs';
  height: string;
  heightUnit: 'cm' | 'ft-in';
  gender: 'male' | 'female' | 'other' | 'preferNotToSay' | '';
}

export interface GoalsExperience {
  primaryGoal: 'weightLoss' | 'muscleGain' | 'strength' | 'endurance' | 'general' | 'flexibility' | '';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced' | '';
}

export interface Availability {
  daysPerWeek: number;
  timePerSession: '30' | '45' | '60' | '90' | '120' | '';
  equipment: string[];
}

export interface HealthLimitations {
  conditions: string[];
  conditionsOther: string;
  limitations: string;
  medicalClearance: boolean;
}

export interface FormData {
  personalInfo: PersonalInfo;
  goalsExperience: GoalsExperience;
  availability: Availability;
  healthLimitations: HealthLimitations;
}

export interface QuestionnaireSubmission extends FormData {
  timestamp: string;
  locale: string;
}

export interface WorkoutExerciseGroup {
  label: string;
  exercises: string[];
}

export interface WorkoutDayPlan {
  day: number;
  title: string;
  focus: string;
  duration: string;
  sections: WorkoutExerciseGroup[];
}

export interface WorkoutPlan {
  title: string;
  summary: string;
  goal: string;
  experienceLevel: string;
  weeklyStructure: string;
  recoveryNote: string;
  highlights: string[];
  days: WorkoutDayPlan[];
}

export interface ValidationErrors {
  [key: string]: string;
}
