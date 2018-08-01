import React from 'react';
import PropTypes from 'prop-types';
import ReportUserLabelWrapper from './style';

export default function ReportUserLabel(props) {
  return (
    <ReportUserLabelWrapper>
      {props.label}
    </ReportUserLabelWrapper>
  );
}

ReportUserLabel.propTypes = {
  label: PropTypes.string,
};
