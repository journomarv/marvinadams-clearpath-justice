import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function ImpactSection({ title, description, stats }) {
  return (
    <section style={{ padding: `${SPACING['3xl']} ${SPACING.lg}`, backgroundColor: COLORS.white, animation: 'riseIn 600ms ease-out' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 style={{ fontSize: TYPOGRAPHY.fontSize['3xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, color: COLORS.ink, marginBottom: SPACING.lg }}>{title}</h2>
        <p style={{ fontSize: TYPOGRAPHY.fontSize.lg, color: `${COLORS.ink}90`, lineHeight: TYPOGRAPHY.lineHeight.relaxed, marginBottom: SPACING.lg }}>{description}</p>
        {stats && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: SPACING.lg }}>
            {stats.map((stat, index) => (
              <div key={index} style={{ padding: SPACING.lg, backgroundColor: `${COLORS.teal}05`, borderLeft: `3px solid ${COLORS.teal}` }}>
                <div style={{ fontSize: TYPOGRAPHY.fontSize['2xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, color: COLORS.teal, marginBottom: SPACING.sm }}>{stat.value}</div>
                <div style={{ fontSize: TYPOGRAPHY.fontSize.sm, color: `${COLORS.ink}70`, fontWeight: TYPOGRAPHY.fontWeight.semibold }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
