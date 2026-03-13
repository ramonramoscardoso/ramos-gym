import { QuestionnaireSubmission, WorkoutDayPlan, WorkoutPlan } from '@/types/questionnaire';

const equipmentPriority = ['fullGym', 'freeWeights', 'machines', 'homeEquipment', 'bodyweight'] as const;

type GoalKey = QuestionnaireSubmission['goalsExperience']['primaryGoal'];
type ExperienceKey = QuestionnaireSubmission['goalsExperience']['experienceLevel'];
type EquipmentKey = QuestionnaireSubmission['availability']['equipment'][number];

type BlueprintSection = {
  label: string;
  exercises: string[];
};

type BlueprintDay = {
  title: string;
  focus: string;
  sections: BlueprintSection[];
};

const goalLabels: Record<GoalKey, string> = {
  weightLoss: 'fat-loss',
  muscleGain: 'muscle-building',
  strength: 'strength',
  endurance: 'conditioning',
  general: 'general fitness',
  flexibility: 'mobility',
  '': 'general fitness',
};

const experienceLabels: Record<ExperienceKey, string> = {
  beginner: 'beginner',
  intermediate: 'intermediate',
  advanced: 'advanced',
  '': 'beginner',
};

const durationLabels: Record<NonNullable<QuestionnaireSubmission['availability']['timePerSession']>, string> = {
  '': '45 min',
  '30': '30 min',
  '45': '45 min',
  '60': '60 min',
  '90': '90 min',
  '120': '120 min',
};

const equipmentLabels: Record<EquipmentKey, string> = {
  fullGym: 'full gym',
  freeWeights: 'free weights',
  machines: 'machines',
  bodyweight: 'bodyweight',
  homeEquipment: 'home equipment',
};

