import { SitePage } from "../site-page";

export default async function CatchAll({ params }: { params: Promise<{ slug: string[] }> }) {
  const { slug } = await params;
  return <SitePage slug={slug} />;
}
