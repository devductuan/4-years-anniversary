import { GreetingCard } from "./GreetingCard";

export function VietnameseHolidayHero({ name }: { name: string }) {
  return (
    <GreetingCard
      title={`Happy ${name}!`}
      message={`Chúc mừng ${name}! Chúc bạn có một ngày lễ thật vui và ý nghĩa.`}
    />
  );
}
