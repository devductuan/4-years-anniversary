"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type {
  PortfolioData,
  PortfolioEducationItem,
  PortfolioExperienceItem,
  PortfolioVolunteeringItem,
  PortfolioCertificationItem,
  PortfolioSkillItem,
} from "@/app/portfolio/portfolio.type";
import { savePortfolio } from "./actions";

type SectionKey =
  | "education"
  | "experience"
  | "volunteering"
  | "certifications"
  | "skills";

const emptyEducation = (): PortfolioEducationItem => ({
  school: "",
  degree: "",
  period: "",
  description: "",
});

const emptyExperience = (): PortfolioExperienceItem => ({
  role: "",
  company: "",
  period: "",
  type: "Full-time",
  bullets: [""],
});

const emptyVolunteering = (): PortfolioVolunteeringItem => ({
  role: "",
  organization: "",
  period: "",
  bullets: [""],
});

const emptyCertification = (): PortfolioCertificationItem => ({
  name: "",
  issuer: "",
});

const emptySkill = (): PortfolioSkillItem => ({
  name: "",
  level: "Advanced",
});

type AdminPortfolioFormProps = {
  portfolio: PortfolioData;
};

export const AdminPortfolioForm = ({ portfolio }: AdminPortfolioFormProps) => {
  const router = useRouter();
  const [data, setData] = useState<PortfolioData>(portfolio);
  const [editSection, setEditSection] = useState<SectionKey | null>(null);
  const [editIndex, setEditIndex] = useState<number>(-1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openAdd = (section: SectionKey) => {
    setError(null);
    setEditSection(section);
    setEditIndex(-1);
  };

  const openEdit = (section: SectionKey, index: number) => {
    setError(null);
    setEditSection(section);
    setEditIndex(index);
  };

  const closeModal = () => {
    setEditSection(null);
    setEditIndex(-1);
  };

  const getEditItem = (): unknown => {
    if (!editSection) return null;
    const arr = data[editSection];
    if (editIndex < 0) {
      switch (editSection) {
        case "education":
          return emptyEducation();
        case "experience":
          return emptyExperience();
        case "volunteering":
          return emptyVolunteering();
        case "certifications":
          return emptyCertification();
        case "skills":
          return emptySkill();
        default:
          return null;
      }
    }
    return arr[editIndex] ?? null;
  };

  const updateSection = (section: SectionKey, items: unknown[]) => {
    setData((prev) => ({ ...prev, [section]: items }));
  };

  const saveEdit = (item: unknown) => {
    if (!editSection) return;
    const arr = [...data[editSection]];
    if (editIndex < 0) {
      arr.push(item as never);
    } else {
      arr[editIndex] = item as never;
    }
    updateSection(editSection, arr);
    closeModal();
  };

  const deleteItem = (section: SectionKey, index: number) => {
    if (!confirm("Delete this item?")) return;
    const arr = data[section].filter((_, i) => i !== index);
    updateSection(section, arr);
    if (editSection === section && (editIndex === index || editIndex > index)) {
      setEditIndex(editIndex === index ? -1 : editIndex - 1);
    }
  };

  async function handleSaveAll() {
    setError(null);
    setIsSubmitting(true);
    try {
      await savePortfolio(data);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save portfolio");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* About */}
      <section>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">About</h3>
        <textarea
          value={data.about}
          onChange={(e) =>
            setData((prev) => ({ ...prev, about: e.target.value }))
          }
          className="w-full rounded border border-gray-300 px-3 py-2 text-sm min-h-[120px] resize-y"
          placeholder="About / summary text"
        />
      </section>

      {/* Education */}
      <ListSection
        title="Education"
        items={data.education}
        displayKey="school"
        onAdd={() => openAdd("education")}
        onEdit={(i) => openEdit("education", i)}
        onDelete={(i) => deleteItem("education", i)}
      />

      {/* Experience */}
      <ListSection
        title="Experience"
        items={data.experience}
        displayKey="role"
        onAdd={() => openAdd("experience")}
        onEdit={(i) => openEdit("experience", i)}
        onDelete={(i) => deleteItem("experience", i)}
      />

      {/* Volunteering */}
      <ListSection
        title="Volunteering"
        items={data.volunteering}
        displayKey="role"
        onAdd={() => openAdd("volunteering")}
        onEdit={(i) => openEdit("volunteering", i)}
        onDelete={(i) => deleteItem("volunteering", i)}
      />

      {/* Certifications */}
      <ListSection
        title="Certifications"
        items={data.certifications}
        displayKey="name"
        onAdd={() => openAdd("certifications")}
        onEdit={(i) => openEdit("certifications", i)}
        onDelete={(i) => deleteItem("certifications", i)}
      />

      {/* Skills */}
      <ListSection
        title="Skills"
        items={data.skills}
        displayKey="name"
        onAdd={() => openAdd("skills")}
        onEdit={(i) => openEdit("skills", i)}
        onDelete={(i) => deleteItem("skills", i)}
      />

      {error && (
        <p className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>
      )}

      <div className="flex justify-end border-t border-gray-200 pt-4">
        <button
          type="button"
          onClick={handleSaveAll}
          disabled={isSubmitting}
          className="rounded bg-gray-800 px-6 py-2 font-medium text-white hover:bg-gray-700 disabled:opacity-50"
        >
          {isSubmitting ? "Saving…" : "Save portfolio"}
        </button>
      </div>

      {editSection && (
        <ItemModal
          key={`${editSection}-${editIndex}`}
          section={editSection}
          item={getEditItem()}
          isNew={editIndex < 0}
          onSave={saveEdit}
          onClose={closeModal}
        />
      )}
    </div>
  );
};

function ListSection({
  title,
  items,
  displayKey,
  onAdd,
  onEdit,
  onDelete,
}: {
  title: string;
  items: unknown[];
  displayKey: string;
  onAdd: () => void;
  onEdit: (index: number) => void;
  onDelete: (index: number) => void;
}) {
  const list = items ?? [];
  return (
    <section>
      <div className="flex items-center justify-between gap-4 mb-2">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <button
          type="button"
          onClick={onAdd}
          className="rounded bg-gray-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-700"
        >
          Add
        </button>
      </div>
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                {displayKey}
              </th>
              <th className="border-b border-gray-200 px-3 py-2 text-right font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {list.map((item, index) => (
              <tr
                key={index}
                className="border-b border-gray-100 last:border-0"
              >
                <td className="px-3 py-2 text-gray-900">
                  {String(
                    (item as Record<string, unknown>)[displayKey] ?? "—"
                  )}
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => onEdit(index)}
                    className="mr-2 rounded bg-gray-700 px-2 py-1 text-xs font-medium text-white hover:bg-gray-600"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(index)}
                    className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-500"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {list.length === 0 && (
          <p className="px-3 py-6 text-center text-gray-500">
            No items. Click Add to create one.
          </p>
        )}
      </div>
    </section>
  );
}

