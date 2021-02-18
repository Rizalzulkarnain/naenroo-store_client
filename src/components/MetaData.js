import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';

const MetaData = ({ title }) => {
  return (
    <Helmet>
      <title>{`${title} - Naenroo-Store`}</title>
    </Helmet>
  );
};

MetaData.propTypes = {
  title: PropTypes.string.isRequired,
};

export default MetaData;
