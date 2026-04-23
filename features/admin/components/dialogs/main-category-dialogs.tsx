"use client";

import { useRef } from "react";

import {
  createMainCategory,
  deleteMainCategory,
  updateMainCategory,
} from "@/app/actions/admin/main-categories";
import type { MainCategoryRow } from "@/features/admin/types";
import { useAdminDialog } from "@/features/admin/hooks/use-admin-dialog";
import {
  DeleteButton,
  DialogShell,
  FeedbackAlert,
  SubmitButton,
} from "@/features/admin/components/dialogs/shared";
import { Input } from "@/components/ui/input";

export function MainCategoryCreateDialog() {
  const formRef = useRef<HTMLFormElement>(null);
  const { feedback, handleOpenChange, intent, isPending, open, runAction } = useAdminDialog();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    runAction("save", () => createMainCategory(formData), () => {
      formRef.current?.reset();
    });
  };

  return (
    <DialogShell
      title="Add Main Category"
      description="Create a new top-level portfolio filter."
      triggerLabel="Add Category"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
        <FeedbackAlert feedback={feedback} />

        <fieldset className="grid gap-4" disabled={isPending}>
          <div>
            <label className="mb-1 block text-sm font-heading" htmlFor="main-category-create-name">
              Category Name
            </label>
            <Input
              id="main-category-create-name"
              name="name"
              placeholder="Video Editor"
              required
            />
          </div>
        </fieldset>

        <div className="flex justify-end">
          <SubmitButton
            label="Save Category"
            pendingLabel="Saving Category..."
            isPending={isPending && intent === "save"}
          />
        </div>
      </form>
    </DialogShell>
  );
}

export function MainCategoryEditDialog({ category }: { category: MainCategoryRow }) {
  const { feedback, handleOpenChange, intent, isPending, open, runAction } = useAdminDialog();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    runAction("save", () => updateMainCategory(category.id, formData));
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${category.name}" and all nested content? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    runAction("delete", () => deleteMainCategory(category.id));
  };

  return (
    <DialogShell
      title="Edit Main Category"
      description="Update the category name or remove it."
      triggerLabel="Manage"
      triggerVariant="neutral"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <FeedbackAlert feedback={feedback} />

        <fieldset className="grid gap-4" disabled={isPending}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`main-category-name-${category.id}`}>
                Category Name
              </label>
              <Input
                id={`main-category-name-${category.id}`}
                name="name"
                defaultValue={category.name}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading">Slug</label>
              <Input value={category.slug} readOnly disabled />
            </div>
          </div>
          <div className="rounded-base border-2 border-border bg-secondary-background px-4 py-3 text-sm">
            This category currently contains {category.subCount} subcategories.
          </div>
        </fieldset>

        <div className="flex flex-wrap justify-end gap-3">
          <DeleteButton
            label="Delete Category"
            pendingLabel="Deleting..."
            isPending={isPending && intent === "delete"}
            onClick={handleDelete}
          />
          <SubmitButton
            label="Save Changes"
            pendingLabel="Saving..."
            isPending={isPending && intent === "save"}
            variant="neutral"
          />
        </div>
      </form>
    </DialogShell>
  );
}
