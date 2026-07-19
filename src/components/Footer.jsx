import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: COLORS.ink, color: COLORS.paper, padding: `${SPACING['3xl']} ${SPACING.lg}`, marginTop: SPACING['4xl'] }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: SPACING['2xl'], marginBottom: SPACING['2xl'] }}>
          <div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, marginBottom: SPACING.md, color: COLORS.gold }}>ClearPath Justice</div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.sm, lineHeight: TYPOGRAPHY.lineHeight.relaxed }}>Civic-tech nonprofit dedicated to helping South Africans navigate cannabis record expungement under the Cannabis for Private Purposes Act 7 of 2024.</div>
          </div>
          <div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, marginBottom: SPACING.md, color: COLORS.gold }}>Quick Links</div>
            <div style={{ fontSize: TYPOGRAPHY.fontSize.sm }}>
              <div style={{ marginBottom: SPACING.sm }}>Home</div>
              <div style={{ marginBottom: SPACING.sm }}>About Us</div>
              <div>Check Eligibility</div>
            </div>
          </div>
        </div>
        <div style={{ borderTop: `1px solid ${COLORS.paper}30`, margin: `${SPACING['2xl']} 0`, paddingTop: SPACING['2xl'] }}>
          <div style={{ fontSize: TYPOGRAPHY.fontSize.sm }}>© 2024 ClearPath Justice. All rights reserved.</div>
        </div>
      </div>
    </footer>
  );
}
