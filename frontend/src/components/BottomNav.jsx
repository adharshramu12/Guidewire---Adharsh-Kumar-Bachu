import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, FileText, TrendingUp, Star } from 'lucide-react';

const tabs = [
  { id: 'home', icon: Home, label: 'Home', path: '/dashboard' },
  { id: 'policy', icon: FileText, label: 'Policy', path: '/policy' },
  { id: 'claims', icon: TrendingUp, label: 'Claims', path: '/claims' },
  { id: 'score', icon: Star, label: 'Score', path: '/gigscore' },
];

export default function BottomNav({ active }) {
  const navigate = useNavigate();

  return (
    <nav style={{
      position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 100,
      background: 'var(--gs-surface)', borderTop: '1px solid var(--gs-border)',
      display: 'flex', justifyContent: 'space-around', padding: '8px 0 12px',
      backdropFilter: 'blur(20px)',
    }}>
      {tabs.map(tab => {
        const isActive = active === tab.id;
        const Icon = tab.icon;
        return (
          <button
            key={tab.id}
            onClick={() => navigate(tab.path)}
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
              padding: '4px 16px', color: isActive ? 'var(--gs-orange)' : 'var(--gs-t3)',
              transition: 'color 0.2s',
            }}
          >
            <Icon size={20} strokeWidth={isActive ? 2.5 : 1.5} />
            <span style={{ fontSize: '10px', fontFamily: 'var(--fh)', fontWeight: isActive ? 600 : 400 }}>{tab.label}</span>
            {isActive && (
              <div style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gs-orange)', marginTop: '-2px' }} />
            )}
          </button>
        );
      })}
    </nav>
  );
}
