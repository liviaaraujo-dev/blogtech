import { categoriesData } from "@/data";
import Link from "next/link";

export default function CategoriesList() {
  return (
    <div className="flex gap-2 text-sm flex-wrap">
      {categoriesData &&
        categoriesData.map((category) => (
          <Link className="px-3 py-1 rounded-md bg-slate-800 text-white cursor-pointer  " href={`/categories/${category.name}`}>{category.name}</Link>
        ))}
    </div>
  );
}
