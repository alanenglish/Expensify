import React from 'react';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates'; // requries moment

class ExpenseForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: props.expense ? props.expense.description : '',
      note: props.expense ? props.expense.note : '',
      amount: props.expense ? (props.expense.amount /100).toString() : '',
      createdAt: props.expense ? moment(props.expense.createdAt) :moment(),
      calendarFocused: false,
      error: ''
    };
  }

  onDescriptionChange = (e) => {
    const description = e.target.value;
    this.setState(() => ({ description }));
  }

  // alternative way above function can be written
  // onDescriptionChange = (e) => {
  //   this.setState({ [e.target.name]: e.target.value });
  // }

  onNoteChange = (e) => {
    const note = e.target.value;
    this.setState(() => ({ note }));
  }

  onAmountChange = (e) => {
    const amount = e.target.value;

    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState(() => ({ amount }));
    }
  };

  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState(() => ({ createdAt }));
    }
  };

  onFocusChange = ({ focused }) => {
    this.setState(() => ({ calendarFocused: focused }));
  };

  onSubmit = (e) => {
    e.preventDefault();

    if (!this.state.description || !this.state.amount) {
      // set error state equal to 'Please provide description and amount'
      this.setState(() => ({ error: 'Please provide a description and amount.' }));
    } else {
      // clear the error
      this.setState(() => ({ error: '' }));
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount, 10) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note
      });
    }
  }

  render() {
    return (
      <form className="form" onSubmit={this.onSubmit}>
        {this.state.error && <p className="form__error">{this.state.error}</p>}
        <input
          type="text"
          placeholder="Description"
          autoFocus
          className="text-input"
          // name="description" not necessary with current onChange handler
          value={this.state.description}
          onChange={this.onDescriptionChange}
        />
        <input
          type="text"
          placeholder="Amount"
          className="text-input"
          value={this.state.amount}
          onChange={this.onAmountChange}
        />
        <SingleDatePicker
          date={this.state.createdAt}
          onDateChange={this.onDateChange}
          focused={this.state.calendarFocused}
          onFocusChange={this.onFocusChange}
          numberOfMonths={1}
          isOutsideRange={() => false} // allows past dates to be selected
        />
        <textarea
          placeholder="Add a note for your expense (optional)."
          value={this.state.note}
          className="textarea"
          onChange={this.onNoteChange}
        />
        <div>
          <button className="button">{this.props.expense ? 'Update Expense' : 'Add Expense'}</button>
        </div>
      </form>
    );
  }
}

export default ExpenseForm;
