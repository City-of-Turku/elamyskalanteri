export interface Position {
  coords: {
    latitude: number;
    longitude: number;
  };
}

export interface BBox {
  west: number;
  south: number;
  east: number;
  north: number;
}

/*
 * Given midpoint coordinates (pos), calculates a square around the midpoint that has a "radius" of d (in KM).
 * "Radius" here refers to the distance from midpoint to the sides of the square, not corners.
 * Note that the resulting box can only be used for very rough estimations.
 * Corners of the square are sqrt(2d^2) KM from the midpoint.
 */

export const getCoords = (pos: Position, d: number): BBox => {
  const R = 6378.1; // Radius of the Earth, KM
  const bearingN = 0; // Bearing North
  const bearingE = deg2Rad(90); // Bearing East
  const bearingS = deg2Rad(180); // Bearing South
  const bearingW = deg2Rad(270); // Bearing West

  // convert deg to rad
  const lat1 = deg2Rad(pos.coords.latitude);
  const lng1 = deg2Rad(pos.coords.longitude);

  // calculate latitudes for each bearing
  const lat2N = Math.asin(
    Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearingN),
  );
  const lat2E = Math.asin(
    Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearingE),
  );
  const lat2S = Math.asin(
    Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearingS),
  );
  const lat2W = Math.asin(
    Math.sin(lat1) * Math.cos(d / R) + Math.cos(lat1) * Math.sin(d / R) * Math.cos(bearingW),
  );

  // Calculate latitudes for east and west
  //const lng2N = lng1 + Math.atan2(Math.sin(bearingN) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2N))
  const lng2E =
    lng1 +
    Math.atan2(
      Math.sin(bearingE) * Math.sin(d / R) * Math.cos(lat1),
      Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2E),
    );
  //const lng2S = lng1 + Math.atan2(Math.sin(bearingS) * Math.sin(d / R) * Math.cos(lat1), Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2S))
  const lng2W =
    lng1 +
    Math.atan2(
      Math.sin(bearingW) * Math.sin(d / R) * Math.cos(lat1),
      Math.cos(d / R) - Math.sin(lat1) * Math.sin(lat2W),
    );

  return {
    west: rad2Deg(lng2W),
    south: rad2Deg(lat2S),
    east: rad2Deg(lng2E),
    north: rad2Deg(lat2N),
  };
};

// convert degrees to radians
const deg2Rad = (deg: number) => deg * (Math.PI / 180);
// convert radians to degrees
const rad2Deg = (rad: number) => rad / (Math.PI / 180);
