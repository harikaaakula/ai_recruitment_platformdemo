// Hardcoded test questions for different job roles
// Each question validates ONE specific skill keyword
// Questions are organized by testCategory matching jobRoles.js

const testQuestions = {
  "incident_response": [
    {
      "id": 1,
      "question": "What is the correct order of phases in the NIST incident response lifecycle?",
      "options": [
        "Detection, Containment, Preparation, Recovery",
        "Preparation, Detection & Analysis, Containment, Eradication & Recovery, Post-Incident Activity",
        "Identification, Remediation, Documentation, Prevention",
        "Analysis, Response, Mitigation, Reporting"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Incident Response"
      ]
    },
    {
      "id": 2,
      "question": "During an active ransomware incident, which action should be prioritized immediately after detection?",
      "options": [
        "Pay the ransom to restore operations quickly",
        "Isolate affected systems to prevent lateral spread",
        "Notify all employees via company-wide email",
        "Begin restoring from backups immediately"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Incident Response"
      ]
    },
    {
      "id": 3,
      "question": "When collecting digital evidence from a compromised system, what is the most critical requirement?",
      "options": [
        "Speed of collection to minimize downtime",
        "Maintaining chain of custody and forensic soundness",
        "Using the latest forensic tools available",
        "Collecting only files modified in the last 24 hours"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Digital evidence collection"
      ]
    },
    {
      "id": 4,
      "question": "Which type of data is most volatile and should be collected FIRST during evidence acquisition?",
      "options": [
        "Hard disk contents",
        "System logs stored on disk",
        "RAM (memory) contents and active network connections",
        "Backup tapes"
      ],
      "correct": 2,
      "points": 20,
      "validatesSkills": [
        "Digital evidence collection"
      ]
    },
    {
      "id": 5,
      "question": "What is the primary purpose of creating a forensic image of a drive rather than copying files directly?",
      "options": [
        "It's faster than regular file copying",
        "It captures deleted files, slack space, and metadata that normal copying misses",
        "It automatically decrypts encrypted files",
        "It reduces the file size for easier storage"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "forensic processing"
      ]
    },
    {
      "id": 6,
      "question": "During forensic processing, you discover a file with a .jpg extension that behaves like an executable. What technique might the attacker have used?",
      "options": [
        "File compression",
        "File extension spoofing or steganography",
        "File encryption",
        "File fragmentation"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "forensic processing"
      ]
    },
    {
      "id": 7,
      "question": "What is the difference between static and dynamic malware analysis?",
      "options": [
        "Static analyzes code without execution; dynamic observes behavior during execution",
        "Static is faster; dynamic is slower",
        "Static requires a sandbox; dynamic does not",
        "Static detects all malware; dynamic only detects some"
      ],
      "correct": 0,
      "points": 20,
      "validatesSkills": [
        "malware analysis"
      ]
    },
    {
      "id": 8,
      "question": "You discover malware that checks for virtual machine artifacts before executing. What is this technique called?",
      "options": [
        "Sandbox evasion or anti-analysis technique",
        "Privilege escalation",
        "Code obfuscation",
        "Lateral movement"
      ],
      "correct": 0,
      "points": 20,
      "validatesSkills": [
        "malware analysis"
      ]
    },
    {
      "id": 9,
      "question": "While analyzing network traffic, you observe repeated DNS queries to algorithmically generated domain names. What does this likely indicate?",
      "options": [
        "Normal DNS caching behavior",
        "Domain Generation Algorithm (DGA) used by malware for C2 communication",
        "DNS server misconfiguration",
        "User browsing multiple websites"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network traffic analysis"
      ]
    },
    {
      "id": 10,
      "question": "What tool is most commonly used for capturing and analyzing network packets in real-time?",
      "options": [
        "Nmap",
        "Wireshark",
        "Metasploit",
        "Nessus"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network traffic analysis"
      ]
    },
    {
      "id": 11,
      "question": "When analyzing Windows Event Logs for signs of compromise, which Event ID indicates a successful user logon?",
      "options": [
        "Event ID 4624",
        "Event ID 4625",
        "Event ID 4720",
        "Event ID 1102"
      ],
      "correct": 0,
      "points": 20,
      "validatesSkills": [
        "log analysis"
      ]
    },
    {
      "id": 12,
      "question": "You notice multiple failed login attempts followed by a successful login from the same IP. What attack pattern does this suggest?",
      "options": [
        "SQL injection",
        "Brute force or password spraying attack",
        "Man-in-the-middle attack",
        "DNS poisoning"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "log analysis"
      ]
    },
    {
      "id": 13,
      "question": "When triaging vulnerabilities, which factor should be prioritized FIRST?",
      "options": [
        "The age of the vulnerability",
        "Whether the vulnerability is actively being exploited in the wild",
        "The CVSS score alone",
        "The vendor's patch release date"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability triage"
      ]
    },
    {
      "id": 14,
      "question": "A vulnerability scan reports a critical finding on an internal system with no internet access. How should this be prioritized?",
      "options": [
        "Highest priority - critical means immediate action",
        "Lower priority - assess actual risk based on exposure and exploitability",
        "Ignore it - internal systems are safe",
        "Patch it only during the next maintenance window"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability triage"
      ]
    },
    {
      "id": 15,
      "question": "What is the primary goal of the containment phase in incident response?",
      "options": [
        "To completely eradicate the threat",
        "To prevent the threat from spreading while preserving evidence",
        "To restore normal operations immediately",
        "To identify the root cause"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat containment"
      ]
    },
    {
      "id": 16,
      "question": "Which containment strategy allows continued monitoring of attacker activity while limiting damage?",
      "options": [
        "Full containment",
        "Partial containment or segmentation",
        "No containment",
        "System shutdown"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat containment"
      ]
    },
    {
      "id": 17,
      "question": "When triaging a high volume of security alerts, what is the most effective first step?",
      "options": [
        "Investigate every alert in chronological order",
        "Prioritize based on severity, asset criticality, and threat intelligence",
        "Dismiss all low-severity alerts automatically",
        "Escalate everything to senior analysts"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "alert triage"
      ]
    },
    {
      "id": 18,
      "question": "An IDS alert shows potential SQL injection attempts against a web server. What should you verify FIRST?",
      "options": [
        "Whether the web server is vulnerable to SQL injection",
        "The IP address reputation of the source",
        "Whether the attack was successful by checking logs and database activity",
        "The time of the attack"
      ],
      "correct": 2,
      "points": 20,
      "validatesSkills": [
        "alert triage"
      ]
    },
    {
      "id": 19,
      "question": "What is an Indicator of Compromise (IOC)?",
      "options": [
        "A security policy violation",
        "Forensic evidence that indicates a system has been breached",
        "A vulnerability in software",
        "A type of firewall rule"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "IOC detection"
      ]
    },
    {
      "id": 20,
      "question": "Which of the following is an example of a network-based IOC?",
      "options": [
        "A suspicious registry key modification",
        "An unusual scheduled task",
        "Communication with a known malicious IP address",
        "A new user account creation"
      ],
      "correct": 2,
      "points": 20,
      "validatesSkills": [
        "IOC detection"
      ]
    }
  ],
  "threat_analysis": [
    {
      "id": 1,
      "question": "What is the primary purpose of threat analysis in cybersecurity?",
      "options": [
        "To install security patches",
        "To identify, evaluate, and understand potential threats to the organization",
        "To train employees on security awareness",
        "To configure firewalls"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Threat analysis"
      ]
    },
    {
      "id": 2,
      "question": "Which framework is commonly used to categorize adversary tactics, techniques, and procedures (TTPs)?",
      "options": [
        "OWASP Top 10",
        "MITRE ATT&CK",
        "NIST Cybersecurity Framework",
        "ISO 27001"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Threat analysis"
      ]
    },
    {
      "id": 3,
      "question": "What distinguishes threat hunting from traditional security monitoring?",
      "options": [
        "Threat hunting is automated; monitoring is manual",
        "Threat hunting is proactive and hypothesis-driven; monitoring is reactive to alerts",
        "Threat hunting only uses open-source tools",
        "Threat hunting is performed by external vendors only"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Threat hunting"
      ]
    },
    {
      "id": 4,
      "question": "When conducting threat hunting, what is a 'hypothesis'?",
      "options": [
        "A confirmed security incident",
        "An educated guess about potential threats or attacker behavior to investigate",
        "A type of malware",
        "A security policy"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Threat hunting"
      ]
    },
    {
      "id": 5,
      "question": "Which network behavior is a strong indicator of data exfiltration?",
      "options": [
        "High inbound traffic during business hours",
        "Large outbound data transfers to external IPs, especially during off-hours",
        "Normal DNS queries",
        "Regular software updates"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Network threat identification"
      ]
    },
    {
      "id": 6,
      "question": "What does 'beaconing' behavior in network traffic typically indicate?",
      "options": [
        "Normal network operations",
        "Malware communicating with a command and control (C2) server at regular intervals",
        "Network congestion",
        "DNS server issues"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Network threat identification"
      ]
    },
    {
      "id": 7,
      "question": "In a SIEM platform, what query language is commonly used to search and analyze security data?",
      "options": [
        "HTML",
        "SPL (Search Processing Language) or similar query syntax",
        "CSS",
        "XML"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Data querying"
      ]
    },
    {
      "id": 8,
      "question": "When querying large datasets for threat analysis, what technique helps improve query performance?",
      "options": [
        "Querying all available data without filters",
        "Using time ranges, filters, and indexed fields to narrow the search scope",
        "Running queries during peak hours",
        "Avoiding the use of wildcards"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Data querying"
      ]
    },
    {
      "id": 9,
      "question": "What is metadata in the context of cybersecurity analysis?",
      "options": [
        "The actual content of a file",
        "Data that describes other data, such as file creation time, author, or email headers",
        "Encrypted data",
        "Malware signatures"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Metadata analysis"
      ]
    },
    {
      "id": 10,
      "question": "When analyzing email metadata for phishing investigations, which header field shows the true origin of the email?",
      "options": [
        "From: field",
        "Subject: field",
        "Received: headers and originating IP",
        "To: field"
      ],
      "correct": 2,
      "points": 20,
      "validatesSkills": [
        "Metadata analysis"
      ]
    },
    {
      "id": 11,
      "question": "Why are virtual machines commonly used in malware analysis?",
      "options": [
        "They are faster than physical machines",
        "They provide an isolated, disposable environment to safely execute suspicious files",
        "They automatically remove malware",
        "They are required by law"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Virtual machine operations"
      ]
    },
    {
      "id": 12,
      "question": "What is a 'snapshot' in virtual machine operations?",
      "options": [
        "A screenshot of the VM display",
        "A saved state of the VM that can be restored later",
        "A type of malware",
        "A network packet capture"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Virtual machine operations"
      ]
    },
    {
      "id": 13,
      "question": "What should be included in an effective threat intelligence report?",
      "options": [
        "Only technical indicators like IP addresses and hashes",
        "Executive summary, threat description, indicators, impact assessment, and recommendations",
        "Just the date and time of the threat",
        "Only the analyst's personal opinions"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Security reporting"
      ]
    },
    {
      "id": 14,
      "question": "When reporting security findings to non-technical stakeholders, what approach is most effective?",
      "options": [
        "Use highly technical jargon to demonstrate expertise",
        "Focus on business impact, risk, and actionable recommendations in plain language",
        "Provide only raw data without context",
        "Avoid mentioning any technical details"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Security reporting"
      ]
    },
    {
      "id": 15,
      "question": "What is the difference between tactical and strategic threat intelligence?",
      "options": [
        "Tactical is long-term trends; strategic is immediate IOCs",
        "Tactical focuses on immediate IOCs and TTPs; strategic focuses on long-term trends and adversary motivations",
        "They are the same thing",
        "Tactical is for executives; strategic is for analysts"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Threat intelligence"
      ]
    },
    {
      "id": 16,
      "question": "Which of the following is an example of an open-source threat intelligence feed?",
      "options": [
        "Microsoft Office",
        "AlienVault OTX, MISP, or Abuse.ch",
        "Adobe Photoshop",
        "Google Chrome"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Threat intelligence"
      ]
    },
    {
      "id": 17,
      "question": "When collecting threat data from multiple sources, what is the most important consideration?",
      "options": [
        "Collecting as much data as possible regardless of relevance",
        "Ensuring data quality, relevance, and proper correlation",
        "Only using free data sources",
        "Avoiding automation"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Data collection"
      ]
    },
    {
      "id": 18,
      "question": "Which log source is most valuable for detecting lateral movement within a network?",
      "options": [
        "Web server access logs",
        "Windows Event Logs showing authentication and process creation",
        "Email server logs",
        "Printer logs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Data collection"
      ]
    }
  ],
  "defensive_cybersecurity": [
    {
      "id": 1,
      "question": "What is the primary purpose of network segmentation in defensive cybersecurity?",
      "options": [
        "To increase network speed",
        "To limit lateral movement and contain potential breaches",
        "To reduce hardware costs",
        "To simplify network management"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Network defense"
      ]
    },
    {
      "id": 2,
      "question": "Which defensive measure helps prevent unauthorized access to network resources?",
      "options": [
        "Disabling all firewalls",
        "Implementing network access control (NAC) and authentication",
        "Allowing all traffic by default",
        "Removing all security policies"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Network defense"
      ]
    },
    {
      "id": 3,
      "question": "What is the difference between signature-based and anomaly-based threat detection?",
      "options": [
        "Signature-based detects known threats; anomaly-based detects deviations from normal behavior",
        "They are the same thing",
        "Signature-based is always better",
        "Anomaly-based only works on weekends"
      ],
      "correct": 0,
      "points": 20,
      "validatesSkills": [
        "Threat detection"
      ]
    },
    {
      "id": 4,
      "question": "Which tool is primarily used for real-time threat detection on a network?",
      "options": [
        "Microsoft Word",
        "Intrusion Detection System (IDS) or Intrusion Prevention System (IPS)",
        "Adobe Reader",
        "Web browser"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Threat detection"
      ]
    },
    {
      "id": 5,
      "question": "When analyzing network traffic, what does unusually high outbound traffic during off-hours typically indicate?",
      "options": [
        "Normal system updates",
        "Potential data exfiltration or compromised system",
        "Improved network performance",
        "Reduced security risk"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Traffic analysis"
      ]
    },
    {
      "id": 6,
      "question": "What protocol analysis technique helps identify malicious traffic patterns?",
      "options": [
        "Ignoring all traffic",
        "Deep packet inspection and flow analysis",
        "Blocking all ports",
        "Disabling monitoring"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Traffic analysis"
      ]
    },
    {
      "id": 7,
      "question": "What is the primary benefit of centralized log management in defensive operations?",
      "options": [
        "It uses more storage space",
        "It enables correlation of events across multiple systems for better threat detection",
        "It slows down systems",
        "It increases costs only"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Log analysis"
      ]
    },
    {
      "id": 8,
      "question": "When reviewing firewall logs, what pattern suggests a port scanning attempt?",
      "options": [
        "Single connection to one port",
        "Multiple connection attempts to sequential ports from the same source IP",
        "Normal web browsing traffic",
        "Successful authenticated sessions"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Log analysis"
      ]
    },
    {
      "id": 9,
      "question": "What is a zero-day vulnerability?",
      "options": [
        "A vulnerability that takes zero days to fix",
        "A vulnerability that is unknown to the vendor and has no available patch",
        "A vulnerability found on day zero of a project",
        "A vulnerability that causes zero damage"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Vulnerability identification"
      ]
    },
    {
      "id": 10,
      "question": "Which tool is commonly used for automated vulnerability scanning?",
      "options": [
        "Nessus, OpenVAS, or Qualys",
        "Microsoft Excel",
        "Google Chrome",
        "Notepad"
      ],
      "correct": 0,
      "points": 20,
      "validatesSkills": [
        "Vulnerability identification"
      ]
    },
    {
      "id": 11,
      "question": "What is the primary function of a Security Operations Center (SOC)?",
      "options": [
        "Software development",
        "Continuous monitoring, detection, and response to security incidents",
        "Hardware repair",
        "Employee training only"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Security monitoring"
      ]
    },
    {
      "id": 12,
      "question": "Which metric is most important for measuring SOC effectiveness?",
      "options": [
        "Number of coffee breaks",
        "Mean Time to Detect (MTTD) and Mean Time to Respond (MTTR)",
        "Office size",
        "Number of monitors"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Security monitoring"
      ]
    },
    {
      "id": 13,
      "question": "What is a baseline in the context of anomaly detection?",
      "options": [
        "The lowest security level",
        "A profile of normal system or network behavior used to identify deviations",
        "A type of malware",
        "A firewall rule"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Anomaly detection"
      ]
    },
    {
      "id": 14,
      "question": "Which behavior would be considered anomalous for a typical user account?",
      "options": [
        "Logging in during normal business hours",
        "Accessing files from multiple countries within minutes",
        "Using approved applications",
        "Following security policies"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Anomaly detection"
      ]
    },
    {
      "id": 15,
      "question": "When evaluating a new security tool, what should be the primary consideration?",
      "options": [
        "The color of the user interface",
        "How well it addresses specific security gaps and integrates with existing infrastructure",
        "The vendor's marketing materials",
        "The number of features regardless of need"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Security tool evaluation"
      ]
    },
    {
      "id": 16,
      "question": "What is a proof of concept (POC) in security tool evaluation?",
      "options": [
        "A marketing document",
        "A trial deployment to test the tool's effectiveness in the actual environment",
        "A type of malware",
        "A security policy"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Security tool evaluation"
      ]
    }
  ],
  "digital_forensics": [
    {
      "id": 1,
      "question": "What is the most critical principle when handling digital evidence?",
      "options": [
        "Speed of analysis",
        "Maintaining integrity and chain of custody",
        "Using the newest tools",
        "Sharing evidence publicly"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Digital Evidence Handling"
      ]
    },
    {
      "id": 2,
      "question": "What is a write blocker used for in digital forensics?",
      "options": [
        "To prevent writing data to evidence media during acquisition",
        "To block network traffic",
        "To encrypt files",
        "To delete malware"
      ],
      "correct": 0,
      "points": 20,
      "validatesSkills": [
        "Digital Evidence Handling"
      ]
    },
    {
      "id": 3,
      "question": "What is the correct order of volatility for evidence collection?",
      "options": [
        "Hard disk, RAM, network traffic, logs",
        "RAM, network connections, running processes, hard disk",
        "Logs, hard disk, RAM, network",
        "All at the same time"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Evidence Collection"
      ]
    },
    {
      "id": 4,
      "question": "Why is it important to document every step during evidence collection?",
      "options": [
        "To fill time",
        "To maintain chain of custody and ensure evidence admissibility in court",
        "To create more paperwork",
        "It's not important"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Evidence Collection"
      ]
    },
    {
      "id": 5,
      "question": "What is the purpose of creating a hash value (MD5/SHA256) of evidence?",
      "options": [
        "To compress the file",
        "To verify integrity and prove the evidence hasn't been altered",
        "To encrypt the evidence",
        "To delete the evidence"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Evidence Processing"
      ]
    },
    {
      "id": 6,
      "question": "What is the difference between a logical copy and a forensic image?",
      "options": [
        "They are the same",
        "Logical copy gets files; forensic image captures entire disk including deleted data and slack space",
        "Logical copy is always better",
        "Forensic image is faster"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Evidence Processing"
      ]
    },
    {
      "id": 7,
      "question": "What type of evidence can be found in RAM that might not be on disk?",
      "options": [
        "Only saved documents",
        "Running processes, encryption keys, network connections, and malware in memory",
        "Nothing useful",
        "Only system files"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Memory Forensics"
      ]
    },
    {
      "id": 8,
      "question": "Which tool is commonly used for memory forensics analysis?",
      "options": [
        "Microsoft Word",
        "Volatility Framework",
        "Adobe Photoshop",
        "Web browser"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Memory Forensics"
      ]
    },
    {
      "id": 9,
      "question": "What is file carving in digital forensics?",
      "options": [
        "Deleting files",
        "Recovering files from unallocated space without file system metadata",
        "Encrypting files",
        "Compressing files"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "File System Forensics"
      ]
    },
    {
      "id": 10,
      "question": "What information can be found in file system metadata?",
      "options": [
        "Only file names",
        "Creation time, modification time, access time, file size, and permissions",
        "Nothing useful",
        "Only file content"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "File System Forensics"
      ]
    },
    {
      "id": 11,
      "question": "In Windows forensics, which artifact shows recently accessed files?",
      "options": [
        "Registry hives and recent file lists",
        "Desktop wallpaper",
        "Browser bookmarks only",
        "System BIOS"
      ],
      "correct": 0,
      "points": 20,
      "validatesSkills": [
        "Log Analysis"
      ]
    },
    {
      "id": 12,
      "question": "What can Windows Event Log ID 4624 tell a forensic investigator?",
      "options": [
        "System shutdown",
        "Successful user logon with details about who, when, and from where",
        "File deletion",
        "Network configuration change"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Log Analysis"
      ]
    },
    {
      "id": 13,
      "question": "What is timeline analysis in digital forensics?",
      "options": [
        "Checking the system clock",
        "Reconstructing events in chronological order to understand what happened",
        "Setting time zones",
        "Scheduling meetings"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Forensic Analysis"
      ]
    },
    {
      "id": 14,
      "question": "What is anti-forensics?",
      "options": [
        "Supporting forensic investigations",
        "Techniques used to hinder or prevent forensic analysis",
        "A type of forensic tool",
        "A forensic certification"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Forensic Analysis"
      ]
    },
    {
      "id": 15,
      "question": "What should a forensic report include?",
      "options": [
        "Only technical jargon",
        "Executive summary, methodology, findings, evidence, conclusions, and recommendations",
        "Personal opinions only",
        "Unverified assumptions"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Technical Reporting"
      ]
    },
    {
      "id": 16,
      "question": "Why is it important to document the forensic methodology used?",
      "options": [
        "To make the report longer",
        "To ensure reproducibility and defend findings in court",
        "It's not important",
        "To confuse readers"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "Technical Reporting"
      ]
    }
  ],
  "insider_threat": [
    {
      "id": 1,
      "question": "What is the primary difference between an insider threat and an external threat?",
      "options": [
        "Insider threats are always intentional",
        "Insider threats originate from individuals with authorized access to organizational resources",
        "External threats are more dangerous",
        "There is no difference"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat analysis"
      ]
    },
    {
      "id": 2,
      "question": "Which of the following is a common indicator of potential insider threat activity?",
      "options": [
        "Regular working hours",
        "Unusual data access patterns, downloading large amounts of sensitive data, or accessing systems outside normal duties",
        "Taking vacation time",
        "Attending team meetings"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat analysis"
      ]
    },
    {
      "id": 3,
      "question": "What is User Behavior Analytics (UBA) used for in insider threat detection?",
      "options": [
        "To track employee lunch breaks",
        "To establish baselines of normal user behavior and detect anomalies that may indicate threats",
        "To monitor social media",
        "To schedule meetings"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "behavioral analysis"
      ]
    },
    {
      "id": 4,
      "question": "Which behavioral change might indicate an insider threat risk?",
      "options": [
        "Consistent work performance",
        "Sudden interest in information outside job scope, disgruntlement, or financial stress",
        "Positive attitude",
        "Team collaboration"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "behavioral analysis"
      ]
    },
    {
      "id": 5,
      "question": "When analyzing data for insider threats, what pattern suggests potential data exfiltration?",
      "options": [
        "Normal file access during business hours",
        "Large file transfers to external storage, unusual printing, or copying to removable media",
        "Reading emails",
        "Using approved applications"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "data analysis"
      ]
    },
    {
      "id": 6,
      "question": "What type of data correlation helps identify insider threat patterns?",
      "options": [
        "Only email data",
        "Combining access logs, HR data, badge access, network activity, and file operations",
        "Only network traffic",
        "Only login times"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "data analysis"
      ]
    },
    {
      "id": 7,
      "question": "Which log source is most valuable for tracking unauthorized data access?",
      "options": [
        "Printer logs only",
        "File access logs, database audit logs, and data loss prevention (DLP) logs",
        "Coffee machine logs",
        "Thermostat logs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "log analysis"
      ]
    },
    {
      "id": 8,
      "question": "What does multiple failed login attempts followed by a successful login potentially indicate?",
      "options": [
        "Normal behavior",
        "Possible credential compromise or unauthorized access attempt",
        "System maintenance",
        "Network upgrade"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "log analysis"
      ]
    },
    {
      "id": 9,
      "question": "What is a 'privilege escalation' pattern in insider threat context?",
      "options": [
        "Getting a promotion",
        "Unauthorized attempts to gain higher-level access rights or permissions",
        "Using the elevator",
        "Attending training"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "pattern detection"
      ]
    },
    {
      "id": 10,
      "question": "Which access pattern is most concerning from an insider threat perspective?",
      "options": [
        "Accessing files within job responsibilities",
        "Accessing sensitive data shortly before resignation or termination",
        "Regular email usage",
        "Scheduled system backups"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "pattern detection"
      ]
    },
    {
      "id": 11,
      "question": "What should an insider threat investigation report include?",
      "options": [
        "Only suspicions without evidence",
        "Timeline of events, evidence collected, analysis findings, risk assessment, and recommendations",
        "Personal opinions only",
        "Unverified rumors"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "report writing"
      ]
    },
    {
      "id": 12,
      "question": "Why is it important to maintain objectivity in insider threat reporting?",
      "options": [
        "It's not important",
        "To ensure fair assessment, protect employee rights, and maintain credibility of findings",
        "To make reports longer",
        "To avoid work"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "report writing"
      ]
    },
    {
      "id": 13,
      "question": "What is the first step when investigating a potential insider threat?",
      "options": [
        "Immediately confront the employee",
        "Gather and preserve evidence while maintaining confidentiality and following legal guidelines",
        "Post about it on social media",
        "Ignore the indicators"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "insider threat investigation"
      ]
    },
    {
      "id": 14,
      "question": "Why is collaboration with HR important in insider threat investigations?",
      "options": [
        "It's not important",
        "HR provides context on employee status, performance issues, and ensures compliance with employment laws",
        "To gossip about employees",
        "To delay investigations"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "insider threat investigation"
      ]
    }
  ],
  "vulnerability_analysis": [
    {
      "id": 1,
      "question": "What is the primary purpose of vulnerability scanning?",
      "options": [
        "To hack systems",
        "To identify security weaknesses in systems, applications, and networks before attackers exploit them",
        "To slow down networks",
        "To delete files"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability scanning"
      ]
    },
    {
      "id": 2,
      "question": "What is the difference between authenticated and unauthenticated vulnerability scans?",
      "options": [
        "They are the same",
        "Authenticated scans use credentials to check internal configurations; unauthenticated scans check from external perspective",
        "Authenticated scans are always worse",
        "Unauthenticated scans are illegal"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability scanning"
      ]
    },
    {
      "id": 3,
      "question": "What factors determine the risk level of a vulnerability?",
      "options": [
        "Only the vulnerability name",
        "Likelihood of exploitation, potential impact, asset criticality, and existing controls",
        "The day of the week",
        "The color of the alert"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "risk assessment"
      ]
    },
    {
      "id": 4,
      "question": "What is CVSS (Common Vulnerability Scoring System)?",
      "options": [
        "A type of malware",
        "A standardized framework for rating the severity of security vulnerabilities",
        "A scanning tool",
        "A firewall brand"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "risk assessment"
      ]
    },
    {
      "id": 5,
      "question": "What network vulnerability might allow an attacker to intercept unencrypted traffic?",
      "options": [
        "Strong encryption",
        "Man-in-the-Middle (MitM) attack due to lack of encryption or certificate validation",
        "Firewall rules",
        "Access controls"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network analysis"
      ]
    },
    {
      "id": 6,
      "question": "What is the purpose of port scanning in vulnerability assessment?",
      "options": [
        "To damage systems",
        "To identify open ports and services that may be vulnerable or unnecessarily exposed",
        "To speed up networks",
        "To install software"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network analysis"
      ]
    },
    {
      "id": 7,
      "question": "What is SQL injection?",
      "options": [
        "A database feature",
        "An attack that exploits improper input validation to execute malicious SQL commands",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "application security"
      ]
    },
    {
      "id": 8,
      "question": "What does the OWASP Top 10 represent?",
      "options": [
        "Top 10 security companies",
        "The most critical web application security risks",
        "Top 10 programming languages",
        "Top 10 hackers"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "application security"
      ]
    },
    {
      "id": 9,
      "question": "What is a threat vector?",
      "options": [
        "A type of antivirus",
        "The path or means by which an attacker can gain access to a system to deliver a malicious payload",
        "A mathematical formula",
        "A network cable"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat identification"
      ]
    },
    {
      "id": 10,
      "question": "Which of the following represents a common threat to web applications?",
      "options": [
        "Regular software updates",
        "Cross-Site Scripting (XSS), SQL injection, and insecure authentication",
        "Strong passwords",
        "Encrypted connections"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat identification"
      ]
    },
    {
      "id": 11,
      "question": "What is the purpose of a security audit?",
      "options": [
        "To find employees to fire",
        "To systematically evaluate security controls, policies, and procedures for compliance and effectiveness",
        "To increase costs",
        "To slow down operations"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security auditing"
      ]
    },
    {
      "id": 12,
      "question": "What is the difference between a vulnerability assessment and a penetration test?",
      "options": [
        "They are exactly the same",
        "Vulnerability assessment identifies weaknesses; penetration test actively exploits them to measure impact",
        "Penetration tests are always illegal",
        "Vulnerability assessments are more dangerous"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security auditing"
      ]
    },
    {
      "id": 13,
      "question": "What is the purpose of compliance frameworks like PCI DSS or HIPAA?",
      "options": [
        "To make work harder",
        "To establish security standards and protect sensitive data in specific industries",
        "To increase costs only",
        "To confuse organizations"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "policy compliance"
      ]
    },
    {
      "id": 14,
      "question": "What should be done when a vulnerability violates compliance requirements?",
      "options": [
        "Ignore it",
        "Prioritize remediation, document the finding, and report to compliance team",
        "Hide the evidence",
        "Wait for an audit"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "policy compliance"
      ]
    }
  ],
  "policy_and_governance": [
    {
      "id": 1,
      "question": "What is the primary purpose of a cybersecurity policy?",
      "options": [
        "To create paperwork",
        "To establish rules, standards, and guidelines for protecting organizational information assets",
        "To restrict all technology use",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "cybersecurity policy"
      ]
    },
    {
      "id": 2,
      "question": "What should a comprehensive cybersecurity policy include?",
      "options": [
        "Only technical jargon",
        "Scope, roles and responsibilities, acceptable use, incident response, and enforcement procedures",
        "Personal opinions",
        "Unrelated business goals"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "cybersecurity policy"
      ]
    },
    {
      "id": 3,
      "question": "What is IT governance in the context of cybersecurity?",
      "options": [
        "Government regulations only",
        "The framework ensuring IT investments support business objectives and manage risks effectively",
        "A type of software",
        "A job title"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "governance"
      ]
    },
    {
      "id": 4,
      "question": "What is the role of a governance committee in cybersecurity?",
      "options": [
        "To write code",
        "To provide oversight, make strategic decisions, and ensure alignment with organizational objectives",
        "To perform technical tasks",
        "To replace the security team"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "governance"
      ]
    },
    {
      "id": 5,
      "question": "What are the four common risk treatment options?",
      "options": [
        "Ignore, delay, forget, hide",
        "Accept, mitigate, transfer, avoid",
        "Delete, copy, paste, save",
        "Start, stop, pause, resume"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "risk management"
      ]
    },
    {
      "id": 6,
      "question": "What is a risk register?",
      "options": [
        "A cash register for security purchases",
        "A document tracking identified risks, their assessment, treatment plans, and ownership",
        "A type of firewall",
        "An employee directory"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "risk management"
      ]
    },
    {
      "id": 7,
      "question": "What is the purpose of compliance audits?",
      "options": [
        "To punish employees",
        "To verify that the organization adheres to regulatory requirements and internal policies",
        "To increase workload",
        "To eliminate security controls"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "compliance"
      ]
    },
    {
      "id": 8,
      "question": "What is GDPR?",
      "options": [
        "A type of malware",
        "General Data Protection Regulation - EU law on data protection and privacy",
        "A security tool",
        "A programming language"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "compliance"
      ]
    },
    {
      "id": 9,
      "question": "What is a cybersecurity roadmap?",
      "options": [
        "A physical map of the office",
        "A strategic plan outlining cybersecurity initiatives, priorities, and timelines",
        "A network diagram",
        "A travel guide"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "strategic planning"
      ]
    },
    {
      "id": 10,
      "question": "Why is it important to align cybersecurity strategy with business objectives?",
      "options": [
        "It's not important",
        "To ensure security investments support business goals and demonstrate value to stakeholders",
        "To make security more expensive",
        "To complicate processes"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "strategic planning"
      ]
    },
    {
      "id": 11,
      "question": "What is the difference between a policy, standard, and procedure?",
      "options": [
        "They are all the same",
        "Policy sets high-level rules; standards define specific requirements; procedures provide step-by-step instructions",
        "Policies are always technical",
        "Standards are optional"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "policy development"
      ]
    },
    {
      "id": 12,
      "question": "How often should cybersecurity policies be reviewed and updated?",
      "options": [
        "Never",
        "Regularly (annually or when significant changes occur in threats, technology, or regulations)",
        "Every 50 years",
        "Only when there's a breach"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "policy development"
      ]
    },
    {
      "id": 13,
      "question": "What is the NIST Cybersecurity Framework?",
      "options": [
        "A type of firewall",
        "A voluntary framework providing guidance for managing cybersecurity risks",
        "A certification program",
        "A software product"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "regulatory alignment"
      ]
    },
    {
      "id": 14,
      "question": "Why is it important to stay current with regulatory changes?",
      "options": [
        "It's not important",
        "To ensure ongoing compliance, avoid penalties, and adapt policies to new requirements",
        "To create more work",
        "To confuse the organization"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "regulatory alignment"
      ]
    }
  ],
  "privacy_compliance": [
    {
      "id": 1,
      "question": "What is the primary purpose of a Privacy Impact Assessment (PIA)?",
      "options": [
        "To increase costs",
        "To identify and mitigate privacy risks in systems, processes, or projects",
        "To slow down projects",
        "To create paperwork"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "privacy compliance"
      ]
    },
    {
      "id": 2,
      "question": "What does GDPR require organizations to do when a data breach occurs?",
      "options": [
        "Nothing",
        "Notify the supervisory authority within 72 hours if there's a risk to individuals' rights",
        "Wait for someone to complain",
        "Delete all evidence"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "privacy compliance"
      ]
    },
    {
      "id": 3,
      "question": "When should a Privacy Impact Assessment be conducted?",
      "options": [
        "Never",
        "Before implementing new systems or processes that handle personal data",
        "After a data breach",
        "Only when required by law"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "privacy impact assessment"
      ]
    },
    {
      "id": 4,
      "question": "What key elements should a PIA include?",
      "options": [
        "Only technical details",
        "Data flows, privacy risks, mitigation measures, and compliance assessment",
        "Personal opinions",
        "Marketing materials"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "privacy impact assessment"
      ]
    },
    {
      "id": 5,
      "question": "What is data governance?",
      "options": [
        "Government control of data",
        "Framework for managing data availability, usability, integrity, and security",
        "A type of software",
        "A job title"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "data governance"
      ]
    },
    {
      "id": 6,
      "question": "What is the role of a data steward in data governance?",
      "options": [
        "To delete all data",
        "To ensure data quality, compliance, and proper handling within their domain",
        "To block all data access",
        "To ignore data issues"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "data governance"
      ]
    },
    {
      "id": 7,
      "question": "What is the 'right to be forgotten' under GDPR?",
      "options": [
        "A memory disorder",
        "The right for individuals to request deletion of their personal data under certain conditions",
        "A security feature",
        "A type of encryption"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "regulatory compliance"
      ]
    },
    {
      "id": 8,
      "question": "What is CCPA?",
      "options": [
        "A type of malware",
        "California Consumer Privacy Act - state law protecting consumer privacy rights",
        "A security tool",
        "A programming language"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "regulatory compliance"
      ]
    },
    {
      "id": 9,
      "question": "What should a privacy policy clearly communicate?",
      "options": [
        "Only legal jargon",
        "What data is collected, how it's used, who it's shared with, and individual rights",
        "Company profits",
        "Employee salaries"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "privacy policies"
      ]
    },
    {
      "id": 10,
      "question": "How often should privacy policies be reviewed?",
      "options": [
        "Never",
        "Regularly and whenever there are changes to data practices or regulations",
        "Every 100 years",
        "Only when sued"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "privacy policies"
      ]
    },
    {
      "id": 11,
      "question": "What is Personally Identifiable Information (PII)?",
      "options": [
        "Public information only",
        "Information that can identify a specific individual, such as name, SSN, or email",
        "Company financial data",
        "Software code"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "PII protection"
      ]
    },
    {
      "id": 12,
      "question": "What is data minimization?",
      "options": [
        "Making files smaller",
        "Collecting only the minimum personal data necessary for the specified purpose",
        "Deleting all data",
        "Reducing storage costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "PII protection"
      ]
    },
    {
      "id": 13,
      "question": "What factors should be considered in a privacy risk assessment?",
      "options": [
        "Only technical risks",
        "Data sensitivity, volume, access controls, third-party sharing, and potential harm to individuals",
        "Only financial risks",
        "Only reputational risks"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "privacy risk assessment"
      ]
    },
    {
      "id": 14,
      "question": "What is the difference between privacy and security?",
      "options": [
        "They are the same thing",
        "Privacy is about appropriate data use; security is about protecting data from unauthorized access",
        "Privacy is always more important",
        "Security is always more important"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "privacy risk assessment"
      ]
    }
  ],
  "security_control_assessment": [
    {
      "id": 1,
      "question": "What are the three main categories of security controls?",
      "options": [
        "Red, blue, green",
        "Management, operational, and technical",
        "High, medium, low",
        "Internal, external, hybrid"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security controls"
      ]
    },
    {
      "id": 2,
      "question": "What is the purpose of security controls?",
      "options": [
        "To slow down operations",
        "To reduce risk by preventing, detecting, or mitigating security threats",
        "To increase costs",
        "To complicate processes"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security controls"
      ]
    },
    {
      "id": 3,
      "question": "What does RMF stand for?",
      "options": [
        "Really Major Failure",
        "Risk Management Framework",
        "Remote Management Function",
        "Rapid Malware Finder"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "RMF"
      ]
    },
    {
      "id": 4,
      "question": "What are the main steps in the NIST Risk Management Framework?",
      "options": [
        "Start, stop, restart",
        "Prepare, Categorize, Select, Implement, Assess, Authorize, Monitor",
        "Plan, do, check, act",
        "Identify, protect, detect, respond, recover"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "RMF"
      ]
    },
    {
      "id": 5,
      "question": "What is the purpose of a security control assessment?",
      "options": [
        "To find people to blame",
        "To determine if controls are implemented correctly and operating as intended",
        "To increase workload",
        "To delay projects"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "control assessment"
      ]
    },
    {
      "id": 6,
      "question": "What methods are used to assess security controls?",
      "options": [
        "Guessing",
        "Examine (review documentation), Interview (talk to personnel), Test (hands-on validation)",
        "Assuming everything works",
        "Ignoring the controls"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "control assessment"
      ]
    },
    {
      "id": 7,
      "question": "What is risk in cybersecurity?",
      "options": [
        "Only financial loss",
        "The potential for a threat to exploit a vulnerability and cause harm",
        "Only reputational damage",
        "Only technical failures"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "risk analysis"
      ]
    },
    {
      "id": 8,
      "question": "What is the formula for calculating risk?",
      "options": [
        "Risk = Cost + Time",
        "Risk = Threat × Vulnerability × Impact (or Likelihood × Impact)",
        "Risk = Speed ÷ Distance",
        "Risk = Revenue - Expenses"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "risk analysis"
      ]
    },
    {
      "id": 9,
      "question": "What types of evidence are collected during a security control assessment?",
      "options": [
        "Only rumors",
        "Documentation, configuration files, logs, screenshots, interview notes, and test results",
        "Only opinions",
        "Only assumptions"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "evidence collection"
      ]
    },
    {
      "id": 10,
      "question": "Why is it important to document evidence during assessments?",
      "options": [
        "To create busywork",
        "To support findings, enable verification, and provide audit trail",
        "To waste time",
        "It's not important"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "evidence collection"
      ]
    },
    {
      "id": 11,
      "question": "What is an Authority to Operate (ATO)?",
      "options": [
        "Permission to drive",
        "Formal authorization for a system to operate based on acceptable risk level",
        "A type of malware",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security authorization"
      ]
    },
    {
      "id": 12,
      "question": "Who typically grants an ATO?",
      "options": [
        "Any employee",
        "An Authorizing Official (AO) with appropriate authority",
        "The IT help desk",
        "External vendors"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security authorization"
      ]
    },
    {
      "id": 13,
      "question": "What is the purpose of compliance reviews?",
      "options": [
        "To punish employees",
        "To verify adherence to policies, standards, and regulatory requirements",
        "To increase costs",
        "To slow down operations"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "compliance review"
      ]
    },
    {
      "id": 14,
      "question": "What should be done when a compliance gap is identified?",
      "options": [
        "Ignore it",
        "Document the finding, assess risk, and develop a remediation plan",
        "Hide the evidence",
        "Blame someone"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "compliance review"
      ]
    }
  ],
  "cybersecurity_architecture": [
    {
      "id": 1,
      "question": "What is the primary goal of security architecture?",
      "options": [
        "To make systems complex",
        "To design secure, resilient systems that protect assets while supporting business objectives",
        "To increase costs",
        "To slow down development"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security architecture"
      ]
    },
    {
      "id": 2,
      "question": "What is defense in depth?",
      "options": [
        "A single strong firewall",
        "Layered security controls so if one fails, others still provide protection",
        "Deep underground data centers",
        "A military strategy only"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "defense in depth"
      ]
    },
    {
      "id": 3,
      "question": "What is Zero Trust Architecture?",
      "options": [
        "Trusting no one in the organization",
        "Security model that requires verification for every access request, regardless of location",
        "Removing all security controls",
        "A type of malware"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security architecture"
      ]
    },
    {
      "id": 4,
      "question": "What is network segmentation?",
      "options": [
        "Cutting network cables",
        "Dividing a network into smaller segments to limit lateral movement and contain breaches",
        "Combining all networks",
        "Removing firewalls"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network segmentation"
      ]
    },
    {
      "id": 5,
      "question": "What is the CIA triad in information security?",
      "options": [
        "Central Intelligence Agency",
        "Confidentiality, Integrity, and Availability",
        "Cost, Implementation, Assessment",
        "Compliance, Investigation, Authorization"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure design"
      ]
    },
    {
      "id": 6,
      "question": "What is the principle of least privilege?",
      "options": [
        "Giving everyone admin rights",
        "Users should have only the minimum access necessary to perform their job functions",
        "Removing all access",
        "Privilege escalation"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure design"
      ]
    },
    {
      "id": 7,
      "question": "What is a DMZ (Demilitarized Zone) in network architecture?",
      "options": [
        "A war zone",
        "A network segment that sits between internal and external networks, hosting public-facing services",
        "A type of firewall",
        "A VPN connection"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network segmentation"
      ]
    },
    {
      "id": 8,
      "question": "What is the purpose of threat modeling in security architecture?",
      "options": [
        "To create fear",
        "To identify potential threats, vulnerabilities, and attack vectors early in the design phase",
        "To delay projects",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "architecture analysis"
      ]
    },
    {
      "id": 9,
      "question": "What is security by design?",
      "options": [
        "Adding security after deployment",
        "Integrating security considerations from the beginning of the design process",
        "Ignoring security until problems occur",
        "A marketing term only"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure design"
      ]
    },
    {
      "id": 10,
      "question": "What is the purpose of security architecture reviews?",
      "options": [
        "To criticize developers",
        "To identify architectural weaknesses, gaps, and ensure alignment with security requirements",
        "To delay projects",
        "To increase budgets"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "architecture analysis"
      ]
    }
  ],
  "secure_software_development": [
    {
      "id": 1,
      "question": "What is the OWASP Top 10?",
      "options": [
        "Top 10 security companies",
        "The most critical web application security risks",
        "Top 10 programming languages",
        "Top 10 hackers"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure coding"
      ]
    },
    {
      "id": 2,
      "question": "What is input validation?",
      "options": [
        "Accepting all user input",
        "Verifying that user input meets expected format and constraints before processing",
        "Ignoring user input",
        "Encrypting input"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "input validation"
      ]
    },
    {
      "id": 3,
      "question": "What is SQL injection?",
      "options": [
        "A database feature",
        "An attack that exploits improper input validation to execute malicious SQL commands",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure coding"
      ]
    },
    {
      "id": 4,
      "question": "What is Cross-Site Scripting (XSS)?",
      "options": [
        "A legitimate feature",
        "An attack that injects malicious scripts into web pages viewed by other users",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure coding"
      ]
    },
    {
      "id": 5,
      "question": "What is the purpose of parameterized queries?",
      "options": [
        "To slow down databases",
        "To prevent SQL injection by separating SQL code from data",
        "To make code longer",
        "To confuse developers"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure coding"
      ]
    },
    {
      "id": 6,
      "question": "What is static application security testing (SAST)?",
      "options": [
        "Testing after deployment",
        "Analyzing source code for security vulnerabilities without executing the program",
        "Manual code review only",
        "Performance testing"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "static code analysis"
      ]
    },
    {
      "id": 7,
      "question": "What is the principle of fail securely?",
      "options": [
        "Never fail",
        "When errors occur, the system should default to a secure state rather than exposing vulnerabilities",
        "Ignore all errors",
        "Display detailed error messages to users"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "error handling"
      ]
    },
    {
      "id": 8,
      "question": "What is the purpose of code signing?",
      "options": [
        "To make code longer",
        "To verify the authenticity and integrity of software using digital signatures",
        "To encrypt code",
        "To obfuscate code"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "software security"
      ]
    },
    {
      "id": 9,
      "question": "What is threat modeling in software development?",
      "options": [
        "Creating fear",
        "Identifying potential threats and vulnerabilities in the application design",
        "Delaying development",
        "Increasing costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat modeling"
      ]
    },
    {
      "id": 10,
      "question": "What is the Secure Software Development Lifecycle (SSDLC)?",
      "options": [
        "A type of malware",
        "Integrating security practices throughout all phases of software development",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure SDLC"
      ]
    }
  ],
  "secure_systems_development": [
    {
      "id": 1,
      "question": "What is system hardening?",
      "options": [
        "Making hardware physically harder",
        "Reducing system attack surface by disabling unnecessary services and applying security configurations",
        "Increasing system complexity",
        "Adding more features"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "system hardening"
      ]
    },
    {
      "id": 2,
      "question": "What are CIS Benchmarks?",
      "options": [
        "Performance metrics",
        "Security configuration guidelines for various systems and software",
        "Hardware specifications",
        "Programming standards"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure configuration"
      ]
    },
    {
      "id": 3,
      "question": "What is the purpose of security baselines?",
      "options": [
        "To slow down systems",
        "To establish minimum security configurations that all systems must meet",
        "To increase costs",
        "To complicate management"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure configuration"
      ]
    },
    {
      "id": 4,
      "question": "What is configuration management?",
      "options": [
        "Random changes to systems",
        "Systematic process of maintaining system configurations in a known, consistent state",
        "Ignoring system settings",
        "Deleting all configurations"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure configuration"
      ]
    },
    {
      "id": 5,
      "question": "What is the principle of defense in depth for systems?",
      "options": [
        "One strong control",
        "Multiple layers of security controls so if one fails, others provide protection",
        "No security controls",
        "Only physical security"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure system design"
      ]
    },
    {
      "id": 6,
      "question": "What is the purpose of system security testing?",
      "options": [
        "To break systems",
        "To validate that security controls are implemented correctly and functioning as intended",
        "To delay deployment",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "system security testing"
      ]
    },
    {
      "id": 7,
      "question": "What is a security control?",
      "options": [
        "A remote control",
        "A safeguard or countermeasure to protect confidentiality, integrity, and availability",
        "A type of malware",
        "A programming language"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure system design"
      ]
    },
    {
      "id": 8,
      "question": "What is patch management?",
      "options": [
        "Ignoring updates",
        "Systematic process of identifying, testing, and deploying software updates and security patches",
        "Random updates",
        "Never updating systems"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability identification"
      ]
    },
    {
      "id": 9,
      "question": "What is the purpose of vulnerability scanning in systems engineering?",
      "options": [
        "To create vulnerabilities",
        "To identify security weaknesses in systems before attackers exploit them",
        "To slow down systems",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability identification"
      ]
    },
    {
      "id": 10,
      "question": "What is the Secure Development Lifecycle (SDL)?",
      "options": [
        "A type of malware",
        "A process that integrates security into every phase of system development",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure SDLC"
      ]
    }
  ],
  "software_security_assessment": [
    {
      "id": 1,
      "question": "What is the difference between SAST and DAST?",
      "options": [
        "They are the same",
        "SAST analyzes source code; DAST tests running applications",
        "SAST is always better",
        "DAST is always better"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "static analysis"
      ]
    },
    {
      "id": 2,
      "question": "What is a buffer overflow?",
      "options": [
        "Too much water",
        "A vulnerability where data exceeds allocated memory, potentially allowing code execution",
        "A feature",
        "A performance optimization"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability analysis"
      ]
    },
    {
      "id": 3,
      "question": "What is the purpose of secure code review?",
      "options": [
        "To criticize developers",
        "To identify security vulnerabilities and insecure coding practices before deployment",
        "To delay projects",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure code review"
      ]
    },
    {
      "id": 4,
      "question": "What is Cross-Site Request Forgery (CSRF)?",
      "options": [
        "A legitimate feature",
        "An attack that tricks users into executing unwanted actions on a web application",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "application security"
      ]
    },
    {
      "id": 5,
      "question": "What is the purpose of threat modeling?",
      "options": [
        "To create fear",
        "To identify potential threats, attack vectors, and security requirements early in development",
        "To delay projects",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat modeling"
      ]
    },
    {
      "id": 6,
      "question": "What is insecure deserialization?",
      "options": [
        "A feature",
        "A vulnerability where untrusted data is used to reconstruct objects, potentially allowing code execution",
        "A performance optimization",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability analysis"
      ]
    },
    {
      "id": 7,
      "question": "What is the principle of least privilege in application security?",
      "options": [
        "Give all users admin rights",
        "Applications and users should have only the minimum permissions necessary",
        "Remove all permissions",
        "Ignore permissions"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "application security"
      ]
    },
    {
      "id": 8,
      "question": "What is a race condition?",
      "options": [
        "A sports event",
        "A vulnerability where the timing of events affects program behavior, potentially causing security issues",
        "A feature",
        "A performance optimization"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability analysis"
      ]
    },
    {
      "id": 9,
      "question": "What is the purpose of security requirements in the SDLC?",
      "options": [
        "To slow down development",
        "To define security objectives and constraints that the software must meet",
        "To increase costs",
        "To complicate projects"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "secure SDLC"
      ]
    },
    {
      "id": 10,
      "question": "What is software composition analysis (SCA)?",
      "options": [
        "Analyzing music",
        "Identifying and managing security risks in third-party and open-source components",
        "Writing code",
        "Deleting code"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "software risk assessment"
      ]
    }
  ],
  "systems_security_analysis": [
    {
      "id": 1,
      "question": "What is the purpose of system hardening?",
      "options": [
        "To make systems difficult to use",
        "To reduce attack surface by removing unnecessary services and applying secure configurations",
        "To increase complexity",
        "To slow down systems"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "system hardening"
      ]
    },
    {
      "id": 2,
      "question": "What is a vulnerability scanner?",
      "options": [
        "A type of malware",
        "A tool that automatically identifies security weaknesses in systems and applications",
        "A programming language",
        "A firewall"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability management"
      ]
    },
    {
      "id": 3,
      "question": "What is the difference between a vulnerability and an exploit?",
      "options": [
        "They are the same",
        "A vulnerability is a weakness; an exploit is code or technique that takes advantage of it",
        "Vulnerabilities are always worse",
        "Exploits are always worse"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability management"
      ]
    },
    {
      "id": 4,
      "question": "What is the purpose of security monitoring?",
      "options": [
        "To spy on employees",
        "To detect and respond to security incidents and anomalous activity",
        "To slow down systems",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security monitoring"
      ]
    },
    {
      "id": 5,
      "question": "What is configuration drift?",
      "options": [
        "A type of malware",
        "When system configurations deviate from approved baselines over time",
        "A feature",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "configuration management"
      ]
    },
    {
      "id": 6,
      "question": "What is the principle of least privilege?",
      "options": [
        "Give everyone admin rights",
        "Users and systems should have only the minimum access necessary to perform their functions",
        "Remove all access",
        "Ignore access controls"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "access control"
      ]
    },
    {
      "id": 7,
      "question": "What is patch management?",
      "options": [
        "Ignoring updates",
        "Systematic process of identifying, testing, and deploying software updates and security patches",
        "Random updates",
        "Never updating"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability management"
      ]
    },
    {
      "id": 8,
      "question": "What is the purpose of access control lists (ACLs)?",
      "options": [
        "To block all access",
        "To define which users or systems can access specific resources and what actions they can perform",
        "To grant everyone access",
        "To confuse users"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "access control"
      ]
    },
    {
      "id": 9,
      "question": "What is a security baseline?",
      "options": [
        "The lowest security level",
        "A minimum set of security controls and configurations that systems must meet",
        "A type of malware",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "system hardening"
      ]
    },
    {
      "id": 10,
      "question": "What is the purpose of risk mitigation?",
      "options": [
        "To ignore risks",
        "To reduce the likelihood or impact of identified risks through controls and countermeasures",
        "To increase risks",
        "To transfer all risks"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "risk mitigation"
      ]
    }
  ],
  "network_operations": [
    {
      "id": 1,
      "question": "What is the OSI model?",
      "options": [
        "A type of malware",
        "A seven-layer framework for understanding network communications",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network monitoring"
      ]
    },
    {
      "id": 2,
      "question": "What is the purpose of a firewall?",
      "options": [
        "To start fires",
        "To control and filter network traffic based on security rules",
        "To slow down networks",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "firewalls"
      ]
    },
    {
      "id": 3,
      "question": "What is a VLAN?",
      "options": [
        "A type of malware",
        "Virtual Local Area Network - logically segments a network to improve security and performance",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network security"
      ]
    },
    {
      "id": 4,
      "question": "What is the difference between a router and a switch?",
      "options": [
        "They are the same",
        "Routers connect different networks; switches connect devices within the same network",
        "Routers are always better",
        "Switches are always better"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "routing",
        "switching"
      ]
    },
    {
      "id": 5,
      "question": "What is a VPN?",
      "options": [
        "A type of malware",
        "Virtual Private Network - creates encrypted tunnel for secure remote access",
        "A programming language",
        "A physical network"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network security"
      ]
    },
    {
      "id": 6,
      "question": "What is the purpose of network monitoring?",
      "options": [
        "To spy on users",
        "To track network performance, availability, and detect anomalies or security issues",
        "To slow down networks",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network monitoring"
      ]
    },
    {
      "id": 7,
      "question": "What is the difference between TCP and UDP?",
      "options": [
        "They are the same",
        "TCP is connection-oriented and reliable; UDP is connectionless and faster but less reliable",
        "TCP is always better",
        "UDP is always better"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network monitoring"
      ]
    },
    {
      "id": 8,
      "question": "What is network segmentation?",
      "options": [
        "Cutting cables",
        "Dividing a network into smaller segments to improve security and limit lateral movement",
        "Combining all networks",
        "Removing firewalls"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network security"
      ]
    },
    {
      "id": 9,
      "question": "What is the purpose of patch management for network devices?",
      "options": [
        "To break devices",
        "To fix vulnerabilities and improve security of routers, switches, and firewalls",
        "To slow down networks",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "vulnerability patching"
      ]
    },
    {
      "id": 10,
      "question": "What is a DDoS attack?",
      "options": [
        "A legitimate service",
        "Distributed Denial of Service - overwhelming a system with traffic to make it unavailable",
        "A security tool",
        "A programming language"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "network security"
      ]
    }
  ],
  "database_administration": [
    {
      "id": 1,
      "question": "What is SQL?",
      "options": [
        "A type of malware",
        "Structured Query Language - used to manage and query relational databases",
        "A programming language for web development",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "SQL"
      ]
    },
    {
      "id": 2,
      "question": "What is the purpose of database backups?",
      "options": [
        "To waste storage",
        "To enable recovery of data in case of failure, corruption, or disaster",
        "To slow down databases",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "backup and recovery"
      ]
    },
    {
      "id": 3,
      "question": "What is database normalization?",
      "options": [
        "Making databases normal",
        "Organizing data to reduce redundancy and improve data integrity",
        "Deleting data",
        "Encrypting data"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "database administration"
      ]
    },
    {
      "id": 4,
      "question": "What is the principle of least privilege in database security?",
      "options": [
        "Give all users full access",
        "Users should have only the minimum database permissions necessary for their role",
        "Remove all access",
        "Ignore permissions"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "db security"
      ]
    },
    {
      "id": 5,
      "question": "What is database encryption?",
      "options": [
        "Deleting data",
        "Converting data into coded form to protect confidentiality",
        "Compressing data",
        "Backing up data"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "db security"
      ]
    },
    {
      "id": 6,
      "question": "What is a database index?",
      "options": [
        "A table of contents",
        "A data structure that improves query performance by enabling faster data retrieval",
        "A type of malware",
        "A backup method"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "performance tuning"
      ]
    },
    {
      "id": 7,
      "question": "What is data integrity?",
      "options": [
        "Data size",
        "Accuracy, consistency, and reliability of data throughout its lifecycle",
        "Data speed",
        "Data color"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "data integrity"
      ]
    },
    {
      "id": 8,
      "question": "What is the purpose of database monitoring?",
      "options": [
        "To spy on users",
        "To track performance, detect issues, and identify security threats",
        "To slow down databases",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "database monitoring"
      ]
    },
    {
      "id": 9,
      "question": "What is a database transaction?",
      "options": [
        "A financial payment",
        "A sequence of database operations treated as a single unit that either completes fully or not at all",
        "A type of malware",
        "A backup method"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "database administration"
      ]
    },
    {
      "id": 10,
      "question": "What is the ACID principle in databases?",
      "options": [
        "A chemical property",
        "Atomicity, Consistency, Isolation, Durability - properties ensuring reliable transactions",
        "A type of malware",
        "A programming language"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "data integrity"
      ]
    }
  ],
  "systems_administration": [
    {
      "id": 1,
      "question": "What is Active Directory?",
      "options": [
        "A type of malware",
        "Microsoft's directory service for managing users, computers, and resources in Windows networks",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "user access management"
      ]
    },
    {
      "id": 2,
      "question": "What is the purpose of system hardening?",
      "options": [
        "To make systems difficult to use",
        "To reduce attack surface by removing unnecessary services and applying secure configurations",
        "To increase complexity",
        "To slow down systems"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "system hardening"
      ]
    },
    {
      "id": 3,
      "question": "What is patch management?",
      "options": [
        "Ignoring updates",
        "Systematic process of identifying, testing, and deploying software updates and security patches",
        "Random updates",
        "Never updating"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "patch management"
      ]
    },
    {
      "id": 4,
      "question": "What is the principle of least privilege?",
      "options": [
        "Give everyone admin rights",
        "Users should have only the minimum access necessary to perform their job functions",
        "Remove all access",
        "Ignore access controls"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "user access management"
      ]
    },
    {
      "id": 5,
      "question": "What is the purpose of system backups?",
      "options": [
        "To waste storage",
        "To enable recovery of systems and data in case of failure or disaster",
        "To slow down systems",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "backup and recovery"
      ]
    },
    {
      "id": 6,
      "question": "What is virtualization?",
      "options": [
        "A type of malware",
        "Technology that allows multiple virtual machines to run on a single physical server",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "server configuration"
      ]
    },
    {
      "id": 7,
      "question": "What is the difference between authentication and authorization?",
      "options": [
        "They are the same",
        "Authentication verifies identity; authorization determines what an authenticated user can access",
        "Authentication is always better",
        "Authorization is always better"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "user access management"
      ]
    },
    {
      "id": 8,
      "question": "What is a Group Policy in Windows?",
      "options": [
        "A social gathering",
        "A feature for centrally managing and configuring settings for users and computers",
        "A type of malware",
        "A programming language"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "os administration"
      ]
    },
    {
      "id": 9,
      "question": "What is the purpose of security monitoring?",
      "options": [
        "To spy on employees",
        "To detect and respond to security incidents and anomalous activity",
        "To slow down systems",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "security monitoring"
      ]
    },
    {
      "id": 10,
      "question": "What is multi-factor authentication (MFA)?",
      "options": [
        "Using one password",
        "Requiring two or more verification factors to gain access, improving security",
        "Removing all authentication",
        "A type of malware"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "user access management"
      ]
    }
  ],
  "cyber_data_analysis": [
    {
      "id": 1,
      "question": "What is anomaly detection in cybersecurity?",
      "options": [
        "Finding normal behavior",
        "Identifying patterns or behaviors that deviate from established baselines",
        "Ignoring all data",
        "Deleting anomalies"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "anomaly detection"
      ]
    },
    {
      "id": 2,
      "question": "What is the purpose of data visualization in cybersecurity?",
      "options": [
        "To make pretty pictures",
        "To present complex security data in an understandable format for analysis and decision-making",
        "To hide information",
        "To confuse stakeholders"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "metric development"
      ]
    },
    {
      "id": 3,
      "question": "What is a Key Performance Indicator (KPI) in cybersecurity?",
      "options": [
        "A type of malware",
        "A measurable value that demonstrates how effectively security objectives are being achieved",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "metric development"
      ]
    },
    {
      "id": 4,
      "question": "What is data quality validation?",
      "options": [
        "Ignoring data quality",
        "Ensuring data is accurate, complete, consistent, and reliable before analysis",
        "Deleting all data",
        "Accepting all data as-is"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "data quality validation"
      ]
    },
    {
      "id": 5,
      "question": "What is correlation in security data analysis?",
      "options": [
        "Random relationships",
        "Identifying relationships between different security events or data points",
        "Ignoring connections",
        "Deleting data"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "data analysis"
      ]
    },
    {
      "id": 6,
      "question": "What is the purpose of statistical analysis in cybersecurity?",
      "options": [
        "To make work harder",
        "To identify trends, patterns, and anomalies using mathematical methods",
        "To confuse people",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "statistical analysis"
      ]
    },
    {
      "id": 7,
      "question": "What is a false positive in security analytics?",
      "options": [
        "A correct alert",
        "An alert that incorrectly identifies normal activity as malicious",
        "A type of malware",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat analytics"
      ]
    },
    {
      "id": 8,
      "question": "What is threat intelligence in data analysis?",
      "options": [
        "Random information",
        "Evidence-based knowledge about threats used to inform security decisions",
        "Ignoring threats",
        "Creating threats"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat analytics"
      ]
    },
    {
      "id": 9,
      "question": "What is the purpose of security metrics?",
      "options": [
        "To create busywork",
        "To measure and track the effectiveness of security controls and programs",
        "To confuse management",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "metric development"
      ]
    },
    {
      "id": 10,
      "question": "What is data normalization in security analytics?",
      "options": [
        "Making data normal",
        "Standardizing data from different sources into a consistent format for analysis",
        "Deleting data",
        "Ignoring data"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "data analysis"
      ]
    }
  ],
  "cybercrime_investigation": [
    {
      "id": 1,
      "question": "What is chain of custody in digital investigations?",
      "options": [
        "A physical chain",
        "Documentation tracking who handled evidence, when, and how to ensure integrity",
        "A type of malware",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "chain of custody"
      ]
    },
    {
      "id": 2,
      "question": "What is the purpose of preserving digital evidence?",
      "options": [
        "To waste storage",
        "To maintain evidence integrity and admissibility in legal proceedings",
        "To slow down investigations",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "digital evidence"
      ]
    },
    {
      "id": 3,
      "question": "What is log analysis in cybercrime investigation?",
      "options": [
        "Analyzing wood",
        "Examining system and application logs to identify malicious activity and reconstruct events",
        "Deleting logs",
        "Ignoring logs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "log analysis"
      ]
    },
    {
      "id": 4,
      "question": "What is an Indicator of Compromise (IOC)?",
      "options": [
        "A type of malware",
        "Evidence that a system has been breached or compromised",
        "A security tool",
        "A programming language"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat analysis"
      ]
    },
    {
      "id": 5,
      "question": "What is the purpose of forensic imaging?",
      "options": [
        "Taking photos",
        "Creating an exact bit-by-bit copy of digital media for analysis without altering the original",
        "Deleting data",
        "Encrypting data"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "forensics"
      ]
    },
    {
      "id": 6,
      "question": "What is network forensics?",
      "options": [
        "Fixing networks",
        "Capturing and analyzing network traffic to investigate security incidents",
        "Deleting network logs",
        "Ignoring network activity"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "intrusion investigation"
      ]
    },
    {
      "id": 7,
      "question": "What is malware analysis in cybercrime investigation?",
      "options": [
        "Creating malware",
        "Examining malicious software to understand its behavior, purpose, and indicators",
        "Ignoring malware",
        "Spreading malware"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "threat analysis"
      ]
    },
    {
      "id": 8,
      "question": "What is the purpose of timeline analysis?",
      "options": [
        "Checking the time",
        "Reconstructing events in chronological order to understand the sequence of an incident",
        "Setting clocks",
        "Ignoring time"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "artifact examination"
      ]
    },
    {
      "id": 9,
      "question": "What is a write blocker?",
      "options": [
        "A type of malware",
        "A device that prevents writing to storage media during forensic acquisition",
        "A programming language",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "digital evidence"
      ]
    },
    {
      "id": 10,
      "question": "What is the purpose of documenting investigation procedures?",
      "options": [
        "To create busywork",
        "To ensure reproducibility, maintain chain of custody, and support legal proceedings",
        "To waste time",
        "To confuse people"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "forensics"
      ]
    }
  ],
  "digital_evidence_analysis": [
    {
      "id": 1,
      "question": "What is digital forensics?",
      "options": [
        "Fixing computers",
        "The process of collecting, preserving, analyzing, and presenting digital evidence",
        "Deleting files",
        "Creating malware"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "digital forensics"
      ]
    },
    {
      "id": 2,
      "question": "What is the purpose of evidence preservation?",
      "options": [
        "To waste storage",
        "To maintain the integrity and admissibility of evidence for legal proceedings",
        "To slow down investigations",
        "To increase costs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "evidence preservation"
      ]
    },
    {
      "id": 3,
      "question": "What is drive imaging?",
      "options": [
        "Taking photos of drives",
        "Creating an exact bit-by-bit copy of a storage device for forensic analysis",
        "Deleting drives",
        "Formatting drives"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "drive imaging"
      ]
    },
    {
      "id": 4,
      "question": "What is file system analysis?",
      "options": [
        "Deleting files",
        "Examining file system structures to recover data and understand user activity",
        "Creating files",
        "Ignoring files"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "file system analysis"
      ]
    },
    {
      "id": 5,
      "question": "What is memory forensics?",
      "options": [
        "Remembering things",
        "Analyzing RAM to find evidence of malware, encryption keys, and running processes",
        "Deleting memory",
        "Ignoring memory"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "memory analysis"
      ]
    },
    {
      "id": 6,
      "question": "What is file carving?",
      "options": [
        "Cutting files",
        "Recovering files from unallocated space without file system metadata",
        "Deleting files",
        "Encrypting files"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "artifact analysis"
      ]
    },
    {
      "id": 7,
      "question": "What is chain of custody?",
      "options": [
        "A physical chain",
        "Documentation tracking who handled evidence, when, and how to ensure integrity",
        "A type of malware",
        "A security tool"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "chain of custody"
      ]
    },
    {
      "id": 8,
      "question": "What is the purpose of hash values in digital forensics?",
      "options": [
        "To encrypt files",
        "To verify evidence integrity and prove it hasn't been altered",
        "To delete files",
        "To compress files"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "evidence preservation"
      ]
    },
    {
      "id": 9,
      "question": "What is log analysis in digital forensics?",
      "options": [
        "Analyzing wood",
        "Examining system and application logs to reconstruct events and identify malicious activity",
        "Deleting logs",
        "Ignoring logs"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "log analysis"
      ]
    },
    {
      "id": 10,
      "question": "What is the purpose of forensic reporting?",
      "options": [
        "To create busywork",
        "To document findings, methodology, and conclusions for stakeholders and legal proceedings",
        "To confuse people",
        "To waste time"
      ],
      "correct": 1,
      "points": 20,
      "validatesSkills": [
        "digital forensics"
      ]
    }
  ]
};

