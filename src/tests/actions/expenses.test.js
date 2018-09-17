import { addExpense, editExpense, removeExpense } from '../../actions/expenses';
/* eslint-env jest */

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
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'September Rent'
  };

  const action = addExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  });
});

test('should setup addExpense action object with default values', () => {
  const action = addExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      id: expect.any(String),
      description: '',
      note: '',
      amount: 0,
      createdAt: 0
    }
  });
});
