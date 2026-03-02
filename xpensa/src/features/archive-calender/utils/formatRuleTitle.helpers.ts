export const formatRuleTitle = (ruleName: string): string => {
  if (!ruleName) return '';
  return ruleName.replace(/{/g, '').replace(/}/g, '').replace(/->/g, '➝');
};
