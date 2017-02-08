import React from 'react';

const AboutCopy = () => (
  <div className="about-crash-mapper">
    <p>
      NYC CRASH MAPPER is the third iteration of an initiative started by
      <a href="http://transalt.org" rel="noopener noreferrer" target="_blank">
        {' Transportation Alternatives '}
      </a> in 2006 and continued by John Kraus in 2009. We thank them for
      trailblazing this tool and letting us follow in their steps.
    </p>
    <p>
      CUSTOMIZED FILTERING: This version allows a user to create a customized filter
      of any area and track it over time. This is particularly helpful to see the impact
      of Vison Zero improvements on a corridor, a slow zone, a school zone, etc. This
      is in addition to other more traditional filters like Borough, Community boards,
      NYPD precincts and more. Any active filters may easily be shared with others using
      the URL.
    </p>
    <p>
      ENHANCED DATA: NYC CRASH MAPPER provides historical crash data as reported since
      1995 (DMV / DOT data). It augments the current NYC Open Data by geocoding crashes
      that are not currently captured.
      <a href="https://carto.com" rel="noopener noreferrer" target="_blank">{' CARTO '}</a>
      has made hosting the data and the creation of this tool possible through
      their non-profit grant program.
    </p>
    <p>
      <a href="http://chekpeds.com" rel="noopener noreferrer" target="_blank">{' CHECKPEDS '}</a>
      is a 501(c)(3) non-profit organization that was founded in 2005 and advocates
      for Pedestrian Safety, primarily focusing on the west side of Manhattan.
      We feel that what we have learned is applicable to other areas of New York City.
      Data has played a critical role in the coalition's success in highlighting the
      concentration of fatalities and injuries to the authorities. Our work has resulted
      in the DOT installing traffic calming features in the area, including bike lanes,
      protected pedestrian crossings and traffic calming measures. We hope this tool
      will empower many other groups to use open data to gain an increased level of
      traffic safety in their streets.
    </p>
  </div>
);

export default AboutCopy;
