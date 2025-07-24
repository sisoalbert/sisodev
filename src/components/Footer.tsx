import React from 'react';
import packageJson from '../../package.json';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      style={{
        backgroundColor: '#1f2937',
        color: '#f9fafb',
        padding: '48px 16px 148px',
        marginTop: '64px',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginBottom: '32px',
          }}
        >
          {/* Company/Brand Section */}
          <div>
            <h3
              style={{
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#f9fafb',
              }}
            >
              SisoDev
            </h3>
            <p
              style={{
                fontSize: '14px',
                color: '#d1d5db',
                lineHeight: '1.6',
                marginBottom: '16px',
              }}
            >
              Empowering developers with cutting-edge tools and resources for modern web development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#f9fafb',
              }}
            >
              Quick Links
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {['Home', 'Blogs', 'Codelabs', 'About'].map((link) => (
                <li key={link} style={{ marginBottom: '8px' }}>
                  <a
                    href={`/${link.toLowerCase()}`}
                    style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#3b82f6';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#d1d5db';
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#f9fafb',
              }}
            >
              Resources
            </h4>
            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
              }}
            >
              {['Documentation', 'Tutorials', 'Community', 'Support'].map((link) => (
                <li key={link} style={{ marginBottom: '8px' }}>
                  <a
                    href="#"
                    style={{
                      color: '#d1d5db',
                      textDecoration: 'none',
                      fontSize: '14px',
                      transition: 'color 0.2s',
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.color = '#3b82f6';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.color = '#d1d5db';
                    }}
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: '16px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#f9fafb',
              }}
            >
              Connect
            </h4>
            <div style={{ display: 'flex', gap: '16px' }}>
              {[
                { name: 'GitHub', url: '#' },
                { name: 'Twitter', url: '#' },
                { name: 'LinkedIn', url: '#' },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  style={{
                    color: '#d1d5db',
                    textDecoration: 'none',
                    fontSize: '14px',
                    transition: 'color 0.2s',
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.color = '#3b82f6';
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.color = '#d1d5db';
                  }}
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div
          style={{
            borderTop: '1px solid #374151',
            paddingTop: '24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div>
            <p
              style={{
                fontSize: '14px',
                color: '#9ca3af',
                margin: 0,
                marginBottom: '4px',
              }}
            >
              © {currentYear} SisoDev. All rights reserved.
            </p>
            <p
              style={{
                fontSize: '12px',
                color: '#6b7280',
                margin: 0,
              }}
            >
              Version {packageJson.version}
            </p>
          </div>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((link) => (
              <a
                key={link}
                href="#"
                style={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  fontSize: '14px',
                  transition: 'color 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.color = '#d1d5db';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.color = '#9ca3af';
                }}
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
