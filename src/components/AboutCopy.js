import React from 'react';

const AboutCopy = () => (
  <div className="about-crash-mapper">
    <p>
      NYC CRASH MAPPER is the third iteration of an initiative started by
      <a href="http://transalt.org" rel="noopener noreferrer" target="_blank">
        {' Transportation Alternatives '}
      </a> in 2006 and continued by
      <a href="http://blog.johnkrauss.com/" rel="noopener noreferrer" target="_blank">
        {' John Kraus '}
      </a>
      in 2009. We thank them for
      trailblazing this tool and letting us follow in their steps.
    </p>
    <p>
      CUSTOMIZED FILTERING: This version allows a user to create a customized filter
      of any area and track it over time. This is particularly helpful to see the impact
      of Vison Zero improvements on a corridor, a slow zone, a school zone, etc. This
      is in addition to other more traditional filters like Borough, Community boards,
      NYPD precincts and more. Any active filters may easily be shared with others using
      this website's URL.
    </p>
    <p>
      ENHANCED DATA: NYC Crash Mapper uses vehicle collision data for New York City
      from August, 2011 - present. The data was aggregated and normalized from the
      following sources:
    </p>
    <ul>
      <li>
        NYC Open Data Portal
        <a
          href="https://data.cityofnewyork.us/Public-Safety/NYPD-Motor-Vehicle-Collisions/h9gi-nx95"
          rel="noopener noreferrer" target="_blank"
        >
          {' NYPD Motor Vehicle Collisions'}
        </a>
      </li>
      <li>John Krauss's
        <a
          href="https://github.com/talos/nypd-crash-data-bandaid"
          rel="noopener noreferrer" target="_blank"
        >
          {' NYPD Crash Data Bandaid'}
        </a>
      </li>
    </ul>
    <p>
      <a href="https://carto.com" rel="noopener noreferrer" target="_blank">{'CARTO '}</a>
      has made hosting the data and the creation of this tool possible through
      their non-profit grant program.
    </p>
    <p>
      At the time of launch, the combined data contained 1,075,468 rows, of which 157,554
      were not geocoded due to the source data lacking values for latitude and longitude
      or adequate address attributes. The majority of non-geocoded rows come from the NYC Open
      Data Portal. Prior to hosting the data, rows lacking lat and lon with
      potentially valid address information were attempted to be geocoded using the
      <a
        href="https://developer.cityofnewyork.us/api/geoclient-api"
        rel="noopener noreferrer" target="_blank"
      >
        {' NYC GeoClient API'}
      </a>
      . For example, if a row lacked values for lat and lon, but contained values for
      cross streets and borough or zip code, the NYC GeoClient
      <a
        href="https://api.cityofnewyork.us/geoclient/v1/doc#section-1.2.5"
        rel="noopener noreferrer" target="_blank"
      >
        {' intersection endpoint '}
      </a> was used to obtain valid lat and lon coordinates.
    </p>
    <p>
      <strong>Note that we include non-geocoded data in order to advocate for the
      NYPD getting its act together to improve the quality of NYC's vehicle collision data.
      This means: geocoding all crash locations (not just 80% of them), providing
      values for contributing factors, and providing values for vehicle type for
      all crashes.</strong>
    </p>
    <p>
      What the non-geocoded data means for the app is that the stats (total crashes,
      fatalities, and injuries) displayed in the bottom left may differ from what
      is shown on the map when Filter By Boundary is set to "Citywide." In this
      case stats display counts for all collision data, whether geocoded or not,
      while the map only displays data that has valid lat lon coordinates and
      thus can be geographically mapped. When a Filter By Boundary other than
      "Citywide" is used, such as a "Community Board", the stats will only
      display counts for crashes that have been geocoded and are located within
      a selected boundary.
    </p>
    <p>
      Because the portion of the data which comes from the NYPD Crash Data Bandaid
      is summarized by month, each row for the dataset contains a value for `crash_count`.
      The only rows that have a value higher than 1 for this field are for rows that correspond
      to the NYPD Crash Data Bandaid, which are from July, 2011 to June, 2012. Unfortunately
      this limits the app to filtering data by month and year, rather than day and time.
    </p>
    <p>
      Collision data is updated from the NYC Open Data Portal when new data becomes available.
    </p>
    <p>
      <a href="http://chekpeds.com" rel="noopener noreferrer" target="_blank">
        {' CHECKPEDS '}
      </a>
      is a 501(c)(3) non-profit organization founded in 2005 that advocates for
      Pedestrian Safety, primarily focusing on the west side of Manhattan. Data
      has played a critical role in the coalition's success in highlighting the
      concentration of fatalities and injuries to the authorities. This resulted
      in the DOT installing traffic calming features in the area, including bike
      lanes, protected pedestrian crossings and traffic calming measures. It is
      CHEKPEDS’ hope that this easy-to-use tool will empower many other activists
      and individuals in New York City to gain an understanding of how dangerous
      their streets are and obtain the installation of safety features.
    </p>
    <p>
      You may
      <a href="mailto:excom@chekpeds.com?subject=NYC%20Crash%20Mapper">
        {' email CHEKPEDS '}
      </a>
      regarding any questions or concerns about NYC Crash Mapper.
    </p>
  </div>
);

export default AboutCopy;
