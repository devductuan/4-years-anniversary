"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { RoadMapItem, TodoItem } from "@/modules/anniversaries/Roadmap/roadmap.type";
import { saveRoadmap } from "./actions";

type AdminRoadmapFormProps = {
  roadmap: RoadMapItem[];
};

const emptyTodo = (): TodoItem => ({
  title: "",
  description: "",
  completed: false,
});

const emptyRoadMapItem = (): RoadMapItem => ({
  month: "",
  year: "",
  todolist: [emptyTodo()],
});

type ItemFormState = {
  mode: "create" | "edit";
  index: number;
  item: RoadMapItem;
};

export const AdminRoadmapForm = ({ roadmap }: AdminRoadmapFormProps) => {
  const router = useRouter();
  const [formState, setFormState] = useState<ItemFormState | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const openCreate = () => {
    setError(null);
    setFormState({
      mode: "create",
      index: -1,
      item: emptyRoadMapItem(),
    });
  };

  const openEdit = (index: number) => {
    setError(null);
    const item = roadmap[index];
    setFormState({
      mode: "edit",
      index,
      item: {
        month: item.month,
        year: item.year,
        todolist: item.todolist.length
          ? item.todolist.map((t) => ({
              title: t.title,
              description: t.description,
              completed: Boolean(t.completed),
            }))
          : [emptyTodo()],
      },
    });
  };

  const closeForm = () => setFormState(null);

  const updateFormItem = (updates: Partial<RoadMapItem>) => {
    if (!formState) return;
    setFormState({
      ...formState,
      item: { ...formState.item, ...updates },
    });
  };

  const updateTodo = (todoIndex: number, updates: Partial<TodoItem>) => {
    if (!formState) return;
    const todolist = [...formState.item.todolist];
    todolist[todoIndex] = { ...todolist[todoIndex], ...updates };
    updateFormItem({ todolist });
  };

  const addTodo = () => {
    if (!formState) return;
    updateFormItem({
      todolist: [...formState.item.todolist, emptyTodo()],
    });
  };

  const removeTodo = (todoIndex: number) => {
    if (!formState || formState.item.todolist.length <= 1) return;
    const todolist = formState.item.todolist.filter((_, i) => i !== todoIndex);
    updateFormItem({ todolist });
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!formState) return;
    setError(null);
    setIsSubmitting(true);

    const item: RoadMapItem = {
      month: formState.item.month.trim(),
      year: formState.item.year.trim(),
      todolist: formState.item.todolist
        .map((t) => ({
          title: t.title.trim(),
          description: (t.description ?? "").trim(),
          completed: Boolean(t.completed),
        }))
        .filter((t) => t.title.length > 0),
    };

    if (!item.todolist.length) {
      item.todolist = [emptyTodo()];
    }

    try {
      let newList: RoadMapItem[];
      if (formState.mode === "create") {
        newList = [...roadmap, item];
      } else {
        newList = roadmap.map((r, i) => (i === formState.index ? item : r));
      }
      await saveRoadmap(newList);
      closeForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save roadmap");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleDelete(index: number) {
    if (!confirm("Delete this roadmap item?")) return;
    setError(null);
    setIsSubmitting(true);
    try {
      const newList = roadmap.filter((_, i) => i !== index);
      await saveRoadmap(newList);
      closeForm();
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold text-gray-800">Roadmap items</h3>
        <button
          type="button"
          onClick={openCreate}
          className="rounded bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Add item
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="bg-gray-100">
              <th className="border-b border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                Month
              </th>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                Year
              </th>
              <th className="border-b border-gray-200 px-3 py-2 text-left font-medium text-gray-700">
                Todos
              </th>
              <th className="border-b border-gray-200 px-3 py-2 text-right font-medium text-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {(roadmap ?? []).map((item, index) => (
              <tr key={`${item.month}-${item.year}-${index}`} className="border-b border-gray-100 last:border-0">
                <td className="px-3 py-2 font-medium text-gray-900">{item.month}</td>
                <td className="px-3 py-2 text-gray-600">{item.year}</td>
                <td className="px-3 py-2 text-gray-600">
                  {item.todolist?.length ?? 0} item(s)
                </td>
                <td className="px-3 py-2 text-right">
                  <button
                    type="button"
                    onClick={() => openEdit(index)}
                    className="mr-2 rounded bg-gray-700 px-2 py-1 text-xs font-medium text-white hover:bg-gray-600"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(index)}
                    disabled={isSubmitting}
                    className="rounded bg-red-600 px-2 py-1 text-xs font-medium text-white hover:bg-red-500 disabled:opacity-50"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {(!roadmap || roadmap.length === 0) && (
          <p className="px-3 py-6 text-center text-gray-500">No roadmap items yet. Add one above.</p>
        )}
      </div>

      {error && (
        <p className="rounded bg-red-50 p-2 text-sm text-red-700">{error}</p>
      )}

      {formState && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onClick={closeForm}
          role="dialog"
          aria-modal="true"
          aria-labelledby="roadmap-form-title"
        >
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h2 id="roadmap-form-title" className="text-xl font-bold text-gray-900">
                {formState.mode === "create" ? "New roadmap item" : "Edit roadmap item"}
              </h2>
              <button
                type="button"
                onClick={closeForm}
                className="rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="roadmap-month" className="font-medium text-gray-600">
                    Month
                  </label>
                  <input
                    id="roadmap-month"
                    type="text"
                    value={formState.item.month}
                    onChange={(e) => updateFormItem({ month: e.target.value })}
                    className="rounded border border-gray-300 px-3 py-2"
                    placeholder="e.g. Tháng 1"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="roadmap-year" className="font-medium text-gray-600">
                    Year
                  </label>
                  <input
                    id="roadmap-year"
                    type="text"
                    value={formState.item.year}
                    onChange={(e) => updateFormItem({ year: e.target.value })}
                    className="rounded border border-gray-300 px-3 py-2"
                    placeholder="e.g. 2025"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label className="font-medium text-gray-600">Todo list</label>
                  <button
                    type="button"
                    onClick={addTodo}
                    className="rounded border border-gray-300 px-2 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50"
                  >
                    + Add todo
                  </button>
                </div>
                <div className="space-y-3 rounded border border-gray-200 bg-gray-50/50 p-3">
                  {formState.item.todolist.map((todo, todoIndex) => (
                    <div
                      key={todoIndex}
                      className="flex flex-col gap-2 rounded border border-gray-200 bg-white p-3"
                    >
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={todo.title}
                          onChange={(e) => updateTodo(todoIndex, { title: e.target.value })}
                          className="flex-1 rounded border border-gray-300 px-2 py-1.5 text-sm"
                          placeholder="Todo title"
                        />
                        <label className="flex items-center gap-1.5 whitespace-nowrap text-gray-600">
                          <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={(e) => updateTodo(todoIndex, { completed: e.target.checked })}
                            className="rounded border-gray-300"
                          />
                          Done
                        </label>
                        <button
                          type="button"
                          onClick={() => removeTodo(todoIndex)}
                          className="rounded text-red-600 hover:bg-red-50"
                          aria-label="Remove todo"
                        >
                          ✕
                        </button>
                      </div>
                      <textarea
                        value={todo.description}
                        onChange={(e) => updateTodo(todoIndex, { description: e.target.value })}
                        className="rounded border border-gray-300 px-2 py-1.5 text-xs resize-y"
                        placeholder="Description (optional)"
                        rows={2}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 border-t border-gray-200 pt-4">
                <button
                  type="button"
                  onClick={closeForm}
                  className="rounded border border-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded bg-gray-800 px-4 py-2 font-medium text-white hover:bg-gray-700 disabled:opacity-50"
                >
                  {isSubmitting ? "Saving…" : formState.mode === "create" ? "Create" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
