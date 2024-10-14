export type Centers = 'head' | 'mind' | 'throat' | 'g' | 'heart' | 'spleen' | 'sacral' | 'esp' | 'root'

interface CenterMeta {
  size: { width: number, height: number },
  position: { x: number, y: number },
  gates: number[],
  color: string,
  vector: string,
  radius: 2 | 4,
}

interface ChannelMeta {
  x: number,
  y: number,
  length: number,
  rotate?: number,
  alwaysRoundCap?: boolean,
}

interface GateMeta {
  position: { x: number, y: number },
  channel: ChannelMeta,
}

export const centers: Record<Centers, CenterMeta> = {
  head: {
    size: { width: 74, height: 58 },
    position: { x: 126, y: 0 },
    gates: [64, 61, 63],
    color: 'F3C13F',
    radius: 2,
    vector: 'M 0 58 L 37 0 L 74 58 Z',
  },
  mind: {
    size: { width: 74, height: 58 },
    position: { x: 126, y: 76 },
    gates: [47, 24, 4, 17, 11, 43],
    color: '4FD21F',
    radius: 2,
    vector: 'M 0 0 L 37 58 L 74 0 Z',
  },
  throat: {
    size: { width: 64, height: 64 },
    position: { x: 131, y: 149 },
    gates: [62, 23, 56, 35, 12, 45, 33, 8, 31, 20, 16],
    color: 'F3893F',
    radius: 4,
    vector: 'M 64 0 L 0 0 L 0 64 L 64 64 Z',
  },
  g: {
    size: { width: 80, height: 80 },
    position: { x: 123, y: 245 },
    gates: [1, 13, 25, 46, 2, 15, 10, 7],
    color: 'F3C13F',
    radius: 4,
    vector: 'M 0 40 L 40 80 L 80 40 L 40 0 Z'
  },
  heart: {
    size: { width: 74, height: 42 },
    position: { x: 206, y: 300 },
    gates: [26, 51, 21, 40],
    color: 'F76E76',
    radius: 2,
    vector: 'M 0 42 L 37 0 L 74 42 Z'
  },
  spleen: {
    size: { width: 58, height: 74 },
    position: { x: 0, y: 352 },
    gates: [48, 57, 44, 50, 32, 28, 18],
    color: 'F3893F',
    radius: 2,
    vector: 'M 0 0 L 58 37 L 0 74 Z'
  },
  sacral: {
    size: { width: 64, height: 64 },
    position: { x: 131, y: 389 },
    gates: [5, 14, 29, 59, 9, 3, 42, 27, 34],
    color: 'F76E76',
    radius: 4,
    vector: 'M 64 0 L 0 0 L 0 64 L 64 64 Z',
  },
  esp: {
    size: { width: 58, height: 74 },
    position: { x: 268, y: 352 },
    gates: [6, 37, 22, 36, 30, 55, 49],
    color: 'F3893F',
    radius: 2,
    vector: 'M 58 74 L 0 37 L 58 0 Z'
  },
  root: {
    size: { width: 64, height: 64 },
    position: { x: 131, y: 485 },
    gates: [58, 38, 54, 53, 60, 52, 19, 39, 41],
    color: 'F3893F',
    radius: 4,
    vector: 'M 64 0 L 0 0 L 0 64 L 64 64 Z',
  },
}

export const channels = [
  [47, 64],
  [24, 61],
  [4, 63],
  [17, 62],
  [23, 43],
  [11, 56],
  [16, 48],
  [20, 57],
  [20, 10],
  [20, 34],
  [31, 7],
  [8, 1],
  [33, 13],
  [45, 21],
  [12, 22],
  [35, 36],
  [10, 57],
  [10, 34],
  [15, 5],
  [2, 14],
  [46, 29],
  [25, 51],
  [26, 44],
  [40, 37],
  [57, 34],
  [50, 27],
  [32, 54],
  [28, 38],
  [18, 58],
  [59, 6],
  [42, 53],
  [3, 60],
  [9, 52],
  [49, 19],
  [55, 39],
  [30, 41]
]

