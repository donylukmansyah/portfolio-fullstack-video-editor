import { redirect } from "next/navigation";

export default async function MainCategoriesPage() {
  redirect("/admin/portfolios");
}
