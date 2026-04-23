"use client";

import { useRef } from "react";

import {
  createSubCategory,
  deleteSubCategory,
  updateSubCategory,
} from "@/app/actions/admin/sub-categories";
import type {
  MainCategoryOption,
  SubCategoryRow,
} from "@/features/admin/types";
import { useAdminDialog } from "@/features/admin/hooks/use-admin-dialog";
import {
  DeleteButton,
  DialogShell,
  FeedbackAlert,
  selectClassName,
  SubmitButton,
} from "@/features/admin/components/dialogs/shared";
import { Input } from "@/components/ui/input";

export function SubCategoryCreateDialog({
  mainCategories,
}: {
  mainCategories: MainCategoryOption[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { feedback, handleOpenChange, intent, isPending, open, runAction } = useAdminDialog();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    runAction("save", () => createSubCategory(formData), () => {
      formRef.current?.reset();
    });
  };

  return (
    <DialogShell
      title="Add Sub Category"
      description="Create a child filter under one of your main categories."
      triggerLabel="Add Sub Category"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
        <FeedbackAlert feedback={feedback} />

        <fieldset className="grid gap-4" disabled={isPending}>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="sub-category-create-name">
                Name
              </label>
              <Input
                id="sub-category-create-name"
                name="name"
                placeholder="Storytelling"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="sub-category-create-parent">
                Parent Category
              </label>
              <select
                id="sub-category-create-parent"
                name="mainCategoryId"
                className={selectClassName}
                required
                defaultValue=""
              >
                <option value="">Select category</option>
                {mainCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <div className="flex justify-end">
          <SubmitButton
            label="Save Sub Category"
            pendingLabel="Saving Sub Category..."
            isPending={isPending && intent === "save"}
          />
        </div>
      </form>
    </DialogShell>
  );
}

export function SubCategoryEditDialog({
  mainCategories,
  subCategory,
}: {
  mainCategories: MainCategoryOption[];
  subCategory: SubCategoryRow;
}) {
  const { feedback, handleOpenChange, intent, isPending, open, runAction } = useAdminDialog();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    runAction("save", () => updateSubCategory(subCategory.id, formData));
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${subCategory.name}" and all portfolio cards inside it? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    runAction("delete", () => deleteSubCategory(subCategory.id));
  };

  return (
    <DialogShell
      title="Edit Sub Category"
      description="Update the sub-filter settings or remove it."
      triggerLabel="Manage"
      triggerVariant="neutral"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <FeedbackAlert feedback={feedback} />

        <fieldset className="grid gap-4" disabled={isPending}>
          <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_240px]">
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`sub-category-name-${subCategory.id}`}>
                Name
              </label>
              <Input
                id={`sub-category-name-${subCategory.id}`}
                name="name"
                defaultValue={subCategory.name}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`sub-category-parent-${subCategory.id}`}>
                Parent Category
              </label>
              <select
                id={`sub-category-parent-${subCategory.id}`}
                name="mainCategoryId"
                defaultValue={subCategory.mainCategoryId}
                className={selectClassName}
                required
              >
                {mainCategories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-heading">Slug</label>
              <Input value={subCategory.slug} readOnly disabled />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading">Cards</label>
              <Input value={String(subCategory.portfolioCount)} readOnly disabled />
            </div>
          </div>
        </fieldset>

        <div className="flex flex-wrap justify-end gap-3">
          <DeleteButton
            label="Delete Sub Category"
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
