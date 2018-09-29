import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, addExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';
/* eslint-env jest */

const createMockStore = configureMockStore([thunk]);

test('should setup remove expense action object', () => {
  const action = removeExpense({ id: '123ABC' });
  expect(action).toEqual({
    type: 'REMOVE_EXPENSE',
    id: '123ABC'
  });
});

test('should setup editExpense action object', () => {
  const action = editExpense('123ABC', { note: 'this is a test' });
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: '123ABC',
    updates: {
      note: 'this is a test'
    }
  });
});

test('should setup addExpense action object with provided values', () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
});

// done keyword lets Jest know we are waiting for a Promise
test('should addExpense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Keyboard',
    amount: 12000,
    note: 'This is a mock item',
    createdAt: 1000
  };

  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseData
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should addExpense with defaults to database and store', (done) => {
  const store = createMockStore({});
  const expenseDefaults = {
    description: '',
    amount: 0,
    note: '',
    createdAt: 0
  };

  store.dispatch(startAddExpense({})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
        id: expect.any(String),
        ...expenseDefaults
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefaults);
    done();
  });
});

// OLD TEST WHEN ADDEXPENSE SET A UUID - FIREBASE NOW SETS ID
// test('should setup addExpense action object with provided values', () => {
//   const expenseData = {
//     description: 'Rent',
//     amount: 109500,
//     createdAt: 1000,
//     note: 'September Rent'
//   };
//
//   const action = addExpense(expenseData);
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       ...expenseData,
//       id: expect.any(String)
//     }
//   });
// });

// OLD TEST WHEN ADDEXPENSE WOULD SET DEFAULT VALUES
// test('should setup addExpense action object with default values', () => {
//   const action = addExpense();
//   expect(action).toEqual({
//     type: 'ADD_EXPENSE',
//     expense: {
//       id: expect.any(String),
//       description: '',
//       note: '',
//       amount: 0,
//       createdAt: 0
//     }
//   });
// });
