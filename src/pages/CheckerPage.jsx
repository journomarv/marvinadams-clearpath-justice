import { useState } from 'react';
import Eyebrow from '../components/Eyebrow';
import ResultCertificate from '../components/ResultCertificate';
import RecordRow from '../components/RecordRow';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';
import { LEGAL_BASIS_OPTIONS, OFFENCE_OPTIONS, CONVICTION_STATUS_OPTIONS, SENTENCE_OPTIONS } from '../constants/options';

export default function CheckerPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({ legalBasis: '', records: [] });
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAddRecord = () => {
    const offenceSelect = document.querySelector('[name="offence"]');
    const statusSelect = document.querySelector('[name="status"]');
    const sentenceSelect = document.querySelector('[name="sentence"]');

    const newRecord = { offence: offenceSelect?.value || '', status: statusSelect?.value || '', sentence: sentenceSelect?.value || '' };
    if (newRecord.offence && newRecord.status && newRecord.sentence) {
      setFormData({ ...formData, records: [...formData.records, newRecord] });
      offenceSelect.value = '';
      statusSelect.value = '';
      sentenceSelect.value = '';
    }
  };

  const handleDeleteRecord = (index) => {
    setFormData({ ...formData, records: formData.records.filter((_, i) => i !== index) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isEligible = formData.records.some((record) => {
      const offence = OFFENCE_OPTIONS.find((o) => o.id === record.offence);
      return offence?.eligibleForExpungement === true;
    });
    setResult({
      legalBasis: formData.legalBasis,
      records: formData.records,
      summary: isEligible ? 'Based on your convictions, you may be eligible for expungement.' : 'Based on your convictions, you may not be eligible for expungement.',
    });
    setShowResult(true);
  };

  const handleReset = () => {
    setShowResult(false);
    setResult(null);
    setFormData({ legalBasis: '', records: [] });
    setCurrentStep(1);
  };

  if (showResult && result) {
    return (
      <div style={{ minHeight: '100vh', padding: `${SPACING['3xl']} ${SPACING.lg}`, backgroundColor: COLORS.paper }}>
        <ResultCertificate result={result} isEligible={result.summary.includes('may be eligible')} />
        <div style={{ textAlign: 'center', marginTop: SPACING['2xl'] }}>
          <button style={{ padding: `${SPACING.md} ${SPACING['2xl']}`, borderRadius: '6px', fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.bold, border: `2px solid ${COLORS.ink}20`, backgroundColor: `${COLORS.ink}10`, color: COLORS.ink, cursor: 'pointer' }} onClick={handleReset}>Start Over</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', padding: `${SPACING['3xl']} ${SPACING.lg}`, backgroundColor: COLORS.paper }}>
      <div style={{ maxWidth: '800px', margin: `0 auto ${SPACING['3xl']}`, textAlign: 'center', animation: 'riseIn 600ms ease-out' }}>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: SPACING.lg }}><Eyebrow>Eligibility Assessment</Eyebrow></div>
        <h1 style={{ fontSize: TYPOGRAPHY.fontSize['4xl'], fontWeight: TYPOGRAPHY.fontWeight.bold, fontFamily: TYPOGRAPHY.fontFamily.serif, marginBottom: SPACING.lg, color: COLORS.ink }}>Check Your Eligibility</h1>
        <p style={{ fontSize: TYPOGRAPHY.fontSize.lg, color: `${COLORS.ink}80`, lineHeight: TYPOGRAPHY.lineHeight.relaxed }}>Answer a few questions to determine your eligibility for cannabis conviction expungement under Section 5 of the Cannabis for Private Purposes Act 7 of 2024.</p>
      </div>

      <div style={{ maxWidth: '700px', margin: '0 auto', padding: SPACING['2xl'], backgroundColor: COLORS.white, borderRadius: '12px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', animation: 'riseIn 600ms ease-out' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: SPACING.lg }}>
          {currentStep === 1 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
                <label style={{ fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.ink }}>Legal Basis <span style={{ color: COLORS.rust }}>*</span></label>
                <select name="legalBasis" style={{ padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.base, border: `2px solid ${COLORS.ink}20`, borderRadius: '6px', fontFamily: TYPOGRAPHY.fontFamily.sans, cursor: 'pointer', backgroundColor: COLORS.white }} value={formData.legalBasis} onChange={(e) => setFormData({ ...formData, legalBasis: e.target.value })} required>
                  <option value="">Select a legal basis...</option>
                  {LEGAL_BASIS_OPTIONS.map((option) => (<option key={option.id} value={option.id}>{option.label}</option>))}
                </select>
              </div>
              <button type="button" style={{ padding: `${SPACING.md} ${SPACING['2xl']}`, borderRadius: '6px', fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.bold, border: 'none', backgroundColor: COLORS.teal, color: COLORS.white, cursor: 'pointer', alignSelf: 'flex-start' }} onClick={() => formData.legalBasis && setCurrentStep(2)}>Continue</button>
            </>
          )}

          {currentStep === 2 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
                <label style={{ fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.ink }}>Offence Type <span style={{ color: COLORS.rust }}>*</span></label>
                <select name="offence" style={{ padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.base, border: `2px solid ${COLORS.ink}20`, borderRadius: '6px', fontFamily: TYPOGRAPHY.fontFamily.sans, cursor: 'pointer', backgroundColor: COLORS.white }} required>
                  <option value="">Select an offence...</option>
                  {OFFENCE_OPTIONS.map((option) => (<option key={option.id} value={option.id}>{option.label}</option>))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
                <label style={{ fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.ink }}>Conviction Status <span style={{ color: COLORS.rust }}>*</span></label>
                <select name="status" style={{ padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.base, border: `2px solid ${COLORS.ink}20`, borderRadius: '6px', fontFamily: TYPOGRAPHY.fontFamily.sans, cursor: 'pointer', backgroundColor: COLORS.white }} required>
                  <option value="">Select a status...</option>
                  {CONVICTION_STATUS_OPTIONS.map((option) => (<option key={option.id} value={option.id}>{option.label}</option>))}
                </select>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: SPACING.sm }}>
                <label style={{ fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.semibold, color: COLORS.ink }}>Sentence <span style={{ color: COLORS.rust }}>*</span></label>
                <select name="sentence" style={{ padding: SPACING.md, fontSize: TYPOGRAPHY.fontSize.base, border: `2px solid ${COLORS.ink}20`, borderRadius: '6px', fontFamily: TYPOGRAPHY.fontFamily.sans, cursor: 'pointer', backgroundColor: COLORS.white }} required>
                  <option value="">Select a sentence...</option>
                  {SENTENCE_OPTIONS.map((option) => (<option key={option.id} value={option.id}>{option.label}</option>))}
                </select>
              </div>
              <button type="button" style={{ padding: `${SPACING.md} ${SPACING['2xl']}`, borderRadius: '6px', fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.bold, border: 'none', backgroundColor: COLORS.teal, color: COLORS.white, cursor: 'pointer', alignSelf: 'flex-start' }} onClick={handleAddRecord}>Add Record</button>
              {formData.records.length > 0 && (
                <div style={{ marginTop: SPACING.lg, borderRadius: '8px', overflow: 'hidden', border: `1px solid ${COLORS.ink}10` }}>
                  {formData.records.map((record, index) => (<RecordRow key={index} record={record} index={index} onDelete={handleDeleteRecord} />))}
                </div>
              )}
              <div style={{ display: 'flex', gap: SPACING.md }}>
                <button type="button" style={{ padding: `${SPACING.md} ${SPACING['2xl']}`, borderRadius: '6px', fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.bold, border: `2px solid ${COLORS.ink}20`, backgroundColor: `${COLORS.ink}10`, color: COLORS.ink, cursor: 'pointer' }} onClick={() => setCurrentStep(1)}>Back</button>
                <button type="submit" style={{ padding: `${SPACING.md} ${SPACING['2xl']}`, borderRadius: '6px', fontSize: TYPOGRAPHY.fontSize.base, fontWeight: TYPOGRAPHY.fontWeight.bold, border: 'none', backgroundColor: COLORS.teal, color: COLORS.white, cursor: 'pointer', opacity: formData.records.length === 0 ? 0.5 : 1 }} disabled={formData.records.length === 0}>Get Results</button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
