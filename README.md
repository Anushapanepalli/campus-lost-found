# CampusFind – Lost and Found Portal

## 1. Project Overview

CampusFind is a web-based **Lost and Found Portal designed for college campuses**.

In a college environment, students and staff may lose personal belongings such as ID cards, books, wallets, bags, keys, mobile phones, and other items. Finding the owner of a lost item can be difficult when there is no proper system to report and search for lost belongings.

CampusFind provides a centralized platform where users can:

* Report items they have lost.
* Report items they have found.
* View lost and found items reported by other users.
* Search for a particular item.
* Filter items based on their type.
* Edit or delete their reported items.

The main goal of this project is to make the process of **reporting, searching, and recovering lost items easier and more organized within a campus**.

---

## 2. Problem Statement

In many colleges, lost and found items are usually communicated through:

* WhatsApp groups
* Class groups
* College announcements
* Friends and classmates
* Notice boards

These methods are not always effective because information can get lost among many messages, and students may not know where to search for a particular item.

For example, if a student loses a black backpack on campus, they may not know whether someone has found it. Similarly, a student who finds a backpack may not know how to contact its owner.

Therefore, there is a need for a **centralized Lost and Found system**.

---

## 3. Proposed Solution

CampusFind solves this problem by providing a single web application for campus lost and found activities.

Users can report an item by entering details such as:

* Item name
* Lost or Found type
* Category
* Location
* Description

The information is stored in a **MySQL database** through the **Spring Boot backend**.

Other users can then browse the available reports and search for the item they are looking for.

---

## 4. How CampusFind Works

### Step 1 – User Login

The user logs into the CampusFind application.

### Step 2 – Report an Item

The user selects **Report Item** and enters the item details.

For example:

* Item Name: Black Backpack
* Type: Lost
* Category: Bags
* Location: College Library
* Description: Black backpack with books inside.

### Step 3 – Data Storage

The submitted information is sent from the frontend to the Spring Boot backend.

The backend processes the request and stores the item information in the MySQL database.

### Step 4 – Browse Items

Users can open **Browse Items** to see the reported lost and found items.

### Step 5 – Search and Filter

Users can search for an item by name and filter the results based on Lost or Found type.

### Step 6 – Manage Reports

Users can edit or delete their reported item information when required.

---

## 5. Main Features

### User Authentication

Users can register and log in to the application.

### Report Lost Item

Users can report belongings that they have lost.

### Report Found Item

Users can report belongings that they have found.

### Browse Items

Users can view available Lost and Found reports.

### Search

Users can search for a specific item.

### Filter

Users can filter reports based on Lost or Found type.

### Edit Item

Reported item information can be updated when required.

### Delete Item

Users can remove an item report when it is no longer required.

### Database Integration

All item information is stored in a MySQL database.

### Responsive Interface

The frontend is designed to work on different screen sizes.

---

## 6. Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Java
* Spring Boot
* Spring Data JPA
* Spring Security

### Database

* MySQL

### Development Tools

* Visual Studio Code
* Maven
* Git
* GitHub

---

## 7. System Architecture

The application follows a basic three-layer architecture:
User
  |
  v
Frontend
HTML + CSS + JavaScript
  |
  v
Spring Boot REST API
  |
  v
MySQL Database

### Frontend

The frontend provides the user interface and collects information from users.

### Backend

The Spring Boot backend receives requests from the frontend, processes the data, and communicates with the database.

### Database

MySQL stores user and lost/found item information.

---

## 8. Project Structure

```text
campus-lost-found/
│
├── pom.xml
├── README.md
│
└── src/
    ├── main/
    │   ├── java/
    │   │   └── com.example.campus_lost_found/
    │   │       ├── controller/
    │   │       ├── entity/
    │   │       ├── repository/
    │   │       └── service/
    │   │
    │   └── resources/
    │       ├── static/
    │       │   ├── index.html
    │       │   ├── report.html
    │       │   ├── items.html
    │       │   ├── login.html
    │       │   ├── register.html
    │       │   ├── script.js
    │       │   ├── login.js
    │       │   ├── register.js
    │       │   └── style.css
    │       │
    │       └── application.properties
    │
    └── test/
```
### Main Components

- **Controller** – Handles HTTP requests from the frontend.
- **Service** – Contains the application business logic.
- **Repository** – Communicates with the MySQL database using JPA.
- **Entity** – Represents database tables such as User and Item.
- **Static** – Contains the HTML, CSS, and JavaScript frontend files.
- **Config** – Contains application security configuration.

---

## 9. Database

CampusFind uses **MySQL** as the database.

The application stores information related to:

* Users
* Lost items
* Found items

The Spring Boot application communicates with MySQL using **Spring Data JPA**.

---

## 10. REST API

The backend provides REST API endpoints for handling application data.

The frontend communicates with the backend using HTTP requests.

For example:

GET    /api/items
POST   /api/items
PUT    /api/items/{id}
DELETE /api/items/{id}

These APIs are used to retrieve, create, update, and delete item reports.

## 11. How to Run the Project

### Prerequisites

Install the following software:

* Java JDK
* Maven
* MySQL
* Git
* Visual Studio Code or another Java IDE

### Step 1 – Clone the Repository

git clone https://github.com/Anushapanepalli/campus-lost-found.git

### Step 2 – Open the Project

Open the downloaded project in Visual Studio Code or another Java IDE.

### Step 3 – Configure MySQL

Create the required MySQL database and configure the database connection in:

src/main/resources/application.properties

Use your own local MySQL username and password.

### Step 4 – Run the Application

Using Maven:
mvn spring-boot:run

Or use the Maven wrapper:
./mvnw spring-boot:run

On Windows:
mvnw.cmd spring-boot:run

### Step 5 – Open the Application

After the Spring Boot server starts, open the application in a browser.

http://localhost:8081

---

## 12. Advantages

* Provides a centralized Lost and Found platform.
* Reduces dependency on WhatsApp and informal communication.
* Makes searching for lost items easier.
* Allows users to manage their reports.
* Stores information systematically in a database.
* Can be used by students and staff within a college campus.

---

## 13. Future Enhancements

The project can be improved further by adding:

* Image upload for lost and found items.
* Email notifications.
* User-to-user contact or messaging.
* Location-based item searching.
* Admin dashboard.
* Item status such as "Returned".
* Mobile application.
* Advanced authentication.
* Notifications when a matching item is reported.

---

## 14. Conclusion

CampusFind is a practical web application developed to solve a common problem in college campuses.

By providing a centralized platform for reporting, searching, and managing lost and found items, the system makes it easier for students and staff to recover their belongings.

The project also demonstrates the integration of a **Java Spring Boot backend, HTML/CSS/JavaScript frontend, and MySQL database** into a complete full-stack web application.

---

## 15. Author

**Anusha Panepalli**

B.Tech – Information Technology

SASI Institute of Technology and Engineering
