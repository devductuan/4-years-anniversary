type GreetingCardProps = {
  title: string;
  message: string;
};

export function GreetingCard({ title, message }: GreetingCardProps) {
  return (
    <section className="mx-auto mb-12 w-full max-w-4xl overflow-hidden rounded-3xl border border-pink-100 bg-white/90 p-7 shadow-sm sm:p-10">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-pink-500">
        A little celebration
      </p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
        {title}
      </h2>
      <p className="mt-3 max-w-2xl leading-7 text-gray-600">{message}</p>
      <div aria-hidden="true" className="mt-6 text-2xl text-pink-400">
        ♥ ✨ ♥
      </div>
    </section>
  );
}
