# FOMS-Frontend
Frontend for the Food Order Management System using HTML, CSS, JavaScript(JS).
#  Food Order Management System — Frontend

A modern and responsive **Food Order Management System frontend** built using **HTML, CSS, and JavaScript**. The application provides an admin dashboard for managing food items, customers, and orders through a simple and user-friendly interface.

---

## 📌 Project Overview

The Food Order Management System frontend provides a centralized dashboard to manage:

* 🍲 Food items
* 👥 Customers
* 🛒 Orders
* 📊 Business statistics
* 💰 Revenue overview
* 📦 Food inventory

The application includes an admin login page and a responsive dashboard with different management modules.

---

## ✨ Features

### 🔐 Admin Login

* Admin login interface
* Username and password validation
* Remember me option
* Forgot password option
* Demo login credentials available

**Demo Login:**

```text
Username: admin
Password: admin
```

---

### 📊 Dashboard

The dashboard provides an overview of the food business.

It displays:

* Total Food Items
* Total Customers
* Total Orders
* Total Revenue
* Weekly order overview
* Food category distribution
* Recent orders

---

### 🍕 Food Management

The Food Management module allows administrators to manage food items and inventory.

#### Operations

* Add new food
* View food items
* Search food
* Filter by category
* Filter by stock status
* Update food details
* Delete food records

#### Food Information

Each food item contains:

```text
Food ID
Food Name
Category
Price
Stock Quantity
Stock Status
```

---

### 👥 Customer Management

The Customer Management module allows administrators to maintain customer information.

#### Operations

* Add customers
* View customers
* Search customers

#### Customer Information

```text
Customer ID
Customer Name
Phone
Address
Total Orders
```

---

### 🛒 Place Order

The Place Order module allows administrators to create new customer orders.

#### Order Process

1. Select customer
2. Select food
3. View food price
4. View available stock
5. Enter quantity
6. Validate stock
7. Calculate total amount
8. Place order

The order summary displays:

```text
Customer
Food
Price
Quantity
Total Amount
```

---

### 📦 Order Management

The Orders module allows administrators to view and manage customer orders.

#### Features

* View all orders
* Search orders
* Filter orders by status
* View order details
* Update order status
* Delete orders

#### Order Status

```text
PLACED
PREPARING
COMPLETED
CANCELLED
```

---

## 🌙 Dark Mode

The application supports a **Dark Mode** option for a comfortable viewing experience.

Users can switch between:

```text
Light Mode
Dark Mode
```

---

## 📱 Responsive Design

The frontend is designed to work across different screen sizes.

It supports:

* 💻 Desktop
* 📱 Mobile
* 🖥️ Tablet

The layout automatically adjusts based on the screen width.

---

## 🎨 User Interface

The application contains:

```text
Login Page
    ↓
Admin Dashboard
    ├── Dashboard
    ├── Food Management
    ├── Customer Management
    ├── Place Order
    └── Orders
```

---

## 🛠️ Technologies Used

| Technology         | Purpose                                    |
| ------------------ | ------------------------------------------ |
| **HTML5**          | Web page structure                         |
| **CSS3**           | Styling and responsive design              |
| **JavaScript**     | Application functionality and interactions |
| **Responsive CSS** | Mobile and tablet support                  |

---

## 📂 Project Structure

```text
Food-Order-Management-Frontend/
│
├── index.html
├── style.css
└── script.js
```

### `index.html`

Contains the complete user interface structure including:

* Login page
* Dashboard
* Food management
* Customer management
* Order placement
* Order management
* Modals
* Forms

### `style.css`

Handles:

* Dashboard styling
* Login page styling
* Tables
* Forms
* Buttons
* Cards
* Charts
* Dark mode
* Responsive layouts
* Mobile navigation

### `script.js`

Handles the application's interactive functionality such as:

* Login
* Dashboard navigation
* Food management
* Customer management
* Order management
* Search
* Filtering
* Order calculation
* Modal operations
* Dark mode
* Notifications
* Logout

---

## 🚀 How to Run

### 1. Clone the Repository

```bash
git clone <your-repository-url>
```

### 2. Open the Project

Navigate to the project directory:

```bash
cd Food-Order-Management-Frontend
```

### 3. Run the Application

Open:

```text
index.html
```

in your web browser.

You can also use **VS Code Live Server** for easier development.

---

## 🔄 Application Flow

```text
                 ┌──────────────┐
                 │  Login Page  │
                 └──────┬───────┘
                        ↓
                 ┌──────────────┐
                 │   Dashboard  │
                 └──────┬───────┘
                        │
        ┌───────────────┼────────────────┐
        ↓               ↓                ↓
   Food Management  Customers       Place Order
        │               │                │
        └───────────────┼────────────────┘
                        ↓
                  Order Management
                        ↓
                    Order Details
```

---

## 🔮 Future Enhancements

The frontend can be further enhanced by connecting it with the backend Food Order Management System.

Possible improvements include:

* 🔗 Connect frontend with Java backend
* 🗄️ Integrate MySQL database
* 🔐 Implement secure authentication
* 👨‍💼 Add Admin/Staff/Customer roles
* 💳 Integrate online payment
* 🚚 Add delivery tracking
* 🔔 Add real-time notifications
* 📊 Add advanced analytics
* 📄 Generate invoices
* 🌐 Deploy the application online
* 🔌 Create and integrate REST APIs

---

## 🔗 Backend Integration

The frontend can be integrated with a backend built using:

```text
Frontend
   ↓
REST API
   ↓
Java Backend
   ↓
JDBC
   ↓
MySQL Database
```

This will allow the frontend dashboard to work with persistent food, customer, and order data.

---

## 📈 Project Highlights

* ✅ Clean admin dashboard
* ✅ Responsive design
* ✅ Food inventory management
* ✅ Customer management
* ✅ Order management
* ✅ Order status tracking
* ✅ Search and filtering
* ✅ Order total calculation
* ✅ Dark mode
* ✅ Modal-based forms
* ✅ Mobile-friendly layout

---

## 👨‍💻 Project Type

**Project:** Food Order Management System
**Module:** Frontend / Admin Dashboard
**Technologies:** HTML, CSS, JavaScript
**Database/Backend:** Can be integrated with Java, JDBC and MySQL

---

## ⭐ Conclusion

The **Food Order Management System Frontend** provides a simple, responsive, and organized admin dashboard for managing food items, customers, and orders.

The frontend is structured to be easily integrated with a Java backend and MySQL database, making it suitable for extending into a complete food ordering management platform.
