export interface HealthResponse {
  status: string;
  timestamp: string;
  database_connected: boolean;
  version: string;
}

export interface Paragraph {
  text: string;
  id: number;
  created_at: string;
}

export interface FetchResponse {
  paragraph: Paragraph;
  message: string;
}

export interface SearchResponse {
  paragraphs: Paragraph[];
  total_count: number;
  search_terms: string[];
  operator: string;
}

export interface SearchRequest {
  words: string[];
  operator: 'and' | 'or';
}

export interface WordFrequency {
  word: string;
  frequency: number;
  definition: string;
  pronunciation: string;
  part_of_speech: string;
}

export interface FrequencyResponse {
  words: WordFrequency[];
  total_paragraphs_analyzed: number;
  message: string;
}

export type ApiResponse<T> = {
  data: T;
  error?: string;
  loading: boolean;
};