import React from 'react'
import ProductsFilter from "@/components/ProductsFilter";
import Breadcrumbs from "@/components/Breadcrumbs";
// import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";
import { FiltersSkeleton } from '@/components/Skeletons';
import { getCollectionBySlug } from '@/lib/store';
export default async function CollectionLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>
}>) {
  //const wixClient = await wixClientServer();
  const slug = (await params).slug;
  const category = await getCollectionBySlug(slug);
  
  const breadcrumbs = [
    {
      label: 'Home',
      href: '/'
    },
    {
      label: category?.collection?.name || "..."
    },
  ]
  return (
    <div className="container py-6 mb-6 lg:mb-12">
      <Breadcrumbs className="mb-6 md:mb-7" breadcrumbs={breadcrumbs} />
      <div className="md:flex flex-start gap-5">
        {category?.collection?._id && category?.collection?.name && (
          <div className="md:w-[50%] lg:w-[45%] xl:w-[32%]">
            <Suspense fallback={<FiltersSkeleton />}>
              <ProductsFilter categoryId={category?.collection?._id} name={category?.collection?.name} />
            </Suspense>
          </div>
        )}
        <div className="w-full">
          {children}
        </div>
      </div>
    </div>
  );
}