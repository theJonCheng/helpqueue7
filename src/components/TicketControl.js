import React from "react";
import TicketList from "./TicketList";
import NewTicketForm from "./NewTicketForm";
import TicketDetail from "./TicketDetail";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formShowing: false,
      mainTicketList: [],
      selected: null,
    };
  }

  handleClick = () => {
    if (this.state.selected !== null) {
      this.setState({
        selected: null,
      });
    }
    this.setState((prevState) => ({
      formShowing: !prevState.formShowing,
    }));
  };

  handleAddingNewTicket = (newTicket) => {
    const updatedMainTicketList = this.state.mainTicketList.concat(newTicket);
    this.setState({
      formShowing: false,
      mainTicketList: updatedMainTicketList,
    });
  };

  handleSelectTicket = (id) => {
    const selectedTicket = this.state.mainTicketList.filter((ticket) => ticket.id === id)[0];
    this.setState({
      selected: selectedTicket,
    });
  };

  render() {
    let currentlyDisplaying = null;
    let buttonText = null;

    if (this.state.selected !== null) {
      currentlyDisplaying = <TicketDetail ticket={this.state.selected} />;
      buttonText = "Return to Ticket List";
    } else if (this.state.formShowing) {
      currentlyDisplaying = <NewTicketForm onClickingAddNewTicket={this.handleAddingNewTicket} />;
      buttonText = "Return to Ticket List";
    } else {
      currentlyDisplaying = <TicketList ticketList={this.state.mainTicketList} onSelectingTicket={this.handleSelectTicket} />;
      buttonText = "Add New Ticket";
    }

    return (
      <React.Fragment>
        {currentlyDisplaying}
        <button onClick={this.handleClick}>{buttonText}</button>
      </React.Fragment>
    );
  }
}

export default TicketControl;
