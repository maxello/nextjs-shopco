import React from 'react'
import Filters from "@/components/Filters";
import Breadcrumbs from "@/components/Breadcrumbs";
import { wixClientServer } from "@/lib/wixClientServer";
import { Suspense } from "react";
import { FiltersSkeleton } from '@/components/Skeletons';
export default async function CollectionLayout({
  children,
  params
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ slug: string }>
}>) {
  const wixClient = await wixClientServer();
  const slug = (await params).slug;
  const category = await wixClient.collections.getCollectionBySlug(slug);

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
      <div className="flex flex-start gap-5">
        {category?.collection?._id && (
          <div className="w-[32%]">
            <Suspense fallback={<FiltersSkeleton />}>
              <Filters categoryId={category?.collection?._id} />
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