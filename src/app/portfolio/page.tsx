import { getPortfolio } from "@/modules/admin/AdminPortfolio/actions";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Nguyễn Thu Huệ",
  description: "Portfolio of Nguyễn Thu Huệ",
  icons: {
    icon: "/images/logo.webp",
  }
};

const PortfolioPage = async () => {
  const portfolio = await getPortfolio();
  const { about = "", education = [], experience = [], volunteering = [], certifications = [], skills = [] } = portfolio;

  return (
    <div className="pt-24 pb-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        {/* Page title */}
        <section className="mb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        </section>

        {/* About */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-pink-500 mb-6 border-b border-zinc-200 pb-2">
            About
          </h2>
          <p className="text-gray-600 leading-relaxed">{about}</p>
        </section>

        {/* Education */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-pink-500 mb-6 border-b border-zinc-200 pb-2">
            Education
          </h2>
          <ul className="space-y-8">
            {education.map((item, i) => (
              <li key={i} className="pl-0">
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="text-lg font-semibold">{item.school}</h3>
                  <span className="text-sm text-gray-500">{item.period}</span>
                </div>
                <p className="text-pink-500/90 font-medium mt-1">{item.degree}</p>
                <p className="text-gray-600 mt-2">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Experience */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-pink-500 mb-6 border-b border-zinc-200 pb-2">
            Experience
          </h2>
          <ul className="space-y-8">
            {experience.map((item, i) => (
              <li key={i}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <span className="text-sm text-gray-500">{item.period}</span>
                </div>
                <p className="text-pink-500/90 font-medium mt-1">
                  {item.company}
                  {"type" in item && item.type && (
                    <span className="text-gray-500 font-normal"> · {item.type}</span>
                  )}
                  {"location" in item && item.location && (
                    <span className="text-gray-500 font-normal"> · {item.location}</span>
                  )}
                </p>
                {"link" in item && item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-pink-500 hover:underline mt-0.5 inline-block"
                  >
                    View profile →
                  </a>
                )}
                {"bullets" in item && item.bullets && (
                  <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                    {item.bullets.map((b, j) => (
                      <li key={j}>{b}</li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        {/* Volunteering */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-pink-500 mb-6 border-b border-zinc-200 pb-2">
            Volunteering
          </h2>
          <ul className="space-y-8">
            {volunteering.map((item, i) => (
              <li key={i}>
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-baseline gap-1">
                  <h3 className="text-lg font-semibold">{item.role}</h3>
                  <span className="text-sm text-gray-500">{item.period}</span>
                </div>
                <p className="text-pink-500/90 font-medium mt-1">{item.organization}</p>
                <ul className="mt-2 list-disc list-inside text-gray-600 space-y-1">
                  {item.bullets.map((b, j) => (
                    <li key={j}>{b}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>

        {/* Certifications */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-pink-500 mb-6 border-b border-zinc-200 pb-2">
            Licenses & Certifications
          </h2>
          <ul className="space-y-4">
            {certifications.map((item, i) => (
              <li key={i}>
                <p className="font-medium">{item.name}</p>
                <p className="text-sm text-gray-500">{item.issuer}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold text-pink-500 mb-6 border-b border-zinc-200 pb-2">
            Skills
          </h2>
          <ul className="flex flex-wrap gap-3">
            {skills.map((skill, i) => (
              <li
                key={i}
                className="px-4 py-2 rounded-md border border-zinc-200 bg-white hover:border-pink-500 hover:bg-pink-50/50 transition-colors duration-300"
              >
                <span className="font-medium">{skill.name}</span>
                <span className="text-gray-500 text-sm ml-2">({skill.level})</span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
};

export default PortfolioPage;
