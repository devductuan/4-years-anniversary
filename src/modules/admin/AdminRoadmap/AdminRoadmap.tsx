import { getRoadmap } from "./actions";
import { AdminRoadmapForm } from "./AdminRoadmapForm";

export const AdminRoadmap = async () => {
  const roadmap = await getRoadmap();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-4">Roadmap</h2>
        <AdminRoadmapForm roadmap={roadmap} />
      </div>
    </section>
  );
};