import { ExportToCsv } from 'export-to-csv';
import html2canvas from 'html2canvas';
import { THEMES } from '../../configs/LayoutConfig';

export { exportCsv, exportToPdf };

function exportCsv(dataFormat, listColumn, listHideColumn, infoCsv) {
  const data = dataFormat.map(item => {
    return Object.keys(listColumn).reduce((result, column) => {
      let value = listColumn[column];
      if (listHideColumn) {
        if (listHideColumn.includes(value)) {
          return result;
        }
      }

      return {
        ...result,
        [column]: item[value],
      };
    }, {});
  });

  const csvExporter = new ExportToCsv(infoCsv);
  csvExporter.generateCsv(data);
}

let bgColorElement = '#1f2329';
let lbgColorElement = '#fff';
let bgCanvas = '#191d25';
let lbgCanvas = '#fff';
const widthCanvas = 1200;
const heightCanvas = 1578;
const margins = {
  top: 80,
  bottom: 16,
  left: 20,
  leftChild: 32,
};

function exportToPdf(
  domId,
  exportName,
  theme,
  exportConfigs,
  callback,
  ratio = 2,
) {
  let formExport = document.getElementById(domId);

  let bgColor = theme === THEMES.DARK ? bgColorElement : lbgColorElement;
  bgCanvas = theme === THEMES.DARK ? bgCanvas : lbgCanvas;

  formExport = formExport
    ? formExport
    : document.querySelectorAll(domId)
    ? document.querySelectorAll(domId)[0]
    : formExport;
  if (formExport) {
    const rectBound = formExport.getBoundingClientRect();
    let left = rectBound.left;
    let top = rectBound.top;
    let width = rectBound.width;
    let height = rectBound.height;
    let widthCut = width < widthCanvas ? widthCanvas : width;
    let heightCut = height < heightCanvas ? heightCanvas : height;

    widthCut = exportConfigs ? widthCut * 1.2 : width;
    heightCut = exportConfigs ? heightCut * 1.2 : height;

    let configCanvas = {
      allowTaint: true,
      removeContainer: true,
      scale: ratio,
      width: widthCut,
      height: heightCut,
      windowWidth: widthCut,
      windowHeight: heightCut,
      backgroundColor: bgColor,
    };
    if (exportConfigs) {
      configCanvas.x = 0;
      configCanvas.y = 0;
    }
    html2canvas(formExport, configCanvas).then(canvas => {
      if (exportConfigs) {
        const canvasListConfigs = document.createElement('canvas');
        canvasListConfigs.width = widthCut * ratio;
        canvasListConfigs.height = heightCut * ratio;

        const canvasExport = document.createElement('canvas');
        const contextExport = canvasExport.getContext('2d');

        const parentRef = exportConfigs.page || document.body;
        canvasExport.width = (parentRef.width || parentRef.clientWidth) * ratio;
        canvasExport.height =
          (parentRef.height || parentRef.clientHeight) * ratio;

        contextExport.fillStyle = bgCanvas;
        contextExport.fillRect(0, 0, canvasExport.width, canvasExport.height);
        joinImage(
          exportConfigs.listConfigs,
          canvas,
          canvasListConfigs,
          formExport,
          ratio,
        );
        const deferreds = joinImageWithPromise(
          exportConfigs.listPromise,
          formExport,
          contextExport,
          bgColor,
          ratio,
        );

        Promise.all(deferreds).then(values => {
          contextExport.drawImage(
            canvasListConfigs,
            exportConfigs.listConfigs.left
              ? exportConfigs.listConfigs.left * ratio
              : 0,
            exportConfigs.listConfigs.top
              ? exportConfigs.listConfigs.top * ratio
              : 0,
          );
          drawLineOrRect(exportConfigs, contextExport, ratio);
          if (callback) {
            callback(canvasExport.toDataURL('image/PNG'));
          } else {
            dowLoadLinkImage(canvasExport, exportName);
          }
        });
      } else {
        if (callback) {
          callback(canvas.toDataURL('image/PNG'));
        } else {
          canvas.width = canvas.width * ratio;
          canvas.height = canvas.height * ratio;

          dowLoadLinkImage(canvas, exportName);
        }
      }
    });
  }
}

