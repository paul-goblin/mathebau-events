export function getTodayDateString(): string {
  return new Date().toISOString().split("T")[0];
}

export function dateStringPlusDays (date: string, days: number) : string {
  const d = new Date(date);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
}

export function theDayBefore (date: string) : string {
  return dateStringPlusDays(date, -1);
}

export function getTomorrowDateString(): string {
  return dateStringPlusDays(getTodayDateString(), 1);
}

export function dateToString (date: Date) : string {
  return date.toISOString().split('T')[0];
}

export function dateTimePlusMinutes (date: Date, minutes: number) : Date {
  date.setMinutes(date.getMinutes() + minutes);
  return date;
}

export function dateStringsAreWeaklyOrdered (dates: string[]) : boolean {
  for (let i = 0; i < dates.length - 1; i++) {
    if (new Date(dates[i]) > new Date(dates[i + 1])) {
      return false;
    }
  }
  return true;
}

export function updateDateRangeOfDateInputElement (ref: React.RefObject<HTMLInputElement>, {min, max}:{min?: string; max?: string}) {
  if (ref.current) {
    const input = ref.current;
    if (min) {
      console.log(`Setting min date of ${input.name} to ${min}`);
      input.min = min;
      if (!input.value || new Date(input.value) < new Date(min)) {
        console.log("setting value to min", input.name, min);
        input.value = min;
      }
    }
    if (max) {
      console.log(`Setting max date of ${input.name} to ${max}`);
      input.max = max;
      if (!input.value || new Date(input.value) > new Date(max)) {
        console.log("setting value to max", input.name, max);
        input.value = max;
      }
    }
  }
}
