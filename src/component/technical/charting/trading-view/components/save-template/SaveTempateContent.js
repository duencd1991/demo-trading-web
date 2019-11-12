import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Translate } from 'react-redux-i18n';
import { connect } from 'react-redux';
import enhanceWithClickOutside from 'react-click-outside';
import { compose } from 'redux';
import { withWidget } from '../../../context';
import {
  createTemplateRequest,
  REDUCER_NAME,
  updateTemplateRequest,
} from '../../../reducer';
import { capitalizeFirstLetter } from '../../helper';

const INPUT_MAX_LENGTH = 191;
const TEXTAREA_MAX_LENGTH = 255;

class SaveTemplateContent extends PureComponent {
  constructor(props) {
    super(props);
    const template = this.getCurrentTemplate();
    this.state = {
      name: template.name || '',
      description: template.description || '',
      nameError: '',
      isSubmitted: false,
    };
    this.nameRef = React.createRef();
  }

  componentDidMount() {
    window.addEventListener('keyup', this.onKeyUp);
    this.nameRef.current.focus();
  }

  componentWillUnmount() {
    window.removeEventListener('keyup', this.onKeyUp);
  }

  onKeyUp = e => {
    e.preventDefault();
    if (e.keyCode === 27) {
      const { changeSaveTemplateStatus } = this.props;
      changeSaveTemplateStatus(false);
      window.removeEventListener('keyup', this.onKeyUp);
    }
  };

  getCurrentTemplate = () => {
    const { templates, currentTemplateId } = this.props;

    return (
      templates.find(
        template => template.chartLayoutId === currentTemplateId,
      ) || {}
    );
  };

  handleClickOutside() {
    const { changeSaveTemplateStatus } = this.props;
    changeSaveTemplateStatus(false);
  }

  onInputChange = event => {
    const mergeState = {
      [event.target.name]: event.target.value,
    };
    if (event.target.name === 'name') {
      mergeState.nameError = '';
    }
    this.setState(mergeState);
  };

  takeScreenShot = () =>
    new Promise((resolve, reject) => {
      const { widget } = this.props;
      widget.showSaveAsChartDialog();
      widget.takeScreenshot();
      const onScreenShotReady = async data => {
        widget.showSaveAsChartDialog();
        resolve(await this.getImage(data.result));
        widget.unsubscribe('onScreenshotReady', onScreenShotReady);
      };
      widget.subscribe('onScreenshotReady', onScreenShotReady);
    });

  drawImageToCanvas = (ctx, content, dy) =>
    new Promise(resolve => {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, dy);
        resolve(true);
      };
      image.src = content;
    });

  getImage = data => {
    const width = data[0].contentWidth;
    const imageData = data.reduce(
      (result, item) => {
        return {
          height: result.height + item.contentHeight,
          items: result.items.concat({
            ...item,
            dy: result.height,
          }),
        };
      },
      { height: 0, items: [] },
    );
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = imageData.height;
    const ctx = canvas.getContext('2d');
    const promises = imageData.items.map(item =>
      this.drawImageToCanvas(ctx, item.content, item.dy),
    );
    return Promise.all(promises).then(() => canvas.toDataURL('image/jpeg'));
  };

  isUpdate = () => {
    const template = this.getCurrentTemplate();

    return Object.keys(template).length && template.isCustom;
  };

  onSubmit = async e => {
    const { name, description } = this.state;
    const {
      createTemplateRequest,
      changeSaveTemplateStatus,
      updateTemplateRequest,
      widget,
      theme,
      currentTemplateId,
    } = this.props;
    e.preventDefault();
    if (!this.validate()) {
      return;
    }
    const screenShot = await this.takeScreenShot();
    widget.save(chartState => {
      const isUpdate = this.isUpdate();
      const request = isUpdate ? updateTemplateRequest : createTemplateRequest;
      chartState.theme = capitalizeFirstLetter(theme);
      const data = {
        name,
        description,
        layout: JSON.stringify(chartState),
        thumbnails: screenShot,
      };
      if (isUpdate) {
        data.layoutId = currentTemplateId;
      }
      request(data);
      changeSaveTemplateStatus(false);
    });
  };

  validate = () => {
    const { name } = this.state;
    if (!name) {
      this.setState({
        nameError: <Translate value="charting.nameIsRequired" />,
      });

      return false;
    }

    return true;
  };

  onCancelClick = () => {
    const { changeSaveTemplateStatus } = this.props;
    changeSaveTemplateStatus(false);
  };

  render() {
    const { nameError, name, description } = this.state;
    const { theme } = this.props;

    return (
      <div className={`content ${theme}`}>
        <div className="title">
          <Translate value="charting.saveChartLayout" />
        </div>

        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <label htmlFor="name" className="col-sm-2 col-form-label">
              <Translate value="charting.name" />
            </label>
            <div className="col-sm-10">
              <input
                ref={this.nameRef}
                onChange={this.onInputChange}
                name="name"
                maxLength={INPUT_MAX_LENGTH}
                value={name}
                autoComplete="off"
                type="text"
                className={`form-control ${nameError ? 'is-invalid' : ''}`}
                id="name"
              />
              <div className="invalid-feedback">{nameError}</div>
            </div>
          </div>

          <div className="form-group row">
            <label htmlFor="description" className="col-sm-2 col-form-label">
              <Translate value="charting.description" />
            </label>
            <div className="col-sm-10">
              <textarea
                onChange={this.onInputChange}
                name="description"
                maxLength={TEXTAREA_MAX_LENGTH}
                rows={4}
                className="form-control"
                id="description"
                value={description}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="d-flex justify-content-end">
              <button
                onClick={this.onCancelClick}
                type="button"
                className="btn btn-danger btn-sm"
              >
                <Translate value="charting.cancel" />
              </button>
              <button type="submit" className="btn btn-primary btn-sm btn-save">
                <Translate value="charting.save" />
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

SaveTemplateContent.propTypes = {
  changeSaveTemplateStatus: PropTypes.func.isRequired,
  createTemplateRequest: PropTypes.func.isRequired,
  updateTemplateRequest: PropTypes.func.isRequired,
  widget: PropTypes.object.isRequired,
  theme: PropTypes.string.isRequired,
  currentTemplateId: PropTypes.number,
  templates: PropTypes.array.isRequired,
};

const mapStateToProps = state => ({
  theme: state.theme,
  currentTemplateId: state[REDUCER_NAME].currentTemplateId,
  templates: state[REDUCER_NAME].templates,
});

const mapDispatchToProps = {
  createTemplateRequest,
  updateTemplateRequest,
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  withWidget,
  enhanceWithClickOutside,
)(SaveTemplateContent);
