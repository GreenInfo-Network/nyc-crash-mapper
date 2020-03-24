import React from 'react';

const HelpCopy = () => (
  <div className="help-panel">
    <table>
      <tbody>
        <tr>
          <td>
            <iframe
              title="Help-Navigation"
              src="https://player.vimeo.com/video/254240475"
              width="480"
              height="270"
              frameBorder="0"
              allowFullScreen
            />
          </td>
          <td>
            <h6>Crashmapper Navigation</h6>
            <p>
              Analyze crash data like a pro. With a few clicks, master the information contained in
              the NYC Open Data Collision dataset, collected by NYPD. Choose a data view, filter by
              dates, geographies and crash type and get maps, charts and information summaries.
              Share with others.
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <iframe
              title="Help-CustomMap"
              src="https://player.vimeo.com/video/255986407"
              width="480"
              height="270"
              frameBorder="0"
              allowFullScreen
            />
          </td>
          <td>
            <h6>Crashmapper Custom Map</h6>
            <p>
              How is my area of focus (corridor, school zone, business improvement district) faring
              in terms of traffic safety?
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <iframe
              title="Help-Trend"
              src="https://player.vimeo.com/video/255986627"
              width="480"
              height="270"
              frameBorder="0"
              allowFullScreen
            />
          </td>
          <td>
            <h6>Crashmapper Trend</h6>
            <p>
              How does my neighborhood compare to others and to the borough in terms of traffic
              safety?
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <iframe
              title="Help-Compare"
              src="https://player.vimeo.com/video/255986283"
              width="480"
              height="270"
              frameBorder="0"
              allowFullScreen
            />
          </td>
          <td>
            <h6>Crashmapper Compare</h6>
            <p>
              How has traffic safety changed in my neighborhood since a past period? Are the traffic
              calming measures working?
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <iframe
              title="Help-Rank"
              src="https://player.vimeo.com/video/255986528"
              width="480"
              height="270"
              frameBorder="0"
              allowFullScreen
            />
          </td>
          <td>
            <h6>Crashmapper Rank</h6>
            <p>
              How is this dangerous intersection ranked in the district, borough or city overall?
              Are we concentrating our efforts on the most dangerous intersections?
            </p>
          </td>
        </tr>
        <tr>
          <td style={{ 'vertical-align': 'middle', 'text-align': 'center' }}>
            Video coming soon
          </td>
          <td>
            <h6>Crashmapper Vehicle Filter</h6>
            <p>
              When selecting a vehicle type, the numbers returned will be those relating to any
              crash where the vehicle is involved. Please note these technical limitations:
            </p>
            <ul>
              <li>
                NYPD officers use free form entries to report the vehicle involved in a crash.
                CHEKPEDS maps these entries to eight categories.
              </li>
              <li>
                NYPD captures up to five (5) vehicles included in a crash. As long as one of these
                vehicles matches the filter selected, the related injuries and fatalities will be
                counted – even if the vehicle is potentially not directly responsible for the
                fatalities/injuries.
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export default HelpCopy;
