import memoize from 'fast-memoize';
import moment from 'moment';

export const formatRecommendation = (data, locale) => {
  moment.locale(locale);
  return data.map(item => {
    const total = item.recommendations.reduce((t, re) => t + re.numOfReport, 0);
    const fields = item.recommendations.reduce(
      (result, re) => ({
        ...result,
        [re.recommendationTypeCode]: (re.numOfReport / total) * 100,
      }),
      {},
    );

    const reportDate = moment(item.reportDate);
    if (reportDate.month() === 0) {
      return {
        date: reportDate.format("MMM'YY"),
        ...fields,
      };
    }

    return {
      date: reportDate.format('MMM'),
      ...fields,
    };
  });
};

export const computedRecommendation = memoize(formatRecommendation);
