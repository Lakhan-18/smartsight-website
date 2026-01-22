import React from 'react';

export default function SimpleTest() {
    return (
        <div style={{
            padding: '50px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            minHeight: '100vh',
            color: 'white',
            fontFamily: 'Arial, sans-serif'
        }}>
            <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>✅ SmartSight is Loading!</h1>
            <p style={{ fontSize: '24px', marginBottom: '10px' }}>If you see this, React is working correctly.</p>
            <p style={{ fontSize: '18px', opacity: 0.9 }}>The app is functional. We can now proceed with testing.</p>

            <div style={{ marginTop: '40px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px' }}>
                <h2>Quick Test:</h2>
                <ul style={{ fontSize: '16px', lineHeight: '2' }}>
                    <li>✅ Vite dev server: Running</li>
                    <li>✅ React: Rendering</li>
                    <li>✅ JavaScript: Executing</li>
                    <li>✅ Styles: Applied</li>
                </ul>
            </div>

            <div style={{ marginTop: '30px' }}>
                <a href="/login" style={{
                    display: 'inline-block',
                    padding: '15px 30px',
                    background: 'white',
                    color: '#667eea',
                    textDecoration: 'none',
                    borderRadius: '8px',
                    fontWeight: 'bold',
                    fontSize: '18px'
                }}>
                    Go to Login Page →
                </a>
            </div>
        </div>
    );
}
