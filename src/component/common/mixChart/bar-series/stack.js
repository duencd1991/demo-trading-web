import { slice } from "d3-shape/src/array";
import constant from "d3-shape/src/constant";

function stackValue(d, key) {
  return d[key];
}

export default function () {
    var keys = constant([]),
        value = stackValue,
        order = function (series) {
            var n = series.length, o = new Array(n);
            while (--n >= 0) o[n] = n;
            return o;
        },
      
        offset = function (series, orderArr) {
            if (!((n = series.length) > 1)) return;
            var arrPositive = new Array(series[orderArr[0]].length),
            arrNeg = new Array(series[orderArr[0]].length);
            for (var i = 1, j, s0, s1 = series[orderArr[0]], n, m = s1.length; i < n; ++i) {
                s0 = s1;
                s1 = series[orderArr[i]];
                for (var j = 0; j < m; ++j) {
                    var dataPrev = isNaN(s0[j][1]) ? (isNaN(s0[j][0]) ? s0[j][0] : 0) : s0[j][1];
                    if (isNaN(arrPositive[j])) {
        
                        if (dataPrev > 0) {
                            arrPositive[j] = dataPrev;
                        } else {
                            arrPositive[j] = 0;
                        }
                    }
                    if (isNaN(arrNeg[j])) {
        
                        if (dataPrev < 0) {
                            arrNeg[j] = dataPrev;
                        } else {
                            arrNeg[j] = 0;
                        }
                    }
                    if (!isNaN(s1[j][1])) {
        
                        if (s1[j][1] > 0) {
                            s1[j][0] = arrPositive[j]
                            s1[j][1] += s1[j][0];
                            arrPositive[j] = s1[j][1];
                        }
                        else if (s1[j][1] < 0) {
        
                            s1[j][0] = arrNeg[j];
                            s1[j][1] += s1[j][0];
                            arrNeg[j] = s1[j][1];
                        } else {
                            s1[j][0] = 0
                            s1[j][1] += s1[j][0];
                        }
                    } else {
                        s1[j][1] = s1[j][0] = arrPositive[j];
                    }
                }
            }
        }
    function stack(data) {
        var kz = keys.apply(this, arguments),
            i,
            m = data.length,
            n = kz.length,
            sz = new Array(n),
            oz;

        for (i = 0; i < n; ++i) {
            for (var ki = kz[i], si = sz[i] = new Array(m), j = 0, sij; j < m; ++j) {
                si[j] = sij = [0, +value(data[j], ki, j, data)];
                sij.data = data[j];
            }

            si.key = ki;
        }

        for (i = 0, oz = order(sz); i < n; ++i) {
            sz[oz[i]].index = i;
        }

        offset(sz, oz);
        return sz;
    }
    
  
    stack.keys = function (_) {
        return arguments.length ? (keys = typeof _ === "function" ? _ : constant(slice.call(_)), stack) : keys;
    };

    stack.value = function (_) {
        return arguments.length ? (value = typeof _ === "function" ? _ : constant(+_), stack) : value;
    };

    stack.order = function (_) {
        return arguments.length ? (order = _ == null ? order : typeof _ === "function" ? _ : constant(slice.call(_)), stack) : order;
    };

    stack.offset = function (_) {
        return arguments.length ? (offset = _ == null ? offset : _, stack) : offset;
    };
    return stack;
    
}
