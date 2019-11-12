import React from 'react';
import PropTypes from 'prop-types';
import { Responsive } from './../responsive';
import Image from './Image';

class GridImage extends React.Component {
  render() {
    const { listId, component, getImageFromRedux, fetchImage } = this.props;

    return (
      <Responsive component={component} margin={10} offsetWidth={40}>
        {listId.map(item => {
          return () => (
            <Image
              code={item}
              fetchImage={fetchImage}
              getImageFromRedux={getImageFromRedux}
            />
          );
        })}
      </Responsive>
    );
  }
}

GridImage.propTypes = {
  listId: PropTypes.array.isRequired,
  component: PropTypes.object.isRequired,
  getImageFromRedux: PropTypes.func.isRequired,
  fetchImage: PropTypes.func.isRequired,
};

export default GridImage;