const planBlueprints: Record<GoalKey, BlueprintDay[]> = {
  weightLoss: [
    {
      title: 'Lower Body + Conditioning',
      focus: 'Metabolic lower-body work',
      sections: [
        { label: 'Warm-up', exercises: ['5 min incline walk', 'Dynamic hip openers'] },
        { label: 'Strength circuit', exercises: ['Goblet squat 3x12', 'Romanian deadlift 3x10', 'Walking lunges 3x12/leg'] },
        { label: 'Finisher', exercises: ['Bike intervals 8 rounds of 30s hard / 60s easy'] },
      ],
    },
    {
      title: 'Upper Body + Core',
      focus: 'Push, pull and trunk control',
      sections: [
        { label: 'Warm-up', exercises: ['Band pull-aparts 2x15', 'Arm circles 2x20'] },
        { label: 'Main work', exercises: ['Push-ups 3x10', 'Seated row 3x12', 'Dumbbell shoulder press 3x10'] },
        { label: 'Core', exercises: ['Dead bug 3x10/side', 'Plank 3x30s'] },
      ],
    },
    {
      title: 'Full Body Intervals',
      focus: 'Conditioning and movement quality',
      sections: [
        { label: 'Warm-up', exercises: ['Rowing machine 5 min', 'World’s greatest stretch 2 rounds'] },
        { label: 'Intervals', exercises: ['Kettlebell swing 4x15', 'Step-ups 3x12/leg', 'Battle ropes 6x20s'] },
        { label: 'Cooldown', exercises: ['Light walk 5 min', 'Breathing reset 3 min'] },
      ],
    },
    {
      title: 'Posterior Chain + Cardio',
      focus: 'Glutes, hamstrings and aerobic base',
      sections: [
        { label: 'Activation', exercises: ['Glute bridge 2x15', 'Banded lateral walk 2x12/side'] },
        { label: 'Main work', exercises: ['Trap-bar deadlift 4x6', 'Leg curl 3x12', 'Hip thrust 3x10'] },
        { label: 'Cardio', exercises: ['Steady bike 15-20 min'] },
      ],
    },
    {
      title: 'Upper Body Density',
      focus: 'Higher-volume calorie burn',
      sections: [
        { label: 'Warm-up', exercises: ['Jump rope 3 min', 'Band shoulder series 2x12'] },
        { label: 'Density block', exercises: ['Incline dumbbell press 4x10', 'Lat pulldown 4x10', 'Cable face pull 3x15'] },
        { label: 'Core finisher', exercises: ['Farmer carry 4 trips', 'Hollow hold 3x20s'] },
      ],
    },
    {
      title: 'Long Conditioning Session',
      focus: 'Low-impact endurance',
      sections: [
        { label: 'Main session', exercises: ['Treadmill walk 30 min', 'Mobility flow 10 min'] },
      ],
    },
    {
      title: 'Recovery Walk + Mobility',
      focus: 'Recovery and flexibility',
      sections: [
        { label: 'Recovery', exercises: ['Easy walk 20 min', 'Full-body stretch 15 min'] },
      ],
    },
  ],
  muscleGain: [
    {
      title: 'Push Day',
      focus: 'Chest, shoulders and triceps',
      sections: [
        { label: 'Main lifts', exercises: ['Bench press 4x6-8', 'Incline dumbbell press 3x8-10', 'Seated shoulder press 3x8-10'] },
        { label: 'Accessory', exercises: ['Cable fly 3x12', 'Triceps pressdown 3x12-15'] },
      ],
    },
    {
      title: 'Pull Day',
      focus: 'Back and biceps',
      sections: [
        { label: 'Main lifts', exercises: ['Lat pulldown 4x8', 'Chest-supported row 4x8-10', 'Single-arm cable row 3x10'] },
        { label: 'Accessory', exercises: ['Face pull 3x15', 'Hammer curl 3x12'] },
      ],
    },
    {
      title: 'Leg Day',
      focus: 'Quads, glutes and hamstrings',
      sections: [
        { label: 'Main lifts', exercises: ['Back squat 4x6-8', 'Romanian deadlift 4x8', 'Leg press 3x10'] },
        { label: 'Accessory', exercises: ['Leg extension 3x12', 'Standing calf raise 3x15'] },
      ],
    },
    {
      title: 'Upper Hypertrophy',
      focus: 'Extra upper-body volume',
      sections: [
        { label: 'Main work', exercises: ['Machine chest press 3x10', 'Cable row 3x10', 'Lateral raise 3x15'] },
        { label: 'Accessory', exercises: ['EZ-bar curl 3x12', 'Overhead triceps extension 3x12'] },
      ],
    },
    {
      title: 'Lower Hypertrophy',
      focus: 'Lower-body growth and stability',
      sections: [
        { label: 'Main work', exercises: ['Front squat 3x8', 'Bulgarian split squat 3x10/leg', 'Leg curl 3x12'] },
        { label: 'Accessory', exercises: ['Hip thrust 3x10', 'Seated calf raise 3x15'] },
      ],
    },
    {
      title: 'Arms + Delts',
      focus: 'Isolation and pump work',
      sections: [
        { label: 'Pump block', exercises: ['Cable lateral raise 3x15', 'Preacher curl 3x12', 'Rope pressdown 3x15'] },
      ],
    },
    {
      title: 'Active Recovery',
      focus: 'Mobility and easy cardio',
      sections: [
        { label: 'Recovery', exercises: ['Easy bike 20 min', 'Thoracic and hip mobility 10 min'] },
      ],
    },
  ],
  strength: [
    {
      title: 'Squat Focus',
      focus: 'Primary lower-body strength',
      sections: [
        { label: 'Primary lifts', exercises: ['Back squat 5x5', 'Pause squat 3x3'] },
        { label: 'Support', exercises: ['Split squat 3x8/leg', 'Plank 3x45s'] },
      ],
    },
    {
      title: 'Bench Focus',
      focus: 'Upper-body pressing strength',
      sections: [
        { label: 'Primary lifts', exercises: ['Bench press 5x5', 'Close-grip bench 3x5'] },
        { label: 'Support', exercises: ['Chest-supported row 4x8', 'Face pull 3x15'] },
      ],
    },
    {
      title: 'Deadlift Focus',
      focus: 'Posterior-chain strength',
      sections: [
        { label: 'Primary lifts', exercises: ['Deadlift 5x3', 'Romanian deadlift 3x6'] },
        { label: 'Support', exercises: ['Lat pulldown 3x10', 'Farmer carry 4 trips'] },
      ],
    },
    {
      title: 'Overhead Press Focus',
      focus: 'Vertical pressing and shoulder stability',
      sections: [
        { label: 'Primary lifts', exercises: ['Overhead press 5x5', 'Push press 3x3'] },
        { label: 'Support', exercises: ['Pull-up 4x6', 'Cable external rotation 2x15'] },
      ],
    },
    {
      title: 'Secondary Lower',
      focus: 'Technique and unilateral balance',
      sections: [
        { label: 'Main work', exercises: ['Front squat 4x4', 'Single-leg RDL 3x8/leg'] },
      ],
    },
    {
      title: 'Secondary Upper',
      focus: 'Horizontal pull and triceps support',
      sections: [
        { label: 'Main work', exercises: ['Weighted row 4x6', 'Dips 3x6-8', 'Rear delt fly 3x15'] },
      ],
    },
    {
      title: 'Recovery',
      focus: 'Mobility and light aerobic work',
      sections: [
        { label: 'Recovery', exercises: ['Walk 20 min', 'Hip and shoulder mobility 15 min'] },
      ],
    },
  ],
  endurance: [
    {
      title: 'Intervals + Full Body',
      focus: 'Heart-rate spikes and movement',
      sections: [
        { label: 'Circuit', exercises: ['Row 500m', 'Thruster 12 reps', 'TRX row 12 reps', '3 rounds'] },
      ],
    },
    {
      title: 'Tempo Cardio + Core',
      focus: 'Sustainable cardio pace',
      sections: [
        { label: 'Main work', exercises: ['Bike or treadmill 25 min at moderate pace', 'Side plank 3x30s/side'] },
      ],
    },
    {
      title: 'Lower Body Capacity',
      focus: 'Leg endurance',
      sections: [
        { label: 'Main work', exercises: ['Step-up 3x15/leg', 'Goblet squat 3x15', 'Sled push 6 trips'] },
      ],
    },
    {
      title: 'Upper Body Capacity',
      focus: 'Push/pull endurance',
      sections: [
        { label: 'Main work', exercises: ['Push-up 4x12', 'Cable row 4x15', 'Battle ropes 8x20s'] },
      ],
    },
    {
      title: 'Long Steady Session',
      focus: 'Aerobic base',
      sections: [
        { label: 'Main work', exercises: ['45 min zone-2 cardio'] },
      ],
    },
    {
      title: 'Mixed Modal Session',
      focus: 'Cardio variety',
      sections: [
        { label: 'Main work', exercises: ['10 min row', '10 min bike', '10 min incline walk'] },
      ],
    },
    {
      title: 'Recovery Mobility',
      focus: 'Breathing and range of motion',
      sections: [
        { label: 'Recovery', exercises: ['Breathing drills 5 min', 'Mobility flow 15 min'] },
      ],
    },
  ],
  general: [
    {
      title: 'Full Body A',
      focus: 'Foundational strength',
      sections: [
        { label: 'Main work', exercises: ['Goblet squat 3x10', 'Dumbbell bench press 3x10', 'Lat pulldown 3x10'] },
      ],
    },
    {
      title: 'Full Body B',
      focus: 'Posterior chain and core',
      sections: [
        { label: 'Main work', exercises: ['Romanian deadlift 3x10', 'Seated row 3x10', 'Plank 3x30s'] },
      ],
    },
    {
      title: 'Full Body C',
      focus: 'Balance and conditioning',
      sections: [
        { label: 'Main work', exercises: ['Step-up 3x10/leg', 'Push-up 3x10', 'Bike 12 min moderate pace'] },
      ],
    },
    {
      title: 'Optional Cardio Day',
      focus: 'Light conditioning',
      sections: [
        { label: 'Main work', exercises: ['Brisk walk or bike 20-30 min'] },
      ],
    },
    {
      title: 'Mobility Day',
      focus: 'Joint health',
      sections: [
        { label: 'Main work', exercises: ['Mobility flow 20 min', 'Stretching 10 min'] },
      ],
    },
    {
      title: 'Upper/Lower Blend',
      focus: 'Simple extra volume',
      sections: [
        { label: 'Main work', exercises: ['Leg press 3x12', 'Machine chest press 3x12', 'Cable row 3x12'] },
      ],
    },
    {
      title: 'Recovery',
      focus: 'Easy movement',
      sections: [
        { label: 'Recovery', exercises: ['Easy walk 20 min'] },
      ],
    },
  ],
  flexibility: [
    {
      title: 'Lower Mobility',
      focus: 'Hips, ankles and posterior chain',
      sections: [
        { label: 'Flow', exercises: ['90/90 switches 2x8', 'Hamstring flossing 2x10', 'Deep squat hold 3x30s'] },
      ],
    },
    {
      title: 'Upper Mobility',
      focus: 'Thoracic spine and shoulders',
      sections: [
        { label: 'Flow', exercises: ['Thread the needle 2x8', 'Wall slides 2x10', 'Band dislocates 2x12'] },
      ],
    },
    {
      title: 'Core Stability',
      focus: 'Control through range of motion',
      sections: [
        { label: 'Main work', exercises: ['Dead bug 3x10', 'Bird dog 3x10', 'Pallof press 3x12'] },
      ],
    },
    {
      title: 'Full Body Flow',
      focus: 'Integrated mobility',
      sections: [
        { label: 'Main work', exercises: ['Yoga-inspired flow 20 min', 'Breathing reset 5 min'] },
      ],
    },
    {
      title: 'Leg Strength Support',
      focus: 'Strength through long ranges',
      sections: [
        { label: 'Main work', exercises: ['Split squat 3x8/leg', 'Cossack squat 3x6/side'] },
      ],
    },
    {
      title: 'Upper Strength Support',
      focus: 'Scapular control',
      sections: [
        { label: 'Main work', exercises: ['Ring row 3x8', 'Half-kneeling press 3x8/side'] },
      ],
    },
    {
      title: 'Recovery',
      focus: 'Gentle restoration',
      sections: [
        { label: 'Recovery', exercises: ['Walk 15 min', 'Stretching 15 min'] },
      ],
    },
  ],
  '': [
    {
      title: 'Full Body',
      focus: 'General training',
      sections: [
        { label: 'Main work', exercises: ['Squat variation 3x10', 'Press variation 3x10', 'Row variation 3x10'] },
      ],
    },
  ],
};

