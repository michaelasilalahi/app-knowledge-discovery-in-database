export interface MiningResultItem {
  id?: number;
  rule_name: string;
  antecedent_support: number;
  consequent_support: number;
  insight_enrichment: string;
  confidence: number;
  lift: number;
  leverage: number;
  conviction: number;
  support: number;
  antecedents: string;
  consequents: string;
}

export interface MiningResultResponse {
  status: string;
  message: string;
  data: MiningResultItem[];
}
