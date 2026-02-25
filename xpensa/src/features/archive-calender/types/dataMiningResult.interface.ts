export interface TransactionHistory {
  date: string;
  type_of_expenditure: string;
  label: string;
  category: string;
  amount: number;
}

export interface MiningResultItem {
  antecedents: string;
  consequents: string;
  insight_enrichment: string;
  support: number;
  confidence: number;
  lift: number;
  antecedent_support: number;
  consequent_support: number;
  leverage: number;
  conviction: number;
  antecedent_types?: string;
  consequent_types?: string;
  related_transactions?: TransactionHistory[];
}

export interface MiningResponse {
  status: string;
  data: MiningResultItem[];
}
