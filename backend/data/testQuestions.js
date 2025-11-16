// Hardcoded test questions for different job roles
const testQuestions = {
  // Cybersecurity Questions - General
  'cybersecurity_analyst': [
    {
            id: 1,
            // TKS: T1020 – Determine operational and safety impacts
            question: "A web server has outdated SSL/TLS protocols. What is the first step to assess operational and safety impacts?",
            options: ["Disconnect the server immediately", "Evaluate affected assets, potential threat vectors, and business impact", "Notify the CEO without analysis", "Replace the SSL certificate without assessment"],
            correct: 1,
            points: 20,
            validatesSkills: ["SIEM tools", "Vulnerability Assessment", "SSL/TLS", "Security Analysis"]
        },
        {
            id: 2,
            // TKS: T1619 – Perform risk and vulnerability assessments
            question: "During an audit, you find multiple systems missing critical patches. How should remediation be prioritized?",
            options: ["Random order", "Based on exposure level, criticality, and business impact", "Oldest systems first", "Wait for vendor guidance"],
            correct: 1,
            points: 20,
            validatesSkills: ["log analysis", "Risk Assessment", "Vulnerability Management", "Security Auditing"]
        },
        {
            id: 3,
            // TKS: T1118 – Identify vulnerabilities; K0956 – Penetration testing tools
            question: "Which tool would you use to perform authenticated vulnerability scans on enterprise systems?",
            options: ["Microsoft Word", "Nessus or OpenVAS", "Excel", "Photoshop"],
            correct: 1,
            points: 20,
            validatesSkills: ["threat detection", "Nessus", "OpenVAS", "Security Tools"]
        },
        {
            id: 4,
            // TKS: T1279 - Prepare audit reports; S0483 - Identifying vulnerabilities
            question: "What is the most critical element to include in a final vulnerability assessment report?",
            options: ["Only the tool output screenshots", "An executive summary with findings, risk ratings, and recommended remediation strategies", "A list of all scanned IP addresses", "The names of all people involved in the scan"],
            correct: 1,
            points: 20,
            validatesSkills: ["Security monitoring", "Risk Assessment", "Vulnerability Assessment", "Documentation"]
        },
  ],

  // Penetration Testing Specific
  'penetration_tester': [
    {
      id: 1,
      question: "Which tool is commonly used for network discovery and port scanning?",
      options: ["Wireshark", "Nmap", "Burp Suite", "Metasploit"],
      correct: 1,
      points: 10,
      validatesSkills: ["Nmap", "Port Scanning", "Network Discovery", "Penetration Testing"]
    },
    {
      id: 2,
      question: "What does OWASP stand for?",
      options: [
        "Open Web Application Security Project",
        "Organized Web Attack Security Protocol",
        "Online Web Application Security Platform",
        "Open Wireless Application Security Project"
      ],
      correct: 0,
      points: 15,
      validatesSkills: ["OWASP", "Web Application Security", "Security Standards"]
    },
    {
      id: 3,
      question: "In SQL injection attacks, which character is commonly used to comment out the rest of a SQL query?",
      options: ["#", "--", "/*", "All of the above"],
      correct: 3,
      points: 15,
      validatesSkills: ["SQL Injection", "Web Application Security", "Penetration Testing"]
    },
    {
      id: 4,
      question: "What is a reverse shell in penetration testing?",
      options: [
        "A shell that runs backwards",
        "A connection where the target system connects back to the attacker",
        "A shell with reversed permissions",
        "A backup shell for redundancy"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Reverse Shell", "Exploitation", "Penetration Testing", "Post-Exploitation"]
    },
    {
      id: 5,
      question: "Which Metasploit command is used to search for available exploits?",
      options: ["find", "search", "locate", "grep"],
      correct: 1,
      points: 10,
      validatesSkills: ["Metasploit", "Exploitation", "Penetration Testing Tools"]
    },
    {
      id: 6,
      question: "What is the purpose of payload encoding in penetration testing?",
      options: [
        "To make payloads run faster",
        "To compress payloads",
        "To evade antivirus detection",
        "To encrypt network traffic"
      ],
      correct: 2,
      points: 20,
      validatesSkills: ["Payload Encoding", "Evasion Techniques", "Antivirus Bypass", "Penetration Testing"]
    }
  ],

  // SOC Analyst Specific
  'soc_analyst': [
    {
      id: 1,
      question: "What is the first step in the incident response process according to NIST?",
      options: ["Containment", "Preparation", "Detection and Analysis", "Recovery"],
      correct: 1,
      points: 15,
      validatesSkills: ["Incident Response", "NIST Framework", "Security Operations"]
    },
    {
      id: 2,
      question: "Which log source is most valuable for detecting lateral movement in a network?",
      options: ["Web server logs", "Windows Event Logs", "Firewall logs", "DNS logs"],
      correct: 1,
      points: 15,
      validatesSkills: ["Log Analysis", "Lateral Movement Detection", "Windows Security", "Threat Detection"]
    },
    {
      id: 3,
      question: "What does IOC stand for in cybersecurity?",
      options: [
        "Internet Operations Center",
        "Indicator of Compromise",
        "Internal Operations Command",
        "Information Operations Control"
      ],
      correct: 1,
      points: 10,
      validatesSkills: ["Threat Intelligence", "IOC", "Security Monitoring"]
    },
    {
      id: 4,
      question: "Which Windows Event ID typically indicates a successful logon?",
      options: ["4624", "4625", "4648", "4720"],
      correct: 0,
      points: 15,
      validatesSkills: ["Windows Event Logs", "Log Analysis", "Security Monitoring", "SIEM"]
    },
    {
      id: 5,
      question: "What is threat hunting in cybersecurity?",
      options: [
        "Waiting for alerts to trigger",
        "Proactively searching for threats that evaded security controls",
        "Installing new security tools",
        "Updating antivirus signatures"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Threat Hunting", "Proactive Security", "Threat Detection", "Security Operations"]
    },
    {
      id: 6,
      question: "Which MITRE framework is used to categorize adversary tactics and techniques?",
      options: ["MITRE CVE", "MITRE ATT&CK", "MITRE CWE", "MITRE CAPEC"],
      correct: 1,
      points: 15,
      validatesSkills: ["MITRE ATT&CK", "Threat Intelligence", "Security Frameworks"]
    }
  ],

  // Security Engineer Specific
  'security_engineer': [
    {
      id: 1,
      question: "What is the principle of least privilege?",
      options: [
        "Users should have maximum access for convenience",
        "Users should have only the minimum access necessary to perform their job",
        "All users should have the same level of access",
        "Privileges should be assigned randomly"
      ],
      correct: 1,
      points: 15,
      validatesSkills: ["Access Control", "Security Principles", "IAM", "Security Architecture"]
    },
    {
      id: 2,
      question: "Which AWS service provides centralized logging for security analysis?",
      options: ["CloudWatch", "CloudTrail", "Config", "GuardDuty"],
      correct: 1,
      points: 15,
      validatesSkills: ["AWS", "CloudTrail", "Cloud Security", "Logging"]
    },
    {
      id: 3,
      question: "What is the purpose of network segmentation in security architecture?",
      options: [
        "To increase network speed",
        "To reduce network costs",
        "To limit the spread of attacks and control access",
        "To simplify network management"
      ],
      correct: 2,
      points: 20,
      validatesSkills: ["Network Segmentation", "Security Architecture", "Network Security"]
    },
    {
      id: 4,
      question: "In DevSecOps, when should security testing be performed?",
      options: [
        "Only at the end of development",
        "Only during production",
        "Throughout the entire development lifecycle",
        "Only during planning phase"
      ],
      correct: 2,
      points: 15,
      validatesSkills: ["DevSecOps", "Security Testing", "SDLC", "CI/CD"]
    },
    {
      id: 5,
      question: "What is a WAF in cybersecurity?",
      options: [
        "Wide Area Firewall",
        "Web Application Firewall",
        "Wireless Access Filter",
        "Windows Authentication Framework"
      ],
      correct: 1,
      points: 10,
      validatesSkills: ["WAF", "Web Application Security", "Firewall"]
    },
    {
      id: 6,
      question: "Which encryption algorithm is considered quantum-resistant?",
      options: ["RSA", "AES", "Lattice-based cryptography", "MD5"],
      correct: 2,
      points: 20,
      validatesSkills: ["Cryptography", "Encryption", "Quantum Computing", "Security Engineering"]
    }
  ],

  // Cloud Security Specialist
  'cloud_security': [

    {
      id: 1,
      question: "What is the shared responsibility model in cloud security?",
      options: [
        "Cloud provider is responsible for everything",
        "Customer is responsible for everything",
        "Responsibilities are shared between cloud provider and customer",
        "No one is responsible for security"
      ],
      correct: 2,
      points: 15,
      validatesSkills: ["Cloud"]
    },
    {
      id: 2,
      question: "Which AWS service helps detect malicious activity and unauthorized behavior?",
      options: ["CloudWatch", "CloudTrail", "GuardDuty", "Config"],
      correct: 2,
      points: 15,
      validatesSkills: ["AWS"]
    },
    {
      id: 3,
      question: "What does CASB stand for in cloud security?",
      options: [
        "Cloud Application Security Broker",
        "Cloud Access Security Bridge",
        "Cloud Authentication Security Base",
        "Cloud Analysis Security Board"
      ],
      correct: 0,
      points: 15,
      validatesSkills: ["Cloud"]
    },
    {
      id: 4,
      question: "Which principle should be followed when configuring cloud storage buckets?",
      options: [
        "Make all buckets public by default",
        "Use default security settings",
        "Apply principle of least privilege and encrypt data",
        "Disable all logging"
      ],
      correct: 2,
      points: 20,
      validatesSkills: ["Cloud"]
    },
    {
      id: 5,
      question: "What is container security scanning?",
      options: [
        "Scanning for physical containers",
        "Analyzing container images for vulnerabilities and misconfigurations",
        "Scanning network containers",
        "Checking container shipping schedules"
      ],
      correct: 1,
      points: 15,
      validatesSkills: ["Cloud Security","AWS","Cloud Architecture"]
    },
    {
      id: 6,
      question: "In Kubernetes security, what is a Pod Security Policy?",
      options: [
        "A policy for pod networking",
        "A policy that controls security-sensitive aspects of pod specification",
        "A policy for pod storage",
        "A policy for pod scheduling"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Cloud Security","AWS","Cloud Architecture"]
    }
  
  ],
// Information Security Manager
  'security_manager': [

    {
      id: 1,
      question: "What is the primary purpose of a risk assessment in information security?",
      options: [
        "To eliminate all risks",
        "To identify, analyze, and evaluate risks to make informed decisions",
        "To increase security budget",
        "To comply with regulations only"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Risk"]
    },
    {
      id: 2,
      question: "Which framework provides guidelines for information security management systems?",
      options: ["NIST", "ISO 27001", "COBIT", "ITIL"],
      correct: 1,
      points: 15,
      validatesSkills: ["Management"]
    },
    {
      id: 3,
      question: "What does GRC stand for in cybersecurity?",
      options: [
        "General Risk Control",
        "Governance, Risk, and Compliance",
        "Global Risk Committee",
        "Government Regulatory Compliance"
      ],
      correct: 1,
      points: 15,
      validatesSkills: ["Risk Management","Compliance","Security Governance"]
    },
    {
      id: 4,
      question: "In business continuity planning, what is RTO?",
      options: [
        "Risk Transfer Option",
        "Recovery Time Objective",
        "Regulatory Compliance Target",
        "Risk Treatment Outcome"
      ],
      correct: 1,
      points: 15,
      validatesSkills: ["Risk Management","Compliance","Security Governance"]
    },
    {
      id: 5,
      question: "What is the purpose of security awareness training?",
      options: [
        "To teach employees technical skills",
        "To educate employees about security threats and best practices",
        "To increase IT budget",
        "To replace security controls"
      ],
      correct: 1,
      points: 15,
      validatesSkills: ["Risk Management","Compliance","Security Governance"]
    },
    {
      id: 6,
      question: "Which metric is most important for measuring security program effectiveness?",
      options: [
        "Number of security tools deployed",
        "Security budget spent",
        "Reduction in security incidents and impact",
        "Number of security policies created"
      ],
      correct: 2,
      points: 20,
      validatesSkills: ["Risk Management","Compliance","Security Governance"]
    }
  
  ],
// Incident Response Specialist
  'incident_response': [

    {
      id: 1,
      question: "What is the correct order of the NIST incident response lifecycle?",
      options: [
        "Detection → Preparation → Containment → Recovery",
        "Preparation → Detection and Analysis → Containment → Post-Incident Activity",
        "Containment → Detection → Analysis → Recovery",
        "Analysis → Preparation → Containment → Detection"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Incident","Response"]
    },
    {
      id: 2,
      question: "What is the primary goal during the containment phase of incident response?",
      options: [
        "To identify the root cause",
        "To prevent the incident from spreading and causing further damage",
        "To restore normal operations",
        "To collect evidence for prosecution"
      ],
      correct: 1,
      points: 15,
      validatesSkills: ["Incident","Response","Containment"]
    },
    {
      id: 3,
      question: "Which tool is commonly used for memory analysis in digital forensics?",
      options: ["Wireshark", "Volatility", "Nmap", "Burp Suite"],
      correct: 1,
      points: 15,
      validatesSkills: ["Forensics","Analysis"]
    },
    {
      id: 4,
      question: "What is chain of custody in digital forensics?",
      options: [
        "A method of data encryption",
        "Documentation that tracks evidence handling from collection to court",
        "A network security protocol",
        "A type of malware analysis"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Forensics"]
    },
    {
      id: 5,
      question: "What does TTPs stand for in threat intelligence?",
      options: [
        "Tools, Techniques, and Procedures",
        "Threats, Targets, and Protocols",
        "Time, Technology, and People",
        "Tactics, Techniques, and Procedures"
      ],
      correct: 3,
      points: 15,
      validatesSkills: ["Incident Response","Digital Forensics","Malware Analysis"]
    },
    {
      id: 6,
      question: "Which Windows artifact is most useful for timeline analysis?",
      options: ["Registry", "Event logs", "Prefetch files", "All of the above"],
      correct: 3,
      points: 15,
      validatesSkills: ["Analysis"]
    }
  
  ],
// Security Architect
  'security_architect': [

    {
      id: 1,
      question: "What is defense in depth in security architecture?",
      options: [
        "Using only one strong security control",
        "Implementing multiple layers of security controls",
        "Focusing only on perimeter security",
        "Using only technical controls"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Architecture","Defense"]
    },
    {
      id: 2,
      question: "Which security architecture framework focuses on enterprise architecture?",
      options: ["NIST", "SABSA", "TOGAF", "COBIT"],
      correct: 1,
      points: 15,
      validatesSkills: ["Architecture","Framework","Enterprise"]
    },
    {
      id: 3,
      question: "What is zero trust architecture?",
      options: [
        "Trusting no one in the organization",
        "A security model that requires verification for every user and device",
        "Removing all security controls",
        "Trusting only internal networks"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Architecture","Zero Trust"]
    },
    {
      id: 4,
      question: "In threat modeling, what does STRIDE represent?",
      options: [
        "A penetration testing methodology",
        "A classification of security threats",
        "A network protocol",
        "A compliance framework"
      ],
      correct: 1,
      points: 15,
      validatesSkills: ["Security Architecture","Enterprise Security","Security Design"]
    },
    {
      id: 5,
      question: "What is the purpose of security patterns in architecture?",
      options: [
        "To create decorative security designs",
        "To provide reusable solutions to common security problems",
        "To slow down system performance",
        "To increase system complexity"
      ],
      correct: 1,
      points: 15,
      validatesSkills: ["Architecture"]
    },
    {
      id: 6,
      question: "Which principle ensures that security controls fail in a secure state?",
      options: ["Fail-open", "Fail-safe", "Fail-fast", "Fail-over"],
      correct: 1,
      points: 15,
      validatesSkills: ["Security Architecture","Enterprise Security","Security Design"]
    }
  
  ],
'software developer': [
    {
      id: 1,
      question: "What is the time complexity of binary search?",
      options: ["O(n)", "O(log n)", "O(n²)", "O(1)"],
      correct: 1,
      points: 10
    },
    {
      id: 2,
      question: "Which of the following is NOT a JavaScript data type?",
      options: ["String", "Boolean", "Float", "Object"],
      correct: 2,
      points: 10
    },
    {
      id: 3,
      question: "What does REST stand for in web services?",
      options: [
        "Representational State Transfer",
        "Remote State Transfer", 
        "Relational State Transfer",
        "Resource State Transfer"
      ],
      correct: 0,
      points: 15
    },
    {
      id: 4,
      question: "In React, what is the purpose of useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects",
        "To create components",
        "To style components"
      ],
      correct: 1,
      points: 15
    },
    {
      id: 5,
      question: "What is the difference between '==' and '===' in JavaScript?",
      options: [
        "No difference",
        "=== checks type and value, == only checks value",
        "== checks type and value, === only checks value", 
        "=== is faster than =="
      ],
      correct: 1,
      points: 20
    }
  ],
  
  'data scientist': [
    {
      id: 1,
      question: "What is overfitting in machine learning?",
      options: [
        "Model performs well on training data but poorly on test data",
        "Model performs poorly on both training and test data",
        "Model performs well on test data but poorly on training data",
        "Model has too few parameters"
      ],
      correct: 0,
      points: 15
    },
    {
      id: 2,
      question: "Which Python library is primarily used for data manipulation?",
      options: ["NumPy", "Pandas", "Matplotlib", "Scikit-learn"],
      correct: 1,
      points: 10
    },
    {
      id: 3,
      question: "What does SQL stand for?",
      options: [
        "Structured Query Language",
        "Simple Query Language",
        "Standard Query Language",
        "Sequential Query Language"
      ],
      correct: 0,
      points: 10
    },
    {
      id: 4,
      question: "In statistics, what does p-value represent?",
      options: [
        "Probability of the hypothesis being true",
        "Probability of observing the data given null hypothesis is true",
        "Percentage of variance explained",
        "Power of the test"
      ],
      correct: 1,
      points: 20
    },
    {
      id: 5,
      question: "Which algorithm is best for classification with small datasets?",
      options: ["Deep Neural Networks", "Random Forest", "SVM", "Linear Regression"],
      correct: 2,
      points: 15
    }
  ],

  'marketing manager': [
    {
      id: 1,
      question: "What does CTR stand for in digital marketing?",
      options: ["Click Through Rate", "Cost To Revenue", "Customer Target Reach", "Conversion Track Rate"],
      correct: 0,
      points: 10
    },
    {
      id: 2,
      question: "Which metric is most important for measuring brand awareness?",
      options: ["Conversion Rate", "Reach and Impressions", "Cost Per Click", "Return on Investment"],
      correct: 1,
      points: 15
    },
    {
      id: 3,
      question: "What is A/B testing used for?",
      options: [
        "Testing two different versions to see which performs better",
        "Testing website load times",
        "Testing database performance",
        "Testing user authentication"
      ],
      correct: 0,
      points: 15
    },
    {
      id: 4,
      question: "What does ROAS stand for?",
      options: [
        "Return on Advertising Spend",
        "Rate of Active Sales",
        "Revenue on Ad Sales",
        "Reach of Advertising Strategy"
      ],
      correct: 0,
      points: 20
    },
    {
      id: 5,
      question: "Which social media platform is best for B2B marketing?",
      options: ["Instagram", "TikTok", "LinkedIn", "Snapchat"],
      correct: 2,
      points: 10
    }
  ]
};

const getTestForJobTitle = (jobTitle) => {
  const normalizedTitle = jobTitle.toLowerCase().replace(/\s+/g, '_');
  
  console.log('🔍 Looking for test for job title:', jobTitle);
  console.log('📝 Normalized title:', normalizedTitle);
  
  // Direct mapping for exact matches
  const directMappings = {
    'security_analyst': 'cybersecurity_analyst',
    'cybersecurity_analyst': 'cybersecurity_analyst',
    'penetration_tester': 'penetration_tester',
    'security_engineer': 'security_engineer',
    'soc_analyst': 'soc_analyst',
    'vulnerability_analyst': 'cybersecurity_analyst',
    'incident_responder': 'incident_response',
    'incident_response': 'incident_response',
    'security_architect': 'security_architect',
    'cloud_security_engineer': 'cloud_security',
    'cloud_security': 'cloud_security',
    'threat_intelligence_analyst': 'cybersecurity_analyst',
    'security_compliance_analyst': 'security_manager',
    'application_security_engineer': 'soc_analyst',
    'network_security_engineer': 'security_engineer',
    'malware_analyst': 'soc_analyst',
    'security_operations_manager': 'security_manager',
    'identity_and_access_management_specialist': 'soc_analyst',
    'security_automation_engineer': 'soc_analyst',
    'cryptography_specialist': 'soc_analyst',
    'security_awareness_trainer': 'soc_analyst',
    'security_risk_analyst': 'security_manager',
    'digital_forensics_investigator': 'incident_response'
  };
  
  // Try direct mapping first
  if (directMappings[normalizedTitle]) {
    const testCategory = directMappings[normalizedTitle];
    console.log('✅ Found direct mapping:', testCategory);
    if (testQuestions[testCategory]) {
      return testQuestions[testCategory];
    }
  }
  
  // Fallback: check if test category exists directly
  if (testQuestions[normalizedTitle]) {
    console.log('✅ Found test category directly:', normalizedTitle);
    return testQuestions[normalizedTitle];
  }
  
  // Default fallback
  console.log('⚠️  No specific test found, using cybersecurity_analyst');
  return testQuestions['cybersecurity_analyst'] || testQuestions['soc_analyst'] || [];
};

module.exports = { testQuestions, getTestForJobTitle };