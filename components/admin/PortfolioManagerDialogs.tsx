"use client";

import { useRef, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, CheckCircle2, LoaderCircle, Trash2 } from "lucide-react";

import {
  type AdminActionResult,
  createMainCategory,
  createPortfolioItem,
  createSubCategory,
  deleteMainCategory,
  deletePortfolioItem,
  deleteSubCategory,
  updateMainCategory,
  updatePortfolioItem,
  updateSubCategory,
} from "@/app/actions/portfolio";
import { ThumbnailUploadField } from "@/components/admin/ThumbnailUploadField";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

type MainCategoryRow = {
  id: string;
  name: string;
  slug: string;
  subCount: number;
};

type MainCategoryOption = {
  id: string;
  name: string;
};

type SubCategoryRow = {
  id: string;
  name: string;
  slug: string;
  mainCategoryId: string;
  mainCategoryName: string;
  portfolioCount: number;
};

type SubCategoryOption = {
  id: string;
  name: string;
  mainCategoryName: string;
};

type PortfolioRow = {
  id: string;
  title: string;
  thumbnailLabel: string;
  thumbnailUrl: string | null;
  mediaType: "video" | "image";
  youtubeUrl: string | null;
  gradient: string | null;
  subCategoryId: string;
  subCategoryName: string;
  mainCategoryName: string;
};

type MutationIntent = "save" | "delete";

const dialogClassName = "max-h-[90vh] overflow-y-auto sm:max-w-3xl";
const selectClassName =
  "w-full rounded-base border-2 border-border bg-secondary-background px-3 py-2 text-sm outline-none";

function DialogShell({
  title,
  description,
  triggerLabel,
  triggerVariant = "default",
  open,
  onOpenChange,
  children,
}: {
  title: string;
  description: string;
  triggerLabel: string;
  triggerVariant?: "default" | "neutral";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant={triggerVariant}>{triggerLabel}</Button>
      </DialogTrigger>
      <DialogContent className={dialogClassName}>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}

function useAdminDialog() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState<AdminActionResult | null>(null);
  const [intent, setIntent] = useState<MutationIntent | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setFeedback(null);
      setIntent(null);
    }
  };

  const runAction = (
    nextIntent: MutationIntent,
    action: () => Promise<AdminActionResult>,
    onSuccess?: (result: Extract<AdminActionResult, { ok: true }>) => void,
  ) => {
    setFeedback(null);
    setIntent(nextIntent);

    startTransition(async () => {
      const result = await action();

      if (!result.ok) {
        setFeedback(result);
        setIntent(null);
        return;
      }

      router.refresh();
      onSuccess?.(result);
      setIntent(null);
      setFeedback(null);
      setOpen(false);
    });
  };

  return {
    open,
    handleOpenChange,
    feedback,
    intent,
    isPending,
    runAction,
  };
}

function FeedbackAlert({ feedback }: { feedback: AdminActionResult | null }) {
  if (!feedback) {
    return null;
  }

  const isError = !feedback.ok;

  return (
    <Alert variant={isError ? "destructive" : "default"}>
      {isError ? <AlertCircle /> : <CheckCircle2 />}
      <AlertTitle>{isError ? "Please check this form" : "Saved"}</AlertTitle>
      <AlertDescription>{isError ? feedback.error : feedback.message}</AlertDescription>
    </Alert>
  );
}

function SubmitButton({
  label,
  pendingLabel,
  isPending,
  variant = "default",
}: {
  label: string;
  pendingLabel: string;
  isPending: boolean;
  variant?: "default" | "neutral";
}) {
  return (
    <Button type="submit" variant={variant} disabled={isPending}>
      {isPending ? <LoaderCircle className="animate-spin" /> : null}
      {isPending ? pendingLabel : label}
    </Button>
  );
}

function DeleteButton({
  label,
  pendingLabel,
  isPending,
  onClick,
}: {
  label: string;
  pendingLabel: string;
  isPending: boolean;
  onClick: () => void;
}) {
  return (
    <Button type="button" variant="reverse" disabled={isPending} onClick={onClick}>
      {isPending ? <LoaderCircle className="animate-spin" /> : <Trash2 />}
      {isPending ? pendingLabel : label}
    </Button>
  );
}

function PortfolioMediaHint({ mediaType }: { mediaType: "video" | "image" }) {
  const copy =
    mediaType === "video"
      ? "Paste the YouTube URL for the modal/player. Public cards will keep the play badge."
      : "Image items do not need a YouTube URL. Public cards will render clean without a play badge.";

  return (
    <div className="rounded-base border-2 border-border bg-secondary-background px-4 py-3 text-sm text-foreground/75">
      {copy}
    </div>
  );
}

