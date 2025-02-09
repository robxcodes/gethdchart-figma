import { crosses, definitions, types } from "./extra-map";
import { Authority, IncarnationCrossAngle, Types } from "./extra-type";
import { darkGrey, generate, hexToRgb, red, white } from "./generator";
import { gateToCenter, planets } from "./map";
import { Centers, HDValue } from "./type";

const darkBlue = hexToRgb('19558C');
const lightIndigo = hexToRgb('6973C9');
const mainIndigo = hexToRgb('4B58BF');

const generateText = (content: string, size: number, color: RGB, style: 'Regular' | 'Bold', align: TextNode["textAlignHorizontal"]) => {
  const text = figma.createText();
  text.fontName = { family: "Domine", style };
  text.characters = content;
  text.fontSize = size;
  text.textAlignHorizontal = align;
  text.textAlignVertical = 'CENTER';
  text.letterSpacing = { unit: 'PERCENT', value: 3 };
  text.fills = [{
    type: 'SOLID',
    color,
  }]

  return text;
}

const generatePlanets = (hdValue: HDValue) => {
  const planetFrame = figma.createFrame();
  planetFrame.resize(145, 308);
  planetFrame.fills = [{
    type: 'SOLID',
    color: lightIndigo
  }];
  planetFrame.layoutMode = 'VERTICAL';
  planetFrame.itemSpacing = 2;
  planetFrame.primaryAxisAlignItems = 'CENTER';
  planetFrame.counterAxisAlignItems = 'CENTER';
  planetFrame.cornerRadius = 4;

  planetFrame.strokes = [{
    type: 'SOLID',
    color: lightIndigo
  }];
  planetFrame.strokeWeight = 2;
  planetFrame.strokeAlign = 'OUTSIDE';
  planetFrame.x = -150;
  planetFrame.clipsContent = true;

  const titleFrame = figma.createFrame();
  titleFrame.fills = [{ type: 'SOLID', color: white }];
  titleFrame.layoutMode = 'HORIZONTAL';
  titleFrame.primaryAxisAlignItems = 'CENTER';
  titleFrame.counterAxisAlignItems = 'CENTER';
  titleFrame.primaryAxisSizingMode = 'FIXED';
  titleFrame.counterAxisSizingMode = 'FIXED';
  titleFrame.itemSpacing = 2;
  titleFrame.resize(145, 22);

  titleFrame.appendChild(generateText('Design', 9, red, 'Bold', 'CENTER'));
  titleFrame.appendChild(generateText('/', 9, mainIndigo, 'Bold', 'CENTER'))
  titleFrame.appendChild(generateText('Personality', 9, darkGrey, 'Bold', 'CENTER'))
  planetFrame.appendChild(titleFrame);

  planets.forEach(([key, symbol]) => {
    const valueFrame = figma.createFrame();
    valueFrame.fills = [{ type: 'SOLID', color: white }];
    valueFrame.layoutMode = 'HORIZONTAL';
    valueFrame.primaryAxisAlignItems = 'SPACE_BETWEEN';
    valueFrame.counterAxisAlignItems = 'CENTER';
    valueFrame.primaryAxisSizingMode = 'FIXED';
    valueFrame.counterAxisSizingMode = 'FIXED';
    valueFrame.paddingLeft = 8;
    valueFrame.paddingRight = 8;
    valueFrame.resize(145, 20);

    const designText = generateText(hdValue.design[key].join('.'), 9, red, 'Regular', 'LEFT');
    valueFrame.appendChild(designText);
    designText.layoutSizingHorizontal = 'FILL';

    const symbolText = generateText(symbol, 12, darkBlue, 'Bold', 'CENTER');
    valueFrame.appendChild(symbolText)

    const personalityText = generateText(hdValue.personality[key].join('.'), 9, darkGrey, 'Regular', 'RIGHT');
    valueFrame.appendChild(personalityText)
    personalityText.layoutSizingHorizontal = 'FILL';

    planetFrame.appendChild(valueFrame);
  })

  figma.currentPage.appendChild(planetFrame);
  return planetFrame;
}

