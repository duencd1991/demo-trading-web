import React from 'react';
import './index.scss';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { setTrustCondition, REDUCER_NAME } from '../../reducer';

class FilterTrustability extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listTrustability: [
        { value: 'Low', color: 'bg-l-color-3', isChecked: true },
        { value: 'Medium', color: 'bg-s-color-4', isChecked: true },
        { value: 'High', color: 'bg-s-color-3', isChecked: true },
      ],
    };
  }

  onClickCheckBox = value => {
    const { listTrustability } = this.state;

    const { setTrustCondition } = this.props;
    const newListTab = listTrustability.map(item => {
      if (value === item.value)
        return {
          ...item,
          isChecked: !item.isChecked,
        };
      return {
        ...item,
      };
    });
    const arrCondition = newListTab.map(item => {
      if (item.isChecked) {
        return item.value;
      }
    });

    this.setState({ listTrustability: newListTab }, () => {
      setTrustCondition(arrCondition);
    });
  };

  render() {
    const { listTrustability } = this.state;
    return (
      <div className="d-flex na-trust-filter-wrapper" style={{ minWidth: 300 }}>
        <div style={{ fontSize: 12 }}>Trustability:</div>
        {listTrustability.map((item, index) => (
          <div
            key={`checkbox-${index}`}
            className="checkbox"
            style={{ position: 'relative' }}
          >
            <input
              checked={item.checked}
              onChange={() => {}}
              id={`checkbox-${index}`}
              type="checkbox"
              style={{ cursor: 'pointer' }}
              checked={item.isChecked}
              onClick={() => {
                this.onClickCheckBox(item.value);
              }}
            />
            <label
              className="d-flex"
              htmlFor={`checkbox-${index}`}
              style={{ cursor: 'pointer' }}
            >
              <div
                style={{ color: '#1f2329', width: 50 }}
                className={`label-text ${item.color}`}
              >
                {item.value}
              </div>
            </label>
          </div>
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  rumorsData: state[REDUCER_NAME].rumorsData,
});

const mapDispatchToProps = dispatch => {
  return {
    setTrustCondition: arrCondition =>
      dispatch(setTrustCondition(arrCondition)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FilterTrustability);