const equipmentOverrides: Partial<Record<EquipmentKey, Partial<Record<GoalKey, BlueprintDay[]>>>> = {
  bodyweight: {
    general: [
      {
        title: 'Bodyweight Strength',
        focus: 'Foundational movement patterns',
        sections: [
          { label: 'Main work', exercises: ['Air squat 3x15', 'Push-up 3x8-12', 'Glute bridge 3x15', 'Plank 3x30s'] },
        ],
      },
      {
        title: 'Conditioning',
        focus: 'Aerobic capacity',
        sections: [
          { label: 'Main work', exercises: ['Brisk walk 25 min', 'Mountain climber 3x30s', 'Jumping jacks 3x45s'] },
        ],
      },
      {
        title: 'Mobility + Core',
        focus: 'Movement quality',
        sections: [
          { label: 'Main work', exercises: ['Hip flow 10 min', 'Bird dog 3x10/side', 'Side plank 3x20s/side'] },
        ],
      },
    ],
  },
  homeEquipment: {
    muscleGain: [
      {
        title: 'Home Upper',
        focus: 'Press and pull volume',
        sections: [
          { label: 'Main work', exercises: ['Dumbbell floor press 4x10', 'One-arm row 4x10', 'Shoulder press 3x10'] },
        ],
      },
      {
        title: 'Home Lower',
        focus: 'Leg strength and glutes',
        sections: [
          { label: 'Main work', exercises: ['Goblet squat 4x10', 'RDL 4x10', 'Reverse lunge 3x10/leg'] },
        ],
      },
      {
        title: 'Home Full Body',
        focus: 'Extra hypertrophy volume',
        sections: [
          { label: 'Main work', exercises: ['Push-up 3x12', 'Banded row 3x15', 'Hip thrust 3x12'] },
        ],
      },
    ],
  },
};

