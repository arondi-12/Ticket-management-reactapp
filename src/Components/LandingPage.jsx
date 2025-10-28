import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="landing-page">
      {/* Header/Navigation */}
      <header className="header">
        <div className="container">
          <div className="nav-content">
            <div className="logo">
              <span className="logo-icon">🎫</span>
              <span className="logo-text">TicketFlow</span>
            </div>
            <nav className="nav-menu">
              <Link to="/login" className="btn btn-secondary">Login</Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Wavy Background */}
      <section className="hero-section">
        <div className="wave-background">
          <svg className="wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#667eea"
              fillOpacity="0.1"
              d="M0,96L48,112C96,128,192,160,288,165.3C384,171,480,149,576,144C672,139,768,149,864,154.7C960,160,1056,160,1152,149.3C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
          <svg className="wave wave-2" viewBox="0 0 1440 320" preserveAspectRatio="none">
            <path
              fill="#764ba2"
              fillOpacity="0.05"
              d="M0,192L48,197.3C96,203,192,213,288,192C384,171,480,117,576,112C672,107,768,149,864,165.3C960,181,1056,171,1152,154.7C1248,139,1344,117,1392,106.7L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
            ></path>
          </svg>
        </div>
        
        {/* Decorative Circles */}
        <div className="decorative-circle circle-1"></div>
        <div className="decorative-circle circle-2"></div>
        <div className="decorative-circle circle-3"></div>

        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Streamline Your Ticket Management
              </h1>
              <p className="hero-description">
                The all-in-one solution for tracking, managing, and resolving support tickets efficiently. 
                Boost your team's productivity with powerful features and intuitive design.
              </p>
              <div className="hero-buttons">
                <Link to="/register" className="btn btn-primary">Get Started</Link>
                <Link to="/login" className="btn btn-secondary">Login</Link>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <span className="stat-number">10K+</span>
                  <span className="stat-label">Active Users</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">50K+</span>
                  <span className="stat-label">Tickets Resolved</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">99.9%</span>
                  <span className="stat-label">Uptime</span>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <div className="hero-illustration">
                <div className="illustration-card card-1">
                  <div className="card-header">
                    <div className="card-dot"></div>
                    <div className="card-dot"></div>
                    <div className="card-dot"></div>
                  </div>
                  <div className="card-content">
                    <div className="card-line"></div>
                    <div className="card-line short"></div>
                  </div>
                </div>
                <div className="illustration-card card-2">
                  <div className="card-icon">✓</div>
                  <div className="card-text">Ticket Resolved</div>
                </div>
                <div className="illustration-card card-3">
                  <div className="card-badge">New</div>
                  <div className="card-mini-line"></div>
                  <div className="card-mini-line"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Box Shapes */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Powerful Features for Modern Teams</h2>
            <p className="section-description">
              Everything you need to manage tickets effectively, all in one place
            </p>
          </div>
          
          <div className="features-grid">
            <div className="feature-box">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-description">
                Create and update tickets instantly with our optimized interface. No lag, no waiting.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🔒</div>
              <h3 className="feature-title">Secure & Reliable</h3>
              <p className="feature-description">
                Enterprise-grade security with end-to-end encryption. Your data is always protected.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Analytics Dashboard</h3>
              <p className="feature-description">
                Get insights into your team's performance with comprehensive analytics and reporting.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">🎯</div>
              <h3 className="feature-title">Priority Management</h3>
              <p className="feature-description">
                Organize tickets by priority levels and ensure critical issues are handled first.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">👥</div>
              <h3 className="feature-title">Team Collaboration</h3>
              <p className="feature-description">
                Work together seamlessly with real-time updates and assignment features.
              </p>
            </div>

            <div className="feature-box">
              <div className="feature-icon">📱</div>
              <h3 className="feature-title">Responsive Design</h3>
              <p className="feature-description">
                Access your tickets anywhere, anytime. Fully optimized for all devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">How It Works</h2>
            <p className="section-description">
              Get started in three simple steps
            </p>
          </div>

          <div className="steps-container">
            <div className="step-box">
              <div className="step-number">1</div>
              <h3 className="step-title">Create Account</h3>
              <p className="step-description">
                Sign up in seconds and set up your workspace with customizable settings.
              </p>
            </div>

            <div className="step-connector"></div>

            <div className="step-box">
              <div className="step-number">2</div>
              <h3 className="step-title">Add Tickets</h3>
              <p className="step-description">
                Create tickets with detailed descriptions, priorities, and assignments.
              </p>
            </div>

            <div className="step-connector"></div>

            <div className="step-box">
              <div className="step-number">3</div>
              <h3 className="step-title">Track & Resolve</h3>
              <p className="step-description">
                Monitor progress, collaborate with your team, and resolve issues efficiently.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-box">
            <div className="cta-content">
              <h2 className="cta-title">Ready to Transform Your Workflow?</h2>
              <p className="cta-description">
                Join thousands of teams already using TicketFlow to manage their support tickets.
              </p>
              <Link to="/register" className="btn btn-primary btn-large">
                Get Started Free
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="footer-logo">
                <span className="logo-icon">🎫</span>
                <span className="logo-text">TicketFlow</span>
              </div>
              <p className="footer-description">
                The modern way to manage support tickets and streamline your team's workflow.
              </p>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Product</h4>
              <ul className="footer-links">
                <li><a href="#features">Features</a></li>
                <li><a href="#pricing">Pricing</a></li>
                <li><a href="#demo">Demo</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><a href="#about">About Us</a></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-section">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-links">
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#support">Support</a></li>
                <li><a href="#blog">Blog</a></li>
              </ul>
            </div>
          </div>

          <div className="footer-bottom">
            <p className="footer-copyright">
              © 2025 TicketFlow. All rights reserved.
            </p>
            <div className="footer-legal">
              <a href="#privacy">Privacy Policy</a>
              <span className="separator">•</span>
              <a href="#terms">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage