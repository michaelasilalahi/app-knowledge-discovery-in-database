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

  // Jika angka bulat kembalikan angka biasa
  if (Number.isInteger(value)) return value.toString();

  // Jika desimal panjang, ambil presisi yang rapi tapi detail
  return value.toString().length > 10 ? value.toFixed(8) : value.toString();
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
