// Authentication Service
// Handles login, signup, logout, and session management

const AUTH_KEY = 'ticketapp_session';
const USERS_KEY = 'ticketapp_users';

// Initialize demo users if not exists
const initializeUsers = () => {
  const users = localStorage.getItem(USERS_KEY);
  if (!users) {
    const demoUsers = [
      {
        id: '1',
        email: 'admin@ticketflow.com',
        password: 'admin123',
        name: 'Admin User',
        role: 'admin'
      },
      {
        id: '2',
        email: 'user@ticketflow.com',
        password: 'user123',
        name: 'Demo User',
        role: 'user'
      }
    ];
    localStorage.setItem(USERS_KEY, JSON.stringify(demoUsers));
  }
};

// Generate session token
const generateToken = () => {
  return 'token_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
};

// Login user
export const login = async (email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      initializeUsers();
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const token = generateToken();
        const session = {
          token,
          user: {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role
          },
          expiresAt: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
        };
        localStorage.setItem(AUTH_KEY, JSON.stringify(session));
        resolve({ success: true, user: session.user, token });
      } else {
        reject({ success: false, message: 'Invalid email or password. Please try again.' });
      }
    }, 800); // Simulate network delay
  });
};

// Signup new user
export const signup = async (name, email, password) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      initializeUsers();
      const users = JSON.parse(localStorage.getItem(USERS_KEY) || '[]');
      
      // Check if email already exists
      if (users.find(u => u.email === email)) {
        reject({ success: false, message: 'This email is already registered. Please login instead.' });
        return;
      }
      
      // Create new user
      const newUser = {
        id: Date.now().toString(),
        email,
        password,
        name,
        role: 'user'
      };
      
      users.push(newUser);
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
      
      // Auto login after signup
      const token = generateToken();
      const session = {
        token,
        user: {
          id: newUser.id,
          email: newUser.email,
          name: newUser.name,
          role: newUser.role
        },
        expiresAt: Date.now() + (24 * 60 * 60 * 1000)
      };
      localStorage.setItem(AUTH_KEY, JSON.stringify(session));
      resolve({ success: true, user: session.user, token });
    }, 800);
  });
};

// Logout user
export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return false;
  
  try {
    const { expiresAt } = JSON.parse(session);
    if (Date.now() > expiresAt) {
      logout();
      return false;
    }
    return true;
  } catch {
    return false;
  }
};

// Get current user
export const getCurrentUser = () => {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return null;
  
  try {
    const { user, expiresAt } = JSON.parse(session);
    if (Date.now() > expiresAt) {
      logout();
      return null;
    }
    return user;
  } catch {
    return null;
  }
};

// Get session token
export const getToken = () => {
  const session = localStorage.getItem(AUTH_KEY);
  if (!session) return null;
  
  try {
    const { token, expiresAt } = JSON.parse(session);
    if (Date.now() > expiresAt) {
      logout();
      return null;
    }
    return token;
  } catch {
    return null;
  }
};