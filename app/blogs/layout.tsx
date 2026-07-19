import { SiteHeader } from "@/components/blog/SiteHeader";
import { SiteFooter } from "@/components/blog/SiteFooter";

export default function BlogsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <SiteHeader />
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
}
