# **Docker Compose - Node.js & PostgreSQL Application**

## **Overview**
This project demonstrates how to containerize and deploy a simple **Node.js** web application with a **PostgreSQL** database using **Docker Compose**. The web service fetches the current database time and displays it on an HTML page with basic CSS styling.

---

## **Project Structure**
```
/docker-compose-project
  ├── web/
  │     ├── public/
  │     │     └── style.css  # CSS Styling
  │     ├── server.js        # Express Server Code
  │     ├── package.json     # Node.js Dependencies
  │     ├── Dockerfile       # Docker Image Configuration
  ├── docker-compose.yml     # Docker Compose Configuration
  ├── README.md              # Documentation
```

---

## **Step 1: Install Dependencies**
Ensure **Docker** and **Docker Compose** are installed on your system:

### **Install Docker & Docker Compose (Linux)**
```sh
sudo apt update
sudo apt install docker.io docker-compose -y
```

Check installation:
```sh
docker --version
docker-compose --version
```

---

## **Step 2: Setup the Node.js Web Server**
### **1️⃣ Initialize Node.js Project**
```sh
mkdir web && cd web
npm init -y
```

### **2️⃣ Install Required Packages**
```sh
npm install express pg
```

### **3️⃣ Create `server.js` (Node.js Web Server)**
```js
const express = require("express");
const { Pool } = require("pg");
const path = require("path");

const app = express();
const port = 5000;

const pool = new Pool({
  user: "yogesh",
  host: "db",
  database: "docker",
  password: "yogesh1090@",
  port: 5432,
});

app.use(express.static(path.join(__dirname, "public")));

app.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT TO_CHAR(NOW(), 'YYYY-MM-DD HH24:MI:SS') AS formatted_time");
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
          <title>Welcome</title>
          <link rel="stylesheet" href="/style.css">
      </head>
      <body>
          <div class="container">
              <h1>Hello, Yogesh & 2022BCD0052!</h1>
              <p>📅 PostgreSQL Time: <strong>${result.rows[0].formatted_time}</strong></p>
          </div>
      </body>
      </html>
    `);
  } catch (err) {
    res.status(500).send("Database connection failed. Error: " + err.message);
  }
});

app.listen(port, () => console.log(`Server running on port ${port}`));
```

---

## **Step 3: Create `public/style.css` (Frontend Styling)**
```css
body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    text-align: center;
    padding: 50px;
}

.container {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: inline-block;
}

h1 { color: #333; }
p { font-size: 18px; color: #555; }
```

---

## **Step 4: Create `Dockerfile` for Web Service**
```Dockerfile
FROM node:18
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["node", "server.js"]
```

---

## **Step 5: Define `docker-compose.yml`**
```yaml
version: "3.8"
services:
  web:
    build: ./web
    ports:
      - "5000:5000"
    depends_on:
      - db
    environment:
      - DATABASE_URL=postgres://yogesh:yogesh1090@@db:5432/docker
  
  db:
    image: postgres:latest
    environment:
      POSTGRES_USER: yogesh
      POSTGRES_PASSWORD: yogesh1090@
      POSTGRES_DB: docker
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

---

## **Step 6: Build & Run the Containers**
```sh
docker-compose up --build
```

To stop the containers:
```sh
docker-compose down
```

---

## **Step 7: Access the Web App**
Once the containers are running, open your browser and visit:
```
http://localhost:5000/
```
You should see the message:
```
Hello, Yogesh & 2022BCD0052!
📅 PostgreSQL Time: 2025-02-07 15:30:45
```

---

## **Troubleshooting**
### **1️⃣ Check Running Containers**
```sh
docker ps
```

### **2️⃣ Check Logs**
```sh
docker-compose logs
```

### **3️⃣ Restart Everything**
```sh
docker-compose down
sudo systemctl restart docker
docker-compose up --build
```

---

## **Conclusion**
✅ Successfully containerized and deployed a **Node.js + PostgreSQL** application using **Docker Compose**. 🚀

Let me know if you have any questions! 😊

