export interface Project {
  id: string;
  title: string;
  category: 'Robotics & ROS' | 'AI / ML' | 'Embedded Systems' | 'Android / Apps';
  badge: string;
  description: string;
  longDescription?: string;
  tags: string[];
  metrics?: { label: string; value: string }[];
  hardware?: string[];
  link: string;
  linkText: string;
  featured: boolean;
  architectureDiagram?: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  skills: { name: string; level: number; category: string }[];
}

export interface ExperienceItem {
  period: string;
  title: string;
  organization: string;
  location: string;
  description: string;
  highlights: string[];
  type: 'education' | 'diploma' | 'work';
}

export interface ResearchItem {
  id: string;
  title: string;
  venue: string;
  year: string;
  abstract: string;
  tags: string[];
  link?: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  content: string;
}

export const PERSONAL_INFO = {
  name: "Purvik Prajapati",
  role: "Robotics & Embedded Systems Engineer",
  subtitles: [
    "Robotics & Embedded Systems Engineer",
    "ESP32-S3 Hardware Architect",
    "Open Hardware & ROS 2 Developer"
  ],
  bio: "I design, build, and program intelligent robotic systems &mdash; from autonomous drones and warehouse automation to embedded IoT hardware. Focused on applying edge AI and ROS for real-world hardware control.",
  location: "Surat, Gujarat, India 🇮🇳",
  email: "sumritprajapati@gmail.com",
  phone: "+91 9173243905",
  socials: {
    github: "https://github.com/purvik08",
    linkedin: "https://linkedin.com/in/purvik-prajapati",
    instagram: "https://instagram.com/purvik_06",
  },
  resumePath: "/Resume/Purvik-Resume-2.1.pdf",
};

