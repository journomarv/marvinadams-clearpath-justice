import { COLORS, TYPOGRAPHY, SPACING } from '../constants/tokens';

export const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600;700&family=IBM+Plex+Sans:wght@300;400;500;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html { scroll-behavior: smooth; }
  body { font-family: ${TYPOGRAPHY.fontFamily.sans}; color: ${COLORS.ink}; background-color: ${COLORS.paper}; line-height: ${TYPOGRAPHY.lineHeight.normal}; }
  h1, h2, h3, h4, h5, h6 { font-family: ${TYPOGRAPHY.fontFamily.serif}; font-weight: ${TYPOGRAPHY.fontWeight.bold}; line-height: ${TYPOGRAPHY.lineHeight.tight}; }
  a { color: ${COLORS.teal}; text-decoration: none; }
  a:focus-visible { outline: 2px solid ${COLORS.teal}; outline-offset: 2px; }
  @keyframes stampIn { 0% { opacity: 0; transform: scale(0.8) rotate(-5deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
  @keyframes riseIn { 0% { opacity: 0; transform: translateY(20px); } 100% { opacity: 1; transform: translateY(0); } }
  @media (prefers-reduced-motion: reduce) { * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; } }
`;

export default function GlobalStyle() {
  return <style>{globalStyles}</style>;
}
