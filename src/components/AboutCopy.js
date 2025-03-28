import React from 'react';

const AboutCopy = () => (
  <div className="about-crash-mapper">
    <h6>TAKE ACTION</h6>
    <ul>
      <li>
        <p>
          Start a{' '}
          <a href="https://campaigns.transalt.org/new">
            <strong>PETITION</strong>
          </a>{' '}
          to raise the profile of your traffic problems
        </p>
      </li>
      <li>
        <p>
          Start a{' '}
          <a href="https://www.transalt.org/organize">
            <strong>CAMPAIGN</strong>
          </a>{' '}
          to obtain the installation of traffic safety features in your area
        </p>
      </li>
      <li>
        <p>
          Get traffic safety{' '}
          <a href="http://visionheroinc.org">
            <strong>EDUCATION</strong>
          </a>{' '}
          for your school
        </p>
      </li>
      <li>
        <p>
          <a href="https://www.transalt.org/familiesforsafestreets">
            <strong>JOIN</strong>
          </a>{' '}
          families of other victims to seek traffic justice
        </p>
      </li>
      <li>
        <p>
          Report a crash to the{' '}
          <a href="mailto:tips@streetsblog.org">
            <strong>PRESS</strong>
          </a>.
        </p>
      </li>
    </ul>
    <h6>GET MORE INFORMATION</h6>
    <ul>
      <li>
        <p>
          <a href="http://www.nycvzv.info">
            <strong>TRAFFIC CALMING</strong>
          </a>{' '}
          features installed in your neighborhood
        </p>
      </li>
      <li>
        <p>
          Vision Zero (zero traffic deaths) Pedestrian Safety Action{' '}
          <a href="http://www.nyc.gov/html/dot/html/pedestrians/ped-safety-action-plan.shtml">
            <strong>PLANS</strong>
          </a>
        </p>
      </li>
      <li>
        <p>
          Vision Zero{' '}
          <a href="http://www1.nyc.gov/site/visionzero/initiatives/initiatives.page">
            <strong>REPORT CARDS</strong>
          </a>
        </p>
      </li>
      <li>
        <p>
          <a href="http://www.nyc.gov/html/dot/html/contact/contact-form.shtml">
            <strong>CONTACT</strong>
          </a>{' '}
          the Department of Transportation
        </p>
      </li>
      <li>
        <p>
          Get{' '}
          <a href="mailto:excom@chekpeds.com?subject=NYC%20Crash%20Mapper">
            <strong>ANSWERS</strong>
          </a>{' '}
          to any question on NYC Crash Mapper
        </p>
      </li>
    </ul>
    <h6>ABOUT CRASH MAPPER</h6>
    <p>
      <strong>MAPPING WITH CUSTOMIZED FILTERING</strong>: The map allows a user to create a
      customized filter of any area and track it over time. This is particularly helpful to see the
      impact of Vision Zero improvements on a corridor, a slow zone, a school zone, etc. This is in
      addition to other more traditional filters like Borough, Community Boards, NYPD Precincts and
      more. Any active filters may easily be shared with others using the website's URL.
    </p>
    <p>
      <strong>ANALYZING:</strong> TREND allows you to compare two selected areas’ performance
      against each other and to a citywide or borough-wide reference, while filtering by date range
      or type of crash. COMPARE lets you compare two time periods for a given area. RANK shows
      where one area or intersection ranks in terms of safety in the context of all similar areas
      over the most recent two-year period.
    </p>
    <p>
      <strong>ENHANCED DATA</strong>: Collision data is updated from the NYC Open Data Portal daily
      or as soon as new data becomes available, with a sweep back one month to catch recently
      updated data. NYC Crash Mapper uses vehicle collision data for New York City from August 2011
       to the present. The data was aggregated and normalized from the NYC Open Data Portal{' '}
      <a href="https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95">
        <strong>NYPD Motor Vehicle Collisions</strong>
      </a>{' '}
      and{' '}
      <a href="https://github.com/talos/nypd-crash-data-bandaid">
        <strong>John Krauss's NYPD Crash Data Bandaid</strong>
      </a>.
    </p>
    <p>
      As a result of some of the source data not being geocoded, the statistics (total crashes,
       fatalities, and injuries) displayed in the bottom of the map view may differ from what
      is shown on the map when Filter By Boundary is set to "Citywide." When a Filter By
      Boundary other than "Citywide" is used, such as a "Community Board", the stats will
      only display counts for crashes that have been geocoded and are located within a
      selected boundary.
    </p>
    <p>
      In the NYPD motor vehicles collisions dataset, some injuries and fatalities do not have a
      role/vehicle ascribed to them. “Other” includes crashes in the source data that are not
      labeled by category (pedestrian, cyclists or motorists). In our experience they include
      mostly crashes where the victims are e-bike users.
    </p>
    <p>
      NYPD captures up to five (5) vehicles included in a crash. As long as any one of these
      vehicles matches the filter selected, the related injuries and fatalities will be counted
      – even if the vehicle is potentially not directly responsible for the fatalities/injuries.
    </p>
    <p>
      <strong>NYC CRASH MAPPER</strong> was made possible by{' '}
      <a href="https://carto.com/">
        <strong>CARTO</strong>
      </a>{' '}
      for hosting the data and making the creation of this tool possible through their Grants For
      Good program; by The Lily Auchincloss and PEPSI foundations, the Manhattan Borough President
      and the New York City Council. The{' '}
      <a href="https://lilynyc.org/">
        <strong>LILY AUCHINCLOSS FOUNDATION</strong>
      </a>{' '}
      generous grant helped to write the vehicular analysis modules.
    </p>
    <p>
      This application is the result of four iterations of a mapping initiative started by
      Transportation Alternatives in 2006 and continued by John Kraus.The current version of the
      application with charts was built in 2017 by Chris Henrick and {' '}
      <a href="https://greeninfo.org">
        <strong>GreenInfo Network</strong>
      </a>.
    </p>
    <p>
      <a href="http://chekpeds.com/">
        <strong>CHECKPEDS</strong>{' '}
      </a>is a 501(c)(3) non-profit organization founded in 2005 that advocates for pedestrian
      safety, primarily focusing on the west side of Manhattan. Data has played a critical role in
      the coalition's success in highlighting the concentration of fatalities and injuries to the
      authorities. This resulted in the DOT installing traffic calming features in the area,
      including bike lanes, protected pedestrian crossings and traffic calming measures. It is
      CHEKPEDS’ hope that this easy-to-use tool will empower many other activists and individuals in
      New York City to gain an understanding of how dangerous their streets are and obtain the
      installation of safety features.
    </p>
    <p>
      You may{' '}
      <a href="mailto:excom@chekpeds.com?subject=NYC%20Crash%20Mapper">
        <strong>email CHEKPEDS</strong>
      </a>{' '}
      regarding any questions or concerns about NYC Crash Mapper.
    </p>
  </div>
);

export default AboutCopy;