function joinImageWithPromise(listPromise, formExport, ctx2, bgColor, ratio) {
  let deferreds = [];
  if (listPromise) {
    listPromise.data.forEach((element, key) => {
      const form = getElementByParentId(formExport, element);
      if (form) {
        let promiseCanvass = takeAImage(
          ctx2,
          form,
          element.config,
          1,
          bgColor,
          ratio,
        );
        deferreds.push(promiseCanvass);
      }
    });
  }
  return deferreds;
}
function joinImage(listConfigs, canvas, canvasListConfigs, formExport, ratio) {
  if (listConfigs) {
    listConfigs.data.forEach((element, key) => {
      const form = getElementByParentId(formExport, element);
      if (element.isMultiChild) {
        let heightLeft = element.config.y;
        let leftMixChart = element.config.x;
        form.forEach((elementChild, key) => {
          if (key % element.numberChildInRow === 0) {
            if (key > 0) {
              heightLeft += margins.bottom + element.config.height;
            }
            leftMixChart = element.config.x;
          } else {
            leftMixChart +=
              element.config.width + element.config.paddingBetweenChild;
          }
          cropPlusExport(
            canvas,
            canvasListConfigs,
            elementChild,
            {
              x: leftMixChart,
              y: heightLeft,
              width: element.config.width,
              height: element.config.height,
            },
            ratio,
          );
        });
      } else {
        cropPlusExport(canvas, canvasListConfigs, form, element.config, ratio);
      }
    });
  }
}
function drawLineOrRect(exportConfigs, contextExport, ratio) {
  if (exportConfigs.listLines) {
    exportConfigs.listLines.forEach((item, key) => {
      contextExport.strokeStyle = item.strokeColor;
      contextExport.beginPath();
      contextExport.moveTo(item.x1 * ratio, item.y1 * ratio);
      contextExport.lineTo(item.x2 * ratio, item.y2 * ratio);
      contextExport.stroke();
    });
  }
  if (exportConfigs.listRoundRect) {
    exportConfigs.listRoundRect.forEach((item, key) => {
      // To change the color on the rectangle, just manipulate the context
      contextExport.strokeStyle = item.strokeColor;
      roundRect(
        contextExport,
        item.x * ratio,
        item.y * ratio,
        item.width * ratio,
        item.height * ratio,
        10,
        item.isFill,
        item.isStroke,
      );
    });
  }
}

function getElementByParentId(formExport, config) {
  let idOrName = config.isId ? config.idName : config.className;
  let element = formExport.querySelectorAll(idOrName);
  let elementDocument = document.querySelectorAll(idOrName);
  element = element.length > 0 ? element : elementDocument;
  return config.isMultiChild ? element : element[0];
}

function dowLoadLinkImage(canvas, exportName) {
  var url = canvas.toDataURL('image/PNG');
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = exportName;
  downloadLink.click();
}

