/**
 * Simplified ATS Job Roles - 20 Cybersecurity Positions
 * Clean, structured, rule-based matching
 */

const jobRoles = [
    {
  id: "1",
  title: "Incident Response Analyst",

  /*
    NICE Skill IDs used for this JD:
      S0544 Recognizing vulnerabilities
      S0607 Collecting digital evidence
      S0608 Processing digital evidence
      S0614 Categorizing types of vulnerabilities
      S0615 Protecting a network against malware
      S0651 Performing malware analysis
      S0688 Performing network data analysis
      S0854 Performing data analysis
      S0866 Performing log file analysis

    Skill Keywords (used for test generation + scoring logic):
      incident response
      digital evidence collection
      forensic processing
      malware analysis
      network traffic analysis
      log analysis
      vulnerability triage
      threat containment
      alert triage
      IOC detection
  */

  overview:
    "The Incident Response Analyst identifies, investigates, and responds to cybersecurity incidents across the organization. This role performs hands-on analysis of alerts, collects and processes digital evidence, coordinates containment actions, and documents findings for technical and executive audiences. The analyst works closely with SOC, engineering, and forensics teams to ensure threats are rapidly identified and mitigated.",

  mainResponsibilities: [
    "Monitor and triage security alerts from SIEM, EDR, IDS/IPS, and threat intelligence sources using incident response methodologies such as NIST 800-61",
    "Investigate suspicious activity by analyzing logs, network packets, endpoint telemetry, and forensic artifacts to identify indicators of compromise",
    "Recognize and classify vulnerabilities based on severity and impact, understanding the cyber attack lifecycle and adversary tradecraft",
    "Collect, preserve, and process digital evidence in a forensically sound manner following chain-of-custody requirements",
    "Perform static and dynamic malware analysis to determine behavior patterns, indicators, and potential business impact",
    "Analyze network traffic and log sources from endpoints, servers, and cloud environments to trace attacker activity",
    "Contain active threats by isolating endpoints, blocking malicious indicators, and executing emergency mitigations to protect systems",
    "Develop incident timelines, root-cause analysis reports, and lessons-learned summaries using analytical and investigative methods",
    "Collaborate with SOC, IT, engineering, and threat intelligence teams throughout the incident lifecycle",
    "Update and refine IR playbooks, detection rules, and escalation procedures based on new learnings and emerging threats"
  ],

  tasks: [
    "Monitor and triage alerts from SIEM, EDR, IDS/IPS, and threat intelligence sources.",
    "Investigate suspicious activity using logs, packets, endpoint telemetry, and forensic artifacts.",
    "Contain active threats by isolating endpoints, blocking malicious indicators, and executing emergency mitigations.",
    "Collect, preserve, and process digital evidence following chain-of-custody requirements.",
    "Perform malware analysis to determine behavior, indicators, and potential business impact.",
    "Develop incident timelines, root-cause analysis reports, and lessons-learned summaries.",
    "Collaborate with SOC, IT, engineering, and threat intelligence teams throughout incident lifecycle.",
    "Update and refine IR playbooks, detection rules, and escalation procedures based on new learnings."
  ],

  knowledge: [
    "Incident response methodologies such as NIST 800-61.",
    "Cyber attack lifecycle, intrusion phases, and adversary tradecraft.",
    "Malware types, behavior patterns, and analysis techniques.",
    "Network security concepts, protocols, and intrusion detection fundamentals.",
    "Log sources and forensic artifacts from endpoints, servers, and cloud environments."
  ],

  skills: [
    "Ability to recognize and classify vulnerabilities based on severity and impact.",
    "Ability to collect and preserve digital evidence in a forensically sound manner.",
    "Ability to process, analyze, and organize digital evidence for investigation.",
    "Ability to categorize, prioritize, and validate detected vulnerabilities.",
    "Ability to detect and protect systems against malware activity.",
    "Ability to perform static and dynamic malware analysis.",
    "Ability to analyze network traffic to identify suspicious and anomalous behavior.",
    "Ability to interpret security data using analytical and investigative methods.",
    "Ability to perform detailed log file analysis to trace attacker activity."
  ],

  skillKeywords: [
    "Incident Response",
    "Digital evidence collection",
    "forensic processing",
    "malware analysis",
    "network traffic analysis",
    "log analysis",
    "vulnerability triage",
    "threat containment",
    "alert triage",
    "IOC detection"
  ],

  education:
    "Bachelor’s degree in Cybersecurity, Computer Science, Information Security, or equivalent practical experience.",

  preferredExperience: [
    "2–5 years of experience in incident response, SOC operations, or digital forensics.",
    "Experience with SIEM platforms, EDR tools, packet capture, memory analysis, and sandboxing environments."
  ],

  certifications: [
    "CompTIA Security+",
    "EC-Council Certified Incident Handler (ECIH)",
    "GIAC Certified Incident Handler (GCIH)",
    "CompTIA CySA+",
    "GIAC Forensic Analyst (GCFA)"
  ],

  experienceRange: { min: 2, max: 5 },
  weights: { skills: 0.35, knowledge: 0.25, tasks: 0.20, certifications: 0.10, education: 0.10 },
  thresholdScore: 60,
  testCategory: "incident_response"
},
  {
     id: "2",
  title: "Threat Analysis Analyst",

  overview:
    "The Threat Analysis Analyst identifies, evaluates, and interprets cyber threats targeting the organization. This role focuses on analyzing threat actor behavior, investigating suspicious activity, and converting raw security data into actionable intelligence that informs security operations and enhances defensive capabilities.",

  mainResponsibilities: [
    "Collect and analyze threat data from internal and external intelligence sources to identify emerging cyber threats and threat actor tactics, techniques, and procedures (TTPs)",
    "Investigate suspicious activities by querying and correlating large volumes of security data across multiple platforms and data sources",
    "Develop and maintain virtualized environments to safely analyze suspicious artifacts, malware samples, and potential indicators of compromise",
    "Perform metadata and log analysis to uncover network threats, intrusion behaviors, and anomalous patterns that may indicate malicious activity",
    "Identify and evaluate network-based threats using threat intelligence platforms and structured intelligence formats",
    "Conduct investigative analysis to recognize C2 patterns, malware indicators, and threat hunting fundamentals",
    "Produce detailed and concise threat intelligence reports and summaries that communicate findings across the security team",
    "Support proactive threat hunting activities across enterprise environments using analytical and pattern-recognition capabilities",
    "Prepare threat intelligence briefings and communicate actionable insights to stakeholders and security operations teams"
  ],

  tasks: [
    "Collect and analyze threat data from internal and external intelligence sources.",
    "Investigate suspicious activities and identify emerging cyber threats.",
    "Develop and maintain virtualized environments to safely analyze suspicious artifacts.",
    "Perform metadata and log analysis to uncover indicators of compromise.",
    "Produce threat intelligence reports and communicate findings across the security team.",
    "Support proactive threat hunting activities across enterprise environments."
  ],

  knowledge: [
    "Threat actor tactics, techniques, and procedures (TTPs).",
    "Cyber threat intelligence platforms and structured intelligence formats.",
    "Network threats, intrusion behaviors, and security monitoring concepts.",
    "Malware indicators, C2 patterns, and threat hunting fundamentals.",
    "Data analysis, metadata inspection, and security-focused querying methodologies."
  ],

  skills: [
    "Ability to identify and evaluate network-based threats.",
    "Ability to analyze suspicious artifacts using virtual environments.",
    "Ability to query, analyze, and correlate large volumes of security data.",
    "Ability to prepare detailed and concise threat intelligence summaries.",
    "Ability to perform investigative metadata analysis.",
    "Strong analytical and pattern-recognition capabilities."
  ],
 // *** SKILL KEYWORDS FOR MATCHING | USED BY RESUME PARSER + TEST GENERATOR ***
  skillKeywords: [
    "Threat analysis",
    "Threat hunting",
    "Network threat identification",
    "Data querying",
    "Metadata analysis",
    "Virtual machine operations",
    "Security reporting",
    "Threat intelligence",
    "Data collection"
  ],
  education:
    "Bachelor’s degree in Cybersecurity, Information Technology, Computer Science, or equivalent experience.",

  preferredExperience: [
    "1–3 years in threat intelligence, SOC operations, or cyber investigations.",
    "Experience with SIEM platforms, CTI tools, and malware analysis workflows."
  ],

  certifications: [
    "CompTIA Security+",
    "EC-Council Certified Threat Intelligence Analyst (CTIA)",
    "GIAC Cyber Threat Intelligence (GCTI)",
    "CompTIA CySA+"
  ],

  experienceRange: { min: 1, max: 3 },

  weights: {
    skills: 0.4,knowledge: 0.3,tasks: 0.2,certifications: 0.05,education: 0.05
  },

  thresholdScore: 60,

  // Used for test mapping
  testCategory: "threat_analysis",
  },
  {
    /**
 * SKILL IDS USED (REFERENCE ONLY):
 * S0483 – identifying software communication vulnerabilities
 * S0509 – evaluating security products
 * S0540 – identifying network threats
 * S0614 – categorizing vulnerabilities
 * S0688 – performing network data analysis
 * S0874 – performing network traffic analysis
 * S0866 – performing log file analysis
 * 
 * SKILL KEYWORDS:
 * "Network defense", "Traffic analysis", "Threat detection",
 * "Vulnerability identification", "Log analysis", "Security monitoring",
 * "Evaluation of security tools", "Anomaly detection"
 */
id: "3",
  title: "Defensive Cybersecurity Analyst",

  overview:
    "The Defensive Cybersecurity Analyst strengthens and maintains the organization's security posture by monitoring systems, analyzing security events, and detecting malicious activity. This role focuses on identifying vulnerabilities, evaluating threats, reviewing logs, and supporting real-time defensive operations to prevent intrusions and mitigate risks.",

  mainResponsibilities: [
    "Monitor security tools, dashboards, and alert systems to detect suspicious activity using SIEM, IDS/IPS, and traffic analysis tools",
    "Analyze network traffic, protocols, and logs to identify intrusion attempts, anomalies, and network-based threats",
    "Identify, categorize, and prioritize system vulnerabilities in applications and configurations using scanning methodologies and system hardening practices",
    "Evaluate the effectiveness of defensive security tools including firewalls, EDR, and intrusion detection solutions",
    "Investigate network threats by correlating indicators across multiple data sources including security logs, network flow records, and event data",
    "Perform traffic and protocol analysis for anomaly detection using network security fundamentals and common attack vector knowledge",
    "Interpret and investigate logs from multiple sources to detect malicious activity and support incident response teams during containment",
    "Support remediation activities by applying defensive techniques and recommending security improvements",
    "Maintain awareness of threat detection methods, vulnerability types, and defensive security best practices"
  ],

  tasks: [
    "Monitor security tools, dashboards, and alert systems to detect suspicious activity.",
    "Analyze network traffic and logs to identify intrusion attempts or anomalies.",
    "Identify and categorize vulnerabilities in systems, applications, and configurations.",
    "Evaluate security tools, platforms, and defense technologies for effectiveness.",
    "Investigate network threats and correlate indicators across multiple data sources.",
    "Support incident response teams during containment and remediation activities."
  ],

  knowledge: [
    "Network security fundamentals, common attack vectors, and defensive techniques.",
    "Threat detection methods using SIEM, IDS/IPS, and traffic analysis tools.",
    "Vulnerability types, scanning methodologies, and system hardening practices.",
    "Security logs, network flow records, and event correlation concepts.",
    "Defensive security tools including firewalls, EDR, and intrusion detection solutions."
  ],

  skills: [
    "Ability to detect and analyze network-based threats.",
    "Ability to evaluate the effectiveness of defensive security tools.",
    "Ability to categorize and prioritize system vulnerabilities.",
    "Ability to perform traffic and protocol analysis for anomaly detection.",
    "Ability to interpret and investigate logs from multiple sources.",
    "Strong analytical and troubleshooting ability in security environments."
  ],

  skillKeywords: [
    "Network defense",
    "Threat detection",
    "Traffic analysis",
    "Log analysis",
    "Vulnerability identification",
    "Security monitoring",
    "Anomaly detection",
    "Security tool evaluation"
  ],

  education:
    "Bachelor’s degree in Cybersecurity, Information Technology, Computer Science, or equivalent experience.",

  preferredExperience: [
    "1–3 years working in SOC operations, defensive cybersecurity, or security monitoring.",
    "Experience using SIEM platforms, IDS/IPS, threat detection tools, and vulnerability scanners."
  ],

  certifications: [
    "CompTIA Security+",
    "CompTIA CySA+",
    "EC-Council Certified SOC Analyst (CSA)",
    "GIAC Certified Defense Analyst (GCDA)"
  ],

  experienceRange: { min: 1, max: 3 },

  weights: {
    skills: 0.45,
    knowledge: 0.30,
    tasks: 0.15,
    certifications: 0.05,
    education: 0.05
  },

  thresholdScore: 60,

  testCategory: "defensive_cybersecurity"
  },
  {
   /*
Skills Used (from NICE):
- S0589 (preserving digital evidence integrity)
- S0607 (collecting digital evidence)
- S0608 (processing digital evidence)
- S0599 (performing memory dump analysis)
- S0860 (performing file system forensic analysis)
- S0866 (performing log file analysis)
- S0612 (performing digital forensics analysis)
- S0834 (developing technical reports)

Skill Keywords:
["Digital Evidence Handling","Evidence Collection","Evidence Processing","Memory Forensics",
 "File System Forensics","Log Analysis","Forensic Analysis","Technical Reporting"]
*/
id: "4",
  title: "Digital Forensics Investigator",

  overview: 
    "The Digital Forensics Investigator examines compromised systems, collects and preserves digital evidence, and performs in-depth forensic analysis to support incident response, legal proceedings, and organizational investigations. This role focuses on identifying malicious activity, reconstructing events, and ensuring evidence integrity throughout the investigative lifecycle.",

  mainResponsibilities: [
    "Collect digital evidence from endpoints, servers, and cloud environments following chain-of-custody requirements and evidence-handling best practices",
    "Preserve and process digital artifacts using validated forensic tools and methodologies while maintaining forensic soundness",
    "Perform memory forensics, disk imaging, and file system analysis to uncover malicious activity and attacker tradecraft",
    "Analyze logs, metadata, registry data, and system traces to reconstruct timelines and identify indicators of compromise",
    "Conduct forensic analysis of memory structures, file systems, and log sources to interpret malware behavior and intrusion techniques",
    "Apply digital forensic methodologies and legal requirements to ensure evidence admissibility in investigations and legal proceedings",
    "Document investigations thoroughly and create detailed technical forensic reports for incident response teams and legal authorities",
    "Maintain forensic toolkits, methodologies, and documentation to ensure investigation quality, repeatability, and compliance",
    "Collaborate with SOC teams, law enforcement, and legal counsel to support cybercrime investigations and incident response activities"
  ],

  tasks: [
    "Collect digital evidence from endpoints, servers, and cloud environments following chain-of-custody requirements.",
    "Preserve and process digital artifacts using validated forensic tools and methodologies.",
    "Perform memory forensics, disk imaging, and file system analysis to uncover malicious activity.",
    "Analyze logs, metadata, and system traces to reconstruct timelines and identify attacker behavior.",
    "Prepare detailed forensic reports and communicate findings to incident response teams and legal authorities.",
    "Maintain forensic toolkits, methodologies, and documentation to ensure investigation quality and repeatability."
  ],

  knowledge: [
    "Digital forensic methodologies, chain-of-custody procedures, and evidence-handling best practices.",
    "Memory forensics techniques, disk imaging processes, and file system structures.",
    "Log correlation techniques, registry analysis, and metadata interpretation.",
    "Malware behavior, intrusion techniques, and attacker tradecraft.",
    "Legal and regulatory requirements related to forensic investigations and evidence admissibility."
  ],

  skills: [
    "Ability to collect digital evidence safely and accurately during an investigation.",
    "Ability to preserve and process evidence while maintaining forensic soundness.",
    "Ability to perform memory, file system, and log analysis to uncover malicious activity.",
    "Ability to interpret forensic data, reconstruct events, and identify indicators of compromise.",
    "Ability to document investigations and create detailed technical forensic reports.",
    "Strong analytical and problem-solving skills when working with complex data sets."
  ],

  skillKeywords: [
    "Digital Evidence Handling",
    "Evidence Collection",
    "Evidence Processing",
    "Memory Forensics",
    "File System Forensics",
    "Log Analysis",
    "Forensic Analysis",
    "Technical Reporting"
  ],

  education:
    "Bachelor’s degree in Cybersecurity, Digital Forensics, IT, Computer Science, or a related discipline.",

  preferredExperience: [
    "3–7 years of experience in digital forensics, incident response, or cybercrime investigation.",
    "Hands-on experience with forensic tools such as EnCase, FTK, Volatility, Autopsy, X-Ways, or KAPE.",
    "Experience working with SOC teams, law enforcement, or legal counsel on investigations."
  ],

  certifications: [
    "GIAC Certified Forensic Analyst (GCFA)",
    "GIAC Certified Forensic Examiner (GCFE)",
    "Certified Forensic Computer Examiner (CFCE)",
    "CompTIA Cybersecurity Analyst (CySA+)",
    "EnCase Certified Examiner (EnCE)"
  ],

  experienceRange: { min: 3, max: 7 },

  weights: { 
    skills: 0.40, 
    knowledge: 0.30, 
    tasks: 0.20, 
    certifications: 0.05, 
    education: 0.05 
  },

  thresholdScore: 65,

  testCategory: "digital_forensics"
  },
  {
    // ===============================================================
// Role: Insider Threat Analyst
// Skill IDs Used (from NICE):
// S0558 (developing algorithms)
// S0559 (data structure analysis)
// S0579 (preparing reports)
// S0610 (effective communication)
// S0728 (briefing preparation)
// S0748 (querying data)
// S0791 (presenting to an audience)
// S0821 (collaboration with stakeholders)
// S0890 (performing threat analysis)

// Skill Keywords (for test generation):
// ["threat analysis", "behavioral analysis", "data analysis", "log analysis", "pattern detection", "report writing", "insider threat investigation"]
// ===============================================================
id: "5",
  title: "Insider Threat Analyst",

  overview: "The Insider Threat Analyst identifies, investigates, and assesses potential internal risks within the organization by analyzing user behavior, system logs, anomalous activity patterns, and data movement. This role collaborates closely with security teams, HR, and management to prevent misuse, data exfiltration, and insider-driven security breaches.",

  mainResponsibilities: [
    "Analyze user activity, system logs, and behavioral patterns using user behavior analytics (UBA) and insider threat detection methods to detect suspicious or high-risk actions",
    "Investigate potential insider threat cases by correlating technical indicators from authentication logs, access logs, email logs, and endpoint activity with contextual information",
    "Develop analytical models, algorithms, and dashboards to identify insider threat patterns, anomalies, and suspicious trends in large datasets",
    "Query and analyze data sources to detect risk indicators related to data misuse, privilege abuse, or policy violations",
    "Perform threat analysis and behavioral analysis to identify patterns of data exfiltration or unauthorized access",
    "Collaborate with HR, security teams, IT, and leadership to validate findings, escalate critical cases, and support stakeholder communication",
    "Prepare detailed reports and briefings to communicate analysis results, investigation findings, and recommendations to stakeholders",
    "Maintain documentation of incident investigations, escalation processes, and mitigation recommendations",
    "Present findings to audiences across the organization and support cross-functional collaboration on insider threat prevention"
  ],

  tasks: [
    "Analyze user activity, system logs, and behavioral patterns to detect suspicious or high-risk actions.",
    "Investigate potential insider threat cases by correlating technical indicators and contextual information.",
    "Develop analytical models and dashboards to identify insider threat patterns.",
    "Collaborate with HR, security teams, and leadership to validate findings and escalate critical cases.",
    "Prepare detailed reports and briefings to communicate analysis results to stakeholders.",
    "Maintain documentation of incident investigations and provide recommendations for mitigation."
  ],

  knowledge: [
    "User behavior analytics (UBA) and insider threat detection methods.",
    "Data correlation, anomaly detection, and behavioral pattern identification.",
    "Log sources such as authentication logs, access logs, email logs, and endpoint activity.",
    "Risk indicators related to data misuse, privilege abuse, or policy violation.",
    "Stakeholder communication and escalation processes."
  ],

  skills: [
    "Strong ability to perform insider threat and behavioral analysis.",
    "Ability to analyze large datasets and identify anomalies or suspicious trends.",
    "Effective written and verbal communication for preparing reports and briefings.",
    "Ability to collaborate with cross-functional teams including HR, IT, and security.",
    "Strong proficiency in querying data sources and interpreting results."
  ],

  skillKeywords: [
    "threat analysis",
    "behavioral analysis",
    "data analysis",
    "log analysis",
    "pattern detection",
    "report writing",
    "insider threat investigation"
  ],

  education: "Bachelor’s in Cybersecurity, Computer Science, Information Systems, Psychology, or a related field.",

  preferredExperience: [
    "1–4 years of experience in threat analysis, SOC operations, or security monitoring.",
    "Experience with UEBA tools, SIEM platforms, data analysis tools, and case management systems."
  ],

  certifications: [
    "CompTIA Security+",
    "EC-Council Certified Threat Intelligence Analyst (CTIA)",
    "GIAC Cyber Threat Intelligence (GCTI)",
    "CompTIA CySA+"
  ],

  experienceRange: { min: 1, max: 4 },

  weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

  thresholdScore: 60,

  testCategory: "insider_threat"
  },
  {
    // ===============================================================
// Role: Vulnerability Analyst
// Skill IDs Used (from NICE):
// S0483 (identifying software communications vulnerabilities)
// S0543 (scanning for vulnerabilities)
// S0544 (recognizing vulnerabilities)
// S0656 (assessing application vulnerabilities)
// S0688 (performing network data analysis)

// Skill Keywords (for test generation):
// ["vulnerability scanning", "risk assessment", "network analysis", "application security", "threat identification", "security auditing", "policy compliance"]
// ===============================================================

id: "6",
title: "Vulnerability Analyst",

overview: "The Vulnerability Analyst identifies weaknesses across enterprise systems, applications, and networks by conducting structured assessments, reviewing system configurations, analyzing risk impact, and validating compliance with cybersecurity policies. This role plays a key part in reducing organizational exposure by prioritizing remediation efforts and ensuring continuous alignment with best-practice security standards.",

mainResponsibilities: [
  "Evaluate systems, networks, and applications to identify vulnerabilities, security control gaps, and configuration weaknesses using vulnerability scanning and assessment tools",
  "Assess organizational cybersecurity posture for compliance with internal policies, regulatory requirements, and industry standards such as NIST, ISO 27001, or CIS Benchmarks",
  "Analyze network traffic, logs, and indicators of compromise to identify anomalous activity and potential exploitation attempts",
  "Perform risk and vulnerability assessments by documenting severity, likelihood, and operational impact of identified weaknesses",
  "Identify and validate software, network, and application vulnerabilities using penetration testing principles and vulnerability validation techniques",
  "Prepare audit and assessment reports summarizing findings, risk levels, and recommended remediation actions for stakeholders",
  "Maintain and deploy vulnerability assessment and cyber defense audit toolkits across enterprise environments",
  "Correlate data from scans, logs, and incident reports to identify systemic weaknesses and defense-in-depth gaps",
  "Recommend remediation and mitigation strategies to reduce exposure, applying knowledge of cybersecurity threats, exploits, and adversarial tactics",
  "Translate technical findings into clear, actionable remediation steps for system owners, IT teams, and management"
],

tasks: [
  "Evaluate systems, networks, and applications to identify vulnerabilities and security control gaps.",
  "Assess organizational cybersecurity posture for compliance with internal policies, regulatory requirements, and industry standards.",
  "Analyze network traffic, logs, and indicators of compromise to identify anomalous activity.",
  "Perform risk and vulnerability assessments and document severity, likelihood, and operational impact.",
  "Prepare audit and assessment reports summarizing findings, risk levels, and recommended remediation actions.",
  "Maintain and deploy vulnerability assessment and cyber defense audit toolkits.",
  "Correlate data from scans, logs, and incident reports to identify systemic weaknesses.",
  "Recommend remediation and mitigation strategies to reduce exposure across environments."
],

knowledge: [
  "Networking protocols, network architectures, and common enterprise IT environments.",
  "Cybersecurity policies, procedures, regulatory requirements, and compliance frameworks.",
  "Cybersecurity threats, vulnerabilities, exploits, and adversarial tactics.",
  "Application security fundamentals and common application vulnerabilities.",
  "Defense-in-depth principles, enterprise architecture concepts, and security best practices.",
  "Penetration testing principles, tools, and vulnerability validation techniques.",
  "Cyber defense auditing processes, laws, and policy requirements."
],

skills: [
  "Ability to identify and validate software, network, and application vulnerabilities.",
  "Proficiency in vulnerability scanning and configuration assessment tools.",
  "Skill in analyzing network data, logs, and indicators of anomalous activity.",
  "Ability to assess application vulnerabilities and interpret their technical impact.",
  "Ability to translate technical findings into clear, actionable remediation steps for stakeholders."
],

skillKeywords: [
  "vulnerability scanning",
  "risk assessment",
  "network analysis",
  "application security",
  "threat identification",
  "security auditing",
  "policy compliance"
],

education: "Bachelor’s degree in Cybersecurity, Computer Science, Information Technology, Information Systems, or a related field.",

preferredExperience: [
  "2–5 years of experience in vulnerability management, security auditing, or security operations.",
  "Hands-on experience with tools such as Nessus, Qualys, Burp Suite, OpenVAS, or similar.",
  "Experience working with compliance frameworks such as NIST, ISO 27001, or CIS Benchmarks."
],

certifications: [
  "CompTIA Security+",
  "CompTIA CySA+",
  "EC-Council CEH (Certified Ethical Hacker)",
  "CompTIA PenTest+"
],

experienceRange: { min: 2, max: 5 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "vulnerability_analysis"
  },
  {
    // ===============================================================
// Role: Cybersecurity Policy & Planning Analyst
// Skill IDs Used (from NICE):
// S0406 (developing policy plans)
// S0497 (developing client organization profiles)
// S0515 (identifying partner capabilities)
// S0519 (detecting exploitation activities)
// S0821 (collaborating with internal and external stakeholders)

// Skill Keywords (for test generation):
// ["cybersecurity policy", "governance", "risk management", "compliance", "strategic planning", "policy development", "regulatory alignment"]
// ===============================================================

id: "7",
title: "Cybersecurity Policy & Planning Analyst",

mainResponsibilities: [
  "Develop and maintain cybersecurity policies, procedures, and governance frameworks aligned with organizational goals and risk management frameworks such as NIST RMF or ISO 27005",
  "Evaluate cybersecurity requirements, regulatory obligations, and industry standards to ensure compliance with cybersecurity laws, regulations, and compliance frameworks",
  "Advise leadership and stakeholders on cybersecurity policy implications, strategic direction, and governance processes",
  "Conduct audits and assessments to verify the effectiveness of cybersecurity policies, controls, and organizational policy structures",
  "Research emerging technologies, threats, privacy laws, and regulatory changes to update policy guidance and strategic plans",
  "Identify partner or stakeholder capabilities to support policy implementation and detect exploitation activities that may impact policy decisions",
  "Establish and maintain communication channels with internal and external stakeholders for policy coordination and collaboration across business units",
  "Promote cybersecurity awareness and policy understanding across management and staff through training and communication initiatives",
  "Apply knowledge of enterprise IT architecture, network security fundamentals, and cyber defense tools to align controls with policies",
  "Integrate organizational objectives with cybersecurity principles, threats, vulnerabilities, and enterprise security practices"
],

overview: "The Cybersecurity Policy & Planning Analyst develops, maintains, and aligns cybersecurity policies, strategies, and governance frameworks to ensure organizational compliance and effective risk management. This role partners with leadership, legal, risk, and technical teams to translate cybersecurity requirements into actionable policies and strategic plans that strengthen the organization’s overall security posture.",

tasks: [
  "Develop and maintain cybersecurity policies, procedures, and governance frameworks aligned with organizational goals.",
  "Evaluate cybersecurity requirements, regulatory obligations, and industry standards to ensure compliance.",
  "Advise leadership and stakeholders on cybersecurity policy implications and strategic direction.",
  "Conduct audits and assessments to verify the effectiveness of cybersecurity policies and controls.",
  "Research emerging technologies, threats, and regulatory changes to update policy guidance.",
  "Establish and maintain communication channels with internal and external stakeholders for policy coordination.",
  "Promote cybersecurity awareness and policy understanding across management and staff."
],

knowledge: [
  "Cybersecurity laws, regulations, and compliance frameworks.",
  "Cybersecurity policies, governance processes, and organizational policy structures.",
  "Risk management frameworks such as NIST RMF, ISO 27005, or similar.",
  "Cybersecurity principles, threats, vulnerabilities, and enterprise security practices.",
  "Privacy laws, data protection principles, and information governance models.",
  "Enterprise IT architecture concepts, network security fundamentals, and controls alignment.",
  "Cyber defense tools, assessment techniques, and vulnerability management concepts."
],

skills: [
  "Skill in developing cybersecurity policies, strategic plans, and governance documentation.",
  "Ability to assess organizational requirements and map them to cybersecurity controls and policies.",
  "Skill in identifying partner or stakeholder capabilities to support policy implementation.",
  "Ability to detect exploitation activities and integrate findings into policy decisions.",
  "Strong collaboration and communication skills for engaging stakeholders across business units."
],

skillKeywords: [
  "cybersecurity policy",
  "governance",
  "risk management",
  "compliance",
  "strategic planning",
  "policy development",
  "regulatory alignment"
],

education: "Bachelor’s degree in Information Security, IT Management, Business Administration, Political Science, Public Administration, or a related field.",

preferredExperience: [
  "2–5 years of experience in cybersecurity governance, policy development, risk management, or compliance.",
  "Experience working with frameworks such as NIST CSF, NIST RMF, ISO 27001, or COBIT.",
  "Experience collaborating with cross-functional teams in security, legal, audit, and risk domains."
],

certifications: [
  "ISACA CISM",
  "ISC2 CGRC (formerly CAP)",
  "ISO 27001 Lead Implementer or Lead Auditor",
  "IAPP CIPM (for privacy governance alignment)",
  "Associate of ISC2 (towards CISSP)"
],

experienceRange: { min: 2, max: 5 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "policy_and_governance"
  },
  {
    // ===============================================================
// Role: Privacy Governance Analyst
// Skill IDs Used (from NICE):
// S0395 (developing instructional materials)
// S0406 (developing policy plans)
// S0407 (developing standard operating procedures)
// S0540 (aligning privacy and cybersecurity objectives)
// S0791 (presenting to an audience)
// S0821 (collaborating with stakeholders)

// Skill Keywords (for test generation):
// ["privacy compliance", "privacy impact assessment", "data governance", "regulatory compliance", "privacy policies", "PII protection", "privacy risk assessment"]
// ===============================================================

id: "8",
title: "Privacy Governance Analyst",

mainResponsibilities: [
  "Develop and maintain privacy policies, procedures, and governance documentation aligned with regulatory requirements such as GDPR, CCPA, and HIPAA",
  "Conduct Privacy Impact Assessments (PIAs) and evaluate systems, processes, and services for privacy compliance and PII protection",
  "Monitor organizational compliance with privacy laws, internal policies, and industry standards using privacy principles and data lifecycle management concepts",
  "Identify privacy compliance gaps and recommend corrective actions to strengthen data protection practices and information governance",
  "Assist in vendor privacy reviews and ensure third parties meet contractual privacy and data security obligations",
  "Collaborate with security, legal, and IT teams to align privacy requirements with cybersecurity and organizational objectives",
  "Prepare privacy awareness materials and support delivery of privacy training to staff using instructional materials and presentation skills",
  "Evaluate regulatory, policy, and industry changes and update privacy guidance accordingly",
  "Apply knowledge of privacy impact assessment methodologies, enterprise privacy governance models, and information privacy technologies",
  "Support privacy audits, data flow reviews, and privacy monitoring activities across the organization"
],

overview: "The Privacy Governance Analyst supports the development, implementation, and oversight of the organization’s privacy compliance program. The role ensures policies, processes, and data governance practices align with privacy laws, regulatory requirements, and organizational objectives. This position bridges legal, security, and operational teams to reduce privacy risks, strengthen PII management, and maintain a culture of privacy awareness across the enterprise.",

tasks: [
  "Develop and maintain privacy policies, procedures, and governance documentation aligned with regulatory requirements.",
  "Conduct Privacy Impact Assessments (PIAs) and evaluate systems, processes, and services for privacy compliance.",
  "Monitor organizational compliance with privacy laws, internal policies, and industry standards.",
  "Identify privacy compliance gaps and recommend corrective actions to strengthen data protection practices.",
  "Assist in vendor privacy reviews and ensure third parties meet contractual privacy and data security obligations.",
  "Collaborate with security, legal, and IT teams to align privacy and cybersecurity controls.",
  "Prepare privacy awareness materials and support delivery of privacy training to staff.",
  "Evaluate regulatory, policy, and industry changes and update privacy guidance accordingly."
],

knowledge: [
  "Privacy laws and regulations such as GDPR, CCPA, HIPAA, and state/federal data protection requirements.",
  "Privacy principles, PII attributes, and data lifecycle management concepts.",
  "Enterprise privacy governance models, policies, and compliance frameworks.",
  "Privacy Impact Assessment (PIA) methodologies and best practices.",
  "Cybersecurity policies, risk management concepts, and security controls that support privacy.",
  "Organizational privacy policies, procedures, and information governance structures.",
  "Information privacy technologies and tools used for data discovery, consent management, and privacy monitoring."
],

skills: [
  "Ability to develop privacy policies, data governance procedures, and standard operating documentation.",
  "Skill in aligning privacy requirements with cybersecurity and organizational objectives.",
  "Ability to identify privacy compliance gaps and recommend mitigation strategies.",
  "Skill in preparing instructional or awareness materials and presenting privacy guidance to stakeholders.",
  "Strong communication and collaboration skills for working across legal, IT, security, and business teams."
],

skillKeywords: [
  "privacy compliance",
  "privacy impact assessment",
  "data governance",
  "regulatory compliance",
  "privacy policies",
  "PII protection",
  "privacy risk assessment"
],

education: "Bachelor’s degree in Information Security, Privacy Management, Law, Public Administration, Business, or a related field.",

preferredExperience: [
  "2–5 years of experience in privacy compliance, data governance, or related risk and regulatory functions.",
  "Experience conducting PIAs, reviewing data flows, and supporting privacy audits.",
  "Experience applying privacy frameworks such as ISO 27701, NIST Privacy Framework, or similar."
],

certifications: [
  "IAPP CIPM (Certified Information Privacy Manager)",
  "IAPP CIPP/US or CIPP/E",
  "ISO 27701 Lead Implementer",
  "CompTIA Security+ (for cybersecurity alignment)"
],

experienceRange: { min: 2, max: 5 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "privacy_compliance"
  },
  {
    // ===============================================================
// Role: Junior Security Control Assessor
// Skill IDs Used (from NICE):
// S0574 (developing security system controls)
// S0578 (evaluating security designs)
// S0878 (performing risk analysis)

// Skill Keywords (for test generation):
// ["security controls", "RMF", "control assessment", "risk analysis", "evidence collection", "security authorization", "compliance review"]
// ===============================================================

id: "9",
title: "Junior Security Control Assessor",

mainResponsibilities: [
  "Assist in performing security control assessments for systems undergoing authorization or major updates using Risk Management Framework (RMF) processes",
  "Collect evidence and documentation to support assessment of management, operational, and technical controls",
  "Support the review of system security plans, policies, procedures, and architectural documentation for compliance",
  "Help identify control gaps, deviations, and potential security weaknesses under senior guidance",
  "Perform basic risk analysis of assigned controls and support the development of mitigation recommendations",
  "Document assessment observations, deviations, and preliminary findings in accordance with RMF and Security Assessment and Authorization processes",
  "Assist in verifying that cybersecurity controls are implemented as described in system documentation",
  "Track remediation activities and update assessment records as systems progress through authorization steps",
  "Apply knowledge of fundamental cybersecurity concepts including threats, vulnerabilities, and security controls",
  "Collaborate with senior assessors, system owners, and engineering teams to support control evaluation and evidence validation"
],

overview: "The Junior Security Control Assessor supports the evaluation of security controls across enterprise systems and assists with Security Assessment and Authorization (SA&A) activities. Working under the guidance of senior assessors, this role helps collect evidence, review documentation, verify basic control implementations, and track findings to ensure systems comply with organizational security requirements and Risk Management Framework (RMF) standards.",

tasks: [
  "Assist in performing security control assessments for systems undergoing authorization or major updates.",
  "Collect evidence and documentation to support assessment of management, operational, and technical controls.",
  "Support the review of system security plans, policies, procedures, and architectural documentation.",
  "Help identify control gaps, deviations, and potential security weaknesses under senior guidance.",
  "Perform basic risk analysis of assigned controls and support the development of mitigation recommendations.",
  "Document assessment observations, deviations, and preliminary findings in accordance with RMF processes.",
  "Assist in verifying that cybersecurity controls are implemented as described in system documentation.",
  "Track remediation activities and update assessment records as systems progress through authorization steps."
],

knowledge: [
  "Fundamental cybersecurity concepts including threats, vulnerabilities, and security controls.",
  "Basic understanding of the Risk Management Framework (RMF) and Security Assessment and Authorization processes.",
  "Network security principles, networking fundamentals, and common enterprise architectures.",
  "Cybersecurity policies, regulations, and compliance requirements relevant to system authorization.",
  "Confidentiality, Integrity, and Availability (CIA) principles and how they apply to control assessment.",
  "Introductory understanding of vulnerability assessment tools, system documentation, and evidence validation."
],

skills: [
  "Ability to assist in evaluating security control designs and identifying control gaps.",
  "Skill in performing basic risk analysis of systems and proposed mitigations.",
  "Ability to support the development and documentation of security assessment findings.",
  "Skill in reviewing technical and non-technical system documentation for compliance.",
  "Strong communication and teamwork abilities for collaborating with senior assessors, system owners, and engineering teams."
],

skillKeywords: [
  "security controls",
  "RMF",
  "control assessment",
  "risk analysis",
  "evidence collection",
  "security authorization",
  "compliance review"
],

education: "Associate’s or Bachelor’s degree in Cybersecurity, Information Systems, Information Technology, or a related field.",

preferredExperience: [
  "0–2 years of experience in cybersecurity auditing, compliance, system security assessment, or related functions.",
  "Exposure to NIST RMF, ISO 27001, or similar governance and compliance frameworks.",
  "Familiarity with reviewing technical documentation such as SSPs, network diagrams, and configuration reports."
],

certifications: [
  "CompTIA Security+",
  "ISC2 Associate (toward CGRC or CISSP)",
  "ISO 27001 Foundation",
  "CompTIA CySA+ (nice-to-have)"
],

experienceRange: { min: 0, max: 2 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "security_control_assessment"
  },
  {
   // ===============================================================
// Role: Cybersecurity Architect
// Skill IDs Used (from NICE):
// S0418 (applying secure network architectures)
// S0428 (designing architectures)
// S0429 (designing frameworks)
// S0574 (developing security system controls)
// S0578 (evaluating security designs)
// S0673 (translating operational requirements into controls)
// S0762 (implementing network segregation)
// S0822 (integrating organizational objectives)

// Skill Keywords (for test generation):
// ["security architecture", "secure design", "risk management", "defense in depth", "network segmentation", "system security engineering", "architecture analysis"]
// ===============================================================

id: "10",
title: "Cybersecurity Architect",

mainResponsibilities: [
  "Design secure architectures for enterprise systems, applications, and networks based on business and mission requirements using systems security engineering principles",
  "Integrate organizational goals, risk objectives, and compliance requirements into security architecture decisions",
  "Define baseline security requirements and create system security contexts, models, and concepts of operations (ConOps)",
  "Perform architectural security reviews to identify gaps, inconsistencies, and weaknesses in systems and designs",
  "Evaluate the cybersecurity impact of new technologies, integrations, and system changes using threat analysis and risk assessment",
  "Develop security controls and secure design patterns aligned with defense-in-depth principles and multilayered design concepts",
  "Determine the effectiveness of cybersecurity design decisions and validate alignment with architecture standards and frameworks",
  "Prioritize critical capabilities and security controls required to protect essential business functions",
  "Implement network segmentation, secure network design patterns, and layered defensive architectures",
  "Collaborate with engineering, operations, and leadership teams to translate operational and mission requirements into actionable security architecture components",
  "Apply knowledge of enterprise cybersecurity architecture principles, CIA concepts, and data classification to ensure secure system development"
],

overview: "The Cybersecurity Architect ensures that security requirements are seamlessly integrated into enterprise architectures, systems, and services. This role designs secure frameworks, evaluates new and existing solutions for architectural weaknesses, and aligns security architecture decisions with organizational mission, business needs, and compliance obligations. The architect collaborates with engineering, operations, and leadership teams to build resilient, scalable, and secure technical environments.",

tasks: [
  "Design secure architectures for enterprise systems, applications, and networks based on business and mission requirements.",
  "Integrate organizational goals, risk objectives, and compliance requirements into security architecture decisions.",
  "Define baseline security requirements and create system security contexts and models.",
  "Perform architectural security reviews to identify gaps, inconsistencies, and weaknesses in systems and designs.",
  "Evaluate the cybersecurity impact of new technologies, integrations, and system changes.",
  "Develop system security concepts of operations (ConOps) and architectural documentation.",
  "Determine the effectiveness of cybersecurity design decisions and validate alignment with architecture standards.",
  "Prioritize critical capabilities and security controls required to protect essential business functions.",
  "Collaborate with engineering and operations to implement network segmentation, secure design patterns, and defense-in-depth strategies."
],

knowledge: [
  "Enterprise cybersecurity architecture principles, reference models, and multilayered design concepts.",
  "Systems security engineering (SSE) principles and secure system development practices.",
  "Confidentiality, Integrity, and Availability (CIA) concepts and non-repudiation principles.",
  "Cybersecurity threats, vulnerabilities, exploitation techniques, and adversarial characteristics.",
  "Network architecture, secure network design patterns, and segmentation strategies.",
  "Enterprise IT architecture frameworks, system engineering processes, and integration practices.",
  "Cyber defense tools, controls, and defense-in-depth principles.",
  "Risk management processes including identification, analysis, and prioritization of architectural risks.",
  "Data classification concepts, multilevel security requirements, and access control models.",
  "Cybersecurity policies, regulations, compliance requirements, and acquisition lifecycle security considerations."
],

skills: [
  "Ability to design secure architectures, frameworks, and system models aligned with organizational requirements.",
  "Skill in evaluating system and network designs to identify architectural risks and weaknesses.",
  "Ability to develop and implement security controls and secure design patterns.",
  "Skill in translating operational and mission requirements into actionable security architecture components.",
  "Skill in implementing network segmentation and layered defensive architectures.",
  "Ability to integrate business goals, mission needs, and technical constraints into architectural decisions.",
  "Strong collaboration skills for working with stakeholders across engineering, operations, and leadership teams."
],

skillKeywords: [
  "security architecture",
  "secure design",
  "risk management",
  "defense in depth",
  "network segmentation",
  "system security engineering",
  "architecture analysis"
],

education: "Bachelor’s degree in Cybersecurity, Computer Science, Information Technology, Software Engineering, or a related technical field.",

preferredExperience: [
  "3–6 years of experience in cybersecurity engineering, system design, or architecture-focused technical roles.",
  "Hands-on experience developing or reviewing secure system architectures, cloud architectures, or enterprise security designs.",
  "Experience with frameworks such as NIST CSF, NIST SP 800-160 (Systems Security Engineering), or Zero Trust Architecture models."
],

certifications: [
  "ISC2 CISSP (preferred)",
  "ISACA CISM (for governance alignment)",
  "Cisco CCNP Security or CCSP (for secure network architectures)",
  "AWS Solutions Architect – Security Specialty (for cloud-focused architects)",
  "SABSA Foundation (optional architecture-specific credential)"
],

experienceRange: { min: 3, max: 6 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "cybersecurity_architecture"
  },
  {
    id: "11",
title: "Secure Software Engineer",

mainResponsibilities: [
  "Develop secure, maintainable code aligned with secure coding standards and OWASP Top 10 vulnerability prevention",
  "Perform code reviews to identify vulnerabilities, weaknesses, and insecure coding patterns",
  "Integrate security requirements into application design and development workflows throughout the software development lifecycle (SDLC)",
  "Implement input validation, error handling, and encryption where needed using secure coding practices",
  "Conduct basic threat modeling and document application attack surfaces to identify potential security risks",
  "Use static analysis tools to detect and mitigate coding flaws and vulnerabilities",
  "Collaborate with engineering and security teams to ensure secure release processes and secure SDLC practices",
  "Apply knowledge of secure design patterns, cryptography basics, and secure data handling practices",
  "Debug software and translate requirements into secure design elements",
  "Maintain awareness of version control, build pipelines, and configuration management tools for secure deployment"
],

overview: "The Secure Software Engineer builds and maintains applications with strong secure coding practices. This role integrates security requirements into the software lifecycle, performs secure code reviews, and ensures applications follow secure design principles across development and deployment.",

tasks: [
  "Develop secure, maintainable code aligned with secure coding standards.",
  "Perform code reviews to identify vulnerabilities and weaknesses.",
  "Integrate security requirements into application design and development.",
  "Implement input validation, error handling, and encryption where needed.",
  "Conduct basic threat modeling and document application attack surfaces.",
  "Use static analysis tools to detect and mitigate coding flaws.",
  "Collaborate with engineering and security teams to ensure secure release processes."
],

knowledge: [
  "Secure coding principles and common vulnerabilities (e.g., OWASP Top 10).",
  "Software development lifecycle (SDLC) and secure SDLC concepts.",
  "Threat modeling basics and secure design patterns.",
  "Version control, build pipelines, and configuration management tools.",
  "Cryptography basics and secure data handling practices."
],

skills: [
  "Skill in applying secure coding practices and debugging software.",
  "Ability to implement input validation and secure error handling.",
  "Skill in performing static code analysis.",
  "Ability to translate requirements into secure design elements.",
  "Strong communication skills for working with engineering teams."
],

skillKeywords: [
  "secure coding",
  "software security",
  "input validation",
  "error handling",
  "static code analysis",
  "threat modeling",
  "secure SDLC"
],

education: "Bachelor’s in Computer Science, Software Engineering, Cybersecurity, or a related field.",

preferredExperience: [
  "2–5 years in software development or application security.",
  "Experience with SAST/DAST tools and secure SDLC practices."
],

certifications: [
  "GIAC GSSP",
  "CSSLP",
  "CompTIA PenTest+",
  "AWS or Microsoft Developer Certification"
],

experienceRange: { min: 2, max: 5 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "secure_software_development"
  },
  {
   // ===============================================================
// Role: Secure Systems Engineer
// Skill IDs Used (from NICE):
// S0543 (scanning for vulnerabilities)
// S0544 (recognizing vulnerabilities)
// S0574 (developing security system controls)
// S0578 (evaluating security designs)
// S0619 (auditing technical systems)
// S0674 (installing system and component upgrades)
// S0878 (risk analysis)

// Skill Keywords (for test generation):
// ["secure system design", "system hardening", "risk analysis", "vulnerability identification", "secure configuration", "system security testing", "secure SDLC"]
// ===============================================================

id: "12",
title: "Secure Systems Engineer",

mainResponsibilities: [
  "Design and implement secure system architectures and configurations for new and existing systems using security engineering principles",
  "Integrate cybersecurity requirements and security controls into system designs and development activities throughout the system life cycle",
  "Identify system vulnerabilities and assist in resolving security findings and configuration issues",
  "Perform security testing, validation, and basic system-level threat analysis using vulnerability assessment methods",
  "Develop system security documentation including design artifacts, configuration guides, and testing procedures",
  "Support secure system deployment, upgrades, and maintenance activities following system hardening concepts",
  "Collaborate with DevOps, engineering, and security teams to integrate secure development lifecycle practices",
  "Apply knowledge of secure configuration management, authentication, access control, and data protection mechanisms",
  "Audit technical systems and analyze system performance impacts of security controls",
  "Maintain awareness of common system vulnerabilities, secure system design patterns, and basic networking and operating system fundamentals"
],

overview: "The Secure Systems Engineer designs, develops, and maintains secure systems throughout the systems development life cycle. This role evaluates system security requirements, integrates secure configurations, performs vulnerability identification, and collaborates with engineering and operations teams to ensure systems meet security standards and operational needs.",

tasks: [
  "Design and implement secure system architectures and configurations for new and existing systems.",
  "Integrate cybersecurity requirements and security controls into system designs and development activities.",
  "Identify system vulnerabilities and assist in resolving security findings and configuration issues.",
  "Perform security testing, validation, and basic system-level threat analysis.",
  "Develop system security documentation including design artifacts, configuration guides, and testing procedures.",
  "Support secure system deployment, upgrades, and maintenance activities.",
  "Collaborate with DevOps, engineering, and security teams to integrate secure development lifecycle practices."
],

knowledge: [
  "Security engineering principles and system hardening concepts.",
  "Secure configuration management and system life cycle processes.",
  "Common system vulnerabilities and secure system design patterns.",
  "Basic networking and operating system fundamentals (Windows/Linux).",
  "System security testing, validation, and vulnerability assessment methods.",
  "Authentication, access control, and data protection mechanisms.",
  "Risk analysis concepts and security controls applicable to system development."
],

skills: [
  "Skill in designing and validating secure system configurations.",
  "Ability to identify system vulnerabilities and security gaps.",
  "Skill in developing and documenting system security controls.",
  "Ability to perform basic system-level risk analysis.",
  "Skill in auditing technical systems and analyzing system performance impacts.",
  "Strong collaboration and communication abilities across engineering and security teams."
],

skillKeywords: [
  "secure system design",
  "system hardening",
  "risk analysis",
  "vulnerability identification",
  "secure configuration",
  "system security testing",
  "secure SDLC"
],

education: "Bachelor’s degree in Information Technology, Cybersecurity, Systems Engineering, or related field.",

preferredExperience: [
  "2–5 years of experience in systems engineering, secure system development, or security-focused DevOps.",
  "Familiarity with system hardening benchmarks, secure deployment pipelines, and system validation techniques.",
  "Experience supporting system testing, integration, or security reviews."
],

certifications: [
  "CompTIA Security+",
  "CompTIA CySA+",
  "GIAC GSEC",
  "Microsoft or Linux systems engineering certifications (e.g., MSCA, RHCSA)"
],

experienceRange: { min: 2, max: 5 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "secure_systems_development"
  },
  {
    // ===============================================================
// Role: Software Security Analyst
// Skill IDs Used (from NICE):
// S0543 (scanning for vulnerabilities)
// S0544 (recognizing vulnerabilities)
// S0569 (designing secure test plans)
// S0655 (secure software design evaluation)
// S0825 (communicating with engineering staff)
// S0878 (performing risk analysis)
// S0883 (performing static code analysis)

// Skill Keywords (for test generation):
// ["application security", "secure code review", "static analysis", "threat modeling", "vulnerability analysis", "secure SDLC", "software risk assessment"]
// ===============================================================

id: "13",
title: "Software Security Analyst",

mainResponsibilities: [
  "Perform secure code reviews to identify vulnerabilities, insecure coding patterns, and common software vulnerabilities such as OWASP Top 10 and CWE/SANS Top 25",
  "Conduct vulnerability analysis of software components, patches, and updates using static and dynamic code analysis tools",
  "Integrate security requirements into application design and development workflows following secure SDLC practices",
  "Conduct threat modeling and document application attack surfaces to identify potential security risks",
  "Develop and execute security testing and validation procedures using secure test plans",
  "Perform static code analysis with manual and automated techniques to identify security flaws",
  "Prepare concise vulnerability analysis reports and remediation guidance for engineering teams",
  "Collaborate with developers and engineers to ensure secure software deployment and application-level risk mitigation",
  "Evaluate application security controls and communicate findings clearly to engineering teams",
  "Apply knowledge of secure software development principles, risk management, and software quality assurance practices"
],

overview: "The Software Security Analyst evaluates the security of applications through code review, threat modeling, vulnerability analysis, and validation of secure design practices. This role supports development teams by identifying weaknesses early in the SDLC and ensuring software meets security requirements before release.",

tasks: [
  "Perform secure code reviews to identify vulnerabilities and insecure coding patterns.",
  "Conduct vulnerability analysis of software components, patches, and updates.",
  "Integrate security requirements into application design and development workflows.",
  "Conduct threat modeling and document application attack surfaces.",
  "Develop and execute security testing and validation procedures.",
  "Prepare concise vulnerability analysis reports and remediation guidance.",
  "Collaborate with developers and engineers to ensure secure software deployment."
],

knowledge: [
  "Common software vulnerabilities (e.g., OWASP Top 10, CWE/SANS Top 25) and remediation techniques.",
  "Secure software development principles and secure SDLC practices.",
  "Threat modeling, attack surface analysis, and secure design concepts.",
  "Static and dynamic code analysis tools and methods.",
  "Basic networking, OS fundamentals, and application architecture concepts.",
  "Risk management principles and application-level risk analysis.",
  "Software quality assurance and secure deployment practices."
],

skills: [
  "Skill in recognizing software vulnerabilities and insecure coding patterns.",
  "Ability to perform static code analysis with manual and automated techniques.",
  "Skill in designing secure test plans and evaluating application security controls.",
  "Ability to communicate findings clearly to engineering teams.",
  "Skill in performing application-level risk analysis and recommending mitigations."
],

skillKeywords: [
  "application security",
  "secure code review",
  "static analysis",
  "threat modeling",
  "vulnerability analysis",
  "secure SDLC",
  "software risk assessment"
],

education: "Bachelor’s in Computer Science, Software Engineering, Cybersecurity, or a related field.",

preferredExperience: [
  "1–4 years of experience in application security, secure code review, or software development.",
  "Experience with SAST/DAST tools and secure development practices.",
  "Understanding of threat modeling techniques and vulnerability assessment workflows."
],

certifications: [
  "GIAC GWAPT or GSSP",
  "CompTIA PenTest+",
  "CSSLP (optional)",
  "Vendor secure development certifications (AWS/Azure/Google)"
],

experienceRange: { min: 1, max: 4 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "software_security_assessment"
  },
  {
    // ===============================================================
// Role: Systems Security Analyst
// Skill IDs Used (from NICE):
// S0483, S0543, S0544, S0574, S0578, S0667, S0674, S0688

// Skill Keywords (for test generation):
// ["system hardening", "vulnerability management", "security monitoring", "configuration management", "access control", "risk mitigation"]
// ===============================================================

id: "14",
title: "Systems Security Analyst",

mainResponsibilities: [
  "Scan systems for vulnerabilities and track remediation progress using vulnerability scanning and patching practices",
  "Review system configurations and identify security gaps or misconfigurations",
  "Support system hardening and apply security patches and updates to maintain secure configurations",
  "Monitor security events and assist in analyzing system-level alerts for security issues",
  "Update system security documentation and configuration records",
  "Recommend risk mitigation steps and basic system security improvements",
  "Evaluate basic security controls including access control and system-level security measures",
  "Analyze logs or system activity for security issues using Windows/Linux operating system fundamentals",
  "Apply knowledge of basic networking, firewall concepts, and configuration management practices",
  "Collaborate with system and security teams to maintain system security across enterprise environments"
],

overview: "The Systems Security Analyst helps ensure systems are securely configured, maintained, and monitored. This role supports vulnerability management, system hardening, access control validation, and the documentation of security operations across enterprise systems.",

tasks: [
  "Scan systems for vulnerabilities and track remediation progress.",
  "Review system configurations and identify security gaps or misconfigurations.",
  "Support system hardening and apply security patches and updates.",
  "Monitor security events and assist in analyzing system-level alerts.",
  "Update system security documentation and configuration records.",
  "Recommend risk mitigation steps and basic system security improvements."
],

knowledge: [
  "System security basics including access control, vulnerabilities, and secure configurations.",
  "Windows/Linux operating system fundamentals.",
  "Basic networking and firewall concepts.",
  "Vulnerability scanning, patching, and configuration management practices.",
  "Risk management and system-level security controls."
],

skills: [
  "Skill in identifying system vulnerabilities and misconfigurations.",
  "Ability to apply secure configuration updates and patches.",
  "Skill in evaluating basic security controls.",
  "Ability to analyze logs or system activity for security issues.",
  "Strong communication for working with system and security teams."
],

skillKeywords: [
  "system hardening",
  "vulnerability management",
  "security monitoring",
  "configuration management",
  "access control",
  "risk mitigation"
],

education: "Bachelor’s degree in Cybersecurity, IT, Computer Science, or a related field.",

preferredExperience: [
  "1–3 years in system administration or security operations.",
  "Experience with vulnerability scanners and basic system monitoring tools."
],

certifications: [
  "CompTIA Security+",
  "CompTIA CySA+",
  "GIAC GSEC"
],

experienceRange: { min: 1, max: 3 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "systems_security_analysis"
  },
  {
    // ===============================================================
// Role: Network Operations Analyst
// Skill IDs Used (from NICE):
// S0035 (routing schemas)
// S0424 (operating network equipment)
// S0575 (network contingency planning)
// S0583 (network security practices)
// S0615 (configuring network devices)
// S0682 (malware protection on networks)
// S0815 (troubleshooting network issues)

// Skill Keywords (for test generation):
// ["network monitoring", "routing", "switching", "network security", "firewalls", "vulnerability patching", "troubleshooting"]
// ===============================================================

id: "15",
title: "Network Operations Analyst",

mainResponsibilities: [
  "Monitor network performance and identify connectivity or latency issues using network monitoring methods and performance indicators",
  "Install, configure, and maintain routers, switches, firewalls, and other network devices",
  "Apply network patches and firmware updates to address vulnerabilities and maintain device security",
  "Troubleshoot network outages, device failures, and configuration issues using command-line tools for diagnostics",
  "Improve network security through proper device configuration, access controls, and secure network communication practices",
  "Support network backup, recovery, and failover testing procedures following network contingency planning",
  "Document network configurations, changes, and operational activities",
  "Apply knowledge of networking fundamentals including LAN, WAN, VLANs, routing, and switching",
  "Configure and maintain firewall concepts, VPNs, and network security practices",
  "Execute network troubleshooting using operating system basics and network equipment operations"
],

overview: "The Network Operations Analyst supports the planning, maintenance, monitoring, and security of enterprise network environments. This role ensures that network devices, connectivity, and communication paths are reliable, optimized, and protected against threats.",

tasks: [
  "Monitor network performance and identify connectivity or latency issues.",
  "Install, configure, and maintain routers, switches, firewalls, and other network devices.",
  "Apply network patches and firmware updates to address vulnerabilities.",
  "Troubleshoot network outages, device failures, and configuration issues.",
  "Assist in improving network security through proper device configuration and access controls.",
  "Support network backup, recovery, and failover testing procedures.",
  "Document network configurations, changes, and operational activities."
],

knowledge: [
  "Networking fundamentals including LAN, WAN, VLANs, routing, and switching.",
  "Firewall concepts, VPNs, and secure network communication practices.",
  "Basic cybersecurity principles and network threat concepts.",
  "Operating system basics and command-line tools for network troubleshooting.",
  "Network monitoring methods, performance indicators, and hardware/software components.",
  "Patch and configuration management for network devices."
],

skills: [
  "Skill in configuring routers, switches, and firewalls.",
  "Ability to troubleshoot network equipment and connectivity issues.",
  "Skill in applying network security practices and device hardening.",
  "Ability to execute command-line tools for diagnostics (e.g., traceroute, netstat).",
  "Skill in creating and testing network backup and recovery steps.",
  "Ability to read and update network documentation and diagrams."
],

skillKeywords: [
  "network monitoring",
  "routing",
  "switching",
  "network security",
  "firewalls",
  "vulnerability patching",
  "troubleshooting"
],

education: "Associate's or Bachelor’s degree in Information Technology, Networking, Cybersecurity, or related field.",

preferredExperience: [
  "1–3 years of hands-on experience with networking or network security.",
  "Experience working with enterprise routers, switches, and firewalls.",
  "Experience with network monitoring tools (e.g., SolarWinds, Zabbix, Splunk)."
],

certifications: [
  "CompTIA Network+",
  "Cisco CCNA",
  "CompTIA Security+"
],

experienceRange: { min: 1, max: 3 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "network_operations"
  },
  {
    // ===============================================================
// Role: Database Administrator
// Skill IDs Used (from NICE):
// S0586 (administering databases)
// S0545 (optimizing database performance)
// S0546 (designing data storage solutions)
// S0819 (retrieving/cataloging data)
// S0835 (data compilation and reporting)
// S0897 (secure distribution of data)

// Skill Keywords (for test generation):
// ["database administration", "SQL", "backup and recovery", "performance tuning", "data integrity", "db security", "database monitoring"]
// ===============================================================

id: "16",
title: "Database Security Analyst",

mainResponsibilities: [
  "Install, configure, and maintain database management systems (DBMS) using database administration skills",
  "Monitor database performance and apply tuning or optimization as needed",
  "Perform regular backups and support database recovery operations following data integrity and backup principles",
  "Implement data management standards, access controls, and security policies for secure data handling",
  "Plan for database capacity changes and future data growth using capacity planning strategies",
  "Troubleshoot database errors, performance issues, and integrity problems",
  "Document database procedures, configurations, and operational activities",
  "Design effective data storage structures using database schema design and indexing strategies",
  "Perform structured queries and automate database tasks using SQL fundamentals",
  "Implement data protection, access controls, and encryption to ensure secure distribution of data"
],

overview: "The Database Administrator manages and maintains secure, reliable, and efficient database systems. This role supports data storage, backup and recovery, performance tuning, and the implementation of data management standards across the organization.",

tasks: [
  "Install, configure, and maintain database management systems (DBMS).",
  "Monitor database performance and apply tuning or optimization as needed.",
  "Perform regular backups and support database recovery operations.",
  "Implement data management standards, access controls, and security policies.",
  "Plan for database capacity changes and future data growth.",
  "Troubleshoot database errors, performance issues, and integrity problems.",
  "Document database procedures, configurations, and operational activities."
],

knowledge: [
  "Database management system (DBMS) concepts and SQL fundamentals.",
  "Data integrity, backup, recovery, and storage principles.",
  "Basic cybersecurity principles and secure data handling practices.",
  "Database schema design, indexing, and optimization strategies.",
  "Capacity planning and performance monitoring for databases.",
  "Network and operating system basics related to database environments."
],

skills: [
  "Skill in administering and maintaining relational databases.",
  "Ability to optimize database performance and troubleshoot issues.",
  "Skill in designing effective data storage structures.",
  "Ability to perform structured queries and automate database tasks.",
  "Skill in implementing data protection, access controls, and encryption.",
  "Ability to prepare clear documentation and reporting."
],

skillKeywords: [
  "database administration",
  "SQL",
  "backup and recovery",
  "performance tuning",
  "data integrity",
  "db security",
  "database monitoring"
],

education: "Bachelor’s degree in Computer Science, Information Systems, IT, or a related field.",

preferredExperience: [
  "1–3 years of experience with database administration or data management.",
  "Experience with SQL-based relational databases (e.g., MySQL, PostgreSQL, SQL Server, Oracle).",
  "Familiarity with backup strategies, indexing, and database monitoring tools."
],

certifications: [
  "Microsoft SQL Server (MCSA)",
  "Oracle Database Associate",
  "CompTIA Data+",
  "AWS/Azure database specialty certifications (optional)"
],

experienceRange: { min: 1, max: 3 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "database_administration"
  },
  {
    // ===============================================================
// Role: Cybersecurity Systems Administrator
// Skill IDs Used (from NICE):
// S0472 (developing virtual machines)
// S0606 (administering operating systems)
// S0677 (optimizing system performance)
// S0678 (recovering failed systems)
// S0844 (managing account access rights)

// Skill Keywords (for test generation):
// ["system hardening", "patch management", "user access management", "server configuration", "backup and recovery", "os administration", "security monitoring"]
// ===============================================================

id: "17",
title: "Cybersecurity Systems Administrator",

mainResponsibilities: [
  "Install, configure, and update servers and operating systems (Windows/Linux) following system administration principles",
  "Maintain baseline system security and apply patches, updates, and configuration changes using system hardening and patch management practices",
  "Troubleshoot system issues, hardware failures, and software interoperability problems to optimize system performance",
  "Manage system and network user accounts, access rights, and authentication procedures following access control and password policy best practices",
  "Monitor server configurations and ensure compliance with security policies and organizational standards",
  "Perform system backups and support recovery operations using backup and recovery processes and redundancy techniques",
  "Document system configurations, procedures, and administrative activities",
  "Configure and maintain servers securely using virtualization tools and system imaging concepts",
  "Enforce access controls and manage user access management across enterprise systems",
  "Apply knowledge of network basics relevant to system connectivity and troubleshooting"
],

overview: "The Cybersecurity Systems Administrator is responsible for securely configuring, maintaining, and monitoring enterprise systems. This role manages user access, system updates, backups, and recovery processes while ensuring systems comply with organizational security policies.",

tasks: [
  "Install, configure, and update servers and operating systems (Windows/Linux).",
  "Maintain baseline system security and apply patches, updates, and configuration changes.",
  "Troubleshoot system issues, hardware failures, and software interoperability problems.",
  "Manage system and network user accounts, access rights, and authentication procedures.",
  "Monitor server configurations and ensure compliance with security policies.",
  "Perform system backups and support recovery operations when needed.",
  "Document system configurations, procedures, and administrative activities."
],

knowledge: [
  "System administration principles for Windows/Linux environments.",
  "Access control, authentication, and password policy best practices.",
  "Basic cybersecurity principles including system hardening and patch management.",
  "Virtualization tools and system imaging concepts.",
  "Backup and recovery processes and redundancy techniques.",
  "Network basics relevant to system connectivity and troubleshooting."
],

skills: [
  "Skill in administering and troubleshooting operating systems.",
  "Ability to configure and maintain servers securely.",
  "Skill in managing user accounts and enforcing access controls.",
  "Ability to develop, maintain, and restore system backups.",
  "Skill in optimizing system performance and resolving system failures."
],

skillKeywords: [
  "system hardening",
  "patch management",
  "user access management",
  "server configuration",
  "backup and recovery",
  "os administration",
  "security monitoring"
],

education: "Associate’s or Bachelor’s in Information Technology, Cybersecurity, Computer Science, or related field.",

preferredExperience: [
  "1–3 years of experience in system administration or IT operations.",
  "Experience with Active Directory, Linux administration, or virtualization platforms.",
  "Familiarity with system hardening guides (e.g., CIS Benchmarks)."
],

certifications: [
  "CompTIA Security+",
  "CompTIA Linux+ or Server+",
  "Microsoft or Linux system administration certifications"
],

experienceRange: { min: 1, max: 3 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "systems_administration"
  },
  {
   // ===============================================================
// Role: Cybersecurity Data Analyst
// Skill IDs Used (from NICE):
// S0109 (identifying hidden patterns)
// S0558 (developing algorithms)
// S0559 (data structure analysis)
// S0646 (descriptive statistics)
// S0649 (detecting anomalies)
// S0579 (report preparation)

// Skill Keywords (for test generation):
// ["data analysis", "anomaly detection", "metric development", "threat analytics", "data quality validation", "statistical analysis", "cybersecurity insights"]
// ===============================================================

id: "18",
title: "Cybersecurity Data Analyst",

mainResponsibilities: [
  "Collect, organize, and analyze security data from logs, alerts, and monitoring systems using data analysis and statistical methods",
  "Identify trends, patterns, and anomalies in security data to support threat detection and incident response",
  "Develop dashboards, reports, and visualizations to communicate security metrics and insights to stakeholders",
  "Support security operations by querying and correlating data from SIEM, EDR, and other security platforms",
  "Perform basic statistical analysis and data modeling to identify security risks and operational improvements",
  "Collaborate with security teams to translate data findings into actionable recommendations",
  "Maintain data quality, integrity, and documentation of analytical processes",
  "Apply knowledge of cybersecurity concepts, threat indicators, and security monitoring fundamentals",
  "Use data visualization tools and techniques to present complex security information clearly",
  "Support security metrics reporting and performance measurement initiatives"
],

overview: "The Cybersecurity Data Analyst analyzes data from multiple systems to identify trends, anomalies, and potential security or privacy risks. This role creates metrics, validates data quality, and translates complex datasets into actionable insights that strengthen the organization’s cybersecurity posture.",

tasks: [
  "Analyze security, system, and operational data to identify anomalies and patterns.",
  "Develop dashboards, metrics, and trend reports for cybersecurity teams and leadership.",
  "Assess data quality and validate source data before analysis.",
  "Define data requirements, standards, and collection procedures.",
  "Perform descriptive and statistical analysis to support threat detection and risk assessments.",
  "Prepare clear reports, summaries, and visualizations of analytical findings."
],

knowledge: [
  "Cybersecurity principles including threats, vulnerabilities, and risk concepts.",
  "Data analysis tools, statistical methods, and anomaly detection techniques.",
  "Data standards, quality assessment methods, and data lifecycle practices.",
  "Basic networking and system fundamentals relevant to cybersecurity datasets.",
  "Privacy principles and data handling requirements."
],

skills: [
  "Skill in detecting anomalies and hidden patterns in large datasets.",
  "Ability to develop algorithms or basic analytical workflows.",
  "Skill in applying descriptive statistics and data validation techniques.",
  "Ability to analyze data structures and identify inconsistencies.",
  "Skill in preparing written reports, summaries, and stakeholder briefings."
],

skillKeywords: [
  "data analysis",
  "anomaly detection",
  "metric development",
  "threat analytics",
  "data quality validation",
  "statistical analysis",
  "cybersecurity insights"
],

education: "Bachelor’s degree in Data Science, Cybersecurity, Computer Science, Information Systems, or a related field.",

preferredExperience: [
  "1–3 years of experience in data analysis, cybersecurity analytics, or security operations.",
  "Experience with analytical tools (e.g., Python, SQL, Excel, Power BI).",
  "Exposure to cybersecurity logs, telemetry, or incident datasets."
],

certifications: [
  "CompTIA Data+",
  "Google/AWS/Azure Data Analytics certifications",
  "ISC2 CC or Security+ (helpful for cybersecurity context)"
],

experienceRange: { min: 1, max: 3 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "cyber_data_analysis"
  },
  {
    // ===============================================================
// Role: Cybercrime Investigator
// Skill IDs Used (from NICE):
// S0589 (preserving digital evidence integrity)
// S0607 (collecting digital evidence)
// S0608 (processing digital evidence)
// S0609 (transporting/handling digital evidence)
// S0854 (data/log analysis)
// S0866 (threat analysis)
// S0890 (performing threat assessments)

// Skill Keywords (for test generation):
// ["digital evidence", "log analysis", "forensics", "chain of custody", "threat analysis", "intrusion investigation", "artifact examination"]
// ===============================================================

id: "19",
title: "Cybercrime Investigator",

mainResponsibilities: [
  "Investigate cybercrime incidents including fraud, data breaches, and unauthorized access using investigative techniques and forensic analysis",
  "Collect and preserve digital evidence following chain-of-custody procedures and legal requirements",
  "Analyze logs, network traffic, and system artifacts to identify perpetrators and reconstruct attack timelines",
  "Collaborate with law enforcement, legal teams, and internal stakeholders on cybercrime cases",
  "Prepare detailed investigation reports and documentation for legal proceedings and management review",
  "Conduct interviews and gather information from witnesses, victims, and suspects as needed",
  "Apply knowledge of cybercrime laws, regulations, and investigative procedures",
  "Use forensic tools and techniques to examine compromised systems and extract evidence",
  "Identify indicators of compromise and threat actor tactics, techniques, and procedures",
  "Maintain awareness of emerging cybercrime trends, attack methods, and investigative best practices"
],

overview: "The Cybercrime Investigator analyzes cybersecurity incidents and digital evidence to identify intrusion activity, assess impact, and support legal or incident response actions. This role examines logs, network data, and system artifacts to uncover malicious behavior while ensuring evidence is preserved and handled according to investigative standards.",

tasks: [
  "Collect, preserve, and process digital evidence while maintaining chain of custody.",
  "Analyze logs, network traffic, and system artifacts to identify intrusion activity.",
  "Determine relevance and evidentiary value of recovered data.",
  "Identify indicators of criminal activity, threat actor behaviors, or compromise patterns.",
  "Document investigation steps, findings, and preserved digital evidence.",
  "Support decisions on whether incidents require legal action or intelligence-focused handling.",
  "Prepare reports summarizing investigative findings and recommended next steps."
],

knowledge: [
  "Digital forensics fundamentals and evidence handling procedures.",
  "Chain of custody requirements and digital evidence preservation techniques.",
  "Cybersecurity threats, vulnerabilities, and intrusion behaviors.",
  "Network and log analysis concepts relevant to intrusion investigations.",
  "Laws and regulations related to privacy, cybercrime, and digital evidence.",
  "Basic malware behavior, system artifacts, and common attack patterns."
],

skills: [
  "Skill in preserving and collecting digital evidence without contamination.",
  "Ability to analyze logs, network data, or host artifacts to identify malicious activity.",
  "Skill in performing threat analysis and correlating event data.",
  "Ability to assess evidentiary relevance and identify key data elements.",
  "Skill in documenting investigative procedures and maintaining clear case records."
],

skillKeywords: [
  "digital evidence",
  "log analysis",
  "forensics",
  "chain of custody",
  "threat analysis",
  "intrusion investigation",
  "artifact examination"
],

education: "Bachelor’s degree in Cybersecurity, Digital Forensics, Computer Science, Criminal Justice (with cyber focus), or related field.",

preferredExperience: [
  "1–3 years in incident response, SOC analysis, or digital forensics.",
  "Experience handling digital evidence, log data, or intrusion investigation workflows.",
  "Exposure to forensic tools such as Autopsy, FTK, EnCase, or similar platforms."
],

certifications: [
  "CompTIA CySA+",
  "CompTIA Security+",
  "EC-Council CHFI (desirable)",
  "GIAC GCIH or GCFA (optional)"
],

experienceRange: { min: 1, max: 3 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "cybercrime_investigation"
  },
  {
   // =======================================================================
// Role: Digital Evidence Analyst
// Skill IDs Used (from NICE):
// S0589 (preserving digital evidence integrity)
// S0607 (collecting digital evidence)
// S0608 (processing digital evidence)
// S0854 (data/log analysis)
// S0856 (digital forensic analysis)
// S0866 (threat analysis)

// Skill Keywords (for test generation):
// ["digital forensics", "evidence preservation", "drive imaging", "file system analysis", "memory analysis", "artifact analysis", "chain of custody", "log analysis"]
// =======================================================================

id: "20",
title: "Digital Evidence Analyst",

mainResponsibilities: [
  "Collect, preserve, and process digital evidence from various sources following forensic best practices and chain-of-custody requirements",
  "Perform forensic analysis of digital media, including hard drives, mobile devices, and cloud storage",
  "Use forensic tools and techniques to extract, analyze, and document evidence for investigations",
  "Maintain evidence integrity and ensure proper handling throughout the investigative lifecycle",
  "Prepare detailed forensic reports and documentation for legal proceedings and case management",
  "Collaborate with investigators, legal teams, and law enforcement on evidence analysis and case support",
  "Apply knowledge of file systems, operating systems, and data recovery techniques",
  "Conduct analysis of logs, metadata, and system artifacts to support investigations",
  "Maintain forensic laboratory equipment, tools, and documentation standards",
  "Stay current with forensic methodologies, legal requirements, and emerging digital evidence sources"
],

overview: "The Digital Evidence Analyst collects, examines, and preserves digital artifacts from systems, networks, and media to support cybersecurity investigations. This role applies forensic techniques to identify relevant evidence, analyze data sources, and document findings while maintaining strict chain-of-custody procedures.",

tasks: [
  "Identify and acquire digital evidence from systems, drives, and network sources.",
  "Create forensically sound images of digital media.",
  "Analyze file systems, logs, memory, and artifacts to uncover malicious or suspicious activity.",
  "Recover deleted or concealed data from forensic images.",
  "Document the original condition of evidence and maintain complete chain-of-custody records.",
  "Prepare reports summarizing findings, methods used, and evidence relevance.",
  "Scan and validate digital media for malware or tampering.",
  "Determine the significance and evidentiary value of recovered data."
],

knowledge: [
  "Digital forensics principles, tools, and methodologies.",
  "File system structures, OS internals, and common forensic artifacts.",
  "Chain-of-custody requirements, evidence handling, and admissibility standards.",
  "Cybersecurity threats, vulnerabilities, and intrusion indicators.",
  "Memory analysis, disk imaging, and data carving concepts.",
  "Basic network forensics and log analysis fundamentals."
],

skills: [
  "Skill in preserving and collecting digital evidence without contamination.",
  "Ability to create and analyze forensic images.",
  "Skill in file system forensics and recovering deleted or hidden data.",
  "Skill in analyzing logs, artifacts, and memory dumps.",
  "Ability to generate clear technical reports based on evidence findings.",
  "Skill in identifying anomalies, indicators of compromise, or malicious behavior."
],

skillKeywords: [
  "digital forensics",
  "evidence preservation",
  "drive imaging",
  "file system analysis",
  "memory analysis",
  "artifact analysis",
  "chain of custody",
  "log analysis"
],

education: "Associate's or Bachelor's degree in Digital Forensics, Cybersecurity, Information Technology, or a related field.",

preferredExperience: [
  "Experience with forensic tools such as FTK, Autopsy, EnCase, X-Ways, or similar.",
  "Exposure to file system analysis, memory forensics, or host-based investigations.",
  "Hands-on experience with log analysis or threat investigation workflows."
],

certifications: [
  "CompTIA Security+",
  "CompTIA CySA+ (optional)",
  "CHFI (optional)",
  "GIAC GCFA or GCIH (optional)"
],

experienceRange: { min: 1, max: 3 },

weights: { skills: 0.40, knowledge: 0.30, tasks: 0.20, certifications: 0.05, education: 0.05 },

thresholdScore: 60,

testCategory: "digital_evidence_analysis"
  }
];

module.exports = jobRoles;
