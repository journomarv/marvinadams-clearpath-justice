import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function NavBar({ currentPage, setCurrentPage }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'Who We Are' },
    { id: 'impact', label: 'Impact' },
    { id: 'checker', label: 'Check Eligibility' },
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMenuOpen(false);
  };

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 1000, backgroundColor: COLORS.white, borderBottom: `1px solid ${COLORS.ink}20`, padding: `${SPACING.md} ${SPACING.lg}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ fontSize: TYPOGRAPHY.fontSize['2xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, color: COLORS.ink, cursor: 'pointer' }} onClick={() => handleNavClick('home')}>
        Clear<span style={{ color: COLORS.teal }}>Path</span> Justice
      </div>
      <div style={{ display: 'flex', gap: SPACING.xl, alignItems: 'center' }}>
        {navItems.map((item) => (
          <div key={item.id} style={{ cursor: 'pointer', fontSize: TYPOGRAPHY.fontSize.base, color: currentPage === item.id ? COLORS.teal : COLORS.ink, borderBottom: currentPage === item.id ? `2px solid ${COLORS.teal}` : 'none' }} onClick={() => handleNavClick(item.id)}>
            {item.label}
          </div>
        ))}
      </div>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: SPACING.md }} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <X size={24} color={COLORS.ink} /> : <Menu size={24} color={COLORS.ink} />}
      </button>
    </nav>
  );
}
