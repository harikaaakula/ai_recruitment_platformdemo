/**
 * Simplified ATS Job Roles - 20 Cybersecurity Positions
 * Clean, structured, rule-based matching
 */

const jobRoles = [
  {
    id: "1",
    title: "Security Analyst",
    overview: "Monitor and analyze security events, respond to incidents",
    tasks: [
      "Monitor security alerts and logs",
      "Investigate security incidents",
      "Perform vulnerability assessments",
      "Document security findings",
      "Coordinate incident response"
    ],
    knowledge: [
      "Network protocols and architecture",
      "Security information and event management",
      "Threat intelligence and analysis",
      "Incident response procedures",
      "Security frameworks and standards"
    ],
    skills: [
      "SIEM tools",
      "Log analysis",
      "Threat detection",
      "Incident handling",
      "Security monitoring"
    ],
    experienceRange: { min: 0, max: 2 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 },
    thresholdScore: 60,
    testCategory: "cybersecurity_analyst"
  },
  {
    id: "2",
    title: "Penetration Tester",
    overview: "Conduct ethical hacking to identify system vulnerabilities",
    tasks: [
      "Perform penetration testing",
      "Exploit system vulnerabilities",
      "Document security weaknesses",
      "Recommend remediation strategies",
      "Conduct security assessments"
    ],
    knowledge: [
      "Exploitation techniques and tools",
      "Web application security",
      "Network security testing",
      "Operating system internals",
      "Security assessment methodologies"
    ],
    skills: [
      "Penetration testing",
      "Vulnerability exploitation",
      "Security tools usage",
      "Report writing",
      "Ethical hacking"
    ],
    experienceRange: { min: 2, max: 5 },
    weights: { skills: 0.6, knowledge: 0.25, tasks: 0.15 },
    thresholdScore: 65,
    testCategory: "penetration_tester"
  },
  {
    id: "3",
    title: "Security Engineer",
    overview: "Design and implement security solutions and infrastructure",
    tasks: [
      "Design security architectures",
      "Implement security controls",
      "Configure security systems",
      "Automate security processes",
      "Maintain security infrastructure"
    ],
    knowledge: [
      "Security architecture principles",
      "Network security technologies",
      "Cloud security platforms",
      "Security automation tools",
      "Infrastructure hardening"
    ],
    skills: [
      "Security architecture",
      "Firewall configuration",
      "IDS/IPS management",
      "Security automation",
      "System hardening"
    ],
    experienceRange: { min: 3, max: 7 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 },
    thresholdScore: 65,
    testCategory: "security_engineer"
  },
  {
    id: "4",
    title: "SOC Analyst",
    overview: "Operate security operations center, monitor threats",
    tasks: [
      "Monitor security dashboards",
      "Triage security alerts",
      "Analyze threat indicators",
      "Escalate critical incidents",
      "Update security playbooks"
    ],
    knowledge: [
      "Security operations procedures",
      "Threat hunting techniques",
      "SIEM platform operations",
      "Alert triage methodologies",
      "Incident classification"
    ],
    skills: [
      "Security monitoring",
      "Alert analysis",
      "Threat hunting",
      "SIEM operations",
      "Incident triage"
    ],
    experienceRange: { min: 1, max: 3 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 },
    thresholdScore: 60,
    testCategory: "soc_analyst"
  },
  {
    id: "5",
    title: "Vulnerability Analyst",
    overview: "Identify and assess system vulnerabilities",
    tasks: [
      "Conduct vulnerability scans",
      "Analyze scan results",
      "Prioritize vulnerabilities",
      "Track remediation efforts",
      "Generate vulnerability reports"
    ],
    knowledge: [
      "Vulnerability assessment tools",
      "Risk assessment frameworks",
      "Patch management processes",
      "Vulnerability databases",
      "Security compliance standards"
    ],
    skills: [
      "Vulnerability scanning",
      "Risk assessment",
      "Report generation",
      "Tool configuration",
      "Remediation tracking"
    ],
    experienceRange: { min: 1, max: 4 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 },
    thresholdScore: 60,
    testCategory: "cybersecurity_analyst"
  },
  {
    id: "6",
    title: "Incident Responder",
    overview: "Respond to and manage security incidents",
    tasks: [
      "Respond to security incidents",
      "Contain security breaches",
      "Perform forensic analysis",
      "Coordinate response activities",
      "Document incident details"
    ],
    knowledge: [
      "Incident response frameworks",
      "Digital forensics techniques",
      "Malware analysis methods",
      "Evidence preservation",
      "Chain of custody procedures"
    ],
    skills: [
      "Incident response",
      "Forensic analysis",
      "Malware investigation",
      "Evidence collection",
      "Crisis management"
    ],
    experienceRange: { min: 2, max: 5 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 },
    thresholdScore: 65,
    testCategory: "incident_response"
  },
  {
    id: "7",
    title: "Security Architect",
    overview: "Design enterprise security architecture and strategy",
    tasks: [
      "Design security frameworks",
      "Evaluate security technologies",
      "Create security standards",
      "Review system architectures",
      "Provide security guidance"
    ],
    knowledge: [
      "Enterprise security architecture",
      "Security design patterns",
      "Risk management frameworks",
      "Compliance requirements",
      "Technology evaluation methods"
    ],
    skills: [
      "Architecture design",
      "Security strategy",
      "Technology evaluation",
      "Standards development",
      "Risk assessment"
    ],
    experienceRange: { min: 7, max: 12 },
    weights: { skills: 0.4, knowledge: 0.4, tasks: 0.2 },
    thresholdScore: 75,
    testCategory: "security_architect"
  },
  {
    id: "8",
    title: "Cloud Security Engineer",
    overview: "Secure cloud infrastructure and applications",
    tasks: [
      "Secure cloud environments",
      "Configure cloud security",
      "Monitor cloud resources",
      "Implement IAM policies",
      "Audit cloud configurations"
    ],
    knowledge: [
      "Cloud security principles",
      "AWS/Azure/GCP security",
      "Container security",
      "Cloud compliance standards",
      "Identity and access management"
    ],
    skills: [
      "Cloud security",
      "IAM configuration",
      "Container security",
      "Cloud monitoring",
      "DevSecOps"
    ],
    experienceRange: { min: 3, max: 6 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 },
    thresholdScore: 65,
    testCategory: "cloud_security"
  },
  {
    id: "9",
    title: "Threat Intelligence Analyst",
    overview: "Analyze and disseminate threat intelligence",
    tasks: [
      "Collect threat intelligence",
      "Analyze threat data",
      "Produce intelligence reports",
      "Track threat actors",
      "Share threat indicators"
    ],
    knowledge: [
      "Threat intelligence platforms",
      "Threat actor tactics",
      "Intelligence analysis methods",
      "MITRE ATT&CK framework",
      "Indicator of compromise"
    ],
    skills: [
      "Threat analysis",
      "Intelligence gathering",
      "Report writing",
      "Data correlation",
      "Threat tracking"
    ],
    experienceRange: { min: 2, max: 5 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 },
    thresholdScore: 60,
    testCategory: "cybersecurity_analyst"
  },
  {
    id: "10",
    title: "Security Compliance Analyst",
    overview: "Ensure security compliance with regulations",
    tasks: [
      "Conduct compliance audits",
      "Review security policies",
      "Track compliance metrics",
      "Prepare audit reports",
      "Coordinate compliance activities"
    ],
    knowledge: [
      "Regulatory requirements",
      "Compliance frameworks",
      "Audit methodologies",
      "Policy development",
      "Risk assessment"
    ],
    skills: [
      "Compliance auditing",
      "Policy review",
      "Documentation",
      "Risk assessment",
      "Audit reporting"
    ],
    experienceRange: { min: 2, max: 5 },
    weights: { skills: 0.4, knowledge: 0.4, tasks: 0.2 },
    thresholdScore: 65,
    testCategory: "security_manager"
  },
  {
    id: "11",
    title: "Application Security Engineer",
    overview: "Secure software applications and development",
    tasks: [
      "Review application code",
      "Perform security testing",
      "Identify code vulnerabilities",
      "Implement security controls",
      "Train developers"
    ],
    knowledge: [
      "Secure coding practices",
      "Application security testing",
      "OWASP Top 10",
      "Code review techniques",
      "Software development lifecycle"
    ],
    skills: [
      "Code review",
      "Security testing",
      "Vulnerability assessment",
      "Secure development",
      "Tool integration"
    ],
    experienceRange: { min: 3, max: 6 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 },
    thresholdScore: 65,
    testCategory: "soc_analyst"
  },
  {
    id: "12",
    title: "Network Security Engineer",
    overview: "Secure network infrastructure and communications",
    tasks: [
      "Configure network security",
      "Monitor network traffic",
      "Implement firewall rules",
      "Manage VPN systems",
      "Troubleshoot security issues"
    ],
    knowledge: [
      "Network protocols",
      "Firewall technologies",
      "VPN architectures",
      "Network segmentation",
      "Intrusion detection systems"
    ],
    skills: [
      "Firewall management",
      "Network monitoring",
      "VPN configuration",
      "Traffic analysis",
      "Security troubleshooting"
    ],
    experienceRange: { min: 3, max: 6 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 },
    thresholdScore: 65,
    testCategory: "security_engineer"
  },
  {
    id: "13",
    title: "Malware Analyst",
    overview: "Analyze and reverse engineer malicious software",
    tasks: [
      "Analyze malware samples",
      "Reverse engineer code",
      "Document malware behavior",
      "Create detection signatures",
      "Report findings"
    ],
    knowledge: [
      "Malware analysis techniques",
      "Reverse engineering tools",
      "Assembly language",
      "Operating system internals",
      "Malware families"
    ],
    skills: [
      "Malware analysis",
      "Reverse engineering",
      "Debugging",
      "Signature creation",
      "Technical writing"
    ],
    experienceRange: { min: 3, max: 7 },
    weights: { skills: 0.6, knowledge: 0.25, tasks: 0.15 }
  },
  {
    id: "14",
    title: "Security Operations Manager",
    overview: "Manage security operations team and processes",
    tasks: [
      "Manage security team",
      "Oversee security operations",
      "Develop security procedures",
      "Coordinate incident response",
      "Report to management"
    ],
    knowledge: [
      "Security operations management",
      "Team leadership",
      "Process improvement",
      "Metrics and reporting",
      "Budget management"
    ],
    skills: [
      "Team management",
      "Process development",
      "Incident coordination",
      "Reporting",
      "Strategic planning"
    ],
    experienceRange: { min: 5, max: 10 },
    weights: { skills: 0.4, knowledge: 0.3, tasks: 0.3 }
  },
  {
    id: "15",
    title: "Identity and Access Management Specialist",
    overview: "Manage user identities and access controls",
    tasks: [
      "Manage user identities",
      "Configure access controls",
      "Implement authentication",
      "Review access rights",
      "Audit user permissions"
    ],
    knowledge: [
      "Identity management systems",
      "Access control models",
      "Authentication protocols",
      "Directory services",
      "Privileged access management"
    ],
    skills: [
      "IAM administration",
      "Access control",
      "Authentication setup",
      "User provisioning",
      "Access auditing"
    ],
    experienceRange: { min: 2, max: 5 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 }
  },
  {
    id: "16",
    title: "Security Automation Engineer",
    overview: "Automate security processes and workflows",
    tasks: [
      "Develop security automation",
      "Create security scripts",
      "Integrate security tools",
      "Build security workflows",
      "Maintain automation systems"
    ],
    knowledge: [
      "Scripting languages",
      "API integration",
      "Security orchestration",
      "Workflow automation",
      "DevSecOps practices"
    ],
    skills: [
      "Python scripting",
      "API integration",
      "Tool automation",
      "Workflow design",
      "CI/CD security"
    ],
    experienceRange: { min: 3, max: 6 },
    weights: { skills: 0.6, knowledge: 0.25, tasks: 0.15 }
  },
  {
    id: "17",
    title: "Cryptography Specialist",
    overview: "Implement and manage cryptographic systems",
    tasks: [
      "Implement encryption systems",
      "Manage cryptographic keys",
      "Design secure protocols",
      "Evaluate crypto algorithms",
      "Ensure data protection"
    ],
    knowledge: [
      "Cryptographic algorithms",
      "Key management",
      "Public key infrastructure",
      "Encryption protocols",
      "Cryptanalysis"
    ],
    skills: [
      "Encryption implementation",
      "Key management",
      "PKI administration",
      "Protocol design",
      "Security analysis"
    ],
    experienceRange: { min: 4, max: 8 },
    weights: { skills: 0.5, knowledge: 0.4, tasks: 0.1 }
  },
  {
    id: "18",
    title: "Security Awareness Trainer",
    overview: "Educate employees on security best practices",
    tasks: [
      "Develop training materials",
      "Conduct security training",
      "Create awareness campaigns",
      "Measure training effectiveness",
      "Update training content"
    ],
    knowledge: [
      "Adult learning principles",
      "Security awareness topics",
      "Training methodologies",
      "Phishing simulation",
      "Behavior change techniques"
    ],
    skills: [
      "Training delivery",
      "Content creation",
      "Presentation skills",
      "Campaign management",
      "Metrics tracking"
    ],
    experienceRange: { min: 2, max: 5 },
    weights: { skills: 0.4, knowledge: 0.3, tasks: 0.3 }
  },
  {
    id: "19",
    title: "Security Risk Analyst",
    overview: "Assess and manage security risks",
    tasks: [
      "Conduct risk assessments",
      "Identify security risks",
      "Calculate risk scores",
      "Recommend mitigations",
      "Track risk remediation"
    ],
    knowledge: [
      "Risk assessment frameworks",
      "Threat modeling",
      "Risk quantification",
      "Control effectiveness",
      "Business impact analysis"
    ],
    skills: [
      "Risk assessment",
      "Threat analysis",
      "Risk scoring",
      "Mitigation planning",
      "Risk reporting"
    ],
    experienceRange: { min: 3, max: 6 },
    weights: { skills: 0.4, knowledge: 0.4, tasks: 0.2 }
  },
  {
    id: "20",
    title: "Digital Forensics Investigator",
    overview: "Investigate security incidents and collect evidence",
    tasks: [
      "Collect digital evidence",
      "Analyze forensic data",
      "Preserve evidence integrity",
      "Document investigation",
      "Testify in proceedings"
    ],
    knowledge: [
      "Forensic methodologies",
      "Evidence handling",
      "File system analysis",
      "Memory forensics",
      "Legal procedures"
    ],
    skills: [
      "Evidence collection",
      "Forensic analysis",
      "Tool proficiency",
      "Documentation",
      "Chain of custody"
    ],
    experienceRange: { min: 3, max: 7 },
    weights: { skills: 0.5, knowledge: 0.3, tasks: 0.2 }
  }
];

module.exports = jobRoles;
