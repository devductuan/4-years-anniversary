import { GreetingCard } from "./GreetingCard";
import { FireworksAnimation } from "./FireworksAnimation";

export function VietnameseWomensDayHero() {
  return (
    <div className="relative">
      <FireworksAnimation />
      <GreetingCard
        title="Chúc mừng ngày Phụ nữ Việt Nam!"
        message="Chúc vk iu luôn xinh đẹp, vui vẻ và được yêu thương thật nhiều."
      />
    </div>
  );
}
