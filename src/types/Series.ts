// Database model
export interface Series {
  Id: number;
  Name: string;
}

// View model
export interface SeriesViewModel {
  id: number;
  name: string;
}

// Requests
export interface SeriesUpdateRequest {
  seriesId: string;
  name: string;
}
