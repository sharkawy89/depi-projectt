import { useState } from 'react';
import '../styles/settings.css';

function Settings() {
  const [activeTab, setActiveTab] = useState('general');
  const [twoFactor, setTwoFactor] = useState(false);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [isVerifying2FA, setIsVerifying2FA] = useState(false);
  const [passwords, setPasswords] = useState({ current: '', new: '' });
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const tabs = [
    { id: 'general', label: 'General Profile', icon: 'bi-person' },
    { id: 'security', label: 'Security & Auth', icon: 'bi-shield-check' },
  ];

  const handlePasswordUpdate = () => {
    if (!passwords.current || !passwords.new) return;
    setIsSavingPassword(true);
    setTimeout(() => {
      setIsSavingPassword(false);
      setPasswordUpdated(true);
      setPasswords({ current: '', new: '' });
      setTimeout(() => setPasswordUpdated(false), 3000);
    }, 1000);
  };

  const handle2FAToggle = () => {
    if (twoFactor) {
      setTwoFactor(false);
    } else {
      setAuthCode('');
      setIs2FAModalOpen(true);
    }
  };

  const handleVerify2FA = () => {
    if (authCode.length !== 6) return;
    setIsVerifying2FA(true);
    setTimeout(() => {
      setIsVerifying2FA(false);
      setTwoFactor(true);
      setIs2FAModalOpen(false);
    }, 1000);
  };

  return (
    <div className="page-container">
      <h1 className="page-title">Settings</h1>
      <p className="page-subtitle">Manage your account and preferences</p>

      <div className="settings-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`settings-tab ${activeTab === tab.id ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <i className={`bi ${tab.icon} me-2`}></i>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'general' && (
        <div className="content-card">
          <h5 className="mb-1">General Profile</h5>
          <p className="text-muted mb-4" style={{ fontSize: 14 }}>Update your personal information and email address.</p>

          <div className="row g-3" style={{ maxWidth: 500 }}>
            <div className="col-12">
              <label className="form-label" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Full Name</label>
              <input type="text" className="form-control" defaultValue="Admin User" />
            </div>
            <div className="col-12">
              <label className="form-label" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Email Address</label>
              <input type="email" className="form-control" defaultValue="admin@depi.edu" />
            </div>
            <div className="col-12">
              <label className="form-label" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Phone Number</label>
              <input type="text" className="form-control" defaultValue="+20 123 456 7890" />
            </div>
            <div className="col-12">
              <button className="btn btn-primary add-btn">
                <i className="bi bi-check-lg me-1"></i>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'security' && (
        <div className="content-card">
          <h5 className="mb-1">Security & Authentication</h5>
          <p className="text-muted mb-4" style={{ fontSize: 14 }}>Manage your password and security preferences.</p>

          <div className="row g-3" style={{ maxWidth: 500 }}>
            <div className="col-12">
              <label className="form-label" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>Current Password</label>
              <input type="password" className="form-control" value={passwords.current} onChange={(e) => setPasswords({...passwords, current: e.target.value})} />
            </div>
            <div className="col-12">
              <label className="form-label" style={{ fontSize: 13, fontWeight: 500, color: '#374151' }}>New Password</label>
              <input type="password" className="form-control" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} />
            </div>
            <div className="col-12">
              <button
                className="btn btn-primary add-btn"
                onClick={handlePasswordUpdate}
                disabled={isSavingPassword || !passwords.current || !passwords.new}
              >
                {isSavingPassword ? (
                  'Updating...'
                ) : passwordUpdated ? (
                  <><i className="bi bi-check-circle me-1"></i>Updated!</>
                ) : (
                  'Update Password'
                )}
              </button>
            </div>
          </div>

          <hr className="my-4" />

          <div className="d-flex align-items-center justify-content-between" style={{ maxWidth: 500 }}>
            <div>
              <p className="fw-medium mb-0" style={{ fontSize: 14 }}>Two-factor authentication</p>
              <small className="text-muted">Add an extra layer of security to your account.</small>
            </div>
            <button
              type="button"
              className={`btn btn-sm ${twoFactor ? 'btn-success' : 'btn-outline-secondary'}`}
              onClick={handle2FAToggle}
            >
              {twoFactor ? 'Enabled' : 'Enable'}
            </button>
          </div>
        </div>
      )}

      {is2FAModalOpen && (
        <div className="modal-overlay" onClick={() => setIs2FAModalOpen(false)}>
          <div className="modal-box" style={{ maxWidth: 440 }} onClick={e => e.stopPropagation()}>
            <div className="modal-box-header d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Enable 2FA</h5>
              <button className="btn btn-sm btn-outline-secondary" onClick={() => setIs2FAModalOpen(false)}>
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            <div className="modal-box-body text-center">
              <p className="text-muted mb-4" style={{ fontSize: 14 }}>
                Scan this QR code with Google Authenticator or Authy.
              </p>
              <div className="d-flex justify-content-center mb-4">
                <div style={{ width: 160, height: 160, background: '#f3f4f6', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <i className="bi bi-qr-code" style={{ fontSize: 80, color: '#6b7280' }}></i>
                </div>
              </div>
              <div className="mb-3">
                <small className="text-muted">Or enter code manually:</small>
                <div className="mt-1 p-2 bg-light rounded text-center font-monospace" style={{ fontSize: 18, letterSpacing: 4 }}>
                  K7J2 9XQ1 P4L5 V8M3
                </div>
              </div>
              <div className="mb-3">
                <label className="form-label" style={{ fontSize: 13, fontWeight: 500 }}>Enter 6-digit code</label>
                <input
                  type="text"
                  maxLength={6}
                  className="form-control text-center"
                  style={{ fontSize: 24, letterSpacing: 8, fontFamily: 'monospace' }}
                  value={authCode}
                  onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, ''))}
                  placeholder="000000"
                />
              </div>
            </div>
            <div className="modal-box-footer">
              <button className="btn btn-outline-secondary" onClick={() => setIs2FAModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleVerify2FA} disabled={authCode.length !== 6 || isVerifying2FA}>
                {isVerifying2FA ? 'Verifying...' : 'Verify & Enable'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
