export const NAV_LINKS = [
  { href: "#experience", label: "Experience" },
  { href: "#skills", label: "Stack" },
  { href: "#certifications", label: "Certs" },
  { href: "#projects", label: "Projects" },
  { href: "#blog", label: "Blog" },
  { href: "#recommendations", label: "Reviews" },
] as const;

export const SECTION_IDS = [
  "experience",
  "skills",
  "certifications",
  "projects",
  "blog",
  "recommendations",
  "contact",
];

export const STATS = [
  { num: "5+", label: "Years Experience" },
  { num: "50+", label: "Projects" },
  { num: "3", label: "Cloud Platforms" },
  { num: "8+", label: "Certifications" },
  { num: "99.9%", label: "Uptime Focus" },
];

export type TimelineItem = {
  title: string;
  date: string;
  company: string;
  bullets: string[];
};

export const EXPERIENCE: TimelineItem[] = [
  {
    title: "IT Engineer (Cloud & Infrastructure)",
    date: "Aug 2024 – Present",
    company: "Foodtastic · Toronto, Canada",
    bullets: [
      "Led IT operations for multi-location restaurant infrastructure (1400+ sites), ensuring 99.9% uptime for POS and payment systems.",
      "Implemented MDM solution managing 1000+ POS/Kiosk devices, reducing manual provisioning effort and improving security compliance.",
      "Built GitHub Actions pipelines to automate configuration updates and deployments across all locations.",
      "Designed Cloud-based backup/data pipelines integrating POS transaction data into PostgreSQL for improved data reliability.",
      "Designed LAN/WAN, VLAN segmentation, and failover networks improving availability across all locations.",
    ],
  },
  {
    title: "Automation Developer Co-op",
    date: "Jan 2025 – Apr 2025",
    company: "Government of Ontario · Toronto, Canada",
    bullets: [
      "Developed Azure schedule-based Runbooks with integrated email notifications, replacing Logic Apps and establishing a centralized automation model.",
      "Performed patch management and decommission tasks across 900+ Azure subscriptions.",
      "Implemented automated Azure DevOps pipelines for Entra ID user provisioning, de-provisioning, and lifecycle management.",
      "Created PowerShell and Python scripts for priority-based patching of high availability Azure DB nodes.",
    ],
  },
  {
    title: "Senior Platform Engineer / DevOps Engineer",
    date: "Mar 2021 – Apr 2024",
    company: "Cedar Gate Technologies · Greenwich, CT",
    bullets: [
      "Built and managed DevSecOps CI/CD pipelines for Java, .NET, and Python applications, reducing deployment time significantly.",
      "Led monolithic to containerized migration (Docker, Kubernetes) across AWS EKS and Azure AKS.",
      "Designed Infrastructure as Code using Terraform and Ansible including reusable VPC modules for scalable cloud environments.",
      "Built end-to-end observability stack (Prometheus, Grafana, ELK, New Relic, AWS X-Ray) following SRE principles.",
      "Integrated SAST, DAST, and container scanning (Veracode) into CI/CD pipelines for shift-left security.",
    ],
  },
  {
    title: "Web Developer",
    date: "Nov 2019 – Feb 2021",
    company: "Webmandu Nepal · Kathmandu, Nepal",
    bullets: [
      "Developed and maintained client websites using React.js, PHP, WordPress, and MySQL.",
      "Performed manual QA, code reviews, and Agile sprint management using Jira.",
    ],
  },
  {
    title: "Data Specialist",
    date: "Jun 2018 – Apr 2019",
    company: "CloudFactory · Kathmandu, Nepal",
    bullets: [
      "Processed, validated, and managed large-scale datasets while maintaining high accuracy and data quality standards.",
      "Utilized cloud-based tools and internal platforms to optimize data operations and meet project delivery targets in fast-paced environments.",
    ],
  },
];

export type SkillCard = {
  icon: string;
  title: string;
  tags: string[];
};

