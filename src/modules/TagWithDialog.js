import React from 'react';
import AsyncInventory from './AsyncInventory';

const TagWithDialog = React.forwardRef((props, ref) => <AsyncInventory componentName="TagWithDialog" ref={ref} {...props} />);

export default TagWithDialog;
