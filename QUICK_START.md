# Quick Start Guide - PlaceLink with New Theme

## 🎨 What's New

Your entire PlaceLink placement management system now features an elegant **dark theme with golden accents**. All routes are configured and ready to use!

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14+)
- npm or yarn
- MongoDB connection (configured in backend)

### Installation & Setup

#### Backend Setup
```bash
cd backend
npm install
```

**Configure environment variables** (create `.env` file):
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/placement
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

Run the server:
```bash
npm start
# Server runs on http://localhost:5000
```

#### Frontend Setup
```bash
cd frontend/frontend
npm install
```

Run development server:
```bash
npm run dev
# Frontend runs on http://localhost:5173
```

Build for production:
```bash
npm run build
```

---

## 📋 Complete Route Map

### Public Routes (No Authentication Required)
| Route | Purpose |
|-------|---------|
| `/` | **Home** - Landing page with features and stats |
| `/login` | **Login** - User authentication |
| `/signup` | **Sign Up** - New user registration |
| `/forgot-password` | **Password Reset** - Account recovery |

### Student Routes (Login Required)
| Route | Purpose |
|-------|---------|
| `/dashboard` | **Dashboard** - Student home |
| `/jobs` | **Browse Jobs** - View all available positions |
| `/applications` | **My Applications** - Track your applications |
| `/notifications` | **Notifications** - View updates and messages |

### Admin Routes (Login Required + Admin Role)
| Route | Purpose |
|-------|---------|
| `/admin` | **Admin Dashboard** - Management home |
| `/create-job` | **Post Job** - Create new job postings |
| `/applicants` | **Manage Applicants** - View and manage candidates |
| `/shortlist/:applicantId` | **Shortlist** - Mark applicants for next round |
| `/notifications` | **Notifications** - Send updates to applicants |

---

## 🎯 API Endpoints Reference

### Authentication (`/api/auth`)
```
POST   /signup              - Register new user
POST   /login               - User login (returns token)
GET    /profile            - Get user profile (Protected)
PUT    /reset-password     - Reset password
```

### Jobs (`/api/jobs`)
```
GET    /                   - Get all jobs (Protected)
POST   /                   - Create job (Admin only)
DELETE /:id                - Delete job (Admin only)
```

### Applications (`/api/applications`)
```
GET    /                   - Get all applications (Admin)
GET    /my                 - Get my applications (Student)
POST   /apply              - Apply for job (Student)
PUT    /:id                - Update status (Admin)
```

### Notifications (`/api/notifications`)
```
GET    /                   - Get my notifications
POST   /                   - Create notification (Admin)
PUT    /read/:id           - Mark as read
```

### Reports (`/api/reports`)
```
GET    /stats              - Get statistics (Admin)
```

### Upload (`/api/upload`)
```
POST   /                   - Upload resume
```

---

## 🎨 Theme Colors

The new theme uses these main colors:

```css
Dark Background:   #0f1419  (Primary bg)
Card Background:   #1a1f2e  (Content cards)
Gold Accent:       #ffa500  (Primary accent)
Light Gold:        #ffb81c  (Secondary accent)
Text Primary:      #ffffff  (Main text)
Text Secondary:    #b0b8c4  (Secondary text)
```

### Where to Customize
Edit **`frontend/frontend/src/App.css`** - Look for `:root` section:
```css
:root {
  --dark-bg:    #0f1419;
  --dark-card:  #1a1f2e;
  --gold:       #ffa500;
  /* ... more variables ... */
}
```

---

## 🧪 Test the Application

### Test Flow
1. **Visit Home Page**
   - Go to `http://localhost:5173`
   - See landing page with features and companies

2. **Create Account**
   - Click "Sign Up" button
   - Fill student info (CGPA, branch)

3. **Apply for Jobs**
   - Login as student
   - Browse jobs
   - Apply with resume

4. **Admin Testing**
   - Create admin user via DB
   - Login as admin
   - Post jobs
   - View applications
   - Update status (Applied → Shortlisted → Selected)

---

## 📁 Project Structure

```
placement-management-system/
├── backend/
│   ├── config/          # Database config
│   ├── controllers/      # Route handlers
│   ├── models/           # Database schemas
│   ├── routes/           # API endpoints
│   ├── middleware/       # Auth & utilities
│   ├── server.js         # Main server
│   └── package.json
│
└── frontend/
    └── frontend/         # React app
        ├── src/
        │   ├── pages/    # Route pages
        │   ├── components/ # React components
        │   ├── services/ # API calls
        │   ├── App.jsx   # Main app
        │   └── App.css   # All styling
        └── package.json
```

---

## 🔑 Key Features

### For Students
- ✅ Browse all available jobs
- ✅ Apply with one-click resume upload
- ✅ Track application status
- ✅ Get real-time notifications
- ✅ View interview schedules

### For Admins
- ✅ Post new job openings
- ✅ View all applications
- ✅ Update application status
- ✅ Shortlist candidates
- ✅ Send notifications
- ✅ View statistics & reports

### UI/UX
- ✅ Dark theme for reduced eye strain
- ✅ Golden accents for better visibility
- ✅ Responsive on all devices
- ✅ Smooth animations
- ✅ Intuitive navigation

---

## 🐛 Troubleshooting

### Frontend Issues
**Issue**: Pages not loading
- Clear browser cache: `Ctrl+Shift+Delete`
- Restart dev server: `npm run dev`

**Issue**: Styling not applying
- Check if CSS file is imported
- Clear cache and hard refresh: `Ctrl+F5`

### Backend Issues
**Issue**: MongoDB connection error
- Ensure MongoDB is running
- Check connection string in `.env`
- Verify credentials

**Issue**: Cors errors
- Backend has CORS enabled for localhost:5173
- Check `server.js` for CORS configuration

---

## 📞 Support

All routes and functionality are working. The application:
- Uses JWT for authentication
- Stores resumes in `/uploads` folder
- Uses MongoDB for data persistence
- Implements role-based access control
- Has comprehensive error handling

---

## ✅ Verification Checklist

Before deploying, verify:
- ✅ Backend server starts without errors
- ✅ Frontend development server runs
- ✅ Can register and login
- ✅ Can view jobs (student)
- ✅ Can post jobs (admin)
- ✅ Can upload resume
- ✅ Dark theme displays correctly
- ✅ Golden accents visible
- ✅ All routes accessible
- ✅ Database queries working

---

## 🎯 Next Steps

1. **Test Locally**: Run both servers and test all features
2. **Deploy Backend**: Push to production server (Heroku, AWS, etc.)
3. **Deploy Frontend**: Build and host on CDN or server
4. **Monitor**: Check logs for any issues
5. **Gather Feedback**: Get user feedback on new theme

---

**Setup Complete!** Your PlaceLink application is ready to use. 🚀

For more details, see **THEME_UPDATE_SUMMARY.md**
