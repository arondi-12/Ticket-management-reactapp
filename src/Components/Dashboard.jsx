import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../Services/authServices'
import { getTicketStats } from '../Services/ticketServices'

const Dashboard = ({ showToast }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    open: 0,
    inProgress: 0,
    closed: 0,
    highPriority: 0,
    mediumPriority: 0,
    lowPriority: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await getTicketStats();
      setStats(response.stats);
    } catch (error) {
        console.error("Error loading stats:", error);
      showToast('Failed to load statistics. Please refresh the page.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    showToast('You have been logged out successfully.', 'success');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="dashboard-nav">
            <Link to="/" className="dashboard-logo">
              <span className="logo-icon">🎫</span>
              <span className="logo-text">TicketFlow</span>
            </Link>
            <div className="dashboard-nav-right">
              <span className="dashboard-user">👤 {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="dashboard-main">
        <div className="container">
          {/* Welcome Section */}
          <div className="dashboard-welcome">
            <h1 className="dashboard-title">Welcome back, {user?.name}! 👋</h1>
            <p className="dashboard-subtitle">
              Here's an overview of your ticket management system
            </p>
          </div>

          {/* Statistics Grid */}
          {isLoading ? (
            <div className="dashboard-loading">
              <div className="spinner"></div>
              <p>Loading statistics...</p>
            </div>
          ) : (
            <>
              <div className="stats-grid">
                <div className="stat-card stat-card-primary">
                  <div className="stat-icon">📊</div>
                  <div className="stat-content">
                    <h3 className="stat-number">{stats.total}</h3>
                    <p className="stat-label">Total Tickets</p>
                  </div>
                </div>

                <div className="stat-card stat-card-success">
                  <div className="stat-icon">✅</div>
                  <div className="stat-content">
                    <h3 className="stat-number">{stats.open}</h3>
                    <p className="stat-label">Open Tickets</p>
                  </div>
                </div>

                <div className="stat-card stat-card-warning">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-content">
                    <h3 className="stat-number">{stats.inProgress}</h3>
                    <p className="stat-label">In Progress</p>
                  </div>
                </div>

                <div className="stat-card stat-card-info">
                  <div className="stat-icon">🎯</div>
                  <div className="stat-content">
                    <h3 className="stat-number">{stats.closed}</h3>
                    <p className="stat-label">Resolved Tickets</p>
                  </div>
                </div>
              </div>

              {/* Priority Breakdown */}
              <div className="dashboard-section">
                <h2 className="section-title">Priority Breakdown</h2>
                <div className="priority-grid">
                  <div className="priority-card priority-high">
                    <div className="priority-icon">🔴</div>
                    <div className="priority-content">
                      <h3 className="priority-number">{stats.highPriority}</h3>
                      <p className="priority-label">High Priority</p>
                    </div>
                  </div>

                  <div className="priority-card priority-medium">
                    <div className="priority-icon">🟡</div>
                    <div className="priority-content">
                      <h3 className="priority-number">{stats.mediumPriority}</h3>
                      <p className="priority-label">Medium Priority</p>
                    </div>
                  </div>

                  <div className="priority-card priority-low">
                    <div className="priority-icon">🟢</div>
                    <div className="priority-content">
                      <h3 className="priority-number">{stats.lowPriority}</h3>
                      <p className="priority-label">Low Priority</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="dashboard-section">
                <h2 className="section-title">Quick Actions</h2>
                <div className="actions-grid">
                  <Link to="/tickets" className="action-card">
                    <div className="action-icon">🎫</div>
                    <h3 className="action-title">View All Tickets</h3>
                    <p className="action-description">
                      Browse and manage all your support tickets
                    </p>
                  </Link>

                  <Link to="/tickets/new" className="action-card">
                    <div className="action-icon">➕</div>
                    <h3 className="action-title">Create New Ticket</h3>
                    <p className="action-description">
                      Submit a new support ticket for your issue
                    </p>
                  </Link>

                  <div className="action-card action-card-disabled">
                    <div className="action-icon">📈</div>
                    <h3 className="action-title">Analytics</h3>
                    <p className="action-description">
                      View detailed reports and insights (Coming Soon)
                    </p>
                  </div>

                  <div className="action-card action-card-disabled">
                    <div className="action-icon">⚙️</div>
                    <h3 className="action-title">Settings</h3>
                    <p className="action-description">
                      Manage your account and preferences (Coming Soon)
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="dashboard-footer">
        <div className="container">
          <p>© 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;