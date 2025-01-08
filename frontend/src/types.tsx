export type Distance = {
  id: number;
  dist: number;
};

export type Park = {
  id: number;
  name: string;
  district: string;
  rating: number;
  latitude: number;
  longitude: number;
  distance: Distance;
};

export type ParkDetailed = {
  id: number;
  name: string;
  district: string;
  rating: number;
  latitude: number;
  longitude: number;
  distance: Distance;
  pluses: Feature[];
  minuses: Feature[];
};

export type Feature = {
  id: number;
  description: string;
};

export type Point = {
  latitude: number;
  longitude: number;
};

export type SearchingInput = {
  point?: Point;
  weight?: number;
};