export const mockSubmission: QuestionnaireSubmission = {
  personalInfo: {
    age: '29',
    weight: '78',
    weightUnit: 'kg',
    height: '175',
    heightUnit: 'cm',
    gender: 'male',
  },
  goalsExperience: {
    primaryGoal: 'muscleGain',
    experienceLevel: 'intermediate',
  },
  availability: {
    daysPerWeek: 4,
    timePerSession: '60',
    equipment: ['fullGym'],
  },
  healthLimitations: {
    conditions: ['none'],
    conditionsOther: '',
    limitations: '',
    medicalClearance: true,
  },
  timestamp: '2026-03-13T12:00:00.000Z',
  locale: 'en-US',
};

function getPrimaryEquipment(equipment: QuestionnaireSubmission['availability']['equipment']): EquipmentKey | undefined {
  return equipmentPriority.find((item) => equipment.includes(item));
}

function getBlueprint(submission: QuestionnaireSubmission): BlueprintDay[] {
  const goal = submission.goalsExperience.primaryGoal;
  const primaryEquipment = getPrimaryEquipment(submission.availability.equipment);
  const override = primaryEquipment
    ? equipmentOverrides[primaryEquipment]?.[goal]
    : undefined;

  return override ?? planBlueprints[goal] ?? planBlueprints.general;
}

