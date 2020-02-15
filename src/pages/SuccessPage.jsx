import React from 'react';
import { Title } from '../components/Title/Title';
import BookingData from '../components/BookingData/BookingData';
import { connect } from 'react-redux';
import { selectPlaysFetching } from '../redux/plays/plays.selectors';
import { createStructuredSelector } from 'reselect';

const SuccessPage = ({ isFetching }) => {
  return (
    <div className="container">
      <Title size="md">Billett reservert</Title>
      <BookingData isLoading={isFetching} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectPlaysFetching,
});
export default connect(mapStateToProps)(SuccessPage);
