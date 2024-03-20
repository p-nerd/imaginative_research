import db from "@/db";
import { products } from "@/db/schema";
import { imageUrl } from "@/lib/utils";
import { sql } from "drizzle-orm";
import { X } from "lucide-react";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const Search = async (p: { searchParams: { [key: string]: string | string[] | undefined } }) => {
    const query = p.searchParams?.q;
    if (Array.isArray(query) || !query) {
        return redirect("/");
    }
    console.log(query);

    const queryString = query.trim().split(" ").join(" & ");
    console.log(queryString);

    const productsList = await db
        .select()
        .from(products)
        .where(
            sql`to_tsvector('simple', lower(${products.name} || ' ' || ${products.description})) @@ 
                to_tsquery('simple', lower(${queryString}))`,
        )
        .limit(5);
    console.log(productsList);

    if (productsList.length === 0) {
        return (
            <div className="text-center py-4 bg-white shadow-md rounded-b-md">
                <X className="mx-auto h-8 w-8 text-gray-400" />
                <h3 className="mt-2 text-sm font-semibold text-gray-900">No results</h3>
                <p className="mt-1 text-sm mx-auto max-w-prose text-gray-500">
                    Sorry, we could not find any matches for{" "}
                    <span className="text-green-600 font-medium">{query}</span>.
                </p>
            </div>
        );
    }

    return (
        <ul className="py-4 divide-y divide-zinc-100 bg-white shadow-md rounded-b-md">
            {productsList.slice(0, 3).map(product => (
                <Link key={product.id} href={`/products/${product.id}`}>
                    <li className="mx-auto py-4 px-8 flex space-x-4">
                        <div className="relative flex items-center bg-zinc-100 rounded-lg h-40 w-40">
                            <Image loading="eager" fill alt="product-image" src={imageUrl} />
                        </div>

                        <div className="w-full flex-1 space-y-2 py-1">
                            <h1 className="text-lg font-medium text-gray-900">{product.name}</h1>

                            <p className="prose prose-sm text-gray-500 line-clamp-3">
                                {product.description}
                            </p>

                            <p className="text-base font-medium text-gray-900">
                                ${product.price.toFixed(2)}
                            </p>
                        </div>
                    </li>
                </Link>
            ))}
        </ul>
    );
};

export default Search;
