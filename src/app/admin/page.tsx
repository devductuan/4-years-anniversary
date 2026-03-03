import { AdminHero } from "@/modules/admin/AdminHero/AdminHero";
import { AdminRoadmap } from "@/modules/admin/AdminRoadmap/AdminRoadmap";
import { AdminSongs } from "@/modules/admin/AdminSongs/AdminSongs";
import { AdminPortfolio } from "@/modules/admin/AdminPortfolio/AdminPortfolio";

export const metadata = {
  title: "Admin",
  icons: {
    icon: "/images/logo.webp",
  },
};

export default function AdminPage() {
  return (
    <>
      <link rel="icon" href="/images/logo.webp" sizes="any" />
      <main>
        <AdminHero />
        <AdminSongs />
        <AdminRoadmap />
        <AdminPortfolio />
      </main>
    </>
  );
}
