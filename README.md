# 💰 Xpensee - Expense Tracker Web Application

A modern, full-stack expense tracking web application built with HTML, CSS, JavaScript (frontend), Express.js (backend), and MongoDB (database). Track your daily expenses with beautiful visualizations and intuitive filtering.

## 🚀 Features

- **User Authentication**: Secure registration and login with JWT tokens
- **Expense Management**: Add expenses with categories (Food, Travel, Entertainment, Bills, Others)
- **Visual Analytics**: Interactive bar charts and pie charts using Chart.js
- **Filtering**: Filter expenses by time period (Day/Week/Month) and category
- **Real-time Updates**: Charts and transactions update automatically when new expenses are added
- **Responsive Design**: Beautiful, modern UI that works on desktop and mobile devices
- **Recent Transactions**: View all your expenses in a clean, organized list

## 🛠️ Tech Stack

### Frontend
- HTML5
- CSS3 (Custom properties, Flexbox, Grid)
- Vanilla JavaScript
- Chart.js (for data visualization)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose ODM)
- JWT (JSON Web Tokens) for authentication
- bcryptjs for password hashing

## 📁 Project Structure

```
Xpense_Tracker/
├── backend/
│   ├── server.js              # Express server setup
│   ├── routes/
│   │   ├── authRoutes.js      # Authentication routes
│   │   └── expenseRoutes.js   # Expense management routes
│   ├── models/
│   │   ├── User.js            # User model
│   │   └── Expense.js         # Expense model
│   └── middleware/
│       └── auth.js            # JWT authentication middleware
├── frontend/
│   ├── index.html             # Login/Register page
│   ├── dashboard.html         # Expense dashboard
│   ├── styles/
│   │   └── style.css          # Main stylesheet
│   └── scripts/
│       ├── auth.js            # Authentication logic
│       ├── dashboard.js       # Dashboard functionality
│       └── chart.js           # Chart initialization and updates
├── package.json               # Dependencies
├── .env.example               # Environment variables template
└── README.md                  # This file
```

## 🔧 Installation & Setup

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd Xpense_Tracker
```

### Step 2: Install Dependencies

```bash
npm install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and configure:

```env
MONGODB_URI=mongodb://localhost:27017/xpense-tracker
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
PORT=3000
```

**For MongoDB Atlas (Cloud):**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/xpense-tracker
```

### Step 4: Start MongoDB

**Local MongoDB:**
```bash
# Windows
mongod

# macOS/Linux
sudo systemctl start mongod
# or
mongod
```

**MongoDB Atlas:**
- No local setup needed, just use the connection string in `.env`

### Step 5: Start the Server

```bash
# Development mode (with nodemon)
npm run dev

# Production mode
npm start
```

The server will start on `http://localhost:3000`

### Step 6: Open in Browser

Navigate to `http://localhost:3000` in your web browser.

## 📖 Usage

### 1. Registration
- Click on the "Register" tab
- Enter your name, email, and password (minimum 6 characters)
- Click "Register"
- You'll be automatically logged in and redirected to the dashboard

### 2. Login
- Enter your email and password
- Click "Login"
- You'll be redirected to the dashboard

### 3. Adding Expenses
- Fill in the expense form:
  - **Amount**: Enter the expense amount
  - **Category**: Select from Food, Travel, Entertainment, Bills, or Others
  - **Description**: (Optional) Add a description
  - **Date**: Select the date (defaults to today)
- Click "Add Expense"
- The expense will be saved and charts will update automatically

### 4. Viewing Expenses
- Use the **Time Period** filter to view expenses by Day, Week, Month, or All Time
- Use the **Category** filter to view expenses by specific category
- View your expenses in the "Recent Transactions" section
- Analyze your spending patterns using the bar chart and pie chart

### 5. Logout
- Click the "Logout" button in the top navigation bar
- You'll be redirected to the login page

## 🔐 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Expenses (Protected - Requires JWT Token)
- `POST /api/expenses/add-expense` - Add a new expense
- `GET /api/expenses/get-expenses` - Get all expenses (supports filters)
- `GET /api/expenses/get-expense-summary` - Get expense summary for charts

## 🎨 Design Features

- **Modern UI**: Clean, minimal design with gradient backgrounds
- **Responsive Layout**: Works seamlessly on desktop, tablet, and mobile
- **Smooth Animations**: Subtle transitions and hover effects
- **Color Scheme**: Beautiful purple/indigo gradient theme
- **Typography**: Poppins font for a modern, readable interface
- **Loading States**: Loading spinners and toast notifications
- **Empty States**: Helpful messages when no data is available

## 🔒 Security Features

- Passwords are hashed using bcryptjs
- JWT tokens for secure authentication
- Protected routes with authentication middleware
- Input validation on both frontend and backend
- Secure password storage in MongoDB

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running locally, or
- Check your MongoDB Atlas connection string in `.env`
- Verify network connectivity

### Port Already in Use
- Change the `PORT` in `.env` file
- Or stop the process using port 3000

### CORS Errors
- Ensure the frontend is being served from the same origin
- Check that the API_BASE_URL in frontend scripts matches your server URL

### Charts Not Displaying
- Check browser console for errors
- Ensure Chart.js CDN is loaded (check dashboard.html)
- Verify expense data is being fetched correctly

## 📝 Future Enhancements

- [ ] Edit and delete expenses
- [ ] Export expenses to CSV/PDF
- [ ] Budget setting and tracking
- [ ] Expense categories customization
- [ ] Monthly/yearly reports
- [ ] Dark mode theme
- [ ] Multi-currency support
- [ ] Expense reminders and notifications

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 👨‍💻 Author

Built with ❤️ for efficient expense tracking.

## 🙏 Acknowledgments

- Chart.js for beautiful data visualization
- Poppins font from Google Fonts
- Express.js community for excellent documentation

---

**Happy Expense Tracking! 💰**

