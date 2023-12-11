export function upperFirstLetter(str: string) {
  return str
    .toLowerCase()
    .replace('-', ' ')
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function getRating(like: number, dislike: number) {
  return ((100 * like) / (like + dislike)) ? (100 * like) / (like + dislike) : 0;
}

export function splitStringByComma(inputString: string): string[] {
  const resultArray = inputString.split(',').map((item) => item.trim().replace(/[\[\]"]/g, ''));
  return resultArray;
};

interface Props { date: any }
export default function TimeDifference(props: Props) {
  const now: any = new Date()
  const dateTime: any = new Date(props.date)

  const seconds: any = (now - dateTime) / 1000;
  const minutes: any = seconds / 60;
  const hours: any = minutes / 60;
  const days: any = hours / 24;
  const week: any = days / 7;
  const months: any = week / 4;
  const years: any = days / 365.24;

  if (years >= 1) {
    let result = `${parseInt(years)} an${years !== 1 ? 's' : ''}`;
    const remainingMonths: any = months % 12;
   
    if (remainingMonths >= 1) { result += ` ${parseInt(remainingMonths)} mois`; }
    
    return result;
  } else if (months >= 1) {
    return `${parseInt(months)} mois`;
  } else if (week >= 1) {
    return `${parseInt(week)} semaine${week !== 1 ? 's' : ''}`;
  } else if (days >= 1) {
    return `${parseInt(days)} jour${days !== 1 ? 's' : ''}`;
  } else if (hours >= 1) {
    return `${parseInt(hours)} heure${hours !== 1 ? 's' : ''}`;
  } else if (minutes >= 1) {
    return `${parseInt(minutes)} minute${minutes !== 1 ? 's' : ''}`;
  } else {
    return `${parseInt(seconds)} seconde${seconds !== 1 ? 's' : ''}`;
  }
};