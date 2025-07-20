
# How to Run the Project

This project includes:
- A **frontend** Angular app (with Vite) in the `currency-app` folder
- A **backend** ASP.NET Core 8 Web API in the `ExchangeRatesApi` folder

---

## 🧪 Prerequisites

Make sure you have installed:

- [.NET 8 SDK](https://dotnet.microsoft.com/en-us/download)
- [Node.js (v18 or later)](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Docker Desktop](https://www.docker.com/products/docker-desktop) (optional, for containerized run)

---

## ▶️ Run Locally (without Docker)



```bash
 1. Run the Backend
 
cd ExchangeRatesApi
dotnet restore
dotnet run
By default, the backend will be available at: https://localhost:5001 or http://localhost:5000.

2. Run the Frontend
Open a new terminal window:

cd currency-app
npm install
npm run dev
By default, the frontend will be available at: http://localhost:5173

The frontend fetches data from the backend. Make sure both are running.

🐳 Run with Docker
You can run both frontend and backend together using Docker.

1. Build Docker Image
In the root project folder (where Dockerfile is):
docker build -t exchange-rates-app .

2. Run Docker Container
docker run -p 5000:5000 -p 5001:5001 exchange-rates-app
The app will be available at:

Backend: http://localhost:5000

Frontend (served via backend): http://localhost:5000 or https://localhost:5001

📁 Folder Structure
.
├── currency-app           # Angular frontend
├── ExchangeRatesApi       # ASP.NET Core backend
├── Dockerfile             # Docker setup
└── HOW_TO_RUN.md          # This instruction file

✅ Done!
Let me know if you encounter any issues or need help with Docker Compose or environment variables.

