import uuid from 'uuid';
import database from '../firebase/firebase';

// Component calls action generator
// Action generator returns object
// Component dispatches object
// Redux store changes

// ASYNCH
// Component calls action generator
// action generator returns function
// Component dispatches function (redux doesnt allow - need middleware)
// Function runs (has the abilility to dispatch other actions and do whatever it wants)

// ADD_EXPENSE
export const addExpense = (expense) => ({
  type: 'ADD_EXPENSE',
  expense: expense
});

// START ADD EXPENSE FUNCTION THAT DISPATCHES ACTION
export const startAddExpense = (expenseData = {}) => {
  // only works due to redux-thunk -> gives us access to dispatch
  return (dispatch) => {
    // create 4 consts and define default value if not passed in
    const {
      description = '',
      note = '',
      amount = 0,
      createdAt = 0
    } = expenseData;
    // use ES6 shorthand to create expense object with either default data or passed in data
    const expense = { description, note, amount, createdAt };

    // firebase returns the reference of the item created
    return database.ref('expenses').push(expense).then((ref) => {
      dispatch(addExpense({
        id: ref.key,
        ...expense
      }));
    });
  };
};

// REMOVE_EXPENSE
export const removeExpense = ({ id } = {}) => ({ // object desctructing, all we need is ID - set up default {}
  type: 'REMOVE_EXPENSE',
  id // ES6 shorthand => id: id
});

// START REMOVE EXPENSE ASYNCH ACTION THAT DISPATCHES ACTION
export const startRemoveExpense = ({ id } = {}) => {
  // return a function, pass dispatch from redux library
  return (dispatch) => {
    return database.ref(`expenses/${id}`).remove().then(() => {
      dispatch(removeExpense({ id }));
    });
  };
};

// EDIT_EXPENSE
export const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates
});

// SET_EXPENSES
export const setExpenses = (expenses) => ({
  type: 'SET_EXPENSES',
  expenses
});

// START SET EXPENSE FUNCITON THAT DISPATCHES ACTION
export const startSetExpenses = () => {
  return (dispatch) => {
    return database.ref('expenses').once('value').then((snapshot) => {
      // data from firebase does not come back in array, must parse data and push into array
      const expenses = [];

      snapshot.forEach((childSnapshot) => {
        expenses.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      dispatch(setExpenses(expenses));
    });
  };
};
