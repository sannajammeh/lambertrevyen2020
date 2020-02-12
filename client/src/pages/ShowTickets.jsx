import React from 'react';
import { Title } from '../components/Title/Title';
import Ticket from '../components/Ticket/Ticket';
// Context
import { PlaysContext } from '../context/plays';
import spinner from '../components/Spinner/Spinner';

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

const ShowTicket = () => {
  const { state } = React.useContext(PlaysContext);
  const { isFetching, plays } = state;
  const playsArray = Object.values(plays);

  return (
    <div className="container ShowTicket">
      <TicketsWithSpinner isLoading={isFetching} msg="Henter forestillinger" data={playsArray} />
    </div>
  );
};

ShowTicket.propTypes = {};

export default ShowTicket;
