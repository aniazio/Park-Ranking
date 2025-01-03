export type Distance = {
  id: Number;
  dist: Number;
};

export type Park = {
  id: Number;
  name: String;
  district: String;
  rating: Number;
  latitude: Number;
  longitude: Number;
  distance: Distance;
};

export type Point = {
  latitude: Number;
  longitude: Number;
};

export type SearchingInput = {
  point?: Point;
  weight?: number;
};
