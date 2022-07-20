import React from 'react';
import AsyncInventory from './AsyncInventory';

const InventoryDetail = React.forwardRef((props, ref) => <AsyncInventory componentName="InventoryDetail" ref={ref} {...props} />);

export default InventoryDetail;
