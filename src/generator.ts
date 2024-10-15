import { gates, centers, Centers, channels } from './map';

export interface HDValue {
  design: Record<string, [number, number]>,
  personality: Record<string, [number, number]>,
}

interface DefinedGateMap {
  isDesign?: boolean;
  isPersonality?: boolean;
  isConnected?: boolean;
}

function hexToRgb(hex: string) {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return {
    r: ((bigint >> 16) & 255) / 255,
    g: ((bigint >> 8) & 255) / 255,
    b: (bigint & 255) / 255
  };
}

const purple = hexToRgb('342973');
const white = hexToRgb('FFFFFF');
const brokenWhite = hexToRgb('F5F5F5');
const grey = hexToRgb('D9D9D9');
const darkGrey = hexToRgb('31243D');
const red = hexToRgb('D90A0A');

const generateGate = (gate: number, defined?: boolean) => {
  const { position } = gates[gate] || {};

  if (!position) return;

  const { x, y } = position;

  const frame = figma.createFrame();
  frame.x = x;
  frame.y = y;
  frame.cornerRadius = 6;
  frame.fills = defined ? [{ type: 'SOLID', color: purple }] : [];
  frame.layoutMode = 'HORIZONTAL';
  frame.primaryAxisAlignItems = 'CENTER';
  frame.counterAxisAlignItems = 'CENTER';
  frame.resize(12, 12);
  
  // Create the text inside the frame
  const text = figma.createText();
  text.fontName = { family: "Poppins", style: "SemiBold" };
  text.characters = String(gate);
  text.fontSize = 6;
  text.textAlignHorizontal = 'CENTER';
  text.textAlignVertical = 'CENTER';
  text.fills = [{
    type: 'SOLID',
    color: defined ? brokenWhite : purple,
  }]

  frame.appendChild(text);

  return frame;
}

const generateChannel = (gate: number, gateMap?: DefinedGateMap) => {
  const { isDesign, isPersonality, isConnected } = gateMap || {};

  const line = figma.createVector();

  const { channel } = gates[gate] || {};

  if (!channel) return line;

  const { x, y, length, rotate, alwaysRoundCap } = channel;
  
  line.vectorPaths = [{ windingRule: 'EVENODD', data: `M 3 3 L ${length - 3} 3` }]

  if (isPersonality && isDesign) {
    line.strokes = [{
      type: 'GRADIENT_LINEAR',
      gradientStops: [
        { color: { ...darkGrey, a: 1}, position: 0 },
        { color: { ...red, a: 1 }, position: 1 }
      ],
      gradientTransform: [
        [0, -1, 0],
        [1, 0, 0],
      ]
    }];
  } else {
    line.strokes = [{
      type: 'SOLID',
      color: (isPersonality ? darkGrey : isDesign ? red : grey)
    }];
  }

  line.strokeWeight = 6;
  line.strokeAlign = 'CENTER';
  line.strokeCap = (isConnected && !alwaysRoundCap) ? 'NONE' : 'ROUND';

  line.x = x;
  line.y = y;
  line.resize(length, 0)

  if (rotate) {
    line.rotation = rotate;
  }

  return line;
}

const generateCenter = (name: Centers, isDefined?: boolean, definedGates?: number[]) => {
  const { size, position, gates: centerGates, color, vector, radius } = centers[name] || {};

  const center = figma.createVector()

  center.resize(size.width, size.height);
  center.x = position.x;
  center.y = position.y;

  center.vectorPaths = [{ windingRule: 'EVENODD', data: vector }]

  center.strokeWeight = 2;
  center.strokeAlign = 'OUTSIDE';
  center.cornerRadius = radius;
  center.strokes = [{ type: 'SOLID', color: hexToRgb(color) }];
  center.fills = [{ type: 'SOLID', color: isDefined ? hexToRgb(color) : white }];

  if (centerGates?.length === 0) {
    return center;
  }

  const gatesElement = centerGates.map((gate) => generateGate(gate, (definedGates || []).includes(gate)));

  const group = figma.group([center, ...(gatesElement.filter((g) => !!g))], figma.currentPage);

  return group;
}

export const generate = async (hdValue: HDValue) => {
  await figma.loadFontAsync({ family: "Poppins", style: "SemiBold" }); // Ensure font is loaded
  
  const mainFrame = figma.createFrame();
  mainFrame.resize(326, 549);
  mainFrame.clipsContent = false;
  mainFrame.fills = []

  const definedGateMap: Record<number, any> = {};

  const { design, personality } = hdValue;
  Object.values(design).forEach(([gate]) => {
    definedGateMap[gate] = {
      ...(definedGateMap[gate] || {}),
      isDesign: true,
    }
  })
  Object.values(personality).forEach(([gate]) => {
    definedGateMap[gate] = {
      ...(definedGateMap[gate] || {}),
      isPersonality: true,
    }
  })
  channels.forEach(([gate1, gate2]) => {
    if (!!definedGateMap[gate1] && !!definedGateMap[gate2]) {
      definedGateMap[gate1] = {
        ...definedGateMap[gate1],
        isConnected: true
      }
      definedGateMap[gate2] = {
        ...definedGateMap[gate2],
        isConnected: true
      }
    }
  })

  const definedGates: number[] = [];
  const undefinedGates: number[] = [];
  const definedCenters: Centers[] = [];

  Object.keys(centers).forEach((center) => {
    const { gates } = centers[center as Centers];
    gates.forEach((gate) => {
      if (!!definedGateMap[gate]) {
        definedGates.push(gate);
        if (definedGateMap[gate].isConnected) {
          definedCenters.push(center as Centers);
        }
      } else {
        undefinedGates.push(gate);
      }
    })
  })

  undefinedGates.map((undGate) => mainFrame.appendChild(
    generateChannel(undGate)
  ))
  definedGates.map((defGate) => mainFrame.appendChild(
    generateChannel(defGate, definedGateMap[defGate])
  ))

  Object.keys(centers).map((center) => mainFrame.appendChild(
    generateCenter(center as Centers, definedCenters.includes(center as Centers), definedGates)
  ));

  figma.currentPage.appendChild(mainFrame);
  figma.currentPage.selection = [mainFrame];
  figma.viewport.scrollAndZoomIntoView([mainFrame]);
}
