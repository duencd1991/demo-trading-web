import moment from 'moment';

export {
  getCurrentDateTime,
  getRecentYear,
  formatDateTime,
  formatDate,
  formatTime,
  formatDateBrief,
  formatYear,
  formatMonth,
  formatMonthAndYear,
};

function getCurrentDateTime() {
  return moment().format('YYYY-MM-DD HH:mm:ss');
}

function formatDateTime(str) {
  return moment(str)
    .format('hh:mm MM/DD/YYYY')
    .toString();
}

function formatDate(str) {
  return moment(str)
    .format('MM/DD/YYYY')
    .toString();
}

function formatTime(str) {
  return moment(str)
    .format('hh:mm:ss')
    .toString();
}

function formatMonth(str) {
  return moment(str)
    .format('mm')
    .toString();
}

function formatYear(str) {
  return moment(str)
    .format('YYYY')
    .toString();
}

function formatMonthAndYear(str) {
  return moment(str)
    .format('MM/YYYY')
    .toString();
}

//Feb 21, 2019
function formatDateBrief() {
  return moment()
    .locale('en')
    .format('ll');
}

function getRecentYear(x) {
  return moment()
    .subtract(x, 'years')
    .locale('en')
    .format('ll');
}
