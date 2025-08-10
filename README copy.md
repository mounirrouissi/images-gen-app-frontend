# 🌸 AI Image Generator

A magical image generation web app using **Spring Boot**, **React.js**, **Tailwind CSS**, and the **Stability AI API**.

Supports both **Text-to-Image** and **Image-to-Image** generation with a clean fantasy-themed UI.

---

## ✨ Features

- 📝 Text-to-Image generation using prompts
- 🖼️ Image-to-Image transformation using uploaded images
- ⚡ Fast, responsive frontend with Tailwind CSS and React (Vite)
- 🧠 Stable Diffusion models via Stability AI
- 🎨 Ghibli/anime-inspired design and animations

---

## 📦 Tech Stack

| Layer      | Technology                   |
| ---------- | ---------------------------- |
| Frontend   | React.js, Tailwind CSS, Vite |
| Backend    | Spring Boot (Java 17)        |
| AI Service | Stability AI API             |

---

## 🧪 Prerequisites

- Node.js (v18+)
- Java 17+
- Maven
- Stability AI API Key (get from [Stability.ai](https://platform.stability.ai))

---

## 🛠️ Backend Setup (Spring Boot)

1. Go to the `backend/` directory:

   ```bash
   cd backend
   ```

2. Update the `application.properties` with your Stability AI API key:

   ```properties
   stability.api.key=your_api_key_here
   ```

3. Run the application:

   ```bash
   mvn spring-boot:run
   ```

4. Backend runs on: `http://localhost:8080`

---

## 🌐 Frontend Setup (React + Vite + Tailwind)

1. Go to the `frontend/` directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file:

   ```env
   VITE_BACKEND_URL=http://localhost:8080
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Frontend runs on: `http://localhost:5173`

---

## 🧪 Example Prompts

- " sky city with floating islands"
- "Magical forest filled with glowing mushrooms"
- "A river with a small boat and fireflies at night"

---

## 🧠 API Routes

| Endpoint                       | Method | Description                  |
| ------------------------------ | ------ | ---------------------------- |
| `/api/generate/text-to-image`  | POST   | Generate image from prompt   |
| `/api/generate/image-to-image` | POST   | Generate from uploaded image |

---

## 🚀 Future Enhancements

- 🔐 Authentication + user gallery
- 💾 Save generated images to DB
- 🖱️ Drag-and-drop image upload

---

## 👨‍💻 Developer

- **Rouissi Monir**
- 💌 [rouissimounir@outlook.com](mailto:rouissimounir@outlook.com)
