import { notFound } from "next/navigation";
import { getMemberBySlug, members } from "@/lib/members";
import { MemberProfileClient } from "./profile-client";

export function generateStaticParams() {
  return members.map((member) => ({
    slug: member.slug,
  }));
}

export default async function MemberProfilePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = getMemberBySlug(slug);

  if (!member) {
    notFound();
  }

  return <MemberProfileClient member={member} />;
}
