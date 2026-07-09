# AI-Enabled Smart Ergonomic Chair

## Overview

AI-enabled Smart Ergonomic Chair developed to monitor employee posture, well-being, and productivity using IoT sensors and AI analytics.

Patent Application No.: 202641064060

---

## Features

- Posture Monitoring
- Productivity Analysis
- RFID Authentication
- Heart Rate Monitoring
- Temperature Monitoring
- Dashboard Analytics
- Hydration Reminder
- Adaptive Lumbar Support

---

## Technologies

- React.js
- Node.js
- Express.js
- MySQL
- Arduino Mega
- ESP32 (if applicable)
- Python
- IoT Sensors

---

## Dashboard

<img width="1896" height="890" alt="Screenshot 2026-07-09 210626" src="https://github.com/user-attachments/assets/26da39f1-0844-4a2e-b854-7316da44c933" />
<img width="1911" height="893" alt="Screenshot 2026-07-09 210719" src="https://github.com/user-attachments/assets/9e393cab-fbcb-4da8-8ae4-af34fc6145ec" />
<img width="1918" height="883" alt="Screenshot 2026-07-09 210747" src="https://github.com/user-attachments/assets/e9175628-21a5-4d80-81c0-01c22e0ecddd" />


---

## Hardware

<img width="1121" height="1403" alt="AI ENABLED SMART ERGONOMIC CHAIR" src="https://github.com/user-attachments/assets/a7bb8977-6983-42f5-a34f-3f794dcab8f9" />


---

## System Architecture
START
  ↓
User sits on chair
  ↓
RFID card tapped
  ↓
RC522 reads user ID
  ↓
User identified from database
  ↓
User profile loaded
(height, weight, settings)
  ↓
Lumbar actuator adjusts automatically
  ↓
Footrest adjusts automatically
  ↓
Sensors start monitoring
  ↓
Flex sensor detects spine bending
RFID Authentication
        ↓
User Identification
        ↓
Sensor Data Collection
        ↓
Posture Analysis
        ↓
Automatic Ergonomic Adjustment
        ↓
Vibration & Cooling Control
        ↓
Hydration Monitoring
        ↓
Dashboard Analytics
FINAL WORK FLOW OF THE ENTIRE SYSTEM(DETAILED)
Work flow of the system
10 May 2026 18:47
   New Section 1 Page 1   
Flex sensor detects spine bending
↓
MPU6050 detects body tilt
↓
FSR sensors detect pressure distribution
↓
DHT11 measures temperature
↓
MAX30102 monitors heart rate
↓
Load cell measures water bottle weight
↓
Arduino Mega collects all sensor data
↓
Posture score calculated
↓
Is posture bad?
↓
YES --------------------→ NO
↓                         
↓
Vibration alert ON        
↓
Continue monitoring
Lumbar support adjusts
↓
Footrest support adjusts
↓
Temperature > Threshold?
↓
YES --------------------→ NO
↓                         
↓
Cooling fans ON           
↓
Hydration monitoring
↓
Fans OFF
Has user consumed water?
↓
NO for 1 hour
↓
Hydration reminder sent
to employee mobile/dashboard
↓
All data stored in database
↓
Dashboard displays:
• posture score
• heart rate
• temperature
• water intake
• user analytics
↓
ENDLESS REAL-TIME MONITORING
---

## Patent

Patent Application No. 202641064060

---

## Team

Team Vision
