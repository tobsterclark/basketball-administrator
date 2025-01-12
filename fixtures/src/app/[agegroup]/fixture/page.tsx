export default async function Page({
  params,
}: {
  params: Promise<{ agegroup: string }>;
}) {
  const group = (await params).agegroup;

  console.log(group);
  return <h1>fdskljfklsdj age group: {group}</h1>;
}
