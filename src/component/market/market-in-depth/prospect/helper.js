import moment from 'moment';

export const getColor = (value) => {
  if (value > 0) {
    return '#009d5b';
  }

  if (value < 0) {
    return '#cc3b37';
  }

  return '#ffbf65';
};

export const getTimeRange = (endDate, data) => {
  return `(${moment(data.tradingDate).format('l')} - ${endDate})`;
};
