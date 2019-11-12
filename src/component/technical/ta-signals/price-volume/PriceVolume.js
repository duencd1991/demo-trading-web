import React from 'react'
import { connect } from 'react-redux';
import PriceVolumeTable from './PriceVolumeTable'
import DropDownNameOfFeature from "./DropDownNameOfFeature";
import Footer from "../../../common/table/Footer";
import './PriceVolume.scss';
import { REDUCER_NAME, intervalFetchPriceVolume } from './reducer';

class PriceVolume extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    const { featureType, intervalFetchPriceVolume } = this.props;
    intervalFetchPriceVolume(featureType)
  }

  render() {
    return (
      <div className="price-volume h-100">
        <DropDownNameOfFeature/>
        <div className="tab-content">
          <div className="tab-pane active" role="tabpanel">
            <PriceVolumeTable/>
          </div>
          <Footer/>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  i18n: state.i18n,
  featureType: state[REDUCER_NAME].featureType
});
const mapDispatchToProps = {intervalFetchPriceVolume}
export default connect(mapStateToProps, mapDispatchToProps)(PriceVolume);
