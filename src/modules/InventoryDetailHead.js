import React from 'react';
import AsyncInventory from './AsyncInventory';

const InventoryDetailHead = React.forwardRef((props, ref) => <AsyncInventory componentName="InventoryDetailHead" ref={ref} {...props} />);

export default InventoryDetailHead;
