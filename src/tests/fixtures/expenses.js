import moment from 'moment';
/* eslint-env jest */

export default [{
  id: '1',
  description: 'Gum',
  note: '',
  amount: 195,
  createdAt: 0
}, {
  id: '2',
  description: 'Phone Bill',
  note: '',
  amount: 11500,
  createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
  id: '3',
  description: 'ComEd',
  note: '',
  amount: 8000,
  createdAt: moment(0).add(4, 'days').valueOf()
}];
