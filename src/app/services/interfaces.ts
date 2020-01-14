export interface ISuggestResponse {
  /*
  Interface for Suggestion Response
  */
  suggestions: string[];
}

export interface ISearchRequest {
  /*
  Search Request Interface
  */
  query: string;
  load_events?: boolean;
  page?: number;
  limit?: number;
}

interface IGroup {
  score?: number;
  urlname: string;
  description: string;
  name: string;
  link: string;
  location: {
    lat: number,
    lon: number
  };
}

export interface ISearchResponse {
  /*
  Search Response Interface
  */
  results: [IGroup];
  hits: number;
}
