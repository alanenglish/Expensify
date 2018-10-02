import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';
/* eslint-env jest */

test('should set the default state', () => {
  const state = expensesReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should remove expense by id', () => {
  const action = { type: 'REMOVE_EXPENSE', id: expenses[1].id };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should not remove expense if id is not found', () => {
  const action = { type: 'REMOVE_EXPENSE', id: '-1' };
  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should addExpense', () => {
  const expense = {
    id: '4',
    description: 'Peoples Gas',
    note: '',
    amount: 8900,
    createdAt: 0
  };

  const action = {
    type: 'ADD_EXPENSE',
    expense
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([...expenses, expense]);
});

test('should editExpense', () => {
  const edits = {
    description: 'Misc',
    note: 'Walgreens Purchase',
    amount: 1500
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: expenses[0].id,
    updates: {
      ...edits
    }
  };

  const state = expensesReducer(expenses, action);
  expect(state[0]).toEqual({
    id: '1',
    description: 'Misc',
    note: 'Walgreens Purchase',
    amount: 1500,
    createdAt: 0
  });
});

test('should not editExpense if expense not found', () => {
  const edits = {
    description: 'Misc',
    note: 'Walgreens Purchase',
    amount: 1500
  };

  const action = {
    type: 'EDIT_EXPENSE',
    id: '-1',
    updates: {
      ...edits
    }
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual(expenses);
});

test('should setExpenses', () => {
  const action = {
    type: 'SET_EXPENSES',
    expenses: [expenses[1]]
  };

  const state = expensesReducer(expenses, action);
  expect(state).toEqual([expenses[1]]);
});
