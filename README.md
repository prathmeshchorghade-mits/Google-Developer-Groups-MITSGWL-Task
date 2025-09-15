# Google-Developer-Groups-MITSGWL-Task

# Campus Connect 🧑‍🤝‍🧑

A simple web application built with Python and Flask that serves as a digital bulletin board for students to find and organize study groups on campus.

## The Problem
Finding study partners for specific courses, especially around exam time, can be challenging. Information is often scattered, and there's no central place to see who is available to study. "Campus Connect" solves this by providing a single, real-time platform for all study group-related activities.

---
## Core Features
* **View Active Groups:** A clean, real-time list of all study groups, showing the course, location, time, and number of participants.
* **Post a New Group:** A simple form allows any user to create a new group listing with all the necessary details, including capacity.
* **Join a Group:** An interactive "Join" button that updates the participant count in real-time, with logic to prevent over-filling a group.
* **Multi-Page Structure:** The application is organized with a homepage for navigation, a page to view groups, and a dedicated page for posting new groups.

---
## Technology Stack
The application is built with a modern and lightweight tech stack perfect for rapid prototyping.

* **Backend:**
    * **Python:** The core programming language.
    * **Flask:** A micro-framework for building the web server and API.
    * **SQLite with SQLAlchemy:** For simple, file-based database management.
* **Frontend:**
    * **HTML5:** For the structure of the web pages.
    * **CSS3:** For all styling and layout.
    * **Vanilla JavaScript (ES6):** For interactivity and communicating with the backend API.

---
## Setup and Installation
To run this project locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone [[your-github-repository-url](https://github.com/prathmeshchorghade-mits/Google-Developer-Groups-MITSGWL-Task/blob/main/README.md)]
    cd [your-project-folder]
    ```


2.  **Install the dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Run the application:**
    ```bash
    python app.py
    ```
    The application will be available at `http://127.0.0.1:5000/`.