export const SKILLS: SkillCard[] = [
  {
    icon: "☁️",
    title: "Cloud Platforms",
    tags: ["AWS EC2/EKS/S3", "Lambda", "CloudWatch", "VPC", "Azure AKS", "Entra ID", "Key Vault", "GCP GKE", "Cloud Run"],
  },
  {
    icon: "🔄",
    title: "CI/CD & GitOps",
    tags: ["GitHub Actions", "Jenkins", "Azure DevOps", "ArgoCD", "GitOps", "Helm", "Maven", "Gradle"],
  },
  {
    icon: "📦",
    title: "Containers & Orchestration",
    tags: ["Docker", "Kubernetes", "EKS", "AKS", "GKE", "Istio", "Calico/Cilium", "ECS"],
  },
  {
    icon: "🔧",
    title: "Infrastructure as Code",
    tags: ["Terraform", "Ansible", "Pulumi", "CloudFormation", "ARM Templates", "Bicep"],
  },
  {
    icon: "📊",
    title: "Observability & SRE",
    tags: ["Prometheus", "Grafana", "ELK Stack", "New Relic", "AWS X-Ray", "Fluent Bit", "CloudWatch"],
  },
  {
    icon: "🔐",
    title: "Security & Compliance",
    tags: ["Zero Trust", "RBAC/ABAC", "Veracode SAST/DAST", "OAuth/OIDC", "CIS/NIST", "HIPAA", "PCI-DSS", "SIEM"],
  },
  {
    icon: "💻",
    title: "Scripting & Languages",
    tags: ["Python", "Bash", "PowerShell", "Groovy", "SQL", "JavaScript"],
  },
  {
    icon: "🗄️",
    title: "Databases & Messaging",
    tags: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "DynamoDB", "Kafka", "OpenSearch"],
  },
];

export type Cert = {
  badge: string;
  colorClass: string;
  title: string;
  issuer: string;
  href?: string;
};

export const CERTIFICATIONS: Cert[] = [
  { badge: "🔵", colorClass: "cert-azure", title: "Azure Administrator Associate", issuer: "Microsoft" },
  { badge: "🟠", colorClass: "cert-aws", title: "AWS Cloud Security Foundations", issuer: "Amazon Web Services" },
  {
    badge: "🔷",
    colorClass: "cert-cisco",
    title: "CCNA – Enterprise Networking, Security & Automation",
    issuer: "Cisco ↗",
    href: "https://www.credly.com/badges/5768ddac-0c34-470c-b5e7-39356354a79c/public_url",
  },
  {
    badge: "🟢",
    colorClass: "cert-gcp",
    title: "Google Cloud SRE and DevOps Engineer",
    issuer: "Google · Coursera ↗",
    href: "https://coursera.org/share/cfb1b6ab137ac0b5ec419f77c3e28f7b",
  },
  {
    badge: "🐧",
    colorClass: "cert-linux",
    title: "Linux Server Management and Security",
    issuer: "Linux Foundation · Coursera ↗",
    href: "https://coursera.org/share/623aa950e4fab2687028d598f08acbab",
  },
  {
    badge: "🔶",
    colorClass: "cert-git",
    title: "GitOps Fundamentals",
    issuer: "Codefresh · Credly ↗",
    href: "https://www.credly.com/badges/9182d85a-bb1f-4cf2-af05-65cde57d1777/public_url",
  },
  {
    badge: "🛡️",
    colorClass: "cert-sec",
    title: "Cloud Security and Audit Fundamentals",
    issuer: "LinkedIn Learning ↗",
    href: "https://www.linkedin.com/learning/certificates/caa8a5e14a20452b3097f47941223f3bc5a10a1424e2ddb0789e3bf750504e7a",
  },
  {
    badge: "🔒",
    colorClass: "cert-sec",
    title: "Application Security for Developers and DevOps",
    issuer: "Coursera ↗",
    href: "https://coursera.org/share/99b9beb90a721712b4e1115041bc0b9d",
  },
];

export type Project = {
  emoji: string;
  title: string;
  org: string;
  desc: string;
  tags: string[];
};

export const PROJECTS: Project[] = [
  {
    emoji: "🔒",
    title: "Web Application Security Assessment",
    org: "Ferro Technics Inc · Scarborough, ON",
    desc: "Security assessment of an Azure-based Canadian mortgage application. Mapped controls to PCI-DSS and CIS Benchmarks, delivered threat modeling and compliance gap analysis.",
    tags: ["Azure", "PCI-DSS", "CIS", "Threat Modeling", "Security Assessment"],
  },
  {
    emoji: "☁️",
    title: "A1-Prep Cloud Platform",
    org: "Seneca Polytechnic",
    desc: "AWS-based containerized mock test application using EKS, Terraform, and Ansible for scalable automated infrastructure and continuous deployment pipelines.",
    tags: ["AWS EKS", "Terraform", "Ansible", "Docker", "GitOps"],
  },
  {
    emoji: "📊",
    title: "Security Monitoring Dashboard",
    org: "Seneca Polytechnic",
    desc: "ELK-based threat monitoring dashboard using the CIC dataset and live logs, with automated alerting for real-time incident detection.",
    tags: ["ELK Stack", "Kibana", "SIEM", "Elasticsearch", "Alerting"],
  },
];

