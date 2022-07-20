import React from 'react';
import AsyncInventory from './AsyncInventory';

// eslint-disable-next-line react/display-name
const InventoryTable = React.forwardRef((props, ref) => <AsyncInventory componentName="InventoryTable" ref={ref} {...props} />);

export default InventoryTable;
