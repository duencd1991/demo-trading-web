import Const from './../common/Const';
import { formatData } from './../helpers/Api';

const MAX_LOOP = 100;
const TIME_OUT = 1000;

class Request {
  /**
   * @param serviceFunc
   * @param dispatchFunc
   * @param successFunc
   * @param failFunc
   * @param packageId
   * @param loop
   */
  fetchApi(
    serviceFunc,
    dispatchFunc,
    successFunc = () => {},
    failFunc = () => {},
    packageId = null,
    loop = 0,
  ) {
    loop++;
    const params = packageId
      ? { PackageId: packageId, id: loop }
      : { id: loop };

    serviceFunc(params).then(res => {
      const data = formatData(res);
      dispatchFunc(data);

      if (loop < MAX_LOOP) {
        switch (res.status) {
          case Const.RESPONSE_STATUS.APART:
            this.fetchApi(
              serviceFunc,
              dispatchFunc,
              successFunc,
              failFunc,
              res.packageId,
              loop,
            );
            break;
          case Const.RESPONSE_STATUS.QUEUED:
            setTimeout(() => {
              this.fetchApi(
                serviceFunc,
                dispatchFunc,
                successFunc,
                failFunc,
                res.packageId,
                loop,
              );
            }, TIME_OUT);
            break;
          case Const.RESPONSE_STATUS.SUCCESS:
            successFunc();
            break;
          case Const.RESPONSE_STATUS.FAILED:
            failFunc();
            break;
          default:
            break;
        }
      }
    });
  }
}

export default new Request();
