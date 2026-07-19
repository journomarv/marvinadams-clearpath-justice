import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function Eyebrow({ children, variant = 'default' }) {
  const styles = {
    container: { display: 'inline-block', fontSize: TYPOGRAPHY.fontSize.sm, fontWeight: TYPOGRAPHY.fontWeight.semibold, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: SPACING.md, padding: `${SPACING.sm} ${SPACING.md}`, borderRadius: '4px' },
    default: { color: COLORS.teal, backgroundColor: `${COLORS.teal}10`, borderLeft: `3px solid ${COLORS.teal}` },
    accent: { color: COLORS.gold, backgroundColor: `${COLORS.gold}10`, borderLeft: `3px solid ${COLORS.gold}` },
  };
  const variantStyle = styles[variant] || styles.default;
  return <div style={{ ...styles.container, ...variantStyle }}>{children}</div>;
}
