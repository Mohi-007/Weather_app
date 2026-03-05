// Maps weather condition codes to categories.
// Each key represents a weather type, with an array of codes from the weather API.
export const weatherCodes = {
  clear: [800],
  clouds: [801, 802, 803, 804],
  mist: [701, 711, 721, 731, 741, 751, 761, 762, 771, 781],
  rain: [300, 301, 302, 310, 311, 312, 313, 314, 321, 500, 501, 520, 521],
  moderate_heavy_rain: [502, 503, 504, 511, 522, 531],
  snow: [600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622],
  thunder: [200, 201, 202, 210, 211, 212, 221, 230, 231, 232],
  thunder_rain: [200, 201, 202, 230, 231, 232],
};