export type FloatingKeyword = { text: string; color: "green" | "blue" };

export const FLOATING_KEYWORDS: FloatingKeyword[] = [
  { text: "Kubernetes", color: "green" },
  { text: "Terraform", color: "green" },
  { text: "AWS EKS", color: "green" },
  { text: "ArgoCD", color: "green" },
  { text: "Prometheus", color: "green" },
  { text: "Grafana", color: "green" },
  { text: "GitOps", color: "green" },
  { text: "Helm", color: "green" },
  { text: "Zero Trust", color: "green" },
  { text: "Docker", color: "green" },
  { text: "Azure AKS", color: "blue" },
  { text: "GitHub Actions", color: "blue" },
  { text: "Ansible", color: "blue" },
  { text: "Istio", color: "blue" },
  { text: "ELK Stack", color: "blue" },
  { text: "Pulumi", color: "blue" },
  { text: "GCP GKE", color: "blue" },
  { text: "PostgreSQL", color: "blue" },
  { text: "Kafka", color: "blue" },
  { text: "New Relic", color: "blue" },
  { text: "CI/CD", color: "blue" },
  { text: "HIPAA", color: "blue" },
  { text: "Python", color: "green" },
  { text: "PowerShell", color: "blue" },
  { text: "Jenkins", color: "green" },
  { text: "PCI-DSS", color: "blue" },
];

export const FLOATING_KEYWORD_SLOTS: Array<{ top: string; left?: string; right?: string }> = [
  { top: "4%", left: "5%" },
  { top: "12%", left: "68%" },
  { top: "22%", left: "2%" },
  { top: "28%", right: "3%" },
  { top: "40%", left: "0%" },
  { top: "40%", right: "0%" },
  { top: "54%", left: "2%" },
  { top: "54%", right: "2%" },
  { top: "66%", left: "5%" },
  { top: "66%", right: "4%" },
  { top: "78%", left: "10%" },
  { top: "78%", right: "8%" },
  { top: "88%", left: "20%" },
  { top: "88%", right: "18%" },
  { top: "95%", left: "38%" },
  { top: "5%", right: "5%" },
];

/**
 * Fallback marquee content. Once the blog exists (Phase 5), BlogMarquee
 * swaps to real published posts via getRecentPosts() — see the migration plan.
 */
export type PlaceholderPost = {
  emoji: string;
  tag: string;
  title: string;
  excerpt: string;
  date: string;
  url: string;
};

export const PLACEHOLDER_BLOG_POSTS: PlaceholderPost[] = [
  {
    emoji: "✍️",
    tag: "DevOps",
    title: "Building Production-Grade CI/CD Pipelines with GitHub Actions and ArgoCD",
    excerpt: "A deep dive into GitOps-first deployment strategies for Kubernetes, covering Helm, image promotion, and rollback strategies.",
    date: "Medium · @stalinrijal",
    url: "https://medium.com/@stalinrijal",
  },
  {
    emoji: "🔐",
    tag: "Security",
    title: "Implementing Zero Trust Security in Multi-Cloud Kubernetes Workloads",
    excerpt: "How to harden container workloads using RBAC, network policies, Istio service mesh, and Veracode SAST/DAST scanning.",
    date: "Medium · @stalinrijal",
    url: "https://medium.com/@stalinrijal",
  },
  {
    emoji: "☁️",
    tag: "Cloud",
    title: "FinOps on Azure: How I Identified 40% Cost Savings Across 900+ Subscriptions",
    excerpt: "Practical strategies for tagging enforcement, reserved instance analysis, right-sizing VMs, and automating service retirement.",
    date: "Medium · @stalinrijal",
    url: "https://medium.com/@stalinrijal",
  },
  {
    emoji: "🐳",
    tag: "Kubernetes",
    title: "Migrating Monoliths to Microservices: Lessons From the Trenches",
    excerpt: "Real-world patterns for decomposing legacy Java and .NET apps into containerized workloads on EKS and AKS.",
    date: "Medium · @stalinrijal",
    url: "https://medium.com/@stalinrijal",
  },
  {
    emoji: "📊",
    tag: "SRE",
    title: "Building Full-Stack Observability with Prometheus, Grafana & ELK",
    excerpt: "How we built an end-to-end SRE observability stack with custom dashboards, SLO alerting, and distributed tracing.",
    date: "Medium · @stalinrijal",
    url: "https://medium.com/@stalinrijal",
  },
  {
    emoji: "🔧",
    tag: "IaC",
    title: "Terraform at Scale: Reusable Modules for Multi-Region AWS Infrastructure",
    excerpt: "Structuring Terraform workspaces, modules, and remote state for large teams managing hundreds of cloud resources.",
    date: "Medium · @stalinrijal",
    url: "https://medium.com/@stalinrijal",
  },
];

