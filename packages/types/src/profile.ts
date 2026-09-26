export type ProfileDay = {
  date: string;
  timeSpentSeconds: number;
  typingWpm: number | null;
  isToday: boolean;
};

export type ProfileData = {
  trainee: {
    name: string;
    email: string;
    track: string;
    currentDay: number;
    totalDays: number;
  };

  total: {
    activeSeconds: number;
    readingSeconds: number;
  };

  typing: {
    latestWpm: number | null;
    latestAccuracy: number | null;
  };

  dailyActivity: ProfileDay[];
};
