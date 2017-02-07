import sls from 'single-line-string';

const aboutAppCopy = [
  sls`
    CRASH MAPPER is the third iteration of an initiative started by Transportation
    Alternatives in 2006 and continued by John Kraus in 2009. We thank them for
    trailblazing this tool and letting us follow in their steps
  `,
  sls`
    CUSTOMIZED FILTERING: This version allows a user to create a customized filter
    of any area and track it over time. This is particularly helpful to see the impact
    of Vison Zero improvements on a corridor, a slow zone, a school zone, etc. This
    is in addition to other more traditional filters like Borough, Community boards,
    NYPD precincts and more. Any active filters may easily be shared with others using
    the URL.
  `,
  sls`
    ENHANCED DATA: CRASH MAPPER provides historical crash data as reported since
    1995 (DMV / DOT data). It augments the current NYC Open Data by geocoding crashes
    that are not currently captured. See "About the Data" for more info.
  `,
  sls`
    CHEKPEDS is a 501(c)(3) non-profit organization that was founded in 2005 and advocates
    for Pedestrian Safety, primarily focusing on the west side of Manhattan.
    We feel that what we have learned is applicable other areas of New York city.
    Data has played a critical role in the coalition's success in highlighting the
    concentration of fatalities and injuries to the authorities. Our work has resulted
    in the DOT installing traffic calming features in the area, including bike lanes,
    protected pedestrian crossings and traffic calming measures. We hope this tool
    will empower many other groups to use open data to gain an increased level of
    traffic safety in their streets.
  `
];

export const aboutDataCopy = [
  sls`
    DATA: ...
  `
];

export default aboutAppCopy;
