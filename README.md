# 🍽️ Restaurant Management System

A full-stack **university project** built with **Angular**, **Express.js**, and **MySQL**.  
It demonstrates modern web development practices including authentication, data visualization, and role-based access control.

> ⚠️ **Note:** This project is for educational purposes only and not intended for production use.

![Node.js](https://img.shields.io/badge/node-%3E%3D16-green)
![Angular](https://img.shields.io/badge/angular-red)
![MySQL](https://img.shields.io/badge/mysql-%3E%3D8-blue)

---

## ✨ Features  
- User authentication with role-based access (admin, owner, customer).  
- Restaurant management (add/edit/delete restaurants, manage menus).  
- Analytics dashboards (views, reviews, ratings).  
- Protected routes using Angular Router.  
- API integration with Express.js.  
- Database migrations and seeding with Prisma.  
- Unit & e2e testing for frontend and backend.  

---

## 🛠️ Tech Stack  

**Frontend**  
- Angular 17  
- CSS  
- Angular Router  
- Testing: Karma, Jasmine, Cypress  

**Backend**  
- Node.js (Express.js)  
- JSON Web Tokens (JWT)  

**Database**  
- MySQL 8+  
- Prisma ORM  

---

## ⚙️ Installation  

### Prerequisites  
- Node.js (v16 or later)  
- MySQL (v8 or later)  
- Angular CLI (v16 or later)  
- Git  

### Setup  

1. **Clone the repository**
   ```bash
   git clone https://github.com/Marcop-00/Hildesheimer-Geschmack.git
   cd Hildesheimer-Geschmack
   ```

2. **Install dependencies**

   **Backend**
   ```bash
   cd Backend
   npm install
   ```

   **Frontend**
   ```bash
   cd Frontend
   npm install
   ```

3. **Configure the database**

   Create a new MySQL database (default name: `restaurantFinder`) and update your database URL in `.env`:

   ```env
   DATABASE_URL="mysql://root:Admin12345@localhost:3306/restaurantFinder"
   ```

   Then run migrations:
   ```bash
   cd Backend
   npx prisma generate
   npx prisma migrate dev --name init
   ```

   (Optional) Seed the database:
   ```bash
   npm run seed
   ```

4. **Start the servers**

   **Backend**
   ```bash
   cd Backend
   npm start
   ```

   **Frontend**
   ```bash
   cd Frontend
   ng serve
   ```

---

## 🧩 How It Works  

The system is designed around **three main user roles**:

- **Admin** 👨‍💻  
  - Manages all restaurants and users.  
  - Oversees the entire system.  

- **Owner** 🍴  
  - Can register a restaurant.  
  - Manages the restaurant page.  
  - Views analytics (ratings, reviews, customer interactions).  

- **Customer** 👤  
  - Can view restaurants and menus.  
  - Can leave reviews and ratings.  

**Workflow Example**  
1. An **Owner** registers a restaurant and adds its menu.  
2. A **Customer** browses restaurants, checks menus, and leaves a review.  
3. The **Owner** checks analytics dashboards to see performance.  
4. The **Admin** moderates the system if needed.  

---

## 🧪 Testing  

**Frontend unit tests**
```bash
cd Frontend
ng test
```

**Frontend e2e tests**
```bash
cd Frontend
ng e2e
```