export const gates: Record<number, GateMeta> = {
  // head
  64: {
    position: { x: 142, y: 45 },
    channel: { x: 148, y: 68, length: 15, rotate: 90 }
  },
  61: {
    position: { x: 157, y: 45 },
    channel: { x: 163, y: 68, length: 15, rotate: 90 }
  },
  63: {
    position: { x: 172, y: 45 },
    channel: { x: 178, y: 68, length: 15, rotate: 90 }
  },
  // mind
  47: {
    position: { x: 142, y: 77 },
    channel: { x: 148, y: 83, length: 15, rotate: 90 }
  },
  24: {
    position: { x: 157, y: 77 },
    channel: { x: 163, y: 83, length: 15, rotate: 90 }
  },
  4: {
    position: { x: 172, y: 77 },
    channel: { x: 178, y: 83, length: 15, rotate: 90 }
  },
  17: {
    position: { x: 145, y: 96 },
    channel: { x: 148, y: 131, length: 27, rotate: 90 }
  },
  43: {
    position: { x: 157, y: 114 },
    channel: { x: 163, y: 142, length: 20, rotate: 90 }
  },
  11: {
    position: { x: 169, y: 96 },
    channel: { x: 178, y: 131, length: 27, rotate: 90 }
  },
  // throat
  62: {
    position: { x: 142, y: 150 },
    channel: { x: 148, y: 156, length: 27, rotate: 90 }
  },
  23: {
    position: { x: 157, y: 150 },
    channel: { x: 163, y: 156, length: 15, rotate: 90 }
  },
  56: {
    position: { x: 172, y: 150 },
    channel: { x: 178, y: 156, length: 27, rotate: 90 }
  },
  35: {
    position: { x: 182, y: 162 },
    channel: { x: 190, y: 160, length: 128, rotate: -57.5 }
  },
  12: {
    position: { x: 182, y: 176 },
    channel: { x: 190, y: 175, length: 118, rotate: -60 }
  },
  45: {
    position: { x: 182, y: 190 },
    channel: { x: 190, y: 190, length: 78, rotate: -66 }
  },
  33: {
    position: { x: 172, y: 200 },
    channel: { x: 178, y: 234, length: 27, rotate: 90 }
  },
  8: {
    position: { x: 157, y: 200 },
    channel: { x: 163, y: 234, length: 27, rotate: 90 }
  },
  31: {
    position: { x: 142, y: 200 },
    channel: { x: 148, y: 234, length: 27, rotate: 90 }
  },
  20: {
    position: { x: 132, y: 176 },
    channel: { x: 136, y: 175, length: 190, rotate: -120 }
  },
  16: {
    position: { x: 132, y: 162 },
    channel: { x: 136, y: 160, length: 128, rotate: -122.5 }
  },
  // ego
  26: {
    position: { x: 215, y: 329 },
    channel: { x: 218, y: 334, length: 100, rotate: -166 }
  },
  51: {
    position: { x: 226, y: 317 },
    channel: { x: 208, y: 301, length: 30, rotate: -45 }
  },
  21: {
    position: { x: 237, y: 305 },
    channel: { x: 219, y: 255, length: 62, rotate: -66 }
  },
  40: {
    position: { x: 259, y: 329 },
    channel: { x: 268, y: 336, length: 28, rotate: -60 }
  },
  // g
  7: {
    position: { x: 142, y: 264 },
    channel: { x: 148, y: 269, length: 35, rotate: 90 }
  },
  1: {
    position: { x: 157, y: 249 },
    channel: { x: 163, y: 255, length: 21, rotate: 90 }
  },
  13: {
    position: { x: 172, y: 264 },
    channel: { x: 178, y: 269, length: 35, rotate: 90 }
  },
  25: {
    position: { x: 187, y: 279 },
    channel: { x: 193, y: 286, length: 30, rotate: -45 }
  },
  46: {
    position: { x: 172, y: 294 },
    channel: { x: 178, y: 352, length: 51, rotate: 90 }
  },
  2: {
    position: { x: 157, y: 309 },
    channel: { x: 163, y: 352, length: 37, rotate: 90 }
  },
  15: {
    position: { x: 142, y: 294 },
    channel: { x: 148, y: 352, length: 51, rotate: 90 }
  },
  10: {
    position: { x: 127, y: 279 },
    channel: { x: 132, y: 287, length: 104, rotate: -150 }
  },
  // sacral
  5: {
    position: { x: 142, y: 390 },
    channel: { x: 148, y: 393, length: 40, rotate: 90 },
  },
  14: {
    position: { x: 157, y: 390 },
    channel: { x: 163, y: 393, length: 40, rotate: 90 },
  },
  29: {
    position: { x: 172, y: 390 },
    channel: { x: 178, y: 393, length: 40, rotate: 90 },
  },
  59: {
    position: { x: 182, y: 427 },
    channel: { x: 231, y: 414, length: 46, rotate: -155 },
  },
  9: {
    position: { x: 172, y: 440 },
    channel: { x: 178, y: 470, length: 20, rotate: 90 },
  },
  3: {
    position: { x: 157, y: 440 },
    channel: { x: 163, y: 470, length: 20, rotate: 90 },
  },
  42: {
    position: { x: 142, y: 440 },
    channel: { x: 148, y: 470, length: 20, rotate: 90 },
  },
  27: {
    position: { x: 132, y: 427 },
    channel: { x: 94, y: 414, length: 46, rotate: -25 },
  },
  34: {
    position: { x: 132, y: 402 },
    channel: { x: 41, y: 340, length: 116, rotate: -35 },
  },
  // spleen
  48: {
    position: { x: 1, y: 359 },
    channel: { x: 71, y: 262, length: 120, rotate: -122.5 },
  },
  57: {
    position: { x: 14, y: 367 },
    channel: { x: 42, y: 338, length: 40, rotate: -120 },
  },
  44: {
    position: { x: 27, y: 375 },
    channel: { x: 130, y: 356, length: 100, rotate: -166 },
  },
  50: {
    position: { x: 40, y: 383 },
    channel: { x: 47, y: 392, length: 54, rotate: -25 },
  },
  32: {
    position: { x: 27, y: 391 },
    channel: { x: 34, y: 401, length: 75, rotate: -45 },
  },
  28: {
    position: { x: 14, y: 399 },
    channel: { x: 23, y: 409, length: 78, rotate: -45 },
  },
  18: {
    position: { x: 1, y: 407 },
    channel: { x: 11, y: 416, length: 81, rotate: -45 },
  },
  // esp
  6: {
    position: { x: 275, y: 383 },
    channel: { x: 278, y: 392, length: 54, rotate: -155 },
  },
  37: {
    position: { x: 287, y: 375 },
    channel: { x: 279, y: 355, length: 28, rotate: -60 },
  },
  22: {
    position: { x: 300, y: 367 },
    channel: { x: 243, y: 267, length: 118, rotate: -60 },
  },
  36: {
    position: { x: 313, y: 359 },
    channel: { x: 253, y: 259, length: 120, rotate: -57.5 },
  },
  30: {
    position: { x: 313, y: 407 },
    channel: { x: 315, y: 416, length: 81, rotate: -135 },
  },
  55: {
    position: { x: 300, y: 399 },
    channel: { x: 303, y: 409, length: 78, rotate: -135 },
  },
  49: {
    position: { x: 287, y: 391 },
    channel: { x: 292, y: 401, length: 75, rotate: -135 },
  },
  // root
  58: {
    position: { x: 132, y: 531 },
    channel: { x: 67, y: 472, length: 92, rotate: -45 },
  },
  38: {
    position: { x: 132, y: 515 },
    channel: { x: 76, y: 462, length: 82, rotate: -45 },
  },
  54: {
    position: { x: 132, y: 499 },
    channel: { x: 86, y: 453, length: 70, rotate: -45 },
  },
  53: {
    position: { x: 142, y: 486 },
    channel: { x: 148, y: 488, length: 20, rotate: 90 },
  },
  60: {
    position: { x: 157, y: 486 },
    channel: { x: 163, y: 488, length: 20, rotate: 90 },
  },
  52: {
    position: { x: 172, y: 486 },
    channel: { x: 178, y: 488, length: 20, rotate: 90 },
  },
  19: {
    position: { x: 182, y: 499 },
    channel: { x: 240, y: 453, length: 70, rotate: -135 },
  },
  39: {
    position: { x: 182, y: 515 },
    channel: { x: 250, y: 462, length: 82, rotate: -135 },
  },
  41: {
    position: { x: 182, y: 531 },
    channel: { x: 259, y: 472, length: 92, rotate: -135 },
  },
}