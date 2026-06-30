export const PROFESSIONAL_EXPERIENCE = {
  company: "Tata Consultancy Services (TCS)",
  companyShort: "TCS",
  location: "Bangalore, India",
  role: "Senior Data Engineer",
  client: "Pittsburgh National Corporation (PNC)",
  period: "May 2022 – Present",
  isCurrent: true,
  summary:
    "Architecting enterprise-scale data pipelines, lakehouse platforms, and AI-integrated workflows for Fortune 500 banking infrastructure.",
  highlights: [
    {
      id: "pipelines",
      title: "High-Performance Data Pipelines",
      metric: "10TB+",
      metricLabel: "Daily Volume",
      description:
        "Architected Apache Spark pipelines processing 10TB+ daily with 99.9% uptime across 50+ downstream business applications.",
      tech: ["Apache Spark", "Python", "SQL"],
    },
    {
      id: "migration",
      title: "CDH → CDP Enterprise Migration",
      metric: "$2M",
      metricLabel: "Annual Savings",
      description:
        "Led zero-downtime migration of 200+ mainframe-ingested tables with relational entity models and full data lineage preservation.",
      tech: ["Cloudera CDP", "Hive", "Sqoop"],
    },
    {
      id: "modeling",
      title: "Structural Data Modeling",
      metric: "60%",
      metricLabel: "Faster Queries",
      description:
        "Translated complex stakeholder requirements into scalable schemas using advanced partitioning and bucketing — 40% storage efficiency gain.",
      tech: ["ERD", "Star Schema", "Delta Lake"],
    },
    {
      id: "quality",
      title: "Data Quality Framework",
      metric: "99.8%",
      metricLabel: "Accuracy",
      description:
        "Built Python and SQL quality frameworks that cut production data defects by 75% across enterprise ingestion layers.",
      tech: ["Python", "SQL", "Metadata"],
    },
    {
      id: "streaming",
      title: "Real-Time Streaming",
      metric: "1M+",
      metricLabel: "Events/Sec",
      description:
        "Designed Kafka and Spark streaming architectures delivering sub-second data availability for financial transaction workflows.",
      tech: ["Apache Kafka", "Spark Streaming"],
    },
    {
      id: "automation",
      title: "Batch Monitoring Automation",
      metric: "200+",
      metricLabel: "Daily Jobs",
      description:
        "Automated enterprise batch monitoring via CA7 scheduling, reducing manual intervention overhead by 80%.",
      tech: ["CA7", "Shell", "Monitoring"],
    },
    {
      id: "performance",
      title: "Platform Optimization",
      metric: "3×",
      metricLabel: "Speed Gain",
      description:
        "Optimized Hive, Impala, and Databricks workloads — tripling data processing execution speeds across the ecosystem.",
      tech: ["Databricks", "Hive", "Impala"],
    },
    {
      id: "leadership",
      title: "Technical Leadership",
      metric: "5",
      metricLabel: "Engineers Mentored",
      description:
        "Led code reviews, architecture guidance, and knowledge sharing — boosting squad productivity by 50%.",
      tech: ["Mentorship", "Architecture", "Delivery"],
    },
  ],
  pipelineStages: [
    { id: "ingest", label: "Ingestion", sub: "Mainframe & APIs" },
    { id: "process", label: "Processing", sub: "Spark & Kafka" },
    { id: "store", label: "Lakehouse", sub: "Delta & Hive" },
    { id: "serve", label: "Delivery", sub: "50+ Applications" },
  ],
} as const;