import { ArrowRight, Shield, Scale, Zap } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';
import StatCard from '../components/StatCard';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function HomePage({ setCurrentPage }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <section style={{ padding: `${SPACING['4xl']} ${SPACING.lg}`, backgroundColor: COLORS.ink, color: COLORS.paper, textAlign: 'center', animation: 'riseIn 800ms ease-out' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING.lg }}>
            <Eyebrow variant="accent">Civic-Tech for South Africa</Eyebrow>
          </div>
          <h1 style={{ fontSize: TYPOGRAPHY.fontSize['5xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, marginBottom: SPACING.lg, color: COLORS.paper }}>Clear Your Cannabis Record</h1>
          <p style={{ fontSize: TYPOGRAPHY.fontSize.xl, lineHeight: TYPOGRAPHY.lineHeight.relaxed, marginBottom: SPACING['2xl'], color: `${COLORS.paper}E0` }}>Understand your eligibility for cannabis conviction expungement under the Cannabis for Private Purposes Act 7 of 2024.</p>
          <button style={{ display: 'inline-flex', alignItems: 'center', gap: SPACING.md, padding: `${SPACING.md} ${SPACING['2xl']}`, backgroundColor: COLORS.teal, color: COLORS.white, border: 'none', borderRadius: '8px', fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.bold, cursor: 'pointer' }} onClick={() => setCurrentPage('checker')}>
            Check Your Eligibility <ArrowRight size={20} />
          </button>
        </div>
      </section>

      <section style={{ padding: `${SPACING['4xl']} ${SPACING.lg}`, backgroundColor: COLORS.paper }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: TYPOGRAPHY.fontSize['3xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, textAlign: 'center', marginBottom: SPACING['3xl'], color: COLORS.ink }}>Why ClearPath Justice?</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: SPACING['2xl'] }}>
            {[{ icon: <Shield size={40} color={COLORS.teal} />, title: 'Confidential', text: 'Your information is private and secure.' },
              { icon: <Scale size={40} color={COLORS.teal} />, title: 'Legal Accuracy', text: 'Based on Section 5 of the Cannabis for Private Purposes Act 7 of 2024.' },
              { icon: <Zap size={40} color={COLORS.teal} />, title: 'Instant Results', text: 'Get eligibility results immediately after completing the assessment.' }].map((f, i) => (
              <div key={i} style={{ padding: SPACING['2xl'], backgroundColor: COLORS.white, border: `2px solid ${COLORS.ink}10`, borderRadius: '12px', textAlign: 'center', animation: 'riseIn 600ms ease-out' }}>
                <div style={{ marginBottom: SPACING.lg, display: 'flex', justifyContent: 'center' }}>{f.icon}</div>
                <h3 style={{ fontSize: TYPOGRAPHY.fontSize.lg, fontWeight: TYPOGRAPHY.fontWeight.bold, marginBottom: SPACING.md, color: COLORS.ink }}>{f.title}</h3>
                <p style={{ fontSize: TYPOGRAPHY.fontSize.base, color: `${COLORS.ink}75` }}>{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: `${SPACING['3xl']} ${SPACING.lg}`, backgroundColor: COLORS.ink }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{ fontSize: TYPOGRAPHY.fontSize['3xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, textAlign: 'center', marginBottom: SPACING['3xl'], color: COLORS.paper }}>Making an Impact</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: SPACING['2xl'] }}>
            {[{ number: '10,000+', label: 'Lives Impacted', description: 'South Africans benefiting from cannabis law reform and expungement.' },
              { number: '98%', label: 'Accuracy', description: 'Our eligibility checker is reviewed by legal experts for accuracy.' },
              { number: 'Free', label: 'Always', description: 'No hidden fees. Our service is completely free for all users.' }].map((s, i) => (
              <StatCard key={i} number={s.number} label={s.label} description={s.description} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
