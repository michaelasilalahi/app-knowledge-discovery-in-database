/**
 * Membersihkan format rule_name
 * Input: "{nasi goreng} -> {teh obeng}"
 * Output: "nasi goreng ➝ teh obeng"
 */
export const formatRuleTitle = (ruleName: string): string => {
  if (!ruleName) return '';
  return ruleName.replace(/{/g, '').replace(/}/g, '').replace(/->/g, '➝');
};

/**
 * Memformat angka metrik
 * Menghilangkan desimal berlebih jika angkanya integer.
 * Membatasi desimal jika float panjang
 */
export const formatMetricValue = (value: number): string => {
  if (value === undefined || value === null) return '-';
  if (Number.isInteger(value)) return value.toString();
  return value.toString().length > 10 ? value.toFixed(8) : value.toString();
};

export const formatRupiah = (amount: number): string => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '-';

  try {
    const parts = dateString.split('-');
    if (parts.length !== 3) return dateString;

    const year = parseInt(parts[0]);
    const monthIndex = parseInt(parts[1]) - 1;
    const day = parseInt(parts[2]);

    const dateObj = new Date(year, monthIndex, day);

    return new Intl.DateTimeFormat('id-ID', {
      year: 'numeric',
      month: 'long',
      weekday: 'long',
      day: 'numeric',
    }).format(dateObj);
  } catch (e) {
    return dateString;
  }
};

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

export const formatItemToMultiline = (text: string): string => {
  if (!text) return '-';
  const clean = text.replace(/[{}]/g, '');
  return clean.replace(/,\s*/g, '\n');
};