export const PROJECTS: Project[] = [
  {
    id: "esp32-drone",
    title: "ESP32-S3 Drone Project",
    category: "Robotics & ROS",
    badge: "Flagship Hardware",
    description: "An ESP32-S3 driven quadcopter capable of camera vision and running onboard ROS nodes for real-time flight telemetry and autonomous control.",
    longDescription: "Engineered from scratch using custom KiCad PCB designs, integrated electronic speed controllers (ESCs), IMU sensor fusion, and Wi-Fi telemetry stream. Capable of onboard camera vision processing and ROS 2 node communication.",
    tags: ["ESP32-S3", "ROS 2", "Camera Vision", "KiCad PCB", "PID Control", "C++"],
    metrics: [
      { label: "Flight Time", value: "~20 Mins" },
      { label: "Control Latency", value: "<12 ms" },
      { label: "MCU Frequency", value: "240 MHz Dual-Core" }
    ],
    hardware: ["ESP32-S3", "MPU6050 IMU", "Custom ESCs", "OV2640 Camera"],
    link: "https://www.linkedin.com/posts/purvik-prajapati_pcbdesign-kicad-esp32-share-7484610576011325440-fkg6/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUJEB8Bg5erV5URqn053dPk1M2DHZbKgjs",
    linkText: "View on LinkedIn",
    featured: true,
    architectureDiagram: "ESP32-S3 MCU ──(SPI/I2C)──> IMU & Camera ──(Wi-Fi/UDP)──> ROS Node Host"
  },
  {
    id: "warehouse-automation",
    title: "Warehouse Automation System",
    category: "Robotics & ROS",
    badge: "ROS System",
    description: "Multi-robot warehouse automation system implemented with ROS for communication, path planning, and real-time monitoring. Features mobile robots, robotic arms, and ESP32 QR readers.",
    longDescription: "Complete automated material handling architecture featuring ROS navigation stack for mobile robots, 4-DOF robotic arm manipulation, wireless ESP32 QR readers, and a real-time web dashboard for warehouse inventory control.",
    tags: ["ROS 2", "Mobile Robot", "Robotic Arm", "ESP32", "QR Reader", "Web Dashboard"],
    metrics: [
      { label: "Scan Speed", value: "300 ms" },
      { label: "Path Accuracy", value: "98.5%" },
      { label: "Nodes Connected", value: "8 ROS Nodes" }
    ],
    hardware: ["Differential Drive Base", "Robotic Arm", "ESP32 QR Scanner", "Webcam"],
    link: "https://github.com/purvik08/Warehouse",
    linkText: "View on GitHub",
    featured: true,
    architectureDiagram: "Mobile AGV ──(ROS Topic)──> Central Coordinator ──(MQTT)──> Web UI & QR Reader"
  },
  {
    id: "esp32-smart-display",
    title: "ESP32 Smart Display System",
    category: "Embedded Systems",
    badge: "Embedded Systems",
    description: "Smart multi-display hardware array supporting up to 8 displays driven over a single ESP32-S3 microcontroller with customizable layout buses.",
    longDescription: "Designed an efficient multi-drop SPI/I2C multiplexing system allowing an ESP32-S3 to control up to 8 independent TFT/OLED display panels concurrently with minimal memory overhead.",
    tags: ["ESP32-S3", "Multi-Display", "SPI / I2C Bus", "C++", "FreeRTOS", "Hardware Design"],
    metrics: [
      { label: "Max Displays", value: "8 Panels" },
      { label: "Refresh Rate", value: "60 FPS" },
      { label: "SPI Clock", value: "40 MHz" }
    ],
    hardware: ["ESP32-S3", "ST7789 TFT Displays", "PCA9548A Multiplexer"],
    link: "https://github.com/purvik08/MobileDisplay",
    linkText: "View on GitHub",
    featured: true,
    architectureDiagram: "ESP32-S3 Master ──(40MHz SPI Bus)──> Multiplexer ──> [Display 1...8]"
  },
  {
    id: "smart-display-app",
    title: "App for Smart Display",
    category: "Android / Apps",
    badge: "Android App",
    description: "Production-ready Java Android app built in Android Studio for controlling ESP32-S3 multi-display hardware setups wirelessly over local Wi-Fi.",
    longDescription: "Developed an Android interface allowing real-time layout creation, color mapping, text pushing, and sensor telemetry monitoring to an ESP32-S3 multi-display cluster over Wi-Fi sockets.",
    tags: ["Java", "Android Studio", "Wi-Fi Sockets", "ESP32-S3", "Android SDK"],
    metrics: [
      { label: "Response Time", value: "<15 ms" },
      { label: "Min Android SDK", value: "API 24" }
    ],
    hardware: ["Android Device", "ESP32-S3 Target"],
    link: "https://github.com/purvik08/AppForSmartDisplay",
    linkText: "View on GitHub",
    featured: true
  },
  {
    id: "virtual-hand-mouse",
    title: "Virtual Hand Mouse",
    category: "AI / ML",
    badge: "Computer Vision",
    description: "Control your Windows PC cursor entirely using real-time hand gestures captured via webcam. Built with Python 3.12, MediaPipe, OpenCV, and PyAutoGUI.",
    longDescription: "Real-time hand tracking pipeline capturing 21 3D hand landmarks via MediaPipe. Converts index finger positioning and gesture triggers (pinch, click, drag, scroll) directly into OS mouse input.",
    tags: ["Python 3.12", "MediaPipe", "OpenCV", "PyAutoGUI", "Hand Tracking"],
    metrics: [
      { label: "Tracking FPS", value: "60 FPS" },
      { label: "Landmarks Tracked", value: "21 Points" },
      { label: "Gesture Accuracy", value: "97%" }
    ],
    hardware: ["HD Webcam", "Windows Workstation"],
    link: "https://github.com/purvik08/virtual_hand_mouse",
    linkText: "View on GitHub",
    featured: true
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Robotics & Control Systems",
    icon: "Bot",
    skills: [
      { name: "ROS / ROS 2", level: 85, category: "Framework" },
      { name: "PID Flight Stabilization", level: 88, category: "Algorithm" },
      { name: "Kinematics & Path Planning", level: 80, category: "Math" },
      { name: "PLC Programming", level: 82, category: "Industrial" },
      { name: "Robotic Arm Control", level: 84, category: "Actuation" }
    ]
  },
  {
    title: "AI / ML & Computer Vision",
    icon: "Brain",
    skills: [
      { name: "Python 3.12", level: 90, category: "Language" },
      { name: "OpenCV", level: 88, category: "Vision" },
      { name: "MediaPipe", level: 85, category: "Tracking" },
      { name: "TensorFlow / Keras", level: 75, category: "Deep Learning" },
      { name: "Edge AI / Model Quantization", level: 78, category: "Embedded AI" }
    ]
  },
  {
    title: "Embedded Systems & Hardware",
    icon: "Cpu",
    skills: [
      { name: "ESP32 & ESP32-S3", level: 95, category: "Microcontroller" },
      { name: "Embedded C / C++", level: 90, category: "Language" },
      { name: "KiCad & PCB Design", level: 82, category: "EDA" },
      { name: "FreeRTOS", level: 80, category: "RTOS" },
      { name: "Protocols (I2C, SPI, UART, MQTT)", level: 92, category: "Communication" }
    ]
  },
  {
    title: "Software & App Development",
    icon: "Code",
    skills: [
      { name: "Java & Android Studio", level: 80, category: "Mobile" },
      { name: "Linux / Ubuntu System Administration", level: 85, category: "OS" },
      { name: "Git & GitHub Workflow", level: 90, category: "VCS" },
      { name: "Web Dashboard UI (HTML/CSS/JS)", level: 85, category: "Frontend" }
    ]
  }
];

