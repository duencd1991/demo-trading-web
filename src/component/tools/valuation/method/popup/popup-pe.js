import React from 'react';
import { formatTextFloat } from './../../../../helpers/Text';
import './popup.scss';
import { Translate } from 'react-redux-i18n';
import ScrollComponent from './../../../../common/ScrollComponent';

const fake = [
  {
    ticker: 'HSG',
    totalSet: 2.23,
    rev: 56.5,
    netProfit: 1.8,
    marketCap: 12.13,
    pe: 9.87,
  },
  {
    ticker: 'POM',
    totalSet: 3.219,
    rev: 25.9,
    netProfit: 1.57,
    marketCap: 11.35,
    pe: -4.41,
  },
  {
    ticker: 'SSM',
    totalSet: 10.674,
    rev: 164.2,
    netProfit: 0.74,
    marketCap: 11.15,
    pe: 7.67,
  },
  {
    ticker: 'VIS',
    totalSet: 1.075,
    rev: 26.5,
    netProfit: 2.32,
    marketCap: 10.98,
    pe: 12.71,
  },
  {
    ticker: 'AAA',
    totalSet: 5.075,
    rev: 28.5,
    netProfit: 2.32,
    marketCap: 15.98,
    pe: 18.71,
  },
  {
    ticker: 'AAM',
    totalSet: 1.075,
    rev: 2.5,
    netProfit: 33.32,
    marketCap: 5.98,
    pe: 22.75,
  },
  {
    ticker: 'ACB',
    totalSet: 1.075,
    rev: 8.5,
    netProfit: 15.32,
    marketCap: 18.98,
    pe: 34.12,
  },
];

