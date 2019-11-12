import Const from '../market/watchlist/summary/Const';
export { getDefaultWatchList };
function getDefaultWatchList(watchlist) {
  if (
    watchlist == Const.currentDerivative ||
    watchlist == Const.currentPutThrough ||
    !watchlist
  ) {
    return Const.defaultWatchListId;
  }
  return watchlist;
}
