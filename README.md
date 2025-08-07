
# Apify Actor Runner

A simple React web app that allows users to authenticate using their Apify API key, select one of their actors, dynamically load the input schema, execute a single actor run, and view the results immediately.

## 🚀 Features

- **Authenticate** with Apify using your API key.
- **Fetch and select** your available actors.
- **Load actor input schema** dynamically at runtime.
- **Provide inputs** using an auto-generated form.
- **Execute a single actor run** and see results or errors instantly.
- **Clear feedback** using toast notifications.
- Clean, responsive, and minimal UI.

---

## 🛠️ Tech Stack

- **Frontend:** React (Vite)
- **HTTP Client:** Axios
- **UI Feedback:** react-toastify
- **Icons:** lucide-react
- **State Sharing:** React Context (for API Key)

---

## 📦 Setup & Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/apify-actor-runner.git
cd apify-actor-runner
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Environment Variables

Create a `.env` file in the root with:

```env
VITE_BACKEND_URL=http://localhost:5000
```

> Replace with your actual backend server URL.

### 4. Run the App

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 Actor Used for Testing

You can use any actor from your Apify account. During development, the app was tested using a simple actor that accepts a JSON input schema with basic text and number fields.

---

## 📝 Design & Assumptions

* **No hardcoded schemas:** All actor schemas are fetched dynamically using `storeId`.
* **Single execution model:** Each form submission triggers exactly one actor run.
* **Frontend-only logic:** The app communicates with a backend proxy which securely interacts with Apify's API.
* **Simple UX:** The app walks users through three logical steps:

  1. Authenticate with API Key
  2. Select Actor
  3. Provide Inputs and Execute

---


## ⚠️ Error Handling

* Invalid API key → toast notification
* Schema fetch failures → handled gracefully
* Execution errors → detailed error message shown

---

## 📂 Project Structure (Frontend)

```
src/
├── components/
│   ├── ApiInputContainer.jsx
│   ├── ActorSelectionContainer.jsx
│   ├── SchemaDetails.jsx
│   └── DisplayResult.jsx
├── context/
│   └── apiKey.js
├── Home2.jsx
└── main.jsx
```

---

## 📌 Requirements Checklist

| Requirement                | Status |
| -------------------------- | ------ |
| Dynamic schema loading     | ✅ Met  |
| Single-run actor execution | ✅ Met  |
| Clear error feedback       | ✅ Met  |
| Minimal dependencies       | ✅ Met  |
| Clean UI & flow            | ✅ Met  |

---

## 👤 Author

**Rudresh Dharkar**
[LinkedIn](https://www.linkedin.com/in/rudresh-dharkar-754649257) • [GitHub](https://github.com/Rudresh1604)


