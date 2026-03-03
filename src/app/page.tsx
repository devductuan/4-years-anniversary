import { HomePageHero } from "@/modules/home/HomePageHero/HomePageHero";

export const metadata = {
  title: "Thu Huệ's World",
  description: "Chào mừng đến với Thế Giới của Thu Huệ!",
  icons: {
    icon: "/images/logo.webp",
  }
};

export default function Home() {
  return (
    <>
      <link
        rel="icon"
        href="/images/logo.webp"
        sizes="any"
      />
      <main>
        <HomePageHero />
      </main>
    </>
  );
}
