/**
 * KausalyaDrishti — Central Training Centre Mock Data Repository
 * Realistic PMKK & PMKVY centers across Karnataka and Pan-India
 */

export const TRAINING_CENTRES = [
  {
    id: "TC-KA-BLR-042",
    name: "Electronic City PMKK Skill Hub",
    district: "Bengaluru Urban",
    state: "Karnataka",
    scheme: "PMKVY 4.0 - Special Projects",
    trade: "Solar PV Installer & Electrician (Level 4)",
    room: "Lab 102 - Practical Electrical Bay",
    sanctionedCapacity: 45,
    biometricClaimed: 42,
    defaultAiDetected: 1, // Will be overridden dynamically by real webcam
    trainer: {
      id: "TR-8921",
      name: "Rajesh Kumar N",
      certNumber: "MSDE-TOT-2024-8819",
      present: true
    },
    sanctionedEquipment: [
      { id: "EQ-01", name: "Electrician Testing Workbench", required: 6, detected: 6, status: "COMPLIANT" },
      { id: "EQ-02", name: "Digital Multimeter (CAT III)", required: 12, detected: 12, status: "COMPLIANT" },
      { id: "EQ-03", name: "Solar PV Cell Demonstration Rig", required: 2, detected: 2, status: "COMPLIANT" },
      { id: "EQ-04", name: "CO2 Industrial Fire Extinguisher", required: 1, detected: 1, status: "COMPLIANT" },
      { id: "EQ-05", name: "Wall-Mounted First Aid Kit (Type A)", required: 1, detected: 1, status: "COMPLIANT" }
    ],
    grantAmount: 1850000,
    grantStatus: "UNDER_AUDIT",
    lastHeartbeat: "Just now"
  },
  {
    id: "TC-KA-MYS-018",
    name: "Chamundi Vocational Training Academy",
    district: "Mysuru",
    state: "Karnataka",
    scheme: "PMKVY 4.0 - STT",
    trade: "CNC Machinist & Lathe Operator",
    room: "Heavy Machinery Bay 1",
    sanctionedCapacity: 35,
    biometricClaimed: 35,
    defaultAiDetected: 34,
    trainer: {
      id: "TR-4412",
      name: "Suresh Gowda",
      certNumber: "MSDE-TOT-2023-4122",
      present: true
    },
    sanctionedEquipment: [
      { id: "EQ-11", name: "CNC Lathe Training Unit", required: 4, detected: 4, status: "COMPLIANT" },
      { id: "EQ-12", name: "Industrial Safety Goggles & Helmets", required: 35, detected: 35, status: "COMPLIANT" },
      { id: "EQ-13", name: "Emergency Stop Circuit Bar", required: 2, detected: 2, status: "COMPLIANT" }
    ],
    grantAmount: 2200000,
    grantStatus: "AUTO_APPROVED",
    lastHeartbeat: "2 mins ago"
  },
  {
    id: "TC-KA-HUB-088",
    name: "Hubballi-Dharwad Industrial Training Institute",
    district: "Dharwad",
    state: "Karnataka",
    scheme: "PMKK Hub",
    trade: "Automotive Service Technician",
    room: "Engine Diagnostics Floor",
    sanctionedCapacity: 40,
    biometricClaimed: 39,
    defaultAiDetected: 21, // Severe discrepancy!
    trainer: {
      id: "TR-9004",
      name: "Basavaraj Patil",
      certNumber: "MSDE-TOT-2022-1002",
      present: false // Trainer missing!
    },
    sanctionedEquipment: [
      { id: "EQ-21", name: "Four-Post Hydraulic Vehicle Lift", required: 2, detected: 1, status: "DEFICIT" },
      { id: "EQ-22", name: "OBD-II Engine Scanner Kit", required: 4, detected: 2, status: "DEFICIT" },
      { id: "EQ-23", name: "Exhaust Extraction System", required: 1, detected: 0, status: "DEFICIT" }
    ],
    grantAmount: 2600000,
    grantStatus: "SUSPENDED",
    lastHeartbeat: "5 mins ago"
  },
  {
    id: "TC-KA-KLB-031",
    name: "Kalyana Karnataka Skill Center",
    district: "Kalaburagi",
    state: "Karnataka",
    scheme: "PMKVY 4.0 - STT",
    trade: "Sewing Machine Operator & Apparel",
    room: "Apparel Workshop A",
    sanctionedCapacity: 30,
    biometricClaimed: 28,
    defaultAiDetected: 28,
    trainer: {
      id: "TR-7110",
      name: "Farida Begum",
      certNumber: "MSDE-TOT-2024-3112",
      present: true
    },
    sanctionedEquipment: [
      { id: "EQ-31", name: "Single Needle Lockstitch Machines", required: 25, detected: 25, status: "COMPLIANT" },
      { id: "EQ-32", name: "Fabric Cutting Table (4x8 ft)", required: 2, detected: 2, status: "COMPLIANT" }
    ],
    grantAmount: 1200000,
    grantStatus: "AUTO_APPROVED",
    lastHeartbeat: "1 min ago"
  },
  {
    id: "TC-KA-MNG-062",
    name: "Mangalore Coastal Maritime & Logistic Skills",
    district: "Dakshina Kannada",
    state: "Karnataka",
    scheme: "PMKK Center",
    trade: "Warehouse & Forklift Operations",
    room: "Logistics Simulation Room",
    sanctionedCapacity: 30,
    biometricClaimed: 29,
    defaultAiDetected: 23,
    trainer: {
      id: "TR-6512",
      name: "Prashanth Shetty",
      certNumber: "MSDE-TOT-2023-9981",
      present: true
    },
    sanctionedEquipment: [
      { id: "EQ-41", name: "Forklift Virtual Simulator Rig", required: 2, detected: 2, status: "COMPLIANT" },
      { id: "EQ-42", name: "Barcode Handheld Scanners", required: 10, detected: 8, status: "DEFICIT" }
    ],
    grantAmount: 1950000,
    grantStatus: "FLAGGED_FOR_INSPECTION",
    lastHeartbeat: "4 mins ago"
  }
];

export const NATIONAL_MSDE_STATS = {
  totalCentresMonitored: 14820,
  activeCameraStreams: 14310,
  verifiedAttendanceRate: "92.4%",
  ghostTraineesDetected: 3842,
  disbursementSavedCr: "₹ 51.6 Cr",
  smartContractsActive: 1290,
  lastAuditSync: "05 Oct 2026, 00:00 IST"
};