function cropCanvas(
  canvas,
  canvasPutImage,
  left,
  top,
  width,
  height,
  dirtyX,
  dirtyY,
  dirtyWidth,
  dirtyHeight,
  ratio,
) {
  const ctx = canvasPutImage.getContext('2d');
  const context = canvas.getContext('2d');
  // generate a second canvas
  const renderer = document.createElement('canvas');
  renderer.width = width * ratio;
  renderer.height = height * ratio;
  left = left * ratio;
  top = top * ratio;
  try {
    const imageData = context.getImageData(
      left,
      top,
      width * ratio,
      height * ratio,
    );
    // render our ImageData on this canvas
    renderer.getContext('2d').putImageData(imageData, 0, 0);
    // Now we can scale our image, by drawing our second canvas
    ctx.drawImage(
      renderer,
      dirtyX * ratio,
      dirtyY * ratio,
      dirtyWidth * ratio,
      dirtyHeight * ratio,
    );
  } catch (e) {
    console.log(e, 'e');
  }
}
function cropPlusExport(canvas, canvasListConfigs, form, config, ratio) {
  if (form) {
    const rectBound = form.getBoundingClientRect();
    const style = form.currentStyle || window.getComputedStyle(form);
    const borderLeftRightWidth =
      parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth) ||
      0;
    const borderTopBottomWidth =
      parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth) ||
      0;
    const leftRect = Math.round(rectBound.left);
    const topRect = Math.round(rectBound.top);
    const width = rectBound.width + borderLeftRightWidth;
    const height = rectBound.height + borderTopBottomWidth;

    const dirtyX = config ? config.x : leftRect;
    const dirtyY = config ? config.y : topRect;
    const dirtyWidth = config ? config.width : width;
    const dirtyHeight = config ? config.height : height;
    cropCanvas(
      canvas,
      canvasListConfigs,
      leftRect,
      topRect,
      width,
      height,
      dirtyX,
      dirtyY,
      dirtyWidth,
      dirtyHeight,
      ratio,
    );
  }
}

function takeAImage(contextExport, element, config, scalePage, bgColor, ratio) {
  const promiseCanvas = new Promise((resolve, reject) => {
    html2canvas(element, {
      allowTaint: true,
      removeContainer: true,
      backgroundColor: bgColor,
    }).then(canvas => {
      try {
        const rectBound = element.getBoundingClientRect();
        const x = config ? config.x : rectBound.left;
        const y = config ? config.y : rectBound.top;
        const dirtyWidth = config ? config.width : rectBound.width;
        const dirtyHeight = config ? config.height : rectBound.height;
        contextExport.drawImage(
          canvas,
          x * ratio,
          y * ratio,
          dirtyWidth * scalePage * ratio,
          dirtyHeight * scalePage * ratio,
        );
      } catch (e) {
        console.log(e, 'e');
        console.log(canvas.toDataURL('image/PNG'), 'anvas.toDataUR');
      }

      resolve('ok');
    });
  });
  return promiseCanvas;
}
/**
 * Draws a rounded rectangle using the current state of the canvas.
 * If you omit the last three params, it will draw a rectangle
 * outline with a 5 pixel border radius
 * @param {CanvasRenderingContext2D} ctx
 * @param {Number} x The top left x coordinate
 * @param {Number} y The top left y coordinate
 * @param {Number} width The width of the rectangle
 * @param {Number} height The height of the rectangle
 * @param {Number} [radius = 5] The corner radius; It can also be an object
 *                 to specify different radii for corners
 * @param {Number} [radius.tl = 0] Top left
 * @param {Number} [radius.tr = 0] Top right
 * @param {Number} [radius.br = 0] Bottom right
 * @param {Number} [radius.bl = 0] Bottom left
 * @param {Boolean} [fill = false] Whether to fill the rectangle.
 * @param {Boolean} [stroke = true] Whether to stroke the rectangle.
 */
function roundRect(ctx, x, y, width, height, radius, fill, stroke) {
  if (typeof stroke == 'undefined') {
    stroke = true;
  }
  if (typeof radius === 'undefined') {
    radius = 5;
  }
  if (typeof radius === 'number') {
    radius = { tl: radius, tr: radius, br: radius, bl: radius };
  } else {
    const defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
    defaultRadius.forEach(side => {
      radius[side] = radius[side] || defaultRadius[side];
    });
  }
  ctx.beginPath();
  ctx.moveTo(x + radius.tl, y);
  ctx.lineTo(x + width - radius.tr, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
  ctx.lineTo(x + width, y + height - radius.br);
  ctx.quadraticCurveTo(
    x + width,
    y + height,
    x + width - radius.br,
    y + height,
  );
  ctx.lineTo(x + radius.bl, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
  ctx.lineTo(x, y + radius.tl);
  ctx.quadraticCurveTo(x, y, x + radius.tl, y);
  ctx.closePath();
  if (fill) {
    ctx.fill();
  }
  if (stroke) {
    ctx.stroke();
  }
}
