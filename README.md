# 🚀 Productivity Dashboard
### Live link 🔗: https://productivity-dashboard-projects.netlify.app/  

## 📌 Project Description
I have developed a **single-page web application** called **Productivity Dashboard** using **HTML, CSS, and Vanilla JavaScript**.  
The goal of this project is to bring multiple daily productivity tools into one centralized and interactive interface.

The application focuses on **real-time user interaction**, **dynamic UI updates**, and **persistent data storage**.  
I have used **CSS variables** for consistent styling and implemented **JavaScript-driven logic** to manage state, themes, and user actions without reloading the page.

---

## ✨ Main Features & Implementation

### 🎨 Dynamic Theme Switching
I implemented a multi-theme system that allows users to change the entire website appearance with a single click.

**How it works:**
- Colors are defined as CSS variables in the `:root` selector
- JavaScript updates these variables using `style.setProperty()`
- A flag-based mechanism cycles through predefined themes
- The UI updates instantly across all components

---

### 🧭 Single Page Navigation
The dashboard behaves like an app without page reloads.

**How it works:**
- Each feature is placed inside a dedicated section
- JavaScript controls visibility using `display` toggling
- Event listeners handle navigation and back actions dynamically

---

### 📝 To-Do List Management
Users can create and manage tasks efficiently.

**How it works:**
- Tasks are stored in JavaScript arrays
- DOM elements are generated dynamically
- Tasks are saved in `localStorage` to persist after refresh

---

### 🎯 Daily Goals Tracking
This feature helps users define and manage daily goals.

**How it works:**
- Goals are added through form inputs
- JavaScript handles creation and deletion logic
- Goals are stored in `localStorage` for persistence

---

### ⏱️ Pomodoro Timer
I implemented a timer to support focused work sessions.

**How it works:**
- Timer logic uses `setInterval()`
- Start, pause, and reset controls are handled via JavaScript
- Time updates dynamically on the UI

---

### 🌦️ Weather Dashboard
Displays real-time weather information based on the **user's actual location**.

**How it works:**
- The browser's **Geolocation API** (`navigator.geolocation.getCurrentPosition`) is used to get the user's real latitude and longitude
- Coordinates are passed to the **WeatherAPI** (`q=lat,lon`) so weather is always fetched for the user's actual city
- The location name (`city, region`) displayed on the dashboard is also dynamically set from the API response — nothing is hardcoded
- If the user denies location permission or the browser doesn't support geolocation, a graceful fallback message is shown
- JavaScript `fetch()` handles the API request and all weather values are rendered dynamically

---

### 💡 Motivational Quotes
Motivational quotes are shown to encourage productivity.

**How it works:**
- Quotes are stored locally or fetched from an API
- JavaScript randomly selects and displays quotes
- Quotes update dynamically without page reload

---

## ✅ Conclusion
Through this project, I applied core JavaScript concepts such as **DOM manipulation**, **event handling**, **API integration**, **localStorage**, and **CSS variable-based theming** to build a functional and scalable single-page productivity application.
