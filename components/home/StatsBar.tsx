import { STATS } from "@/lib/data/home";

export function StatsBar() {
  return (
    <div className="stats-bar">
      <div className="stats-inner">
        {STATS.map((stat) => (
          <div className="stat-item" key={stat.label}>
            <span className="stat-num">{stat.num}</span>
            <span className="stat-label">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
