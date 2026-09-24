<img width="1487" height="731" alt="image" src="https://github.com/user-attachments/assets/263d6d67-751e-4157-80ab-7368597a7387" />﻿# 🎬 ChalChitra

> A modern, dynamic entertainment platform for browsing Movies, Web Series, and Trailers with a fully functional Admin Dashboard.

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

---

## 🚀 About the Project
**ChalChitra** is a centralized platform designed to help users explore localized entertainment content seamlessly. It features a responsive UI, multi-language support, inline trailer playback, and a secure admin panel for content management. 

The project follows a strict **Separation of Concerns** architecture, isolating DOM manipulation from external API calls using Vanilla JavaScript and a mock REST API.

## ✨ Key Features
* 🌍 **Multi-Lingual Interface:** Switch instantly between English, Hindi (हिन्दी), and Telugu (తెలుగు).
* 🔍 **Smart Filtering & Sorting:** Filter content by genres, types (Web Series, Cartoons, Short Films), and sort by Ratings or Upload Date.
* 📺 **Inline Trailer Playback:** Watch YouTube trailers directly on the platform without being redirected.
* ❤️ **User Personalization:** Secure sign-in to manage personal **Watchlists** and **Favorite Movies**.
* ⚙️ **Admin Dashboard:** Secure portal to perform full CRUD operations (Add, Edit, Delete) on the movie database.
* 🛡️ **Robust Error Handling:** Centralized API exception handling for reliable network requests.

## 🛠️ Tech Stack
* **Frontend:** HTML5, CSS3, Vanilla JavaScript (ES6 features)
* **API Communication:** Axios
* **Backend / Database:** JSON Server (Mock REST API)

## 📂 Project Structure
`	ext
ChalChitra/
├── assets/          # Images, Backgrounds, and Icons


├── css/             # Global stylesheets and modular CSS classes


├── exception/       # Centralized API and Validation error handlers


├── js/              # Frontend DOM logic (main.js, adminLogic.js, etc.)


│   └── service/     # API service layer (movieService.js, userService.js)


├── views/           # Application pages (index.html, admin.html, etc.)


├── db.json          # JSON Server database file


└── package.json     # Node.js dependencies
`

## 💻 Getting Started (Local Setup)
To run this project locally on your machine for evaluation, follow these simple steps:

### 1. Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 2. Installation
Clone the repository and install the required dependencies (JSON Server):
`ash
git clone https://github.com/YourUsername/ChalChitra.git
cd ChalChitra
npm install
`

### 3. Start the Backend Server
Run the following command to start the mock REST API backend. It will run on http://localhost:3000.
`ash
npm start
`
*(Alternatively, you can run: 
npx json-server --watch db.json --port 3000)*

### 4. Open the Frontend
Once the backend is running, simply double-click the iews/index.html file to open it in your browser, or use VS Code's Live Server.

---

## 🔐 Admin Credentials
To access the Admin Panel (via the 'Admin' link in the top navigation):
--password

---

## 📸 Screenshots
*(Coming Soon - Add your screenshots here!)*



---
*Built with ❤️ for the Project Evaluation.*
