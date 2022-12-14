import React from "react";
import TicketList from "./TicketList";
import NewTicketForm from "./NewTicketForm";
import TicketDetail from "./TicketDetail";
import EditTicketForm from "./EditTicketForm";

class TicketControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      formShowing: false,
      mainTicketList: [],
      selected: null,
      editing: false,
    };
  }

  handleClick = () => {
    if (this.state.selected !== null) {
      this.setState({
        selected: null,
        editing: false,
      });
    } else {
      this.setState((prevState) => ({
        formShowing: !prevState.formShowing,
      }));
    }
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

  handleEditClick = () => {
    this.setState({
      editing: true,
    });
  };

  handleEditingTicket = (editedTicket) => {
    const updatedMainTicketList = this.state.mainTicketList.filter((ticket) => this.state.selected.id !== ticket.id).concat(editedTicket);
    this.setState({
      formShowing: false,
      mainTicketList: updatedMainTicketList,
      selected: null,
      editing: false,
    });
  };

  handleDeletingTicket = () => {
    const updatedMainTicketList = this.state.mainTicketList.filter((ticket) => this.state.selected.id !== ticket.id);
    this.setState({
      formShowing: false,
      mainTicketList: updatedMainTicketList,
      selected: null,
      editing: false,
    });
  };

  render() {
    let currentlyDisplaying = null;
    let buttonText = null;

    if (this.state.editing) {
      currentlyDisplaying = <EditTicketForm ticket={this.state.selected} onUpdatingTicket={this.handleEditingTicket} />;
      buttonText = "Return to Ticket List";
    } else if (this.state.selected !== null) {
      currentlyDisplaying = (
        <TicketDetail ticket={this.state.selected} onClickingEdit={this.handleEditClick} onDeletingTicket={this.handleDeletingTicket} />
      );
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
