import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { init, RegistryContext } from './store';
import { RBACProvider } from '@redhat-cloud-services/frontend-components-utilities/RBACHook';
import App from './App';
import { getBaseName } from '@redhat-cloud-services/frontend-components-utilities/helpers';
import logger from 'redux-logger';

const InventoryApp = () => {
    const [registry, setRegistry] = useState();
    const store = registry?.getStore();
    console.log('Yolooo.', store, registry);

    useEffect(() => {
        setRegistry(() => init(logger));
    }, []);

    return (
        <RBACProvider appName="inventory">
            <RegistryContext.Provider value={{
                getRegistry: () => registry
            }}>
                <Provider store={store}>
                    <Router basename={getBaseName(window.location.pathname)}>
                        <App />
                    </Router>
                </Provider>
            </RegistryContext.Provider>
        </RBACProvider>
    );
};

InventoryApp.propTypes = {
    useLogger: PropTypes.bool
};

InventoryApp.defaultProps = {
    useLogger: false
};

export default InventoryApp;
