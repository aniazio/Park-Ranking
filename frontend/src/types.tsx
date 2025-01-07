export type Distance = {
  id: Number;
  dist: Number;
};

export type Park = {
  id: Number;
  name: string;
  district: string;
  rating: Number;
  latitude: Number;
  longitude: Number;
  distance: Distance;
};

export type ParkDetailed = {
  id: Number;
  name: string;
  district: string;
  rating: Number;
  latitude: Number;
  longitude: Number;
  distance: Distance;
  pluses: Feature[];
  minuses: Feature[];
};

export type Feature = {
  id: Number;
  description: string;
};

export type Point = {
  latitude: Number;
  longitude: Number;
};

export type SearchingInput = {
  point?: Point;
  weight?: number;
};
