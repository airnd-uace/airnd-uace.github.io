import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getMemberBySlug, members } from "@/lib/members";
import { translations } from "@/lib/translations";
import { MemberProfileClient } from "./profile-client";

export function generateStaticParams() {
  return members.map((member) => ({
    slug: member.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const member = getMemberBySlug(slug);
  if (!member) return {};
  const t = translations.en;
  return {
    title: `${member.name} — ${t.roles[member.roleKey]}`,
    description: member.bio.slice(0, 160),
  };
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