function ItemModal({
  section,
  item,
  isNew,
  onSave,
  onClose,
}: {
  section: SectionKey;
  item: unknown;
  isNew: boolean;
  onSave: (item: unknown) => void;
  onClose: () => void;
}) {
  const initialData =
    item && typeof item === "object" && item !== null
      ? { ...(item as Record<string, unknown>) }
      : {};
  const initialBullets = (() => {
    const o = item as { bullets?: string[] };
    return Array.isArray(o?.bullets) && o.bullets.length > 0
      ? o.bullets
      : [""];
  })();

  const [formData, setFormData] = useState<Record<string, unknown>>(initialData);
  const [bullets, setBullets] = useState<string[]>(initialBullets);

  const update = (key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addBullet = () => setBullets((prev) => [...prev, ""]);
  const updateBullet = (i: number, v: string) => {
    setBullets((prev) => {
      const next = [...prev];
      next[i] = v;
      return next;
    });
  };
  const removeBullet = (i: number) => {
    if (bullets.length <= 1) return;
    setBullets((prev) => prev.filter((_, idx) => idx !== i));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasBullets =
      section === "experience" || section === "volunteering";
    const out = hasBullets
      ? { ...formData, bullets: bullets.filter((b) => b.trim()).length ? bullets.filter((b) => b.trim()) : [""] }
      : { ...formData };
    onSave(out);
  };

  const sectionTitle =
    section === "education"
      ? "Education"
      : section === "experience"
        ? "Experience"
        : section === "volunteering"
          ? "Volunteering"
          : section === "certifications"
            ? "Certification"
            : "Skill";

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="item-form-title"
    >
      <div
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 id="item-form-title" className="text-xl font-bold text-gray-900">
            {isNew ? "New" : "Edit"} {sectionTitle}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-sm">
          {section === "education" && (
            <>
              <InputRow
                label="School"
                value={String(formData.school ?? "")}
                onChange={(v) => update("school", v)}
              />
              <InputRow
                label="Degree"
                value={String(formData.degree ?? "")}
                onChange={(v) => update("degree", v)}
              />
              <InputRow
                label="Period"
                value={String(formData.period ?? "")}
                onChange={(v) => update("period", v)}
              />
              <InputRow
                label="Description"
                value={String(formData.description ?? "")}
                onChange={(v) => update("description", v)}
                textarea
              />
            </>
          )}

          {(section === "experience" || section === "volunteering") && (
            <>
              <InputRow
                label="Role"
                value={String(formData.role ?? "")}
                onChange={(v) => update("role", v)}
              />
              <InputRow
                label={section === "experience" ? "Company" : "Organization"}
                value={String(
                  formData.company ?? formData.organization ?? ""
                )}
                onChange={(v) =>
                  update(section === "experience" ? "company" : "organization", v)
                }
              />
              <InputRow
                label="Period"
                value={String(formData.period ?? "")}
                onChange={(v) => update("period", v)}
              />
              {section === "experience" && (
                <>
                  <InputRow
                    label="Type"
                    value={String(formData.type ?? "")}
                    onChange={(v) => update("type", v)}
                    placeholder="e.g. Full-time"
                  />
                  <InputRow
                    label="Link"
                    value={String(formData.link ?? "")}
                    onChange={(v) => update("link", v)}
                    placeholder="Optional URL"
                  />
                  <InputRow
                    label="Location"
                    value={String(formData.location ?? "")}
                    onChange={(v) => update("location", v)}
                    placeholder="Optional"
                  />
                </>
              )}
              <div>
                <div className="mb-1 flex items-center justify-between">
                  <label className="font-medium text-gray-600">Bullets</label>
                  <button
                    type="button"
                    onClick={addBullet}
                    className="rounded border border-gray-300 px-2 py-0.5 text-xs text-gray-700 hover:bg-gray-50"
                  >
                    + Add
                  </button>
                </div>
                <div className="space-y-2">
                  {bullets.map((b, i) => (
                    <div key={i} className="flex gap-2">
                      <input
                        type="text"
                        value={b}
                        onChange={(e) => updateBullet(i, e.target.value)}
                        className="flex-1 rounded border border-gray-300 px-2 py-1.5"
                        placeholder="Bullet point"
                      />
                      <button
                        type="button"
                        onClick={() => removeBullet(i)}
                        className="rounded text-red-600 hover:bg-red-50"
                        aria-label="Remove"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {section === "certifications" && (
            <>
              <InputRow
                label="Name"
                value={String(formData.name ?? "")}
                onChange={(v) => update("name", v)}
              />
              <InputRow
                label="Issuer"
                value={String(formData.issuer ?? "")}
                onChange={(v) => update("issuer", v)}
              />
            </>
          )}

          {section === "skills" && (
            <>
              <InputRow
                label="Name"
                value={String(formData.name ?? "")}
                onChange={(v) => update("name", v)}
              />
              <InputRow
                label="Level"
                value={String(formData.level ?? "")}
                onChange={(v) => update("level", v)}
                placeholder="e.g. Expert, Advanced"
              />
            </>
          )}

          <div className="flex justify-end gap-2 border-t border-gray-200 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-700"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function InputRow({
  label,
  value,
  onChange,
  placeholder,
  textarea,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  textarea?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-medium text-gray-600">{label}</label>
      {textarea ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2 resize-y min-h-[80px]"
          placeholder={placeholder}
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="rounded border border-gray-300 px-3 py-2"
          placeholder={placeholder}
        />
      )}
    </div>
  );
}
