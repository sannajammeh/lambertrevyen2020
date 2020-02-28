import React from 'react';
import PropTypes from 'prop-types';
import { Title } from '../components/Title/Title';
import Ticket from '../components/Ticket/Ticket';
import spinner from '../components/Spinner/Spinner';
//Redux
import { connect } from 'react-redux';
import { selectPlaysFetching, selectPlays } from '../redux/plays/plays.selectors';
import { createStructuredSelector } from 'reselect';

const RenderTickets = ({ data }) => (
  <>
    <Title className="text-center">Billetter</Title>
    <div className="grid mx-auto ml-1">
      {data.map(props => (
        <Ticket key={props.id} {...props} />
      ))}
    </div>
  </>
);

const TicketsWithSpinner = spinner(RenderTickets);

const ShowTicket = ({ isFetching, plays }) => {
  const playsArray = React.useMemo(() => {
    const today = new Date().getTime();
    return Object.values(plays).filter(play => {
      const playDate = new Date(play.date.seconds * 1000).getTime() + 7200000;
      return playDate > today;
    });
  }, [plays]);

  return (
    <div className="container ShowTicket">
      <TicketsWithSpinner isLoading={isFetching} msg="Henter forestillinger" data={playsArray} />
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  isFetching: selectPlaysFetching,
  plays: selectPlays,
});

export default connect(mapStateToProps)(ShowTicket);

ShowTicket.propTypes = {
  isFetching: PropTypes.bool,
  plays: PropTypes.object.isRequired,
};
