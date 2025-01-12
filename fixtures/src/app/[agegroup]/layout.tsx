import Link from "next/link";
import { ReactNode } from "react";

export const dynamicParams = false;

export async function generateStaticParams() {
  return [
    { agegroup: "123" },
    { agegroup: "9-12" },
    { agegroup: "7/8" },
    { agegroup: "5/6" },
  ];
}

export default async function MainLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ agegroup: string }>;
}) {
  const agegroup = (await params).agegroup;

  return (
    <div className="flex flex-col gap-8 bg-white text-black p-5 w-screen h-screen">
      <h1 className="text-xl font-bold">Grade {agegroup}</h1>

      <div className="flex flex-row gap-6">
        <Link href={`/${agegroup}/fixture`} className="bg-red-500 p-2 rounded">
          Fixture
        </Link>
        <Link href={`/${agegroup}/results`} className="bg-red-500 p-2 rounded">
          Results
        </Link>
        <Link href={`/${agegroup}/ladder`} className="bg-red-500 p-2 rounded">
          Ladder
        </Link>
      </div>

      <section>{children}</section>
    </div>
  );
}
