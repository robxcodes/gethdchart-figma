import { crosses, definitions, types } from "./extra-map";
import { Authority, IncarnationCrossAngle, Types } from "./extra-type";
import { darkGrey, generate, hexToRgb, red, white } from "./generator";
import { centers, channels, gateToCenter, planets } from "./map";
import { Centers, HDValue } from "./type";

const lightBlue = hexToRgb('E0F0FF');
const darkBlue = hexToRgb('19558C');
const lightRed = hexToRgb('FCC3CF');

const generateText = (content: string, size: number, color: RGB, align: TextNode["textAlignHorizontal"]) => {
  const text = figma.createText();
  text.fontName = { family: "Inter", style: "Medium" };
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
  planetFrame.resize(135, 319);
  planetFrame.fills = [{
    type: 'SOLID',
    color: lightBlue
  }];
  planetFrame.layoutMode = 'VERTICAL';
  planetFrame.itemSpacing = 1;
  planetFrame.primaryAxisAlignItems = 'CENTER';
  planetFrame.counterAxisAlignItems = 'CENTER';
  planetFrame.cornerRadius = 4;
  
  planetFrame.strokes = [{
    type: 'SOLID',
    color: lightBlue
  }];
  planetFrame.strokeWeight = 1;
  planetFrame.strokeAlign = 'INSIDE';
  planetFrame.x = -150;
  planetFrame.clipsContent = true;

  const titleFrame = figma.createFrame();
  titleFrame.fills = [];
  titleFrame.layoutMode = 'HORIZONTAL';
  titleFrame.primaryAxisAlignItems = 'CENTER';
  titleFrame.counterAxisAlignItems = 'CENTER';
  titleFrame.primaryAxisSizingMode = 'FIXED';
  titleFrame.counterAxisSizingMode = 'FIXED';
  titleFrame.itemSpacing = 2;
  titleFrame.resize(133, 20);

  titleFrame.appendChild(generateText('Design', 8, red, 'CENTER'));
  titleFrame.appendChild(generateText('/', 8, darkBlue, 'CENTER'))
  titleFrame.appendChild(generateText('Personality', 8, darkGrey, 'CENTER'))
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
    valueFrame.resize(133, 22);
  
    const designText = generateText(hdValue.design[key].join('.'), 10, red, 'LEFT');
    valueFrame.appendChild(designText);
    designText.layoutSizingHorizontal = 'FILL';
  
    const symbolText = generateText(symbol, 10, darkBlue, 'CENTER');
    symbolText.fontName = { family: 'Symbol', style: 'Regular' };
    valueFrame.appendChild(symbolText)
  
    const personalityText = generateText(hdValue.personality[key].join('.'), 10, darkGrey, 'RIGHT');
    valueFrame.appendChild(personalityText)
    personalityText.layoutSizingHorizontal = 'FILL';

    planetFrame.appendChild(valueFrame);
  })

  figma.currentPage.appendChild(planetFrame);
  return planetFrame;
}

const generateMeta = (meta: Record<string, { value: string, extra?: string, isSpecial?: boolean }>) => {
  const metaFrame = figma.createFrame();
  metaFrame.resize(135, 318);
  metaFrame.fills = [{
    type: 'SOLID',
    color: lightRed
  }];
  metaFrame.strokes = [{
    type: 'SOLID',
    color: lightRed
  }];
  metaFrame.strokeWeight = 1;
  metaFrame.strokeAlign = 'INSIDE';
  metaFrame.layoutMode = 'VERTICAL';
  metaFrame.itemSpacing = 1;
  metaFrame.counterAxisAlignItems = 'MIN';
  metaFrame.cornerRadius = 6;
  metaFrame.clipsContent = true;
  
  metaFrame.x = 350;

  Object.entries(meta).forEach(([title, { value, extra }]) => {
    const valueFrame = figma.createFrame();
    valueFrame.resize(133, 22);
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

    const titleText = generateText(`Your ${title} is`, 8, hexToRgb('807A7A'), 'LEFT');
    titleText.fontName = { family: 'Inter', style: 'Regular' }
    valueFrame.appendChild(titleText);
  
    valueFrame.appendChild(generateText(value, 10, darkGrey, 'LEFT'))
    extra && valueFrame.appendChild(generateText(extra, 8, hexToRgb('686464'), 'LEFT'))
    metaFrame.appendChild(valueFrame);
  })

  figma.currentPage.appendChild(metaFrame);
  return metaFrame;
}

export const extraGenerate = async (hdValue: HDValue) => {
  await Promise.all([
    figma.loadFontAsync({ family: "Inter", style: "Regular" }),
    figma.loadFontAsync({ family: "Inter", style: "Medium" }),
    figma.loadFontAsync({ family: "Symbol", style: "Regular" })
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
    type: { value: type},
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

