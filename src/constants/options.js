export const LEGAL_BASIS_OPTIONS = [
  { id: 'section5', label: 'Section 5 - Private Purposes', description: 'The Act allows adults to possess and cultivate cannabis for private use in private spaces.' },
  { id: 'section12', label: 'Section 12 - Medical Use', description: 'Licensed medical practitioners may prescribe cannabis for therapeutic purposes.' },
  { id: 'section28', label: 'Section 28 - Traditional Use', description: 'Recognition of traditional and cultural practices involving cannabis in specified contexts.' },
];

export const OFFENCE_OPTIONS = [
  { id: 'possession', label: 'Possession of Cannabis', description: 'Possession of cannabis in any quantity', eligibleForExpungement: true },
  { id: 'cultivation', label: 'Cultivation of Cannabis', description: 'Growing or cultivating cannabis plants', eligibleForExpungement: true },
  { id: 'dealing', label: 'Dealing in Cannabis', description: 'Sale, supply, or distribution of cannabis', eligibleForExpungement: false },
  { id: 'trafficking', label: 'Trafficking in Cannabis', description: 'Large-scale trafficking or conspiracy to traffic', eligibleForExpungement: false },
  { id: 'cultivation_commercial', label: 'Commercial Cultivation', description: 'Cultivation intended for sale or profit', eligibleForExpungement: false },
  { id: 'other', label: 'Other Cannabis-Related Offence', description: 'Other offences not listed above', eligibleForExpungement: null },
];

export const CONVICTION_STATUS_OPTIONS = [
  { id: 'convicted', label: 'Yes, I have a conviction', description: 'I have been formally convicted of a cannabis offence' },
  { id: 'awaiting_trial', label: 'Awaiting trial', description: 'I am currently awaiting trial for a cannabis offence' },
  { id: 'arrested_not_charged', label: 'Arrested but not charged', description: 'I was arrested but charges were not filed or were withdrawn' },
  { id: 'no_record', label: 'No formal record', description: 'I was not formally charged or convicted but have records of involvement' },
];

export const SENTENCE_OPTIONS = [
  { id: 'fine_only', label: 'Fine only', description: 'I received only a fine as punishment' },
  { id: 'imprisonment_less_1year', label: 'Imprisonment (less than 1 year)', description: 'I served less than 1 year in prison' },
  { id: 'imprisonment_1_5years', label: 'Imprisonment (1-5 years)', description: 'I served between 1 and 5 years in prison' },
  { id: 'imprisonment_more_5years', label: 'Imprisonment (more than 5 years)', description: 'I served more than 5 years in prison' },
  { id: 'suspended_sentence', label: 'Suspended sentence', description: 'I received a suspended sentence' },
  { id: 'probation', label: 'Probation/Community service', description: 'I was placed on probation or community service' },
];