class PopupPE extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      average: null,
      isSelectAll: false,
      listDataCheckbox: [],
    };
  }

  formatValueAverage = value => {
    return formatTextFloat(value).slice(0, 5);
  };

  calculatePE = (totalPe, totalCheckBox) => {
    return totalPe / totalCheckBox;
  };

  isAllCheckboxHasSelected = listDataCheckbox => {
    let isCheckedAll = true;
    listDataCheckbox.map(item => {
      if (item.isCheck === false) {
        isCheckedAll = false;
      }
    });
    return isCheckedAll;
  };

  handleUncheckAllTextbox = listDataCheckbox => {
    listDataCheckbox.forEach(item => {
      item.isCheck = false;
    });
    this.setState({
      isSelectAll: false,
      average: null,
      listDataCheckbox,
    });
  };

  selectAllCheckBox = () => {
    let listDataCheckbox = this.state.listDataCheckbox;
    const totalCheckBox = listDataCheckbox.length;
    let totalPe = 0;

    if (!this.state.isSelectAll) {
      if (this.isAllCheckboxHasSelected(listDataCheckbox)) {
        this.handleUncheckAllTextbox(listDataCheckbox);
      } else {
        listDataCheckbox.forEach(item => {
          item.isCheck = true;
          totalPe += item.pe;
        });

        this.setState({
          isSelectAll: !this.state.isSelectAll,
          listDataCheckbox,
          average: this.formatValueAverage(
            this.calculatePE(totalPe, totalCheckBox),
          ),
        });
      }
    } else {
      this.handleUncheckAllTextbox(listDataCheckbox);
    }
  };

  selectCheckBox = itemCheckbox => () => {
    let arrayCheckedValueCheckbox = this.state.listDataCheckbox;
    arrayCheckedValueCheckbox.forEach(item => {
      if (item.ticker === itemCheckbox.ticker) {
        item.isCheck = !item.isCheck;
      }
    });

    let totalPe = 0;
    let totalCheckBox = 0;
    arrayCheckedValueCheckbox.forEach(item => {
      if (item.isCheck) {
        totalCheckBox += 1;
        totalPe += item.pe;
      }
    });

    this.setState({
      average: this.formatValueAverage(
        this.calculatePE(totalPe, totalCheckBox),
      ),
      listDataCheckbox: arrayCheckedValueCheckbox,
      isSelectAll: false,
    });
  };

  componentDidMount() {
    let listDataCheckbox = [];
    fake.forEach(item => {
      item.isCheck = false;
      listDataCheckbox.push(item);
    });
    this.setState({ listDataCheckbox });
  }

  handleClickDone = () => {
    const { finishCaculate } = this.props;
    const { average } = this.state;

    finishCaculate(average);
  };

  renderCellTable = (width, text, isI18n = false, isBody = false) => {
    if (isBody) {
      return (
        <div className="column-align-right" style={{ width }}>
          {isI18n ? <Translate value={text} /> : text}
        </div>
      );
    } else {
      return (
        <div className="children-div-body" style={{ width }}>
          {isI18n ? <Translate value={text} /> : text}
        </div>
      );
    }
  };

  renderCellCheckbox = (item, checkAll = false) => {
    return (
      <div
        className="checkbox wrap-checkbox-first-column-body"
        style={{ width: '20%' }}
      >
        <input
          id={checkAll ? 'check' : item.ticker}
          type="checkbox"
          checked={checkAll ? this.state.isSelectAll : item.isCheck}
          onChange={
            checkAll ? this.selectAllCheckBox : this.selectCheckBox(item)
          }
        />
        <label htmlFor={checkAll ? 'check' : item.ticker}>
          <span className="text-white">
            {checkAll ? (
              <Translate value="valuation.popupPE.selectAll" />
            ) : (
              item.ticker
            )}
          </span>
        </label>
      </div>
    );
  };

  renderBodyTable = () => {
    const { listDataCheckbox } = this.state;

    return listDataCheckbox.map(item => {
      return (
        <div className="body-popup-valuation" key={item.ticker}>
          {this.renderCellCheckbox(item)}
          {this.renderCellTable('20%', item.totalSet)}
          {this.renderCellTable('15%', item.rev)}
          {this.renderCellTable('15%', item.netProfit)}
          {this.renderCellTable('20%', item.marketCap)}
          {this.renderCellTable('10%', item.pe)}
        </div>
      );
    });
  };

  renderHeaderTable = () => {
    return (
      <div className="popup-header-valuation-tool">
        {this.renderCellCheckbox(null, true)}
        {this.renderCellTable(
          '20%',
          'valuation.popupPE.totalAsset',
          true,
          true,
        )}
        {this.renderCellTable('15%', 'valuation.popupPE.rev', true, true)}
        {this.renderCellTable('15%', 'valuation.popupPE.netProfit', true, true)}
        {this.renderCellTable('20%', 'valuation.popupPE.marketCap', true, true)}
        {this.renderCellTable('10%', 'valuation.popupPE.pe', true, true)}
      </div>
    );
  };

  renderFooterTable = () => {
    const { average } = this.state;

    return (
      <div className="footer-average-pe">
        <a style={{ float: 'left', marginLeft: 10 }}>
          <Translate value="valuation.popupPE.averagePE" />
        </a>
        <a style={{ float: 'right', marginRight: 10 }}>{average}</a>
      </div>
    );
  };

  render() {
    return (
      <div>
        <div
          className={`popup-valuation-tool`}
          style={{
            display: 'block',
            marginTop: -15,
            marginLeft: 20,
          }}
        >
          <div className="popup-title-valuation-tool" style={{ clear: 'both' }}>
            <a style={{ float: 'left', marginTop: 5 }}>
              <Translate value="valuation.popupPE.title" />
            </a>
            <button
              className="popup-button-valuation-tool"
              style={{ float: 'right', marginTop: 5, marginRight: 5 }}
              onClick={this.handleClickDone}
            >
              <Translate value="valuation.popupPE.button" />
            </button>
          </div>
          {this.renderHeaderTable()}

          <ScrollComponent appendStyle={{ maxHeight: 80 }}>
            {this.renderBodyTable()}
          </ScrollComponent>

          {this.renderFooterTable()}
        </div>
      </div>
    );
  }
}

export default PopupPE;
