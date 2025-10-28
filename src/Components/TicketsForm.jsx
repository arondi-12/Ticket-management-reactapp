import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getCurrentUser, logout } from '../Services/authServices'
import { createTicket, updateTicket, getTicketById } from '../Services/ticketServices'

const TicketForm = ({ showToast }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditMode = Boolean(id);
  
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'open',
    priority: 'medium'
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(isEditMode);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    
    if (isEditMode) {
      loadTicket();
    }
  }, [id]);

  const loadTicket = async () => {
    try {
      const response = await getTicketById(id);
      setFormData({
        title: response.ticket.title,
        description: response.ticket.description,
        status: response.ticket.status,
        priority: response.ticket.priority
      });
    } catch (error) {
      showToast(error.message, 'error');
      navigate('/tickets');
    } finally {
      setIsFetching(false);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title || formData.title.trim() === '') {
      newErrors.title = 'Title is required';
    } else if (formData.title.length > 200) {
      newErrors.title = 'Title must be less than 200 characters';
    }
    
    if (!formData.status) {
      newErrors.status = 'Status is required';
    } else if (!['open', 'in_progress', 'closed'].includes(formData.status)) {
      newErrors.status = 'Status must be one of: open, in_progress, closed';
    }
    
    if (formData.description && formData.description.length > 1000) {
      newErrors.description = 'Description must be less than 1000 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      showToast('Please fix the errors in the form', 'error');
      return;
    }
    
    setIsLoading(true);
    
    try {
      if (isEditMode) {
        const response = await updateTicket(id, formData);
        showToast(response.message, 'success');
      } else {
        const response = await createTicket({
          ...formData,
          createdBy: user?.email || 'unknown'
        });
        showToast(response.message, 'success');
      }
      navigate('/tickets');
    } catch (error) {
      showToast(error.message, 'error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    showToast('You have been logged out successfully.', 'success');
    navigate('/');
  };

  if (isFetching) {
    return (
      <div className="tickets-page">
        <header className="dashboard-header">
          <div className="container">
            <div className="dashboard-nav">
              <Link to="/" className="dashboard-logo">
                <span className="logo-icon">🎫</span>
                <span className="logo-text">TicketFlow</span>
              </Link>
            </div>
          </div>
        </header>
        <main className="tickets-main">
          <div className="container">
            <div className="tickets-loading">
              <div className="spinner"></div>
              <p>Loading ticket...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              <Link to="/tickets" className="btn btn-secondary">
                All Tickets
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
          <div className="form-page">
            <div className="form-container">
              <div className="form-header">
                <h1 className="form-title">
                  {isEditMode ? '✏️ Edit Ticket' : '➕ Create New Ticket'}
                </h1>
                <p className="form-subtitle">
                  {isEditMode
                    ? 'Update the ticket information below'
                    : 'Fill in the details to create a new support ticket'}
                </p>
              </div>

              <form className="ticket-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group form-group-full">
                    <label htmlFor="title" className="form-label">
                      Title <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="title"
                      name="title"
                      className={`form-input ${errors.title ? 'form-input-error' : ''}`}
                      placeholder="Enter a descriptive title for the ticket"
                      value={formData.title}
                      onChange={handleChange}
                      disabled={isLoading}
                      maxLength={200}
                    />
                    {errors.title && (
                      <span className="form-error">{errors.title}</span>
                    )}
                    <span className="form-hint">
                      {formData.title.length}/200 characters
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group form-group-full">
                    <label htmlFor="description" className="form-label">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      className={`form-textarea ${errors.description ? 'form-input-error' : ''}`}
                      placeholder="Provide a detailed description of the issue or request"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={isLoading}
                      rows={6}
                      maxLength={1000}
                    />
                    {errors.description && (
                      <span className="form-error">{errors.description}</span>
                    )}
                    <span className="form-hint">
                      {formData.description.length}/1000 characters
                    </span>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="status" className="form-label">
                      Status <span className="required">*</span>
                    </label>
                    <select
                      id="status"
                      name="status"
                      className={`form-select ${errors.status ? 'form-input-error' : ''}`}
                      value={formData.status}
                      onChange={handleChange}
                      disabled={isLoading}
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="closed">Closed</option>
                    </select>
                    {errors.status && (
                      <span className="form-error">{errors.status}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="priority" className="form-label">
                      Priority
                    </label>
                    <select
                      id="priority"
                      name="priority"
                      className="form-select"
                      value={formData.priority}
                      onChange={handleChange}
                      disabled={isLoading}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>
                </div>

                <div className="form-actions">
                  <Link to="/tickets" className="btn btn-secondary">
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isLoading}
                  >
                    {isLoading
                      ? (isEditMode ? 'Updating...' : 'Creating...')
                      : (isEditMode ? 'Update Ticket' : 'Create Ticket')}
                  </button>
                </div>
              </form>
            </div>
          </div>
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

export default TicketForm;