export function MainCategoryCreateDialog() {
  const formRef = useRef<HTMLFormElement>(null);
  const { open, handleOpenChange, feedback, intent, isPending, runAction } = useAdminDialog();

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
  const { open, handleOpenChange, feedback, intent, isPending, runAction } = useAdminDialog();

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

export function SubCategoryCreateDialog({
  mainCategories,
}: {
  mainCategories: MainCategoryOption[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const { open, handleOpenChange, feedback, intent, isPending, runAction } = useAdminDialog();

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
  subCategory,
  mainCategories,
}: {
  subCategory: SubCategoryRow;
  mainCategories: MainCategoryOption[];
}) {
  const { open, handleOpenChange, feedback, intent, isPending, runAction } = useAdminDialog();

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

export function PortfolioCreateDialog({
  subCategories,
}: {
  subCategories: SubCategoryOption[];
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [mediaType, setMediaType] = useState<"video" | "image">("video");
  const { open, handleOpenChange, feedback, intent, isPending, runAction } = useAdminDialog();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (mediaType === "image") {
      formData.set("youtubeUrl", "");
    }

    runAction("save", () => createPortfolioItem(formData), () => {
      formRef.current?.reset();
      setMediaType("video");
    });
  };

  return (
    <DialogShell
      title="Add Portfolio Card"
      description="Create a new card for the public portfolio."
      triggerLabel="Add Portfolio Card"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <form ref={formRef} onSubmit={handleSubmit} className="grid gap-4">
        <FeedbackAlert feedback={feedback} />
        <PortfolioMediaHint mediaType={mediaType} />

        <fieldset className="grid gap-4" disabled={isPending}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-title">
                Title
              </label>
              <Input id="portfolio-create-title" name="title" placeholder="Project title" required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-thumbnail-label">
                Thumbnail Label
              </label>
              <Input
                id="portfolio-create-thumbnail-label"
                name="thumbnailLabel"
                placeholder="powered by @client"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-sub-category">
                Sub Category
              </label>
              <select
                id="portfolio-create-sub-category"
                name="subCategoryId"
                className={selectClassName}
                required
                defaultValue=""
              >
                <option value="">Select sub category</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.mainCategoryName} / {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-media-type">
                Media Type
              </label>
              <select
                id="portfolio-create-media-type"
                name="mediaType"
                className={selectClassName}
                value={mediaType}
                onChange={(event) => setMediaType(event.target.value as "video" | "image")}
              >
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-youtube-url">
                YouTube URL
              </label>
              <Input
                id="portfolio-create-youtube-url"
                name="youtubeUrl"
                placeholder={
                  mediaType === "video"
                    ? "https://youtube.com/watch?v=..."
                    : "Disabled for image cards"
                }
                disabled={mediaType === "image"}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor="portfolio-create-gradient">
                Gradient (optional)
              </label>
              <Input
                id="portfolio-create-gradient"
                name="gradient"
                placeholder="from-indigo-800 via-violet-700 to-purple-600"
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-heading">Thumbnail Upload</label>
            <ThumbnailUploadField name="thumbnailUrl" disabled={isPending} />
          </div>
        </fieldset>

        <div className="flex justify-end">
          <SubmitButton
            label="Save Portfolio"
            pendingLabel="Saving Portfolio..."
            isPending={isPending && intent === "save"}
          />
        </div>
      </form>
    </DialogShell>
  );
}

export function PortfolioEditDialog({
  item,
  subCategories,
}: {
  item: PortfolioRow;
  subCategories: SubCategoryOption[];
}) {
  const [mediaType, setMediaType] = useState<"video" | "image">(item.mediaType);
  const { open, handleOpenChange, feedback, intent, isPending, runAction } = useAdminDialog();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (mediaType === "image") {
      formData.set("youtubeUrl", "");
    }

    runAction("save", () => updatePortfolioItem(item.id, formData));
  };

  const handleDelete = () => {
    const confirmed = window.confirm(
      `Delete "${item.title}" from the public portfolio? This cannot be undone.`,
    );

    if (!confirmed) {
      return;
    }

    runAction("delete", () => deletePortfolioItem(item.id));
  };

  return (
    <DialogShell
      title="Edit Portfolio Card"
      description="Update card content, media type, and thumbnail."
      triggerLabel="Manage"
      triggerVariant="neutral"
      open={open}
      onOpenChange={handleOpenChange}
    >
      <form onSubmit={handleSubmit} className="grid gap-4">
        <FeedbackAlert feedback={feedback} />
        <PortfolioMediaHint mediaType={mediaType} />

        <fieldset className="grid gap-4" disabled={isPending}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-title-${item.id}`}>
                Title
              </label>
              <Input id={`portfolio-title-${item.id}`} name="title" defaultValue={item.title} required />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-thumbnail-label-${item.id}`}>
                Thumbnail Label
              </label>
              <Input
                id={`portfolio-thumbnail-label-${item.id}`}
                name="thumbnailLabel"
                defaultValue={item.thumbnailLabel}
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-sub-category-${item.id}`}>
                Sub Category
              </label>
              <select
                id={`portfolio-sub-category-${item.id}`}
                name="subCategoryId"
                defaultValue={item.subCategoryId}
                className={selectClassName}
                required
              >
                {subCategories.map((subCategory) => (
                  <option key={subCategory.id} value={subCategory.id}>
                    {subCategory.mainCategoryName} / {subCategory.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-media-type-${item.id}`}>
                Media Type
              </label>
              <select
                id={`portfolio-media-type-${item.id}`}
                name="mediaType"
                value={mediaType}
                onChange={(event) => setMediaType(event.target.value as "video" | "image")}
                className={selectClassName}
              >
                <option value="video">Video</option>
                <option value="image">Image</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-youtube-url-${item.id}`}>
                YouTube URL
              </label>
              <Input
                id={`portfolio-youtube-url-${item.id}`}
                name="youtubeUrl"
                defaultValue={item.youtubeUrl ?? ""}
                placeholder={
                  mediaType === "video"
                    ? "https://youtube.com/watch?v=..."
                    : "Disabled for image cards"
                }
                disabled={mediaType === "image"}
              />
            </div>
            <div>
              <label className="mb-1 block text-sm font-heading" htmlFor={`portfolio-gradient-${item.id}`}>
                Gradient (optional)
              </label>
              <Input
                id={`portfolio-gradient-${item.id}`}
                name="gradient"
                defaultValue={item.gradient ?? ""}
              />
            </div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-heading">Thumbnail Upload</label>
            <ThumbnailUploadField
              name="thumbnailUrl"
              defaultValue={item.thumbnailUrl ?? ""}
              disabled={isPending}
            />
          </div>
        </fieldset>

        <div className="flex flex-wrap justify-end gap-3">
          <DeleteButton
            label="Delete Portfolio"
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
