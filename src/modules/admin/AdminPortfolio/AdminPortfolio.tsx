import { getPortfolio } from "./actions";
import { AdminPortfolioForm } from "./AdminPortfolioForm";

export const AdminPortfolio = async () => {
  const portfolio = await getPortfolio();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">Portfolio</h2>
        <AdminPortfolioForm portfolio={portfolio} />
      </div>
    </section>
  );
};