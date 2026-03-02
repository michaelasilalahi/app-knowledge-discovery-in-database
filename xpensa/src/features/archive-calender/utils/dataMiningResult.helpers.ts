export const metricLabels: Record<string, string> = {
  antecedent_support: 'Antecedent Support',
  consequent_support: 'Consequent Support',
  support: 'Support',
  confidence: 'Confidence',
  lift: 'Lift',
  leverage: 'Leverage',
  conviction: 'Conviction',
};

export const parseInsightString = (rawText: string) => {
  if (!rawText) return { description: '-', suggestion: '-' };

  const parts = rawText
    .split('\n')
    .map((s) => s.trim())
    .filter((s) => s !== '');

  let description = '-';
  let suggestion = '-';

  if (parts.length >= 2) {
    description = parts[1];
    const lastPart = parts[parts.length - 1];
    suggestion = lastPart.replace(/^Saran:\s*/i, '');
  }

  return { description, suggestion };
};
