import selectExpensesTotal from '../../selectors/expenses-total';
import expenses from '../fixtures/expenses';
/* eslint-env jest */

test('should return 0 if no expenses present', () => {
  const response = selectExpensesTotal([]);
  expect(response).toBe(0);
});

test('should correctly add up a single expense', () => {
  const response = selectExpensesTotal([expenses[0]]);
  expect(response).toBe(195);
});

test('should correctly add up multiple expense', () => {
  const response = selectExpensesTotal(expenses);
  expect(response).toBe(19695);
});
