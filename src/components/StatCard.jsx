import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function StatCard({ number, label, description }) {
  return (
    <div style={{ padding: SPACING['2xl'], backgroundColor: COLORS.white, border: `2px solid ${COLORS.ink}10`, borderRadius: '8px', textAlign: 'center', animation: 'riseIn 600ms ease-out' }}>
      <div style={{ fontSize: TYPOGRAPHY.fontSize['4xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, color: COLORS.teal, marginBottom: SPACING.sm }}>{number}</div>
      <div style={{ fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.ink, marginBottom: SPACING.md }}>{label}</div>
      <div style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: `${COLORS.ink}80`, lineHeight: TYPOGRAPHY.lineHeight.relaxed }}>{description}</div>
    </div>
  );
}
