# ZeroCode Frontend Assignment

This is my submission for the **ZeroCode Frontend Engineer Assignment**.

## Live Demo

**Deployed URL:** 
ChatBot live Website = https://chatbot-frontend-kskl.onrender.com

---

**Test Credentials:**
-Email: `ab@gmail.com`
- Password: `123456789`

---

## Tech Stack

- **Frontend:** React (JSX), TailwindCSS, Axios
- **Backend:** Node.js, Express.js, MongoDB (for chat and auth APIs)
- **Auth:** JWT-based authentication
- **LLM API:** Integrated with OpenAI for bot responses

---

## Features

- JWT Authentication (Login & Register)
- Real-time Chat UI (auto scroll + message stream)
- Chat history fetched from backend (MongoDB)
- Loading indicator when bot responds
- Mobile + Tablet + Desktop responsive
- Dark / Light mode toggle

---

## Folder Structure

--> Frontend/
 public/
 src/
 components/
 pages/
 context/
 App.js
 main.jsx
 index.css
--> Backend/
 controllers/
 models/
 routes/
 server.js
 .env

---

##  Setup Instructions

###  Frontend (React)

```bash
cd Frontend
npm install
npm run dev
Backend (Express + MongoDB)
bash
cd Backend
npm install
# Add your .env with MONGO_URL and JWT_SECRET
npm run server

Architecture Diagram
User <--> React Frontend <--> Express Server <--> MongoDB (Chat + Auth) <--> OpenAI API


Author
Harshal Ingle
harshalingle11092001@gmail.com

Notes
render.com used for frontend hosting

MongoDB Atlas for cloud database

Tested on Chrome, Firefox, and mobile devices

---

###  Checklist:
| Item                            | Status |
|---------------------------------|--------|
| Public GitHub repo              | Done   |
| Live deployed link              | Done   |
| Test credentials in README      | Done   |
| Setup instructions              | Done   |
| Architecture diagram (ASCII)    | Done  |
| Responsive UI                   | Done   |

---

