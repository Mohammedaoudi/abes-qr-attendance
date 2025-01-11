# ENSAJ Attendance Management System 📚

<div align="center">

![ENSAJ Logo](https://raw.githubusercontent.com/yourusername/ensaj-attendance-system/main/frontend/public/logo.png)

[![Made with MERN](https://img.shields.io/badge/Made%20with-MERN-blue.svg)](https://www.mongodb.com/mern-stack)
[![License](https://img.shields.io/badge/License-Academic-green.svg)](LICENSE)
[![Version](https://img.shields.io/badge/Version-1.0.0-red.svg)](VERSION)

</div>

## 🌟 Overview

A modern, QR code-based attendance management system built for ENSAJ (École Nationale des Sciences Appliquées d'El Jadida). This system streamlines the attendance tracking process through an intuitive web interface for administrators and professors, complemented by a mobile application for students.

<div align="center">

![System Overview](https://raw.githubusercontent.com/yourusername/ensaj-attendance-system/main/docs/images/overview.png)

</div>

## ✨ Key Features

### For Administrators 👨‍💼
- Comprehensive dashboard with real-time statistics
- User management (students, professors)
- Course and schedule management
- Access to attendance reports and analytics
- Department and class management

### For Professors 👨‍🏫
- QR code generation for class sessions
- Real-time attendance tracking
- Course schedule viewing
- Student attendance history
- Export attendance reports

### For Students 📱
- Mobile app for QR code scanning
- View personal attendance records
- Check class schedules
- Real-time attendance confirmation

## 🛠️ Technology Stack

<div align="center">

| Technology | Purpose |
|------------|---------|
| ![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white) | Database |
| ![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge) | Backend Framework |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Frontend Web |
| ![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white) | Runtime Environment |
| ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) | Mobile App |

</div>

## 🗂️ Project Structure

```
abes-qr-attendance/
├── backend/              # Server-side code
│   ├── config/          # Configuration files
│   ├── controllers/     # Request handlers
│   ├── models/         # Database models
│   ├── routes/         # API routes
│   └── middleware/     # Custom middleware
├── web/                # React web application
│   ├── public/         # Static files
│   └── src/            # Source files
│       ├── components/ # React components
│       ├── pages/      # Page components
│       ├── context/    # React context
│       └── utils/      # Utility functions
└── mobile/             # React Native mobile app
    ├── src/            # Source files
    ├── android/        # Android specific files
    └── ios/            # iOS specific files
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn
- React Native environment setup (for mobile development)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ensaj-attendance-system.git
cd ensaj-attendance-system
```

2. **Set up environment variables**

Create `.env` files in both backend and frontend directories:

Backend `.env`:
```env
PORT=5000
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Frontend `.env`:
```env
REACT_APP_API_URL=http://localhost:5000
```

3. **Install dependencies and start the servers**

```bash
# Backend setup
cd backend
npm install
npm start

# Web setup
cd web
npm install
npm start

# Mobile setup
cd mobile
npm install
npx react-native run-android  # or run-ios
```

## 📱 Mobile App Screenshots

<div align="center">
<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/yourusername/ensaj-attendance-system/main/docs/images/login.png" alt="Login Screen" width="200"/></td>
    <td><img src="https://raw.githubusercontent.com/yourusername/ensaj-attendance-system/main/docs/images/scanner.png" alt="QR Scanner" width="200"/></td>
    <td><img src="https://raw.githubusercontent.com/yourusername/ensaj-attendance-system/main/docs/images/dashboard.png" alt="Dashboard" width="200"/></td>
  </tr>
</table>
</div>

## 🖥️ Web Interface Screenshots

<div align="center">
<table>
  <tr>
    <td><img src="https://raw.githubusercontent.com/yourusername/ensaj-attendance-system/main/docs/images/admin-dashboard.png" alt="Admin Dashboard" width="400"/></td>
    <td><img src="https://raw.githubusercontent.com/yourusername/ensaj-attendance-system/main/docs/images/professor-view.png" alt="Professor View" width="400"/></td>
  </tr>
</table>
</div>

## 📊 System Architecture

<div align="center">

![Architecture Diagram](https://raw.githubusercontent.com/yourusername/ensaj-attendance-system/main/docs/images/architecture.png)

</div>

## 👥 Contributors

<div align="center">

| <img src="https://github.com/bessamadam.png" width="100" height="100" alt="Adam"/><br>**BESSAM Adam**<br>*Backend Lead* | <img src="https://github.com/chouaywalid.png" width="100" height="100" alt="Walid"/><br>**CHOUAY Walid**<br>*Frontend Lead* | <img src="https://github.com/daoudimohammed.png" width="100" height="100" alt="Mohammed"/><br>**DAOUDI Mohammed**<br>*Mobile Lead* |
|:---:|:---:|:---:|

</div>

## 📄 License

This project is part of an academic project at ENSAJ (2023-2024) and is licensed under the terms of academic usage.

## 🙏 Acknowledgments

Special thanks to:
- Prof. EL BOUJNOUNI Mohamed for project supervision
- ENSAJ administration for their support
- All testers and early adopters

---

<div align="center">

Made with ❤️ by Team 2ITE | ENSAJ 2023-2024

[Report Bug](https://github.com/yourusername/ensaj-attendance-system/issues) · [Request Feature](https://github.com/yourusername/ensaj-attendance-system/issues)

</div>