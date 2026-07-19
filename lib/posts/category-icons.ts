const CATEGORY_ICONS: Record<string, string> = {
  kubernetes: "🐳",
  terraform: "🔧",
  "ci-cd": "🔄",
  cloud: "☁️",
  security: "🔐",
  gitops: "🔀",
  observability: "📊",
  devops: "⚙️",
};

export function categoryIcon(slug?: string | null): string {
  return (slug && CATEGORY_ICONS[slug]) || "📝";
}
