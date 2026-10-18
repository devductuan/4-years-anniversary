import Link from "next/link";
import { DateHero } from "@/modules/me/DateHero/DateHero";

export const metadata = {
  title: "My space",
  description: "Private links for Thu Huệ's World.",
};

const links = [
  {
    href: "/me/anniversaries",
    title: "Anniversaries",
    description: "Our memories, milestones, and story.",
  },
  {
    href: "/me/admin",
    title: "Admin",
    description: "Manage the content on Thu Huệ’s World.",
  },
];

export default function MePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-pink-50 via-white to-white px-5 pb-20 pt-32">
      <DateHero />
      <section className="mx-auto max-w-4xl">
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">
          Thu Huệ’s World
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Your private space
        </h1>
        <p className="mt-4 max-w-xl text-gray-600">
          A little home for the pages you keep close.
        </p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-2xl border border-pink-100 bg-white/90 p-7 shadow-sm transition hover:-translate-y-1 hover:border-pink-200 hover:shadow-lg"
            >
              <h2 className="text-xl font-bold text-gray-900 transition group-hover:text-pink-600">
                {link.title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {link.description}
              </p>
              <span className="mt-6 inline-block text-sm font-semibold text-pink-500">
                Open page <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
