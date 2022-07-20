import React from 'react';
import AsyncInventory from './AsyncInventory';

const AppInfo = React.forwardRef((props, ref) => <AsyncInventory componentName="AppInfo" ref={ref} {...props} />);

export default AppInfo;
