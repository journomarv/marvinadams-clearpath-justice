import { Users, Target, Heart, Lightbulb } from 'lucide-react';
import Eyebrow from '../components/Eyebrow';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', padding: `${SPACING['3xl']} ${SPACING.lg}` }}>
      <div style={{ maxWidth: '900px', margin: `0 auto ${SPACING['3xl']}`, textAlign: 'center', animation: 'riseIn 600ms ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING.lg }}>
          <Eyebrow>About Us</Eyebrow>
        </div>
        <h1 style={{ fontSize: TYPOGRAPHY.fontSize['4xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, marginBottom: SPACING.lg, color: COLORS.ink }}>Who We Are</h1>
        <p style={{ fontSize: TYPOGRAPHY.fontSize.lg, color: `${COLORS.ink}85`, lineHeight: TYPOGRAPHY.lineHeight.relaxed }}>ClearPath Justice is a civic-tech nonprofit dedicated to helping South Africans navigate cannabis law reform and access information about conviction expungement eligibility.</p>
      </div>
      <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: SPACING['3xl'] }}>
        {[{ icon: <Target size={40} color={COLORS.teal} />, title: 'Our Mission', text: 'To empower South Africans with accurate, accessible information about cannabis conviction expungement eligibility.' },
          { icon: <Heart size={40} color={COLORS.teal} />, title: 'Our Values', text: 'We believe in transparency, accuracy, and justice. Our commitment is to serve communities most affected by cannabis prohibition.' },
          { icon: <Lightbulb size={40} color={COLORS.teal} />, title: 'Our Approach', text: 'We combine legal expertise with technology to create tools that are easy to understand and free to use.' },
          { icon: <Users size={40} color={COLORS.teal} />, title: 'Our Community', text: 'We work closely with legal professionals, advocacy organizations, and affected communities to ensure accuracy.' }].map((s, i) => (
          <div key={i} style={{ padding: SPACING['2xl'], backgroundColor: COLORS.white, borderRadius: '12px', border: `2px solid ${COLORS.ink}10`, animation: 'riseIn 600ms ease-out' }}>
            <div style={{ marginBottom: SPACING.lg, display: 'flex' }}>{s.icon}</div>
            <h3 style={{ fontSize: TYPOGRAPHY.fontSize.xl, fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, marginBottom: SPACING.md, color: COLORS.ink }}>{s.title}</h3>
            <p style={{ fontSize: TYPOGRAPHY.fontSize.base, color: `${COLORS.ink}75`, lineHeight: TYPOGRAPHY.lineHeight.relaxed }}>{s.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