export type Recommendation = {
  body: string;
  name: string;
  role: string;
  avatar: string;
  initials: string;
};

export const RECOMMENDATIONS: Recommendation[] = [
  {
    body: "I had the pleasure of directly managing Stalin as his team lead, and I can confidently say he brought exceptional value to our team. Stalin contributed to several automation initiatives focused on reducing manual workloads, including implementing auto-shutdown scripts for Azure resources such as Virtual Machines, Function Apps, and Application Gateways. I highly recommend Stalin for future roles in DevOps and cloud engineering.",
    name: "Nicholas Annouza",
    role: "Technical Team Lead · Government of Ontario (MPBSDP)",
    avatar: "/rec-nicholas.jpg",
    initials: "NA",
  },
  {
    body: "Stalin consistently demonstrated outstanding performance, dedication, and reliability throughout his tenure. He is highly intelligent, with strong analytical and reasoning skills. He is an excellent team player with exceptional time-management abilities, enabling him to prioritize tasks and manage workloads efficiently. Progressing from Associate DevOps Engineer to Senior Platform Engineer, I have no doubt he will excel in his future endeavors.",
    name: "Srijana Parajuli",
    role: "Platform Engineering Manager · Cedar Gate Technologies",
    avatar: "/rec-srijana.jpg",
    initials: "SP",
  },
  {
    body: "It is my absolute pleasure to recommend Mr. Rijal for any future professional opportunities he may pursue. He has exhibited a remarkable aptitude for platform engineering, effectively tackling complex challenges and contributing significantly to the success of our projects. Along with his undeniable talent, Mr. Rijal has always proven to be a valuable team player, collaborating effectively with colleagues across departments to achieve common goals.",
    name: "Sumit Karki",
    role: "Innovative Platform Engineering Manager · Cedar Gate Technologies",
    avatar: "/rec-sumit.jpg",
    initials: "SK",
  },
  {
    body: "I had the pleasure of studying computer science with Stalin Rijal and witnessed firsthand his dedication and remarkable skills. As a DevOps engineer, Stalin consistently demonstrated a deep understanding of the software development life cycle, coupled with a strong focus on automation and efficiency. I highly recommend Stalin for any challenging role in DevOps. His skills, work ethic, and passion for the field make him an asset to any team.",
    name: "Suprim Regmi",
    role: "Data Engineer · Cedar Gate Technologies",
    avatar: "/rec-suprim.jpg",
    initials: "SR",
  },
  {
    body: "Mr. Stalin Rijal has been one of the exceptional students in our B.Sc. CSIT program. He has consistently demonstrated strong academic performance, securing good grades and showing a deep understanding of programming logic. He is well respected by his peers and professors alike. I strongly recommend Mr. Rijal for graduate studies and believe he will excel in his future academic endeavors.",
    name: "Rojisha Sthapit",
    role: "B.Sc. CSIT Program Co-ordinator · Prime College",
    avatar: "/rec-rojisha.jpg",
    initials: "RS",
  },
];

export const CONTACT_LINKS = [
  { icon: "✉️", label: "stalinrijal.devops@gmail.com", href: "mailto:stalinrijal.devops@gmail.com", external: false },
  { icon: "💼", label: "linkedin.com/in/stalinrijal", href: "https://linkedin.com/in/stalinrijal", external: true },
  { icon: "🐙", label: "github.com/stalinrijal", href: "https://github.com/stalinrijal", external: true },
  { icon: "📝", label: "medium.com/@stalinrijal", href: "https://medium.com/@stalinrijal", external: true },
  { icon: "🐦", label: "twitter.com/stalinrijal", href: "https://twitter.com/stalinrijal", external: true },
];
