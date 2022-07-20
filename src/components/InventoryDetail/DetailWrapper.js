import React from 'react';
import {
    Drawer,
    DrawerPanelContent,
    DrawerContent,
    DrawerContentBody,
    DrawerPanelBody,
    DrawerActions,
    DrawerHead,
    DrawerCloseButton,
    Stack,
    StackItem
} from '@patternfly/react-core';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleDrawer } from '../../store/actions';
import { BasicInfo, SystemIssues } from '../InventoryDetailDrawer';
import FactsInfo from './FactsInfo';

const DetailWrapper = ({ children, hideInvLink, showTags, Wrapper, className, appName, ...props }) => {
    const dispatch = useDispatch();
    const isExpanded = useSelector(({ entityDetails: { isToggleOpened } = {} }) => isToggleOpened);
    const entity = useSelector(({ entityDetails: { entity } = {} }) => entity);
    const loaded = useSelector(({ entityDetails: { loaded } = {} }) => loaded);
    console.log('WRAAA', Wrapper);
    return <Drawer
        className={`ins-c-inventory__drawer ${className || ''}`}
        isExpanded={isExpanded}
        onExpand={() => dispatch(toggleDrawer(true))}
        {...props}
    >
        <DrawerContent
            panelContent={
                <DrawerPanelContent>
                    <DrawerHead>
                        <BasicInfo hideInvLink={ hideInvLink } showTags={ showTags } />
                        <DrawerActions>
                            <DrawerCloseButton onClick={() =>  dispatch(toggleDrawer(false))} />
                        </DrawerActions>
                    </DrawerHead>
                    <DrawerPanelBody>
                        <Stack className="ins-c-inventory__drawer--content">
                            <StackItem>
                                <SystemIssues isOpened={isExpanded} />
                            </StackItem>
                            <StackItem isFilled className="ins-c-inventory__drawer--facts">
                                {loaded && <FactsInfo entity={entity} />}
                                {
                                    isExpanded &&
                                    loaded &&
                                    Wrapper &&
                                    <Wrapper
                                        appName={appName}
                                    />
                                }
                            </StackItem>
                        </Stack>
                    </DrawerPanelBody>
                </DrawerPanelContent>
            }
        >
            <DrawerContentBody>
                {children}
            </DrawerContentBody>
        </DrawerContent>
    </Drawer>;
};

DetailWrapper.propTypes = {
    children: PropTypes.any,
    hideInvLink: PropTypes.bool,
    showTags: PropTypes.bool,
    appName: PropTypes.oneOf([
        'general_information',
        'advisor',
        'insights',
        'compliance',
        'vulnerabilities',
        'patch'
    ]),
    className: PropTypes.string,
    Wrapper: PropTypes.elementType
};

DetailWrapper.defaultProps = {
    appName: 'general_information'
};

export default DetailWrapper;
