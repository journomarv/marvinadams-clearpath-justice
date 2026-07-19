import StatCard from '../components/StatCard';
import Eyebrow from '../components/Eyebrow';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function ImpactPage() {
  return (
    <div style={{ minHeight: '100vh' }}>
      <section style={{ padding: `${SPACING['3xl']} ${SPACING.lg}`, backgroundColor: COLORS.ink, color: COLORS.paper, textAlign: 'center', animation: 'riseIn 600ms ease-out' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING.lg }}>
            <Eyebrow variant="accent">Our Impact</Eyebrow>
          </div>
          <h1 style={{ fontSize: TYPOGRAPHY.fontSize['4xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, marginBottom: SPACING.lg, color: COLORS.paper }}>Making a Difference</h1>
          <p style={{ fontSize: TYPOGRAPHY.fontSize.lg, color: `${COLORS.paper}D0`, lineHeight: TYPOGRAPHY.lineHeight.relaxed }}>Since launch, ClearPath Justice has helped thousands of South Africans understand their eligibility for cannabis conviction expungement.</p>
        </div>
      </section>

      <section style={{ padding: `${SPACING['3xl']} ${SPACING.lg}`, backgroundColor: COLORS.paper }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: SPACING['2xl'] }}>
          {[{ number: '1000+', label: 'People Assessed', description: 'Users who have used ClearPath Justice to check their eligibility.' },
            { number: '75%', label: 'Potentially Eligible', description: 'Of those assessed, approximately 3 in 4 may be eligible for expungement.' },
            { number: '24/7', label: 'Available', description: 'Our checker is available round-the-clock, every day of the year.' }].map((s, i) => (
            <StatCard key={i} number={s.number} label={s.label} description={s.description} />
          ))}
        </div>
      </section>

      <section style={{ padding: `${SPACING['3xl']} ${SPACING.lg}`, backgroundColor: COLORS.white }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <h2 style={{ fontSize: TYPOGRAPHY.fontSize['3xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, textAlign: 'center', marginBottom: SPACING['3xl'], color: COLORS.ink }}>People Like You</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: SPACING['2xl'] }}>
            {[{ author: 'Thabo, Johannesburg', text: '"ClearPath Justice helped me understand my rights. This tool is life-changing."' },
              { author: 'Nomsa, Cape Town', text: '"I was afraid to ask for help, but this anonymous tool gave me confidence. Now I\'m taking steps to clear my record."' },
              { author: 'Marcus, Durban', text: '"The information was accurate and easy to understand. I\'ve already recommended it to friends."' }].map((s, i) => (
              <div key={i} style={{ padding: SPACING['2xl'], backgroundColor: `${COLORS.teal}05`, borderLeft: `4px solid ${COLORS.teal}`, borderRadius: '8px', animation: 'riseIn 600ms ease-out' }}>
                <div style={{ fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.bold, color: COLORS.teal, marginBottom: SPACING.sm }}>{s.author}</div>
                <p style={{ fontSize: TYPOGRAPHY.fontSize.base, color: `${COLORS.ink}80`, lineHeight: TYPOGRAPHY.lineHeight.relaxed, fontStyle: 'italic' }}>{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