export const EXPERIENCES: ExperienceItem[] = [
  {
    period: "2024 – 2027 (Current)",
    title: "B.Tech in Computer Science Engineering",
    organization: "Specialization: Artificial Intelligence & Machine Learning",
    location: "Surat, Gujarat, India",
    description: "Focusing on advanced machine learning algorithms, computer vision architectures, deep learning models, data structures, and edge computing for autonomous systems.",
    highlights: [
      "Specialized coursework in Deep Learning, Computer Vision, and Robotics Navigation",
      "Designing on-device ROS nodes for microcontrollers",
      "Developing Python gesture recognition pipelines for hardware control"
    ],
    type: "education"
  },
  {
    period: "2021 – 2024 (Completed)",
    title: "Diploma in Automation & Robotics",
    organization: "Industrial Robotics & Control Systems",
    location: "Surat, Gujarat, India",
    description: "Hands-on engineering diploma covering industrial automation, programmable logic controllers (PLC), pneumatic & hydraulic actuation, and microcontroller circuit design.",
    highlights: [
      "Graduated with top practical honors in hardware integration",
      "Built multi-axis robotic arms and conveyor automation rigs",
      "Mastered circuit soldering, schematic design, and sensor calibration"
    ],
    type: "diploma"
  }
];

export const RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: "res-1",
    title: "On-Device ROS 2 Microcontroller Nodes in Resource-Constrained Drones",
    venue: "Hardware & Autonomous Systems Research",
    year: "2025",
    abstract: "Exploring lightweight micro-ROS execution on dual-core ESP32-S3 architectures, evaluating UDP flight telemetry latency and hardware IMU sensor fusion under tight memory constraints.",
    tags: ["ESP32-S3", "micro-ROS", "IMU Fusion", "PID Telemetry"]
  },
  {
    id: "res-2",
    title: "Low-Latency Hand Gesture Mouse Mapping via MediaPipe & OpenCV Pipeline",
    venue: "Human-Computer Interaction Research",
    year: "2024",
    abstract: "Investigating 60FPS webcam gesture translation into OS cursor input using 21 3D hand landmark vectors, achieving 97% gesture detection accuracy with zero specialized hardware.",
    tags: ["Computer Vision", "MediaPipe", "Human-Computer Interaction", "Python"]
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "building-esp32-s3-ros-drone",
    title: "Building an ESP32-S3 Autonomous Drone with ROS 2 Integration",
    excerpt: "A deep dive into custom KiCad PCB layout, PID flight stabilization loop tuning, and running onboard ROS nodes on a dual-core microcontroller.",
    date: "2026-02-15",
    readTime: "6 min read",
    category: "Robotics",
    content: "Building an autonomous quadcopter requires tight integration between sensor hardware and real-time control software..."
  },
  {
    slug: "multi-display-spi-bus-optimization",
    title: "Driving 8 TFT Displays concurrently over a Single ESP32-S3 SPI Bus",
    excerpt: "How to use hardware multiplexers and FreeRTOS task scheduling to achieve 60FPS refresh rates across 8 independent displays.",
    date: "2026-01-10",
    readTime: "5 min read",
    category: "Embedded",
    content: "When driving multiple display screens from a single microcontroller, memory bandwidth quickly becomes the primary bottleneck..."
  }
];