// Helper function to get test questions by job title
function getTestForJobTitle(jobTitle, options = {}) {
  // Load job roles to get testCategory
  const jobRoles = require('./jobRoles');
  
  // Find the job role by title
  const jobRole = jobRoles.find(role => role.title === jobTitle);
  
  if (!jobRole || !jobRole.testCategory) {
    console.warn(`No test category found for job title: ${jobTitle}`);
    return [];
  }
  
  // Get all questions for this test category
  const allQuestions = testQuestions[jobRole.testCategory] || [];
  
  // Default options
  const {
    selectAll = false,           // If true, return all questions
    maxQuestions = 10,            // Maximum number of questions to select
    ensureSkillCoverage = true,   // Ensure at least one question per skill
    randomize = true              // Randomize question selection
  } = options;
  
  // If selectAll is true or we have fewer questions than max, return all
  if (selectAll || allQuestions.length <= maxQuestions) {
    console.log(`Returning all ${allQuestions.length} questions for ${jobTitle} (category: ${jobRole.testCategory})`);
    return allQuestions;
  }
  
  // Smart selection: ensure skill coverage
  let selectedQuestions = [];
  
  if (ensureSkillCoverage) {
    // Group questions by skill
    const questionsBySkill = {};
    allQuestions.forEach(q => {
      const skill = q.validatesSkills[0]; // Primary skill
      if (!questionsBySkill[skill]) {
        questionsBySkill[skill] = [];
      }
      questionsBySkill[skill].push(q);
    });
    
    // Get unique skills
    const skills = Object.keys(questionsBySkill);
    
    // Select at least one question per skill (up to maxQuestions)
    const questionsPerSkill = Math.max(1, Math.floor(maxQuestions / skills.length));
    
    skills.forEach(skill => {
      const skillQuestions = questionsBySkill[skill];
      
      if (randomize) {
        // Shuffle and take first N
        const shuffled = skillQuestions.sort(() => Math.random() - 0.5);
        selectedQuestions.push(...shuffled.slice(0, questionsPerSkill));
      } else {
        // Take first N
        selectedQuestions.push(...skillQuestions.slice(0, questionsPerSkill));
      }
    });
    
    // If we still need more questions to reach maxQuestions
    if (selectedQuestions.length < maxQuestions) {
      const remaining = allQuestions.filter(q => !selectedQuestions.includes(q));
      const needed = maxQuestions - selectedQuestions.length;
      
      if (randomize) {
        const shuffled = remaining.sort(() => Math.random() - 0.5);
        selectedQuestions.push(...shuffled.slice(0, needed));
      } else {
        selectedQuestions.push(...remaining.slice(0, needed));
      }
    }
    
    // Trim to exact maxQuestions if we went over
    selectedQuestions = selectedQuestions.slice(0, maxQuestions);
    
  } else {
    // Simple random or sequential selection
    if (randomize) {
      const shuffled = [...allQuestions].sort(() => Math.random() - 0.5);
      selectedQuestions = shuffled.slice(0, maxQuestions);
    } else {
      selectedQuestions = allQuestions.slice(0, maxQuestions);
    }
  }
  
  console.log(`Selected ${selectedQuestions.length} questions from ${allQuestions.length} available for ${jobTitle} (category: ${jobRole.testCategory})`);
  return selectedQuestions;
}

// Helper function to get all available questions (for admin/testing purposes)
function getAllQuestionsForJobTitle(jobTitle) {
  return getTestForJobTitle(jobTitle, { selectAll: true });
}

module.exports = testQuestions;
module.exports.getTestForJobTitle = getTestForJobTitle;
module.exports.getAllQuestionsForJobTitle = getAllQuestionsForJobTitle;
