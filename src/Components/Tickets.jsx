import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, logout } from '../Services/authServices'
import { getAllTickets, deleteTicket } from '../Services/ticketServices'

const Tickets = ({ showToast }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    loadTickets();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [tickets, filter, searchTerm]);

  const loadTickets = async () => {
    setIsLoading(true);
    try {
      const response = await getAllTickets();
      setTickets(response.tickets);
    } catch (error) {
        console.error("Error loading stats:", error);
      showToast('Failed to load tickets. Please try again.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...tickets];

    // Apply status filter
    if (filter !== 'all') {
      filtered = filtered.filter(ticket => ticket.status === filter);
    }

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(ticket =>
        ticket.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    setFilteredTickets(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteTicket(id);
      showToast('Ticket deleted successfully!', 'success');
      loadTickets();
      setDeleteConfirm(null);
    } catch (error) {
      showToast(error.message, 'error');
    }
  };

  const handleLogout = () => {
    logout();
    showToast('You have been logged out successfully.', 'success');
    navigate('/');
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'open':
        return 'status-badge status-open';
      case 'in_progress':
        return 'status-badge status-progress';
      case 'closed':
        return 'status-badge status-closed';
      default:
        return 'status-badge';
    }
  };

  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-badge priority-high';
      case 'medium':
        return 'priority-badge priority-medium';
      case 'low':
        return 'priority-badge priority-low';
      default:
        return 'priority-badge';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="tickets-page">
      {/* Header */}
      <header className="dashboard-header">
        <div className="container">
          <div className="dashboard-nav">
            <Link to="/" className="dashboard-logo">
              <span className="logo-icon">🎫</span>
              <span className="logo-text">TicketFlow</span>
            </Link>
            <div className="dashboard-nav-right">
              <Link to="/dashboard" className="btn btn-secondary">
                Dashboard
              </Link>
              <span className="dashboard-user">👤 {user?.name}</span>
              <button onClick={handleLogout} className="btn btn-secondary">
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="tickets-main">
        <div className="container">
          {/* Page Header */}
          <div className="tickets-header">
            <div>
              <h1 className="page-title">Ticket Management</h1>
              <p className="page-subtitle">Create, view, edit, and manage all your support tickets</p>
            </div>
            <Link to="/tickets/new" className="btn btn-primary">
              ➕ Create New Ticket
            </Link>
          </div>

          {/* Filters and Search */}
          <div className="tickets-filters">
            <div className="filter-buttons">
              <button
                className={`filter-btn ${filter === 'all' ? 'filter-btn-active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All ({tickets.length})
              </button>
              <button
                className={`filter-btn ${filter === 'open' ? 'filter-btn-active' : ''}`}
                onClick={() => setFilter('open')}
              >
                Open ({tickets.filter(t => t.status === 'open').length})
              </button>
              <button
                className={`filter-btn ${filter === 'in_progress' ? 'filter-btn-active' : ''}`}
                onClick={() => setFilter('in_progress')}
              >
                In Progress ({tickets.filter(t => t.status === 'in_progress').length})
              </button>
              <button
                className={`filter-btn ${filter === 'closed' ? 'filter-btn-active' : ''}`}
                onClick={() => setFilter('closed')}
              >
                Closed ({tickets.filter(t => t.status === 'closed').length})
              </button>
            </div>

            <div className="search-box">
              <input
                type="text"
                className="search-input"
                placeholder="Search tickets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tickets List */}
          {isLoading ? (
            <div className="tickets-loading">
              <div className="spinner"></div>
              <p>Loading tickets...</p>
            </div>
          ) : filteredTickets.length === 0 ? (
            <div className="tickets-empty">
              <div className="empty-icon">📭</div>
              <h3>No tickets found</h3>
              <p>
                {searchTerm || filter !== 'all'
                  ? 'Try adjusting your filters or search term'
                  : 'Create your first ticket to get started'}
              </p>
              {!searchTerm && filter === 'all' && (
                <Link to="/tickets/new" className="btn btn-primary">
                  Create New Ticket
                </Link>
              )}
            </div>
          ) : (
            <div className="tickets-grid">
              {filteredTickets.map((ticket) => (
                <div key={ticket.id} className="ticket-card">
                  <div className="ticket-header">
                    <div className="ticket-badges">
                      <span className={getStatusBadgeClass(ticket.status)}>
                        {ticket.status.replace('_', ' ')}
                      </span>
                      <span className={getPriorityBadgeClass(ticket.priority)}>
                        {ticket.priority}
                      </span>
                    </div>
                    <div className="ticket-actions">
                      <Link
                        to={`/tickets/edit/${ticket.id}`}
                        className="ticket-action-btn"
                        title="Edit ticket"
                      >
                        ✏️
                      </Link>
                      <button
                        onClick={() => setDeleteConfirm(ticket.id)}
                        className="ticket-action-btn ticket-delete-btn"
                        title="Delete ticket"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  <div className="ticket-body">
                    <h3 className="ticket-title">{ticket.title}</h3>
                    <p className="ticket-description">
                      {ticket.description || 'No description provided'}
                    </p>
                  </div>

                  <div className="ticket-footer">
                    <span className="ticket-date">
                      📅 {formatDate(ticket.createdAt)}
                    </span>
                    <span className="ticket-author">
                      👤 {ticket.createdBy}
                    </span>
                  </div>

                  {/* Delete Confirmation Modal */}
                  {deleteConfirm === ticket.id && (
                    <div className="modal-overlay" onClick={() => setDeleteConfirm(null)}>
                      <div className="modal" onClick={(e) => e.stopPropagation()}>
                        <h3 className="modal-title">Delete Ticket</h3>
                        <p className="modal-text">
                          Are you sure you want to delete this ticket? This action cannot be undone.
                        </p>
                        <div className="modal-actions">
                          <button
                            onClick={() => setDeleteConfirm(null)}
                            className="btn btn-secondary"
                          >
                            Cancel
                          </button>
                          <button
                            onClick={() => handleDelete(ticket.id)}
                            className="btn btn-danger"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
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

export default Tickets;