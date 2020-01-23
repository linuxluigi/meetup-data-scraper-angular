export interface ISuggestResponse {
  /*
  Interface for Suggestion Response
  */
  suggestions: string[];
}

interface ILocation {
  lat: number;
  lon: number;
}

export interface IVenue {
  name: string;
  location: ILocation;
}

interface ITopics {
  meetup_id: string;
  lang: string;
  name: string;
  urlkey: string;
}

interface IEvents {
  meetup_id: string;
  time: string;
  name: string;
  link: string;
  date_in_series_pattern: boolean;
  attendance_count?: number;
  attendance_sample?: number;
  attendee_sample?: number;
  created?: string;
  description?: string;
  duration?: number;
  fee_accepts?: number;
  fee_amount?: number;
  fee_currency?: string;
  fee_description?: string;
  fee_label?: string;
  how_to_find_us?: string;
  status?: string;
  updated?: string;
  utc_offset?: number;
  venue_visibility?: string;
  visibility?: string;
  venue_address_1?: string;
  venue_address_2?: string;
  venue_address_3?: string;
  venue_city?: string;
  venue_country?: string;
  venue_localized_country_name?: string;
  venue_name?: string;
  venue_phone?: string;
  venue_zip_code?: string;
  venue_location?: ILocation;
  event_host_host_count?: number;
  event_host_id?: number;
  event_host_intro?: string;
  event_host_join_date?: string;
  event_host_name?: string;
}

export interface ISearchRequest {
  /*
  Search Request Interface
  */
  query: string;
  load_events?: boolean;
  page?: number;
  limit?: number;
  sort?: string;
  geo_lat?: number;
  geo_lon?: number;
  geo_distance?: string;
  event_time_gte?: string;
  event_time_lte?: string;
}

export interface IGroup {
  score?: number;
  meetup_id: number;
  urlname: string;
  created: string;
  description: string;
  name: string;
  link: string;
  location: ILocation;
  members: number;
  status: string;
  timezone: string;
  visibility: string;
  venues: IVenue[];
  venue_location_average?: ILocation;

  nomination_acceptable?: boolean;
  city?: string;
  city_link?: string;
  country?: string;
  fee_options_currencies_code?: string;
  fee_options_currencies_default?: boolean;
  fee_options_type?: string;
  join_mode?: string;
  localized_country_name?: string;
  localized_location?: string;
  member_limit?: number;
  short_link?: string;
  state?: string;
  untranslated_city?: string;
  welcome_message?: string;
  who?: string;
  category_id?: string;
  category_name?: string;
  category_shortname?: string;
  category_sort_name?: string;
  meta_category_id?: string;
  meta_category_shortname?: string;
  meta_category_name?: string;
  meta_category_sort_name?: string;
  topics?: ITopics[];
  organizer_id?: number;
  organizer_name?: number;
  organizer_bio?: number;
  events?: IEvents[];
}

export interface ISearchResponse {
  /*
  Search Response Interface
  */
  results: IGroup[];
  hits: number;
  map_center: ILocation;
}

export interface INominatim {
  place_id: number;
  license: string;
  osm_type: string;
  osm_id: number;
  boundingbox: [string];
  lat: string;
  lon: string;
  display_name: string;
  class: string;
  type: string;
  importance: number;
  icon: string;
}

export interface ISetLocation {
  lat: number;
  lon: number;
  distance: string;
  name: string;
}
