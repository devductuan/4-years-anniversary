const about =
  "Highly organized and skilled at managing competing demands while remaining upbeat under duress. Proven ability to meet tight timeframes. Good analytical skills, attention to detail, problem-solving, troubleshooting, communication, and multitasking ability. Also a quick learner who excels in collaborative environments as well as working independently when necessary.";

const education = [
  {
    school: "National Economics University (NEU) Vietnam",
    degree: "Bachelor's degree, Public Relations",
    period: "Sep 2019 – Dec 2022",
    description: "Grade: 3.6/4.0",
  },
  {
    school: "National Economics University (NEU) Vietnam",
    degree: "Bachelor's degree, Economic Law",
    period: "Sep 2020 – May 2024",
    description: "Grade: 3.4/4.0",
  },
];

const experience = [
  {
    role: "Communications Officer",
    company: "Hanoi University of Science and Technology",
    period: "May 2024 – Present · 1 yr 11 mos",
    type: "Full-time",
    link: "https://hust.edu.vn/vi/news/author/Nguyen-Thu-Hue/",
    bullets: [
      "Promote the university's image and raise social consciousness through content creation, including writing and editing articles.",
      "Create and modify content for the university's communication materials.",
      "Create methods, plans, and organizational frameworks for producing multimedia communication material.",
      "Support organizing the university's communication operations.",
      "Advise and assist university units with communication content.",
    ],
  },
  {
    role: "Communications Specialist",
    company: "FECON Group",
    period: "Aug 2023 – Apr 2024 · 9 mos",
    type: "Full-time",
    bullets: [
      "Create press releases and PR articles.",
      "Create and edit internal communication content, such as quick news, weekly newsletters, quarterly magazines, and company birthday publications.",
      "Plan and manage internal events.",
      "Assist with public relations.",
    ],
  },
  {
    role: "Internal Communications Specialist",
    company: "Base.vn",
    period: "Feb 2023 – Jul 2023 · 6 mos",
    type: "Full-time",
    location: "Hanoi Capital Region",
    bullets: [
      "Content and communication for all internal events, such as the company trip, year-end party, and International Women's Day.",
      "Create and implement internal communications for staff, including newsletters, company news, a blog (life.base.vn), and more.",
    ],
  },
  {
    role: "Internal Communications Intern",
    company: "Base.vn",
    period: "Aug 2022 – Jan 2023 · 6 mos",
    type: "Full-time",
    bullets: ["Executing events."],
  },
  {
    role: "Event Coordinator",
    company: "Alpha Books JSC",
    period: "Mar 2022 – Oct 2022 · 8 mos",
    type: "Part-time",
    bullets: [
      "Organize two online medical events per month.",
      "Schedule and invite guest speakers.",
      "Prepare press release; content for the speaker.",
      "Responsible for social media content management.",
    ],
  },
];

const volunteering = [
  {
    role: "Collaborator",
    organization: "The ASEAN Secretariat",
    period: "Jan 2020 – Aug 2020 · 8 mos",
    bullets: [
      "Volunteer at ASEAN Summit 2020 in Vietnam.",
      "Mainly working in external relations team.",
    ],
  },
];

const certifications = [
  { name: "International English Language Testing System (IELTS)", issuer: "IDP Education Ltd" },
  { name: "Test of English for International Communication (TOEIC)", issuer: "IIG Vietnam" },
];

const skills = [
  { name: "Communications Planning", level: "Expert" },
  { name: "Communication", level: "Expert" },
  { name: "Multitasking", level: "Expert" },
  { name: "Event Management", level: "Advanced" },
  { name: "Content Writing & Editing", level: "Expert" },
  { name: "Problem-solving", level: "Advanced" },
  { name: "Attention to Detail", level: "Advanced" },
  { name: "Analytical Skills", level: "Advanced" },
];

export const metadata = {
  title: "Nguyễn Thu Huệ",
  description: "Portfolio of Nguyễn Thu Huệ",
  icons: {
    icon: "/images/logo.webp",
  }
};

const PortfolioPage = () => {
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
