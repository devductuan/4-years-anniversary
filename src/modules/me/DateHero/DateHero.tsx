import { AnniversaryHero } from "./AnniversaryHero";
import { BirthdayHero } from "./BirthdayHero";
import { ChristmasHero } from "./ChristmasHero";
import { NewYearHero } from "./NewYearHero";
import { VietnameseHolidayHero } from "./VietnameseHolidayHero";
import { VietnameseWomensDayHero } from "./VietnameseWomensDayHero";
import { WomensDayHero } from "./WomensDayHero";

type PublicHoliday = {
  name?: string;
  local_name?: string;
  date?: string;
};

const API_KEY = "zNuPjqOCJ9H2KpPpqgZxaabiESmAivLc6Ybnb5Y2";
const HOLIDAYS_URL = "https://api.api-ninjas.com/v1/publicholidays";

function getVietnamDate() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) =>
    parts.find((item) => item.type === type)?.value ?? "";
  const year = part("year");
  const month = part("month");
  const day = part("day");
  return { year, month, day, date: `${year}-${month}-${day}` };
}

async function getVietnamHoliday(date: string, year: string) {
  try {
    const response = await fetch(`${HOLIDAYS_URL}?country=VN&year=${year}`, {
      headers: { "X-Api-Key": API_KEY },
      cache: "no-store",
    });
    if (!response.ok) return null;
    const holidays: PublicHoliday[] = await response.json();
    return holidays.find((holiday) => holiday.date === date) ?? null;
  } catch {
    return null;
  }
}

export async function DateHero() {
  const { year, month, day, date } = getVietnamDate();
  const dateKey = `${month}-${day}`;

  if (dateKey === "03-05") return <AnniversaryHero />;
  if (dateKey === "03-08") return <WomensDayHero />;
  if (dateKey === "03-10") return <BirthdayHero />;
  if (dateKey === "10-18") return <VietnameseWomensDayHero />;
  if (dateKey === "01-01") return <NewYearHero />;
  if (dateKey === "12-25") return <ChristmasHero />;

  const holiday = await getVietnamHoliday(date, year);
  if (holiday) {
    const holidayName = holiday.local_name || holiday.name || "Vietnamese holiday";
    return <VietnameseHolidayHero name={holidayName} />;
  }

  return null;
}
