import React from 'react';
import AsyncInventory from './AsyncInventory';

// eslint-disable-next-line react/display-name
const DetailWrapper = React.forwardRef((props, ref) => <AsyncInventory componentName="DetailWrapper" ref={ref} {...props} />);

export default DetailWrapper;
