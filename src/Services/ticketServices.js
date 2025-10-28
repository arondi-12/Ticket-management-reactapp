// Ticket Service
// Handles all ticket CRUD operations

const TICKETS_KEY = 'ticketapp_tickets';

// Initialize demo tickets
const initializeTickets = () => {
  const tickets = localStorage.getItem(TICKETS_KEY);
  if (!tickets) {
    const demoTickets = [
      {
        id: '1',
        title: 'Login page not loading',
        description: 'Users are reporting issues accessing the login page. It shows a blank screen.',
        status: 'open',
        priority: 'high',
        createdAt: new Date('2024-10-20').toISOString(),
        updatedAt: new Date('2024-10-20').toISOString(),
        createdBy: 'user@ticketflow.com'
      },
      {
        id: '2',
        title: 'Update dashboard analytics',
        description: 'Need to add new charts for better data visualization on the dashboard.',
        status: 'in_progress',
        priority: 'medium',
        createdAt: new Date('2024-10-22').toISOString(),
        updatedAt: new Date('2024-10-24').toISOString(),
        createdBy: 'admin@ticketflow.com'
      },
      {
        id: '3',
        title: 'Fix email notification bug',
        description: 'Email notifications are not being sent when tickets are updated.',
        status: 'closed',
        priority: 'high',
        createdAt: new Date('2024-10-18').toISOString(),
        updatedAt: new Date('2024-10-23').toISOString(),
        createdBy: 'user@ticketflow.com'
      },
      {
        id: '4',
        title: 'Add dark mode support',
        description: 'Implement dark mode theme for better user experience.',
        status: 'open',
        priority: 'low',
        createdAt: new Date('2024-10-25').toISOString(),
        updatedAt: new Date('2024-10-25').toISOString(),
        createdBy: 'admin@ticketflow.com'
      }
    ];
    localStorage.setItem(TICKETS_KEY, JSON.stringify(demoTickets));
  }
};

// Get all tickets
export const getAllTickets = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      initializeTickets();
      const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
      resolve({ success: true, tickets });
    }, 300);
  });
};

// Get ticket by ID
export const getTicketById = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      initializeTickets();
      const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
      const ticket = tickets.find(t => t.id === id);
      
      if (ticket) {
        resolve({ success: true, ticket });
      } else {
        reject({ success: false, message: 'Ticket not found.' });
      }
    }, 300);
  });
};

// Create new ticket
export const createTicket = async (ticketData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validation
      if (!ticketData.title || ticketData.title.trim() === '') {
        reject({ success: false, message: 'Title is required.' });
        return;
      }
      
      if (!ticketData.status) {
        reject({ success: false, message: 'Status is required.' });
        return;
      }
      
      const validStatuses = ['open', 'in_progress', 'closed'];
      if (!validStatuses.includes(ticketData.status)) {
        reject({ success: false, message: 'Status must be one of: open, in_progress, closed.' });
        return;
      }
      
      if (ticketData.title.length > 200) {
        reject({ success: false, message: 'Title must be less than 200 characters.' });
        return;
      }
      
      if (ticketData.description && ticketData.description.length > 1000) {
        reject({ success: false, message: 'Description must be less than 1000 characters.' });
        return;
      }
      
      initializeTickets();
      const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
      
      const newTicket = {
        id: Date.now().toString(),
        title: ticketData.title.trim(),
        description: ticketData.description?.trim() || '',
        status: ticketData.status,
        priority: ticketData.priority || 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        createdBy: ticketData.createdBy || 'unknown'
      };
      
      tickets.push(newTicket);
      localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
      resolve({ success: true, ticket: newTicket, message: 'Ticket created successfully!' });
    }, 500);
  });
};

// Update ticket
export const updateTicket = async (id, ticketData) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validation
      if (!ticketData.title || ticketData.title.trim() === '') {
        reject({ success: false, message: 'Title is required.' });
        return;
      }
      
      if (!ticketData.status) {
        reject({ success: false, message: 'Status is required.' });
        return;
      }
      
      const validStatuses = ['open', 'in_progress', 'closed'];
      if (!validStatuses.includes(ticketData.status)) {
        reject({ success: false, message: 'Status must be one of: open, in_progress, closed.' });
        return;
      }
      
      if (ticketData.title.length > 200) {
        reject({ success: false, message: 'Title must be less than 200 characters.' });
        return;
      }
      
      if (ticketData.description && ticketData.description.length > 1000) {
        reject({ success: false, message: 'Description must be less than 1000 characters.' });
        return;
      }
      
      initializeTickets();
      const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
      const index = tickets.findIndex(t => t.id === id);
      
      if (index === -1) {
        reject({ success: false, message: 'Ticket not found.' });
        return;
      }
      
      tickets[index] = {
        ...tickets[index],
        title: ticketData.title.trim(),
        description: ticketData.description?.trim() || '',
        status: ticketData.status,
        priority: ticketData.priority || tickets[index].priority,
        updatedAt: new Date().toISOString()
      };
      
      localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
      resolve({ success: true, ticket: tickets[index], message: 'Ticket updated successfully!' });
    }, 500);
  });
};

// Delete ticket
export const deleteTicket = async (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      initializeTickets();
      const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
      const index = tickets.findIndex(t => t.id === id);
      
      if (index === -1) {
        reject({ success: false, message: 'Ticket not found.' });
        return;
      }
      
      tickets.splice(index, 1);
      localStorage.setItem(TICKETS_KEY, JSON.stringify(tickets));
      resolve({ success: true, message: 'Ticket deleted successfully!' });
    }, 400);
  });
};

// Get ticket statistics
export const getTicketStats = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      initializeTickets();
      const tickets = JSON.parse(localStorage.getItem(TICKETS_KEY) || '[]');
      
      const stats = {
        total: tickets.length,
        open: tickets.filter(t => t.status === 'open').length,
        inProgress: tickets.filter(t => t.status === 'in_progress').length,
        closed: tickets.filter(t => t.status === 'closed').length,
        highPriority: tickets.filter(t => t.priority === 'high').length,
        mediumPriority: tickets.filter(t => t.priority === 'medium').length,
        lowPriority: tickets.filter(t => t.priority === 'low').length
      };
      
      resolve({ success: true, stats });
    }, 300);
  });
};