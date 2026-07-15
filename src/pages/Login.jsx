import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BsEnvelope, BsLock, BsEye, BsEyeSlash, BsArrowRight, BsExclamationCircle } from 'react-icons/bs';

function Login({ setAuth, userPassword }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    setTimeout(() => {
      if (email === 'admin@depi.edu' && password === userPassword) {
        setAuth(true);
        navigate('/dashboard');
      } else {
        setError('Invalid email or password.');
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="d-flex vh-100">
      <div className="d-none d-lg-flex flex-column justify-content-between p-5" style={{ backgroundColor: '#111', width: '50%' }}>
        <div className="d-flex align-items-center gap-2 mt-2">
          <div className="bg-white text-dark rounded-2 d-flex align-items-center justify-content-center fw-bold" style={{ width: 38, height: 38, fontSize: 14 }}>
            DE
          </div>
          <span className="text-white fw-bold fs-5" style={{ letterSpacing: '0.5px' }}>DEPI SMS</span>
        </div>

        <div className="mb-5">
          <h1 className="text-white fw-bold mb-4" style={{ fontSize: '2.8rem', lineHeight: 1.2 }}>
            The modern standard for educational management.
          </h1>
          <p className="fs-5 lh-lg" style={{ color: '#8b949e' }}>
            Streamline your institution's operations with our precision-engineered platform. Built for performance, designed for clarity.
          </p>
        </div>

        <div className="small d-flex flex-wrap gap-3 mb-2" style={{ color: '#6e7681' }}>
          <span>&copy; 2024 DEPI Initiative</span>
          <span>&bull;</span>
          <Link to="#" className="text-decoration-none" style={{ color: '#6e7681' }}>Privacy Policy</Link>
          <span>&bull;</span>
          <Link to="#" className="text-decoration-none" style={{ color: '#6e7681' }}>Terms of Service</Link>
        </div>
      </div>

      <div className="d-flex flex-column justify-content-center align-items-center bg-white w-100 p-4 p-sm-5" style={{ flex: 1 }}>
        <div className="w-100" style={{ maxWidth: 420 }}>
          <h4 className="fw-bold mb-5 text-dark">Sign in to your account</h4>

          {error && (
            <div className="alert alert-danger d-flex align-items-center small py-2 mb-4" role="alert">
              <BsExclamationCircle className="me-2 flex-shrink-0" />
              <div>{error}</div>
            </div>
          )}

          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label className="form-label small fw-bold text-secondary">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-white text-muted border-end-0">
                  <BsEnvelope />
                </span>
                <input
                  type="email"
                  className="form-control border-start-0 ps-0 shadow-none py-2"
                  placeholder="admin@depi.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="form-label small fw-bold text-secondary">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-white text-muted border-end-0">
                  <BsLock />
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="form-control border-start-0 border-end-0 ps-0 shadow-none py-2"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  className="btn border border-start-0 bg-white text-muted px-3"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <BsEyeSlash /> : <BsEye />}
                </button>
              </div>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-5">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="rememberMe" />
                <label className="form-check-label small text-secondary" htmlFor="rememberMe">
                  Remember me for 30 days
                </label>
              </div>
              <a href="#" className="text-dark small fw-bold text-decoration-none">Forgot password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn w-100 text-white py-2 mb-4 d-flex align-items-center justify-content-center gap-2 shadow-sm rounded-1"
              style={{ backgroundColor: '#111' }}
            >
              {isLoading ? (
                <div className="spinner-border spinner-border-sm" role="status"></div>
              ) : (
                <>Sign In <BsArrowRight /></>
              )}
            </button>

            <div className="text-center small text-secondary">
              Don't have an account? <a href="#" className="text-dark fw-bold text-decoration-none">Contact IT Support</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
