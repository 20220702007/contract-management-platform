# 🔐 Authentication Guide

## Overview

The website now has a complete **login/signup system** that works **without any backend code**. All authentication data is stored in your browser's localStorage.

---

## 🚀 How It Works

### **No Backend Required**
- All user data is stored in browser's `localStorage`
- No server, database, or API calls needed
- Perfect for local development or single-user scenarios

### **Features**
✅ User Signup (create account)  
✅ User Login  
✅ Protected Routes (login required to access pages)  
✅ Session Persistence (stays logged in after page refresh)  
✅ Logout functionality  
✅ Username display in header  

---

## 📁 Files Added/Modified

### **New Files:**
1. **`src/store/authStore.ts`** - Authentication state management
2. **`src/components/auth/ProtectedRoute.tsx`** - Route protection component
3. **`src/pages/LoginPage.tsx`** - Login page
4. **`src/pages/SignupPage.tsx`** - Signup page

### **Modified Files:**
1. **`src/App.tsx`** - Added auth routes and protected routes
2. **`src/components/Layout/Header.tsx`** - Added user info and logout button
3. **`src/utils/persistence.ts`** - Added user storage functions

---

## 🎯 User Flow

### **First Time User (Signup):**

1. User visits website → Redirected to `/login`
2. Clicks **"create a new account"** link
3. Fills signup form:
   - Username (unique)
   - Email (unique, validated format)
   - Password (minimum 6 characters)
   - Confirm Password
4. Clicks **"Sign up"**
5. Account created → Automatically logged in → Redirected to Dashboard

### **Returning User (Login):**

1. User visits website → Redirected to `/login`
2. Enters username and password
3. Clicks **"Sign in"**
4. Validated → Logged in → Redirected to Dashboard

### **Logged In User:**

- Can access all pages (Dashboard, Blueprints, Contracts)
- Sees username in header
- Can logout using "Logout" button in header

### **After Logout:**

- Session cleared
- Redirected to `/login`
- All protected routes require login again

---

## 🔒 How Authentication Works

### **1. Data Storage (localStorage)**

**Users are stored as:**
```javascript
localStorage.setItem('contract_platform_users', JSON.stringify([
  {
    id: 'user-123',
    username: 'john',
    email: 'john@example.com',
    password: 'password123', // ⚠️ Plain text (for demo only!)
    createdAt: '2024-01-01T10:00:00'
  }
]));
```

**Current session stored as:**
```javascript
localStorage.setItem('contract_platform_current_user', JSON.stringify(user));
```

### **2. Protected Routes**

All routes (except `/login` and `/signup`) are protected:

```typescript
<ProtectedRoute>
  <MainLayout>
    {/* All your app pages */}
  </MainLayout>
</ProtectedRoute>
```

**How it works:**
- Checks if user is authenticated
- If not → Redirects to `/login`
- If yes → Shows the page

### **3. Auth Store (Zustand)**

Manages authentication state globally:

```typescript
const login = useAuthStore((state) => state.login);
const signup = useAuthStore((state) => state.signup);
const logout = useAuthStore((state) => state.logout);
const currentUser = useAuthStore((state) => state.currentUser);
const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
```

### **4. Session Persistence**

When app loads:
- Checks `localStorage` for current user
- If found → Restores session automatically
- User stays logged in after page refresh

---

## 🎨 UI Features

### **Login Page (`/login`)**
- Username and password fields
- Error messages for invalid credentials
- Link to signup page
- Centered, clean design

### **Signup Page (`/signup`)**
- Username, email, password, confirm password fields
- Validation:
  - All fields required
  - Password min 6 characters
  - Passwords must match
  - Email format validation
  - Username/email uniqueness check
- Link to login page
- Centered, clean design

### **Header (When Logged In)**
- Shows "Welcome, [username]"
- Logout button (red on hover)
- All navigation links still visible

---

## 🔧 Technical Details

### **Authentication Store (authStore.ts)**

**Functions:**
- `loadAuth()` - Loads current user from localStorage on app start
- `login(username, password)` - Validates credentials, sets session
- `signup(username, email, password)` - Creates new user, auto-login
- `logout()` - Clears session, removes from localStorage

**State:**
- `currentUser: User | null` - Current logged-in user
- `isAuthenticated: boolean` - Auth status flag

### **Protected Route Component**

```typescript
export const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
```

### **Persistence Functions**

Added to `src/utils/persistence.ts`:
- `saveUsers(users)` - Save all users to localStorage
- `loadUsers()` - Load all users from localStorage
- `saveCurrentUser(user)` - Save current session
- `loadCurrentUser()` - Load current session
- `clearCurrentUser()` - Clear current session

---

## 📝 Routes Structure

### **Public Routes (No Login Required):**
- `/login` - Login page
- `/signup` - Signup page

### **Protected Routes (Login Required):**
- `/` - Dashboard
- `/blueprints` - Blueprints list
- `/blueprints/create` - Create blueprint
- `/blueprints/:id/edit` - Edit blueprint
- `/contracts/create` - Create contract
- `/contracts/:id` - View contract

**Any attempt to access protected routes without login redirects to `/login`**

---

## 🛡️ Security Notes

### **⚠️ Important: This is for Demo/Development Only**

**Current Implementation:**
- Passwords stored in **plain text** (not secure!)
- No password hashing/encryption
- No password reset functionality
- No email verification
- All data stored locally (browser-specific)

**For Production Use, You Should:**
- Hash passwords (use bcrypt, Argon2, etc.)
- Add password reset functionality
- Add email verification
- Use a proper backend with database
- Implement JWT or session tokens
- Add rate limiting for login attempts
- Add CSRF protection

---

## 🧪 Testing the Authentication

### **Test Signup:**
1. Go to `http://localhost:5173` (redirects to `/login`)
2. Click "create a new account"
3. Fill form and signup
4. Should redirect to dashboard
5. Should see username in header

### **Test Login:**
1. Logout (click logout button)
2. Go to `/login`
3. Enter credentials
4. Should login and redirect to dashboard

### **Test Protected Routes:**
1. Logout
2. Try to access `http://localhost:5173/` directly
3. Should redirect to `/login`
4. After login, should work normally

### **Test Session Persistence:**
1. Login
2. Refresh the page
3. Should stay logged in (no redirect to login)

---

## 💡 Usage Examples

### **Check if User is Logged In:**
```typescript
import { useAuthStore } from './store/authStore';

const MyComponent = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const currentUser = useAuthStore((state) => state.currentUser);
  
  if (!isAuthenticated) {
    return <div>Please login</div>;
  }
  
  return <div>Welcome, {currentUser?.username}!</div>;
};
```

### **Programmatic Logout:**
```typescript
import { useAuthStore } from './store/authStore';
import { useNavigate } from 'react-router-dom';

const MyComponent = () => {
  const logout = useAuthStore((state) => state.logout);
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return <button onClick={handleLogout}>Logout</button>;
};
```

---

## 🎯 Summary

**What Was Added:**
✅ Complete authentication system  
✅ Login and Signup pages  
✅ Protected routes (all pages require login)  
✅ Session persistence  
✅ User info in header  
✅ Logout functionality  

**How It Works:**
- Users stored in localStorage
- Session stored in localStorage
- Protected routes check authentication
- Auto-redirect to login if not authenticated

**How to Use:**
1. Start app → Redirects to login
2. Signup or login
3. Access all features when logged in
4. Logout when done

---

**The authentication system is now fully functional and integrated!** 🎉
