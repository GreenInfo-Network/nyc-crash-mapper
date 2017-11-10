import React, { PropTypes, Component } from 'react';
import momentPropTypes from 'react-moment-proptypes';
import moment from 'moment';

import { momentize } from '../../constants/api';
import MonthYearSelector from './MonthYearSelector';

class FilterByDate extends Component {
  constructor(props) {
    super(props);
    const maxDate = props.maxDate;
    let startDate = props.startDate;
    let endDate = props.endDate;

    // for some reason the component mounts twice, (perhaps to do with react-collapse library?)
    // check has to be done here...
    // make sure that end date isn't ahead of the most recent date in the data
    if (moment(maxDate).isValid() && endDate.isAfter(maxDate)) {
      endDate = maxDate;
      startDate = maxDate;
    }

    this.state = {
      startDate,
      endDate,
    };

    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleEndDateChange = this.handleEndDateChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { startDate, endDate, maxDate } = nextProps;

    // make sure that end date isn't ahead of the most recent date in the data
    if (maxDate && !this.props.maxDate && endDate.isAfter(maxDate)) {
      this.setState({
        startDate: moment(maxDate),
        endDate: moment(maxDate),
      });
    }

    // otherwise stash the start and end dates in component state
    if (!startDate.isSame(this.props.startDate) || !endDate.isSame(this.props.endDate)) {
      this.setState({
        startDate,
        endDate,
      });
    }
  }

  compareMaxEndDates(endDate, maxDate) {
    if (endDate.isAfter(maxDate)) {
      this.setState({
        startDate: moment(maxDate),
        endDate: moment(maxDate),
      });
    }
  }

  handleStartDateChange(year, month) {
    // validates the new start date before updating the redux store & selecting new data
    const { endDate, crashesDateRange: { minDate } } = this.props;

    // don't allow a user to select a month before the begining of the dataset
    if (year === minDate.year() && month < minDate.month() + 1) {
      month = minDate.month() + 1;
    }

    const mm = month < 10 ? `0${month}` : month;
    const startMoment = momentize(`${year}-${mm}`);

    if (startMoment.isSameOrBefore(endDate)) {
      this.props.startDateChange(startMoment);
    } else {
      // if the user attempts to select a startDate greater than the current endDate
      // set the new startDate to the current endDate
      this.props.startDateChange(endDate);
    }
  }

  handleEndDateChange(year, month) {
    // validates the new end date before updating the redux store & selecting new data
    const { startDate, crashesDateRange: { maxDate } } = this.props;

    // don't allow a user to select a month after the end of the dataset
    if (year === maxDate.year() && month > maxDate.month() + 1) {
      month = maxDate.month() + 1;
    }

    const mm = month < 10 ? `0${month}` : month;
    const endMoment = momentize(`${year}-${mm}`);

    if (endMoment.isSameOrAfter(startDate)) {
      this.props.endDateChange(endMoment);
    } else {
      // if the user attempts to select an endDate earlier than the current startDate
      // set the new endDate to the current startDate
      this.props.endDateChange(startDate);
    }
  }

  render() {
    const { crashesDateRange, years } = this.props;
    const { startDate, endDate } = this.state;

    // months in moment.js are zero based
    const startMonth = startDate.month() + 1;
    const startYear = startDate.year();
    const endMonth = endDate.month() + 1;
    const endYear = endDate.year();

    return (
      <div className="filter-by-date">
        <ul className="filter-list">
          <li>
            <MonthYearSelector
              handleChange={this.handleStartDateChange}
              years={years}
              curMonth={startMonth}
              curYear={startYear}
              prefix="Start"
              crashesDateRange={crashesDateRange}
            />
          </li>
          <li>
            <MonthYearSelector
              handleChange={this.handleEndDateChange}
              years={years}
              curMonth={endMonth}
              curYear={endYear}
              prefix="End"
              crashesDateRange={crashesDateRange}
            />
          </li>
        </ul>
      </div>
    );
  }
}

// react-datepicker requires dates to be moment objects
FilterByDate.propTypes = {
  crashesDateRange: PropTypes.shape({
    minDate: momentPropTypes.momentObj,
    maxDate: momentPropTypes.momentObj,
  }).isRequired,
  maxDate: momentPropTypes.momentObj,
  startDateChange: PropTypes.func.isRequired,
  endDateChange: PropTypes.func.isRequired,
  startDate: momentPropTypes.momentObj.isRequired,
  endDate: momentPropTypes.momentObj.isRequired,
  years: PropTypes.arrayOf(PropTypes.number).isRequired,
};

FilterByDate.defaultProps = {
  maxDate: null,
};

export default FilterByDate;
