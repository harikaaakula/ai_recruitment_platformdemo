// BATCH 1: Roles 3-7
// This will be merged into testQuestions.js after review

const batch1 = {
  
  // ============================================================================
  // ROLE 3: Defensive Cybersecurity Analyst (Experience: 1-3 years, Entry-Mid)
  // testCategory: "defensive_cybersecurity"
  // ============================================================================
  'defensive_cybersecurity': [
    
    // Skill: Network defense (Question 1)
    {
      id: 1,
      question: "What is the primary purpose of network segmentation in defensive cybersecurity?",
      options: [
        "To increase network speed",
        "To limit lateral movement and contain potential breaches",
        "To reduce hardware costs",
        "To simplify network management"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Network defense"]
    },
    
    // Skill: Network defense (Question 2)
    {
      id: 2,
      question: "Which defensive measure helps prevent unauthorized access to network resources?",
      options: [
        "Disabling all firewalls",
        "Implementing network access control (NAC) and authentication",
        "Allowing all traffic by default",
        "Removing all security policies"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Network defense"]
    },
    
    // Skill: Threat detection (Question 1)
    {
      id: 3,
      question: "What is the difference between signature-based and anomaly-based threat detection?",
      options: [
        "Signature-based detects known threats; anomaly-based detects deviations from normal behavior",
        "They are the same thing",
        "Signature-based is always better",
        "Anomaly-based only works on weekends"
      ],
      correct: 0,
      points: 20,
      validatesSkills: ["Threat detection"]
    },
    
    // Skill: Threat detection (Question 2)
    {
      id: 4,
      question: "Which tool is primarily used for real-time threat detection on a network?",
      options: [
        "Microsoft Word",
        "Intrusion Detection System (IDS) or Intrusion Prevention System (IPS)",
        "Adobe Reader",
        "Web browser"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Threat detection"]
    },
    
    // Skill: Traffic analysis (Question 1)
    {
      id: 5,
      question: "When analyzing network traffic, what does unusually high outbound traffic during off-hours typically indicate?",
      options: [
        "Normal system updates",
        "Potential data exfiltration or compromised system",
        "Improved network performance",
        "Reduced security risk"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Traffic analysis"]
    },
    
    // Skill: Traffic analysis (Question 2)
    {
      id: 6,
      question: "What protocol analysis technique helps identify malicious traffic patterns?",
      options: [
        "Ignoring all traffic",
        "Deep packet inspection and flow analysis",
        "Blocking all ports",
        "Disabling monitoring"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Traffic analysis"]
    },
    
    // Skill: Log analysis (Question 1)
    {
      id: 7,
      question: "What is the primary benefit of centralized log management in defensive operations?",
      options: [
        "It uses more storage space",
        "It enables correlation of events across multiple systems for better threat detection",
        "It slows down systems",
        "It increases costs only"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Log analysis"]
    },
    
    // Skill: Log analysis (Question 2)
    {
      id: 8,
      question: "When reviewing firewall logs, what pattern suggests a port scanning attempt?",
      options: [
        "Single connection to one port",
        "Multiple connection attempts to sequential ports from the same source IP",
        "Normal web browsing traffic",
        "Successful authenticated sessions"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Log analysis"]
    },
    
    // Skill: Vulnerability identification (Question 1)
    {
      id: 9,
      question: "What is a zero-day vulnerability?",
      options: [
        "A vulnerability that takes zero days to fix",
        "A vulnerability that is unknown to the vendor and has no available patch",
        "A vulnerability found on day zero of a project",
        "A vulnerability that causes zero damage"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Vulnerability identification"]
    },
    
    // Skill: Vulnerability identification (Question 2)
    {
      id: 10,
      question: "Which tool is commonly used for automated vulnerability scanning?",
      options: [
        "Nessus, OpenVAS, or Qualys",
        "Microsoft Excel",
        "Google Chrome",
        "Notepad"
      ],
      correct: 0,
      points: 20,
      validatesSkills: ["Vulnerability identification"]
    },
    
    // Skill: Security monitoring (Question 1)
    {
      id: 11,
      question: "What is the primary function of a Security Operations Center (SOC)?",
      options: [
        "Software development",
        "Continuous monitoring, detection, and response to security incidents",
        "Hardware repair",
        "Employee training only"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Security monitoring"]
    },
    
    // Skill: Security monitoring (Question 2)
    {
      id: 12,
      question: "Which metric is most important for measuring SOC effectiveness?",
      options: [
        "Number of coffee breaks",
        "Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR)",
        "Office size",
        "Number of monitors"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Security monitoring"]
    },
    
    // Skill: Anomaly detection (Question 1)
    {
      id: 13,
      question: "What is a baseline in the context of anomaly detection?",
      options: [
        "The lowest security level",
        "A profile of normal system or network behavior used to identify deviations",
        "A type of malware",
        "A firewall rule"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Anomaly detection"]
    },
    
    // Skill: Anomaly detection (Question 2)
    {
      id: 14,
      question: "Which behavior would be considered anomalous for a typical user account?",
      options: [
        "Logging in during normal business hours",
        "Accessing files from multiple countries within minutes",
        "Using approved applications",
        "Following security policies"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Anomaly detection"]
    },
    
    // Skill: Security tool evaluation (Question 1)
    {
      id: 15,
      question: "When evaluating a new security tool, what should be the primary consideration?",
      options: [
        "The color of the user interface",
        "How well it addresses specific security gaps and integrates with existing infrastructure",
        "The vendor's marketing materials",
        "The number of features regardless of need"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Security tool evaluation"]
    },
    
    // Skill: Security tool evaluation (Question 2)
    {
      id: 16,
      question: "What is a proof of concept (POC) in security tool evaluation?",
      options: [
        "A marketing document",
        "A trial deployment to test the tool's effectiveness in the actual environment",
        "A type of malware",
        "A security policy"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Security tool evaluation"]
    }
  ],
  
  // ============================================================================
  // ROLE 4: Digital Forensics Investigator (Experience: 3-7 years, Mid-Senior)
  // testCategory: "digital_forensics"
  // ============================================================================
  'digital_forensics': [
    
    // Skill: Digital Evidence Handling (Question 1)
    {
      id: 1,
      question: "What is the most critical principle when handling digital evidence?",
      options: [
        "Speed of analysis",
        "Maintaining integrity and chain of custody",
        "Using the newest tools",
        "Sharing evidence publicly"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Digital Evidence Handling"]
    },
    
    // Skill: Digital Evidence Handling (Question 2)
    {
      id: 2,
      question: "What is a write blocker used for in digital forensics?",
      options: [
        "To prevent writing data to evidence media during acquisition",
        "To block network traffic",
        "To encrypt files",
        "To delete malware"
      ],
      correct: 0,
      points: 20,
      validatesSkills: ["Digital Evidence Handling"]
    },
    
    // Skill: Evidence Collection (Question 1)
    {
      id: 3,
      question: "What is the correct order of volatility for evidence collection?",
      options: [
        "Hard disk, RAM, network traffic, logs",
        "RAM, network connections, running processes, hard disk",
        "Logs, hard disk, RAM, network",
        "All at the same time"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Evidence Collection"]
    },
    
    // Skill: Evidence Collection (Question 2)
    {
      id: 4,
      question: "Why is it important to document every step during evidence collection?",
      options: [
        "To fill time",
        "To maintain chain of custody and ensure evidence admissibility in court",
        "To create more paperwork",
        "It's not important"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Evidence Collection"]
    },
    
    // Skill: Evidence Processing (Question 1)
    {
      id: 5,
      question: "What is the purpose of creating a hash value (MD5/SHA256) of evidence?",
      options: [
        "To compress the file",
        "To verify integrity and prove the evidence hasn't been altered",
        "To encrypt the evidence",
        "To delete the evidence"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Evidence Processing"]
    },
    
    // Skill: Evidence Processing (Question 2)
    {
      id: 6,
      question: "What is the difference between a logical copy and a forensic image?",
      options: [
        "They are the same",
        "Logical copy gets files; forensic image captures entire disk including deleted data and slack space",
        "Logical copy is always better",
        "Forensic image is faster"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Evidence Processing"]
    },
    
    // Skill: Memory Forensics (Question 1)
    {
      id: 7,
      question: "What type of evidence can be found in RAM that might not be on disk?",
      options: [
        "Only saved documents",
        "Running processes, encryption keys, network connections, and malware in memory",
        "Nothing useful",
        "Only system files"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Memory Forensics"]
    },
    
    // Skill: Memory Forensics (Question 2)
    {
      id: 8,
      question: "Which tool is commonly used for memory forensics analysis?",
      options: [
        "Microsoft Word",
        "Volatility Framework",
        "Adobe Photoshop",
        "Web browser"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Memory Forensics"]
    },
    
    // Skill: File System Forensics (Question 1)
    {
      id: 9,
      question: "What is file carving in digital forensics?",
      options: [
        "Deleting files",
        "Recovering files from unallocated space without file system metadata",
        "Encrypting files",
        "Compressing files"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["File System Forensics"]
    },
    
    // Skill: File System Forensics (Question 2)
    {
      id: 10,
      question: "What information can be found in file system metadata?",
      options: [
        "Only file names",
        "Creation time, modification time, access time, file size, and permissions",
        "Nothing useful",
        "Only file content"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["File System Forensics"]
    },
    
    // Skill: Log Analysis (Question 1)
    {
      id: 11,
      question: "In Windows forensics, which artifact shows recently accessed files?",
      options: [
        "Registry hives and recent file lists",
        "Desktop wallpaper",
        "Browser bookmarks only",
        "System BIOS"
      ],
      correct: 0,
      points: 20,
      validatesSkills: ["Log Analysis"]
    },
    
    // Skill: Log Analysis (Question 2)
    {
      id: 12,
      question: "What can Windows Event Log ID 4624 tell a forensic investigator?",
      options: [
        "System shutdown",
        "Successful user logon with details about who, when, and from where",
        "File deletion",
        "Network configuration change"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Log Analysis"]
    },
    
    // Skill: Forensic Analysis (Question 1)
    {
      id: 13,
      question: "What is timeline analysis in digital forensics?",
      options: [
        "Checking the system clock",
        "Reconstructing events in chronological order to understand what happened",
        "Setting time zones",
        "Scheduling meetings"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Forensic Analysis"]
    },
    
    // Skill: Forensic Analysis (Question 2)
    {
      id: 14,
      question: "What is anti-forensics?",
      options: [
        "Supporting forensic investigations",
        "Techniques used to hinder or prevent forensic analysis",
        "A type of forensic tool",
        "A forensic certification"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Forensic Analysis"]
    },
    
    // Skill: Technical Reporting (Question 1)
    {
      id: 15,
      question: "What should a forensic report include?",
      options: [
        "Only technical jargon",
        "Executive summary, methodology, findings, evidence, conclusions, and recommendations",
        "Personal opinions only",
        "Unverified assumptions"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Technical Reporting"]
    },
    
    // Skill: Technical Reporting (Question 2)
    {
      id: 16,
      question: "Why is it important to document the forensic methodology used?",
      options: [
        "To make the report longer",
        "To ensure reproducibility and defend findings in court",
        "It's not important",
        "To confuse readers"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["Technical Reporting"]
    }
  ],
  
  // ============================================================================
  // ROLE 5: Insider Threat Analyst (Experience: 1-4 years, Entry-Mid)
  // testCategory: "insider_threat"
  // ============================================================================
  'insider_threat': [
    
    // Skill: threat analysis (Question 1)
    {
      id: 1,
      question: "What is the primary difference between an insider threat and an external threat?",
      options: [
        "Insider threats are always intentional",
        "Insider threats originate from individuals with authorized access to organizational resources",
        "External threats are more dangerous",
        "There is no difference"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["threat analysis"]
    },
    
    // Skill: threat analysis (Question 2)
    {
      id: 2,
      question: "Which of the following is a common indicator of potential insider threat activity?",
      options: [
        "Regular working hours",
        "Unusual data access patterns, downloading large amounts of sensitive data, or accessing systems outside normal duties",
        "Taking vacation time",
        "Attending team meetings"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["threat analysis"]
    },
    
    // Skill: behavioral analysis (Question 1)
    {
      id: 3,
      question: "What is User Behavior Analytics (UBA) used for in insider threat detection?",
      options: [
        "To track employee lunch breaks",
        "To establish baselines of normal user behavior and detect anomalies that may indicate threats",
        "To monitor social media",
        "To schedule meetings"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["behavioral analysis"]
    },
    
    // Skill: behavioral analysis (Question 2)
    {
      id: 4,
      question: "Which behavioral change might indicate an insider threat risk?",
      options: [
        "Consistent work performance",
        "Sudden interest in information outside job scope, disgruntlement, or financial stress",
        "Positive attitude",
        "Team collaboration"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["behavioral analysis"]
    },
    
    // Skill: data analysis (Question 1)
    {
      id: 5,
      question: "When analyzing data for insider threats, what pattern suggests potential data exfiltration?",
      options: [
        "Normal file access during business hours",
        "Large file transfers to external storage, unusual printing, or copying to removable media",
        "Reading emails",
        "Using approved applications"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["data analysis"]
    },
    
    // Skill: data analysis (Question 2)
    {
      id: 6,
      question: "What type of data correlation helps identify insider threat patterns?",
      options: [
        "Only email data",
        "Combining access logs, HR data, badge access, network activity, and file operations",
        "Only network traffic",
        "Only login times"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["data analysis"]
    },
    
    // Skill: log analysis (Question 1)
    {
      id: 7,
      question: "Which log source is most valuable for tracking unauthorized data access?",
      options: [
        "Printer logs only",
        "File access logs, database audit logs, and data loss prevention (DLP) logs",
        "Coffee machine logs",
        "Thermostat logs"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["log analysis"]
    },
    
    // Skill: log analysis (Question 2)
    {
      id: 8,
      question: "What does multiple failed login attempts followed by a successful login potentially indicate?",
      options: [
        "Normal behavior",
        "Possible credential compromise or unauthorized access attempt",
        "System maintenance",
        "Network upgrade"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["log analysis"]
    },
    
    // Skill: pattern detection (Question 1)
    {
      id: 9,
      question: "What is a 'privilege escalation' pattern in insider threat context?",
      options: [
        "Getting a promotion",
        "Unauthorized attempts to gain higher-level access rights or permissions",
        "Using the elevator",
        "Attending training"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["pattern detection"]
    },
    
    // Skill: pattern detection (Question 2)
    {
      id: 10,
      question: "Which access pattern is most concerning from an insider threat perspective?",
      options: [
        "Accessing files within job responsibilities",
        "Accessing sensitive data shortly before resignation or termination",
        "Regular email usage",
        "Scheduled system backups"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["pattern detection"]
    },
    
    // Skill: report writing (Question 1)
    {
      id: 11,
      question: "What should an insider threat investigation report include?",
      options: [
        "Only suspicions without evidence",
        "Timeline of events, evidence collected, analysis findings, risk assessment, and recommendations",
        "Personal opinions only",
        "Unverified rumors"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["report writing"]
    },
    
    // Skill: report writing (Question 2)
    {
      id: 12,
      question: "Why is it important to maintain objectivity in insider threat reporting?",
      options: [
        "It's not important",
        "To ensure fair assessment, protect employee rights, and maintain credibility of findings",
        "To make reports longer",
        "To avoid work"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["report writing"]
    },
    
    // Skill: insider threat investigation (Question 1)
    {
      id: 13,
      question: "What is the first step when investigating a potential insider threat?",
      options: [
        "Immediately confront the employee",
        "Gather and preserve evidence while maintaining confidentiality and following legal guidelines",
        "Post about it on social media",
        "Ignore the indicators"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["insider threat investigation"]
    },
    
    // Skill: insider threat investigation (Question 2)
    {
      id: 14,
      question: "Why is collaboration with HR important in insider threat investigations?",
      options: [
        "It's not important",
        "HR provides context on employee status, performance issues, and ensures compliance with employment laws",
        "To gossip about employees",
        "To delay investigations"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["insider threat investigation"]
    }
  ],
  
  // ============================================================================
  // ROLE 6: Vulnerability Analyst (Experience: 2-5 years, Mid-level)
  // testCategory: "vulnerability_analysis"
  // ============================================================================
  'vulnerability_analysis': [
    
    // Skill: vulnerability scanning (Question 1)
    {
      id: 1,
      question: "What is the primary purpose of vulnerability scanning?",
      options: [
        "To hack systems",
        "To identify security weaknesses in systems, applications, and networks before attackers exploit them",
        "To slow down networks",
        "To delete files"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["vulnerability scanning"]
    },
    
    // Skill: vulnerability scanning (Question 2)
    {
      id: 2,
      question: "What is the difference between authenticated and unauthenticated vulnerability scans?",
      options: [
        "They are the same",
        "Authenticated scans use credentials to check internal configurations; unauthenticated scans check from external perspective",
        "Authenticated scans are always worse",
        "Unauthenticated scans are illegal"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["vulnerability scanning"]
    },
    
    // Skill: risk assessment (Question 1)
    {
      id: 3,
      question: "What factors determine the risk level of a vulnerability?",
      options: [
        "Only the vulnerability name",
        "Likelihood of exploitation, potential impact, asset criticality, and existing controls",
        "The day of the week",
        "The color of the alert"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["risk assessment"]
    },
    
    // Skill: risk assessment (Question 2)
    {
      id: 4,
      question: "What is CVSS (Common Vulnerability Scoring System)?",
      options: [
        "A type of malware",
        "A standardized framework for rating the severity of security vulnerabilities",
        "A scanning tool",
        "A firewall brand"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["risk assessment"]
    },
    
    // Skill: network analysis (Question 1)
    {
      id: 5,
      question: "What network vulnerability might allow an attacker to intercept unencrypted traffic?",
      options: [
        "Strong encryption",
        "Man-in-the-Middle (MitM) attack due to lack of encryption or certificate validation",
        "Firewall rules",
        "Access controls"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["network analysis"]
    },
    
    // Skill: network analysis (Question 2)
    {
      id: 6,
      question: "What is the purpose of port scanning in vulnerability assessment?",
      options: [
        "To damage systems",
        "To identify open ports and services that may be vulnerable or unnecessarily exposed",
        "To speed up networks",
        "To install software"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["network analysis"]
    },
    
    // Skill: application security (Question 1)
    {
      id: 7,
      question: "What is SQL injection?",
      options: [
        "A database feature",
        "An attack that exploits improper input validation to execute malicious SQL commands",
        "A programming language",
        "A security tool"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["application security"]
    },
    
    // Skill: application security (Question 2)
    {
      id: 8,
      question: "What does the OWASP Top 10 represent?",
      options: [
        "Top 10 security companies",
        "The most critical web application security risks",
        "Top 10 programming languages",
        "Top 10 hackers"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["application security"]
    },
    
    // Skill: threat identification (Question 1)
    {
      id: 9,
      question: "What is a threat vector?",
      options: [
        "A type of antivirus",
        "The path or means by which an attacker can gain access to a system to deliver a malicious payload",
        "A mathematical formula",
        "A network cable"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["threat identification"]
    },
    
    // Skill: threat identification (Question 2)
    {
      id: 10,
      question: "Which of the following represents a common threat to web applications?",
      options: [
        "Regular software updates",
        "Cross-Site Scripting (XSS), SQL injection, and insecure authentication",
        "Strong passwords",
        "Encrypted connections"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["threat identification"]
    },
    
    // Skill: security auditing (Question 1)
    {
      id: 11,
      question: "What is the purpose of a security audit?",
      options: [
        "To find employees to fire",
        "To systematically evaluate security controls, policies, and procedures for compliance and effectiveness",
        "To increase costs",
        "To slow down operations"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["security auditing"]
    },
    
    // Skill: security auditing (Question 2)
    {
      id: 12,
      question: "What is the difference between a vulnerability assessment and a penetration test?",
      options: [
        "They are exactly the same",
        "Vulnerability assessment identifies weaknesses; penetration test actively exploits them to measure impact",
        "Penetration tests are always illegal",
        "Vulnerability assessments are more dangerous"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["security auditing"]
    },
    
    // Skill: policy compliance (Question 1)
    {
      id: 13,
      question: "What is the purpose of compliance frameworks like PCI DSS or HIPAA?",
      options: [
        "To make work harder",
        "To establish security standards and protect sensitive data in specific industries",
        "To increase costs only",
        "To confuse organizations"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["policy compliance"]
    },
    
    // Skill: policy compliance (Question 2)
    {
      id: 14,
      question: "What should be done when a vulnerability violates compliance requirements?",
      options: [
        "Ignore it",
        "Prioritize remediation, document the finding, and report to compliance team",
        "Hide the evidence",
        "Wait for an audit"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["policy compliance"]
    }
  ],
  
  // ============================================================================
  // ROLE 7: Cybersecurity Policy & Planning Analyst (Experience: 2-5 years, Mid-level)
  // testCategory: "policy_and_governance"
  // ============================================================================
  'policy_and_governance': [
    
    // Skill: cybersecurity policy (Question 1)
    {
      id: 1,
      question: "What is the primary purpose of a cybersecurity policy?",
      options: [
        "To create paperwork",
        "To establish rules, standards, and guidelines for protecting organizational information assets",
        "To restrict all technology use",
        "To increase costs"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["cybersecurity policy"]
    },
    
    // Skill: cybersecurity policy (Question 2)
    {
      id: 2,
      question: "What should a comprehensive cybersecurity policy include?",
      options: [
        "Only technical jargon",
        "Scope, roles and responsibilities, acceptable use, incident response, and enforcement procedures",
        "Personal opinions",
        "Unrelated business goals"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["cybersecurity policy"]
    },
    
    // Skill: governance (Question 1)
    {
      id: 3,
      question: "What is IT governance in the context of cybersecurity?",
      options: [
        "Government regulations only",
        "The framework ensuring IT investments support business objectives and manage risks effectively",
        "A type of software",
        "A job title"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["governance"]
    },
    
    // Skill: governance (Question 2)
    {
      id: 4,
      question: "What is the role of a governance committee in cybersecurity?",
      options: [
        "To write code",
        "To provide oversight, make strategic decisions, and ensure alignment with organizational objectives",
        "To perform technical tasks",
        "To replace the security team"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["governance"]
    },
    
    // Skill: risk management (Question 1)
    {
      id: 5,
      question: "What are the four common risk treatment options?",
      options: [
        "Ignore, delay, forget, hide",
        "Accept, mitigate, transfer, avoid",
        "Delete, copy, paste, save",
        "Start, stop, pause, resume"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["risk management"]
    },
    
    // Skill: risk management (Question 2)
    {
      id: 6,
      question: "What is a risk register?",
      options: [
        "A cash register for security purchases",
        "A document tracking identified risks, their assessment, treatment plans, and ownership",
        "A type of firewall",
        "An employee directory"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["risk management"]
    },
    
    // Skill: compliance (Question 1)
    {
      id: 7,
      question: "What is the purpose of compliance audits?",
      options: [
        "To punish employees",
        "To verify that the organization adheres to regulatory requirements and internal policies",
        "To increase workload",
        "To eliminate security controls"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["compliance"]
    },
    
    // Skill: compliance (Question 2)
    {
      id: 8,
      question: "What is GDPR?",
      options: [
        "A type of malware",
        "General Data Protection Regulation - EU law on data protection and privacy",
        "A security tool",
        "A programming language"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["compliance"]
    },
    
    // Skill: strategic planning (Question 1)
    {
      id: 9,
      question: "What is a cybersecurity roadmap?",
      options: [
        "A physical map of the office",
        "A strategic plan outlining cybersecurity initiatives, priorities, and timelines",
        "A network diagram",
        "A travel guide"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["strategic planning"]
    },
    
    // Skill: strategic planning (Question 2)
    {
      id: 10,
      question: "Why is it important to align cybersecurity strategy with business objectives?",
      options: [
        "It's not important",
        "To ensure security investments support business goals and demonstrate value to stakeholders",
        "To make security more expensive",
        "To complicate processes"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["strategic planning"]
    },
    
    // Skill: policy development (Question 1)
    {
      id: 11,
      question: "What is the difference between a policy, standard, and procedure?",
      options: [
        "They are all the same",
        "Policy sets high-level rules; standards define specific requirements; procedures provide step-by-step instructions",
        "Policies are always technical",
        "Standards are optional"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["policy development"]
    },
    
    // Skill: policy development (Question 2)
    {
      id: 12,
      question: "How often should cybersecurity policies be reviewed and updated?",
      options: [
        "Never",
        "Regularly (annually or when significant changes occur in threats, technology, or regulations)",
        "Every 50 years",
        "Only when there's a breach"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["policy development"]
    },
    
    // Skill: regulatory alignment (Question 1)
    {
      id: 13,
      question: "What is the NIST Cybersecurity Framework?",
      options: [
        "A type of firewall",
        "A voluntary framework providing guidance for managing cybersecurity risks",
        "A certification program",
        "A software product"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["regulatory alignment"]
    },
    
    // Skill: regulatory alignment (Question 2)
    {
      id: 14,
      question: "Why is it important to stay current with regulatory changes?",
      options: [
        "It's not important",
        "To ensure ongoing compliance, avoid penalties, and adapt policies to new requirements",
        "To create more work",
        "To confuse the organization"
      ],
      correct: 1,
      points: 20,
      validatesSkills: ["regulatory alignment"]
    }
  ],
};

module.exports = batch1;
