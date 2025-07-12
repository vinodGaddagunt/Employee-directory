# Employee Directory Web App

A responsive, client-side Employee Directory management application built using HTML, CSS, and JavaScript. This project allows users to **search**, **filter**, **sort**, **add**, **edit**, and **delete** employees. It also supports **pagination** for improved usability.

## 🌟 Features

- 🔍 Search employees by name or email
- 🧰 Filter by:
  - First Name
  - Department
  - Role
- ⬇️ Sort employees by:
  - First Name
  - Department
- ➕ Add new employees
- ✏️ Edit existing employee data
- ❌ Delete employees
- 🔢 Pagination (10, 25, 50, 100 per page)
- 📱 Responsive Design (works on desktop, tablet, and mobile)

---

## 📁 Project Structure

employee-directory/
│
├── src/
│ └── main/
│ └── resources/
│ ├── static/
│ │ ├── css/
│ │ │ └── style.css
│ │ └── js/
│ │ ├── app.js
│ │ └── data.js
│ └── templates/
│ └── index.html
├── README.md

> ✅ This structure is compatible with Spring Boot (if using Freemarker), but you can run it as a standalone frontend project as well.

---

## 🚀 Getting Started (Standalone)

1. Clone or download the project.
2. Open `index.ftlh` or rename it to `index.html` if running without Freemarker.
3. Open the file in a browser.
4. Enjoy full functionality without a backend!

---

## 📌 Notes

- Data is loaded from a JavaScript file (`data.js`) — no backend or database required.
- Fully client-side, making it lightweight and easy to deploy on GitHub Pages or Vercel.
- Freemarker tags (`<#list>`) can be removed if you're not using Spring Boot or server-side rendering.

---

## 👨‍💻 Author

**Vinod Gaddagunta**  
_Developer, Web & Backend Enthusiast_

---

## 📄 License

This project is open source and free to use for educational and demo purposes.