const generateMeta = (meta: Record<string, { value: string, extra?: string, isSpecial?: boolean }>) => {
  const metaFrame = figma.createFrame();
  metaFrame.resize(145, 308);
  metaFrame.fills = [{
    type: 'SOLID',
    color: lightIndigo
  }];
  metaFrame.strokes = [{
    type: 'SOLID',
    color: lightIndigo
  }];
  metaFrame.strokeWeight = 2;
  metaFrame.strokeAlign = 'INSIDE';
  metaFrame.layoutMode = 'VERTICAL';
  metaFrame.itemSpacing = 2;
  metaFrame.counterAxisAlignItems = 'MIN';
  metaFrame.cornerRadius = 6;
  metaFrame.clipsContent = true;

  metaFrame.x = 350;

  Object.entries(meta).forEach(([title, { value, extra }]) => {
    const valueFrame = figma.createFrame();
    valueFrame.resize(145, 22);
    valueFrame.fills = [{ type: 'SOLID', color: white }];
    valueFrame.layoutMode = 'VERTICAL';
    valueFrame.primaryAxisAlignItems = 'CENTER';
    valueFrame.primaryAxisSizingMode = 'AUTO';
    valueFrame.counterAxisAlignItems = 'MIN';
    valueFrame.paddingLeft = 8;
    valueFrame.paddingRight = 8;
    valueFrame.paddingTop = 6;
    valueFrame.paddingBottom = 6;
    valueFrame.itemSpacing = 2;

    valueFrame.appendChild(generateText(`Your ${title} is`, 8, hexToRgb('807A7A'), 'Regular', 'LEFT'));
    valueFrame.appendChild(generateText(value, 10, mainIndigo, 'Bold', 'LEFT'))
    extra && valueFrame.appendChild(generateText(extra, 8, hexToRgb('686464'), 'Regular', 'LEFT'))
    metaFrame.appendChild(valueFrame);
  })

  figma.currentPage.appendChild(metaFrame);
  return metaFrame;
}

export const extraGenerate = async (hdValue: HDValue) => {
  await Promise.all([
    figma.loadFontAsync({ family: "Domine", style: "Regular" }),
    figma.loadFontAsync({ family: "Domine", style: "Bold" }),
  ])

  const planetFrame = generatePlanets(hdValue);

  const {
    mainFrame,
    definedCenters,
    activeChannels,
  } = await generate(hdValue);

  const centerSplits: Centers[][] = [];

  activeChannels.forEach(([gate1, gate2]) => {
    const [center1, center2] = [gateToCenter[gate1], gateToCenter[gate2]];
    const splitIndex = centerSplits.findIndex((split) => split.includes(center1) || split.includes(center2))
    const existingSplit = splitIndex > -1 ? centerSplits[splitIndex] : [];

    if (!existingSplit.includes(center1)) {
      existingSplit.push(center1)
    }

    if (!existingSplit.includes(center2)) {
      existingSplit.push(center2)
    }

    if (splitIndex > -1) {
      centerSplits[splitIndex] = existingSplit;
    } else {
      centerSplits.push(existingSplit)
    }
  });

  const motorCenters: Centers[] = ['sacral', 'esp', 'root', 'heart']
  let type: Types;

  const hasMotorThroatChannel = centerSplits.some((split) => split.includes('throat') && motorCenters.some((mc) => split.includes(mc)));

  if (definedCenters.includes('sacral')) {
    type = hasMotorThroatChannel ? 'Manifesting Generator' : 'Generator'
  } else if (definedCenters.length > 0) {
    type = hasMotorThroatChannel ? 'Manifestor' : 'Projector'
  } else {
    type = 'Reflector'
  }

  let authority: Authority;

  if (definedCenters.includes('esp')) {
    authority = 'Emotional'
  } else if (definedCenters.includes('sacral')) {
    authority = 'Sacral'
  } else if (definedCenters.includes('spleen')) {
    authority = 'Splenic'
  } else if (centerSplits.some((split) => split.includes('throat') && split.includes('heart'))) {
    authority = 'Ego-manifested'
  } else if (centerSplits.some((split) => split.includes('g') && split.includes('heart'))) {
    authority = 'Ego-projected'
  } else if (centerSplits.some((split) => split.includes('g') && split.includes('throat'))) {
    authority = 'Self-projected'
  } else if (definedCenters.length > 0) {
    authority = 'Mental'
  } else {
    authority = 'Lunar'
  }

  const profile = [hdValue.personality.sun[1], hdValue.design.sun[1]];

  let incarnationCrossAngle: IncarnationCrossAngle;
  if (profile[0] === 4 && profile[1] === 1) {
    incarnationCrossAngle = 'Juxtaposition'
  } else {
    incarnationCrossAngle = (profile[0] > profile[1]) ? 'Left Angle' : 'Right Angle'
  }

  const incarnationCrossGates = `(${hdValue.personality.sun[0]}/${hdValue.personality.earth[0]} | ${hdValue.design.sun[0]}/${hdValue.design.earth[0]})`
  const incarnationCrossTheme = crosses[incarnationCrossAngle][incarnationCrossGates];

  const meta = {
    type: { value: type },
    signature: { value: types[type].signature },
    'not-self theme': { value: types[type].notSelf },
    strategy: { value: types[type].strategy },
    authority: { value: authority },
    profile: { value: `${hdValue.personality.sun[1]} / ${hdValue.design.sun[1]}` },
    definition: { value: definitions[centerSplits.length] },
    'incarnation cross': {
      value: incarnationCrossAngle,
      extra: `${incarnationCrossTheme}\n${incarnationCrossGates}`
    }
  }

  const metaFrame = generateMeta(meta);

  figma.currentPage.selection = [mainFrame, planetFrame, metaFrame];
  figma.viewport.scrollAndZoomIntoView([mainFrame, planetFrame, metaFrame]);
}

