const heightBase = 10

const heights = {
  height0: `${heightBase * 1}px`,
  height1: `${heightBase * 1.25}px`,
  height2: `${heightBase * 1.5}px`,
  height3: `${heightBase * 1.75}px`,
  height4: `${heightBase * 2}px`,
  height5: `${heightBase * 2.5}px`,
  height6: `${heightBase * 3}px`,
  height7: `${heightBase * 3.5}px`,
  height8: `${heightBase * 4}px`,
  height100: '100%',
  heightAuto: 'auto',
  heightFull: '100vh',
}

const widthBase = 4

const widths = {
  width0: `${widthBase * 1}px`,
  width1: `${widthBase * 2}px`,
  width2: `${widthBase * 3}px`,
  width3: `${widthBase * 4}px`,
  width4: `${widthBase * 5}px`,
  width5: `${widthBase * 6}px`,
  width6: `${widthBase * 7}px`,
  width7: `${widthBase * 8}px`,
  width8: `${widthBase * 9}px`,
  width100: '100%',
  widthAuto: 'auto',
  widthFull: '100vw',
}

const spacingBase = 4

const spacing = {
  spacing0: `${spacingBase * 1}px`,
  spacing1: `${spacingBase * 1.5}px`,
  spacing2: `${spacingBase * 2}px`,
  spacing3: `${spacingBase * 2.5}px`,
  spacing4: `${spacingBase * 3}px`,
  spacing5: `${spacingBase * 3.5}px`,
  spacing6: `${spacingBase * 4}px`,
  spacing7: `${spacingBase * 5}px`,
  spacing8: `${spacingBase * 6}px`,
  spacing9: `${spacingBase * 7}px`,
  spacing10: `${spacingBase * 8}px`,
}

const fontBase = 8

const fonts = {
  font0: `${fontBase * 1}px`,
  font1: `${fontBase * 1.5}px`,
  font2: `${fontBase * 2}px`,
  font3: `${fontBase * 2.5}px`,
  font4: `${fontBase * 3}px`,
  font5: `${fontBase * 3.5}px`,
  font6: `${fontBase * 4}px`,
  font7: `${fontBase * 4.5}px`,
  font8: `${fontBase * 5}px`,
  mainFont: "'Montserrat', sans-serif",
  secondaryFont: "'Crimson Text', serif",
  codeFont: "'Cousine', monospace",
  baseWeight: '400',
  heavyWeight: '600',
  heavyCode: '700'
}

const colors = {
  primary: '#fb8c00',
  accent: '#ff7043',
  success: '#00c853',
  warn: '#ffd600',
  error: '#ff1744',
  white: '#ffffff',
  black: '#000000',
  fontColor: '#666',
  codeBg: '#CCC'
}


export const theme = {
  ...heights,
  ...widths,
  ...spacing,
  ...fonts,
  ...colors
}
