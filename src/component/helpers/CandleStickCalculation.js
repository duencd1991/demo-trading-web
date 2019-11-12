export {
  candleStickCalculation,
  DOWN,
  UP,
}
 const DOWN = 'down';
 const UP = 'up';

function candleStickCalculation(h,l,o,c,h1,l1,o1,c1,h2,l2,o2,c2, sma20, sma20past4) {
  if ((h-l)>4*(o-c) && ((c-l)/(.001+h-l)>= 0.75) && ((o-l)/(.001+h-l)>= 0.75)) {
    return {candleStick : "Hanging Man", trend: DOWN};
  }
  if ((h-l)>3*(o-c) && ((c-l)/(.001+h-l)>0.6) && ((o-l)/(.001+h-l)>0.6)) {
    return {candleStick : "Hammer", trend: UP};
  }
  if ((h-l)>3*(o-c) && ((h-c)/(.001+h-l)>0.6) && ((h-o)/(.001+h-l)>0.6)) {
    return {candleStick : "Inverted Hammer", trend: DOWN};
  }
  if ((h-l)>4*(o-c) && ((h-c)/(.001+h-l)>= 0.75) && ((h-o)/(.001+h-l)>= 0.75)) {
    return {candleStick : "Shooting Star", trend: DOWN};
  }
  if ((o>c) && ((h-l)>(3*(o-c))) && (((h-o)/(.001+h-l))<.4) && (((c-l)/(.001+h-l))<.4)) {
    return {candleStick : "Black Spinning Top", trend: DOWN};
  }
  if (((c>o) && ((h-l)>(3*(c-o))) && (((h-c)/(.001+h-l))<.4) && (((o-l)/(.001+h-l))<.4)) ) {
    return {candleStick : "White Spinning Top", trend: UP};
  }
  if ((c1 == o1) && (c2>o2) && (o>c) && (l1>h2) && (l1>h)) {
    return {candleStick : "Bearish Abandoned Baby", trend: DOWN};
  }
  if (((c2>o2) && ((c2-o2)/(.001+h2-l2)>.6) && (c2<o1) && (c1>o1) && ((h1-l1)>(3*(c1-o1))) && (o>c) && (o<o1))) {
    return {candleStick : "Bearish Evening Doji Star", trend: DOWN};
  }
  if ((c1>o1) && (o>c) && (o>= c1) && (o1>= c) && ((o-c)>(c1-o1))) {
    return {candleStick : "Bearish Engulfing", trend: DOWN};
  }
  if ((c2>o2) && (o1>c1) && (o1>= c2) && (o2>= c1) && ((o1-c1)>(c2-o2)) && (o>c) && (c<c1)) {
    return {candleStick : "Three Outside Down Pattern", trend: DOWN};
  }
  if ((c1 == o1) && (o2>c2) && (c>o) && (l2>h1) && (l>h1)) {
    return {candleStick : "Bullish Ab&&oned Baby", trend: UP};
  }
  if ((o2>c2) && ((o2-c2)/(.001+h2-l2)>.6) && (c2>o1) && (o1>c1) && ((h1-l1)>(3*(c1-o1))) && (c>o) && (o>o1)) {
    return {candleStick : "Bullish Morning Doji Star", trend: UP};
  }
  if ((o1>c1) && (c>o) && (c>= o1) && (c1>= o) && ((c-o)>(o1-c1))){
    return {candleStick : "Bullish Engulfing", trend: UP};
  }
  if ((o2>c2) && (c1>o1) && (c1>= o2) && (c2>= o1) && ((c1-o1)>(o2-c2)) && (c>o) && (c>c1)) {
    return {candleStick : "Three Outside Up Pattern", trend: UP};
  }
  if ((o1>c1) && (c>o) && (c<= o1) && (c1<= o) && ((c-o)<(o1-c1))) {
    return {candleStick : "Bullish Harami", trend: UP};
  }
  if ((o2>c2) && (c1>o1) && (c1<= o2) && (c2<= o1) && ((c1-o1)<(o2-c2)) && (c>o) && (c>c1) && (o>o1)) {
    return {candleStick : "Three Inside Up Pattern", trend: UP};
  }
  if ((c1<o1) && (((o1+c1)/2)<c) && (o<c) && (o<c1) && (c<o1) && ((c-o)/(.001+(h-l))>0.6)) {
    return {candleStick : "Piercing Line", trend: UP};
  }
  if ((c1>o1) && (o>c) && (o<= c1) && (o1<= c) && ((o-c)<(c1-o1))) {
    return {candleStick : "Bearish Harami", trend: DOWN};
  }
  if ((c2>o2) && (o1>c1) && (o1<= c2) && (o2<= c1) && ((o1-c1)<(c2-o2)) && (o>c) && (c<c1) && (o<o1)) {
    return {candleStick : "Three Inside Down Pattern", trend: DOWN};
  }
  if ((c>o*1.01) && (c1>o1*1.01) && (c2>o2*1.01) && (c>c1) && (c1>c2) && (o<c1) && (o>o1) && (o1<c2) && (o1>o2) && (((h-c)/(h-l))<.2) && (((h1-c1)/(h1-l1))<.2) && (((h2-c2)/(h2-l2))<.2)) {
    return {candleStick : "Three White Soliders", trend: UP};
  }
  if ((c1>o1*1.01) && (o>c) && (o>h1) && (c>o1) && (((c1+o1)/2)>c) && (c>o1) && (sma20-sma20past4>0)) {
    return "Dark Cloud Cover";
  }
  if ((o>c*1.01) && (o1>c1*1.01) && (o2>c2*1.01) && (c<c1) && (c1<c2) && (o>c1) && (o<o1) && (o1>c2) && (o1<o2) && (((c-l)/(h-l))<.2) && (((c1-l1)/(h1-l1))<.2) && (((c2-l2)/(h2-l2))<.2)) {
    return {candleStick : "ThreeBlackCrows", trend: DOWN};
  }
  if (l>1.01*h1) {
    return {candleStick : "Big Gap Up", trend: UP};
  }
  if (h<0.99*l1) {
    return {candleStick : "Big Gap Down", trend: DOWN};
  }
  if (l>1.02*h1) {
    return {candleStick : "Huge Gap Up", trend: UP};
  }
  if (l>1.01*h1 && l1>1.01*h2) {
    return {candleStick : "Double Gap Up", trend: UP};
  }
  if (h<0.99*l1 && h1<0.99*l2) {
    return {candleStick : "Doule Gap Down", trend: DOWN};
  }

  return "";
}
