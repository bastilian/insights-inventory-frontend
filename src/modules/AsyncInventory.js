import React, { Suspense, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import LoadingFallback from '../components/SpinnerFallback';

import * as store from '../store/redux';
import * as utils from '../Utilities/index';
import * as api from '../api/index';

const components =
{
    InventoryTable: React.lazy(() => (
        import('../components/InventoryTable/InventoryTable')
    )),
    DetailWrapper: React.lazy(() => (
        import('../components/InventoryDetail/DetailWrapper')
    )),
    AppInfo: React.lazy(() => (
        import('../components/InventoryDetail/AppInfo')
    )),
    InventoryDetailHead: React.lazy(() => (
        import('../components/InventoryDetail/InventoryDetail')
    )),
    InventoryDetail: React.lazy(() => (
        import('../components/InventoryDetail/FullDetail')
    )),
    TagWithDialog: React.lazy(() => (
        import('../Utilities/TagWithDialog')
    ))
};

const AsyncInventory = forwardRef(({ componentName, onLoad, ...props }, ref) => { // eslint-disable-line react/display-name
    const Component = components[componentName];

    useEffect(() => {
        onLoad && console.log('Onload run', componentName, onLoad, Component);
        onLoad?.({
            ...store,
            ...utils,
            api
        });
    }, []);

    return (
        <Suspense fallback={<LoadingFallback />}>
            <Component ref={ref} {...props}  />
        </Suspense>
    );
});

AsyncInventory.propTypes = {
    onLoad: PropTypes.func,
    componentName: PropTypes.string
};

export default AsyncInventory;
