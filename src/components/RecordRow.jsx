import { Trash2 } from 'lucide-react';
import { COLORS, SPACING, TYPOGRAPHY } from '../constants/tokens';

export default function RecordRow({ record, onDelete, index }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: SPACING.lg, padding: SPACING.lg, backgroundColor: COLORS.white, borderBottom: `1px solid ${COLORS.ink}10`, alignItems: 'center' }}>
      <div><span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold }}>Offence:</span> {record.offence}</div>
      <div><span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold }}>Status:</span> {record.status}</div>
      <div><span style={{ fontWeight: TYPOGRAPHY.fontWeight.semibold }}>Sentence:</span> {record.sentence}</div>
      <button style={{ background: 'none', border: 'none', cursor: 'pointer', padding: SPACING.sm, color: COLORS.rust }} onClick={() => onDelete(index)}>
        <Trash2 size={18} />
      </button>
    </div>
  );
}