function createDayPlans(submission: QuestionnaireSubmission): WorkoutDayPlan[] {
  const blueprint = getBlueprint(submission);
  const duration = durationLabels[submission.availability.timePerSession] || '45 min';
  const count = Math.max(1, Math.min(submission.availability.daysPerWeek, blueprint.length));

  return Array.from({ length: count }, (_, index) => {
    const day = blueprint[index];

    return {
      day: index + 1,
      title: day.title,
      focus: day.focus,
      duration,
      sections: day.sections,
    };
  });
}

export function generateMockWorkoutPlan(submission: QuestionnaireSubmission): WorkoutPlan {
  const primaryEquipment = getPrimaryEquipment(submission.availability.equipment);
  const equipmentText = primaryEquipment ? equipmentLabels[primaryEquipment] : 'available equipment';
  const goal = goalLabels[submission.goalsExperience.primaryGoal];
  const experienceLevel = experienceLabels[submission.goalsExperience.experienceLevel];
  const days = createDayPlans(submission);

  return {
    title: `${submission.availability.daysPerWeek}-Day ${goal} plan`,
    summary: `A mocked ${experienceLevel} program built around ${submission.availability.daysPerWeek} training days and ${equipmentText}.`,
    goal,
    experienceLevel,
    weeklyStructure: `${submission.availability.daysPerWeek} sessions per week, ${durationLabels[submission.availability.timePerSession] || '45 min'} each`,
    recoveryNote: submission.healthLimitations.limitations
      ? `Keep sessions conservative and respect this limitation: ${submission.healthLimitations.limitations}`
      : 'Keep one or two rest days between harder sessions when possible.',
    highlights: [
      `Primary goal: ${goal}`,
      `Training level: ${experienceLevel}`,
      `Equipment focus: ${submission.availability.equipment.map((item) => equipmentLabels[item as EquipmentKey]).join(', ')}`,
    ],
    days,
  };
}
