import type { Metadata } from "next";
import HomeContent from "../../../content/home.mdx";
import { homeMeta } from "../../../content/home.meta";

const meta = homeMeta;

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  alternates: {
    canonical: "/",
  },
};

export default function HomePage() {
  return <HomeContent />;
}
