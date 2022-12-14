import React from "react";
import Ticket from "./Ticket";
import PropTypes from "prop-types";

function TicketList(props) {
  return (
    <React.Fragment>
      <h2>Ticket List</h2>
      <hr />
      {props.ticketList.map((ticket) => (
        <Ticket
          onClickingTicket={props.onSelectingTicket}
          names={ticket.names}
          location={ticket.location}
          issue={ticket.issue}
          id={ticket.id}
          key={ticket.id}
        />
      ))}
    </React.Fragment>
  );
}

TicketList.propTypes = {
  ticketList: PropTypes.array,
  onSelectingTicket: PropTypes.func,
};

export default TicketList;
