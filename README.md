# 📝 Note-Taking Web App

**A simple, fast, and responsive web application to create, edit, and organize your notes, powered by React and Supabase.**

---

## 📖 Overview

The **Note-Taking Web App** is a modern, full-stack application that helps users capture and manage their notes with ease. It features a clean and intuitive interface where users can add, update, and delete notes.

Built with **React** for a responsive and interactive user experience, and **Supabase** for backend services like authentication and database storage, the app ensures that notes are securely stored and accessible across devices.

This project is designed as a lightweight productivity tool, with optional enhancements such as search, categorization, and theme switching.

---

## ✨ Features

- 🔑 User authentication (via Supabase Auth)
- 📝 Create, edit, and delete notes
- ☁️ Cloud storage with Supabase PostgreSQL
- 📱 Fully responsive design (desktop & mobile)
- 🔍 Optional search and filtering
- 🌙 Theme toggle (light/dark mode)

---

## 🛠 Tech Stack

- **Frontend**: React (Vite/CRA/Next.js — specify your setup)
- **Backend**: Supabase (Auth + Database)
- **Styling**: CSS / TailwindCSS / Styled Components (depending on your choice)
- **State Management**: React Hooks / Context API (or Redux if used)

---

## ⚙️ Installation

1.  Clone this repository:
    ```bash
    git clone https://github.com/khadaroo/note-taking-app.git
    cd note-taking-app
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Set up environment variables by creating a .env file:

    ```bash
    VITE_SUPABASE_URL= your-supabase-url VITE_SUPABASE_ANON_KEY= your-anon-key
    ```

4.  Start development server:
    ```bash
    npm run dev
    ```

## 📖 Usage

- Sign up or log in with your account.

- Add a new note using the New Note button.

- Edit notes by selecting and modifying their content.

- Delete notes you no longer need.

- Your notes are securely stored in Supabase and synced across devices.

## 🗄 Suggested Database Schema

To set up your notes table in Supabase, run the following SQL:

```sql
create table notes (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references auth.users(id) on delete cascade,
  title text,
  content text,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
```

## 🌐 Example Screenshot

(A screenshot of the app will be added here — e.g., screenshot.png)

## 🐞 Troubleshooting

- Auth errors? Double-check your Supabase URL and anon key in .env.

- Database issues? Ensure your Supabase project has a notes table with proper schema.

- Build errors? Run npm install again and verify Node.js version compatibility.

## 👥 Contributors

- **Kadar Seid** – Developer ([GitHub](https://github.com/khadaroo))

## 📜 License

This project is licensed under the MIT License.
