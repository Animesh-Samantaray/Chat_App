
# \# 💬 Chat App — Real-Time MERN Stack Messaging

A robust, fully-featured, real-time chat application demonstrating core principles of the **MERN stack** (**MongoDB**, **Express.js**, **React**, **Node.js**).
This project showcases secure **authentication**, seamless **real-time messaging**, and efficient **global state management**.

---

## ✨ Key Features

| 🚀 | Feature | Description |
| :--: | :-- | :-- |
| 🔐 | **Secure Authentication** | User sign-up/login handled via **JWT** and secure **HTTP-only cookies** for enhanced protection. |
| 💬 | **Real-Time Communication** | **Socket.io** enables instant, bidirectional 1-on-1 chat for a modern messaging experience. |
| 🧠 | **State Management** | Powered by **Zustand**, offering lightweight and scalable global state handling. |
| 🖼️ | **Media Uploads** | Integrated with **Cloudinary** for smooth and secure media storage and delivery. |
| 🌙 | **Dark Mode Ready UI** | Elegant and responsive dark-themed interface styled with **Tailwind CSS**. |
| 📱 | **Responsive Design** | Optimized for all screen sizes — from desktop to mobile. |
| 🧩 | **Modular Architecture** | Organized with a clean folder structure for better scalability and maintainability. |


---

## 🛠️ Tech Stack

### 🚀 Frontend

- ⚛️ **React.js**
- 🧩 **Zustand** (Global State Management)
- 🌐 **Axios** (HTTP Client)
- 🎨 **TailwindCSS** (Utility-First Styling)
- 🛣️ **React Router DOM** (Routing)
- ⚡ **Socket.io Client** (Real-Time Connectivity)


### ⚙️ Backend

- 🟢 **Node.js** \& **Express.js** (Server)
- 🍃 **MongoDB** \& **Mongoose** (Database/ORM)
- 🔑 **JWT** (Authentication)
- 🍪 **Cookie Parser** (Token Handling)
- ⚡ **Socket.io** (Real-Time Engine)
- ☁️ **Cloudinary** (Media Storage)
- ⚙️ **dotenv** (Environment Configuration)

---

## ⚙️ Installation \& Local Setup

Follow these steps to set up and run the app locally 👇

### 1️⃣ Clone the Repository

```bash
git clone [https://github.com/Animesh-Samantaray/chat_app.git](https://github.com/Animesh-Samantaray/chat_app.git)
cd chat_app


## Install Dependancies
# Backend dependencies
npm install --prefix backend

# Frontend dependencies
npm install --prefix frontend

git clone [https://github.com/Animesh-Samantaray/chat_app.git](https://github.com/Animesh-Samantaray/chat_app.git)
cd chat_app


PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_for_jwt
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
NODE_ENV=development

VITE_API_URL=http://localhost:5001


# Terminal 1 - Start Frontend
npm run dev --prefix frontend

# Terminal 2 - Start Backend
npm run dev --prefix backend

npm run build --prefix frontend


chat_app/
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── lib/           # Cloudinary setup, etc.
│   ├── routes/
│   └── server.js      # Entry point
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/     # Zustand global state
│   └── vite.config.js
│
├── package.json        # Root scripts
└── README.md


|  Method  | Endpoint            | Description                                                        |
| :------: | :------------------ | :----------------------------------------------------------------- |
|  **GET** | `/api/users`        | Fetch all registered users (excluding the logged-in user).         |
| **POST** | `/api/auth/signup`  | Register a new user.                                               |
| **POST** | `/api/auth/login`   | Authenticate and log in a user.                                    |
|  **GET** | `/api/auth/logout`  | Securely log out the user by clearing the cookie.                  |
|  **GET** | `/api/messages/:id` | Retrieve all messages between the logged-in user and another user. |
| **POST** | `/api/messages/:id` | Send a new message to the user with `:id`.                         |


| Event Name         | Type | Description                                                 |
| :----------------- | :--- | :---------------------------------------------------------- |
| `sendMessage`      | Emit | Sent by the client to deliver a message to the target user. |
| `receiveMessage`   | On   | Listens for new messages in real-time.                      |
| `userConnected`    | On   | Triggered when a new user joins/comes online.               |
| `userDisconnected` | On   | Triggered when a user leaves/logs out.                      |

🧑‍💻 Author

👤 Animesh Samantaray
💼 MERN Stack Developer


🌟 Show Your Support

If you found this project helpful or interesting, please give it a ⭐ on GitHub — your support means a lot! 😊


---

✅ Just copy **everything inside this single block** (from the first `# 💬` to the last `⚡`)  
and paste it directly into your `README.md`.  
No edits, no merges — it’ll render **perfectly** on GitHub with all emojis, bold text, and clean tables.

