import { Download, CheckCircle, AlertCircle } from 'lucide-react';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function ResultCertificate({ result, isEligible }) {
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([`ClearPath Justice - Eligibility Result\n\n${isEligible ? 'ELIGIBLE FOR EXPUNGEMENT' : 'NOT ELIGIBLE FOR EXPUNGEMENT'}\n\nRecord Details:\n${JSON.stringify(result, null, 2)}`], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'clearpath-justice-result.txt';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div style={{ maxWidth: '500px', margin: '0 auto', padding: SPACING['2xl'], backgroundColor: COLORS.white, border: `3px solid ${isEligible ? COLORS.teal : COLORS.rust}`, borderRadius: '12px', animation: 'stampIn 600ms ease-out', boxShadow: '0 20px 25px rgba(0, 0, 0, 0.1)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: SPACING.lg, marginBottom: SPACING['2xl'], paddingBottom: SPACING.lg, borderBottom: `2px dashed ${COLORS.ink}20` }}>
        {isEligible ? <CheckCircle size={40} color={COLORS.teal} /> : <AlertCircle size={40} color={COLORS.rust} />}
        <h3 style={{ fontSize: TYPOGRAPHY.fontSize['2xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, color: isEligible ? COLORS.teal : COLORS.rust, margin: 0 }}>{isEligible ? 'Eligible' : 'Not Eligible'}</h3>
      </div>
      {result.summary && (
        <div style={{ marginBottom: SPACING['2xl'] }}>
          <div style={{ fontSize: TYPOGRAPHY.fontSize.sm, fontWeight: TYPOGRAPHY.fontWeight.semibold, textTransform: 'uppercase', color: `${COLORS.ink}70`, marginBottom: SPACING.sm }}>Summary</div>
          <div style={{ fontSize: TYPOGRAPHY.fontSize.lg, color: COLORS.ink }}>{result.summary}</div>
        </div>
      )}
      <div style={{ padding: SPACING.lg, backgroundColor: isEligible ? `${COLORS.teal}10` : `${COLORS.rust}10`, borderRadius: '6px', marginBottom: SPACING.lg }}>
        <p style={{ fontSize: TYPOGRAPHY.fontSize.base, color: isEligible ? COLORS.teal : COLORS.rust, fontWeight: TYPOGRAPHY.fontWeight.semibold, margin: 0 }}>
          {isEligible ? 'You may be eligible for expungement. Consult with a legal professional.' : 'Based on the information provided, expungement may not be available.'}
        </p>
      </div>
      <div style={{ display: 'flex', gap: SPACING.md, justifyContent: 'center', marginBottom: SPACING.lg }}>
        <button style={{ padding: `${SPACING.md} ${SPACING.lg}`, borderRadius: '6px', fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.semibold, border: 'none', cursor: 'pointer', backgroundColor: COLORS.teal, color: COLORS.white, display: 'flex', alignItems: 'center', gap: SPACING.sm }} onClick={handleDownload}>
          <Download size={18} /> Download
        </button>
      </div>
      <div style={{ textAlign: 'center', fontSize: TYPOGRAPHY.fontSize.xs, color: `${COLORS.ink}50` }}>Generated on {new Date().toLocaleDateString()}</div>
    </div>
  );
}
