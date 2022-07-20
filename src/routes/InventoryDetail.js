import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteMatch } from 'react-router-dom';
import './inventory.scss';
import { Link } from 'react-router-dom';
import { Grid, GridItem } from '@patternfly/react-core';
import { Breadcrumb, BreadcrumbItem } from '@patternfly/react-core';
import { Skeleton, SkeletonSize, PageHeader, Main } from '@redhat-cloud-services/frontend-components';
import classnames from 'classnames';
import { loadEntity } from '../store/actions';
import { routes } from '../Routes';
import InventoryDetailHead from '../modules/InventoryDetailHead';
import AppInfo from '../modules/AppInfo';
import DetailWrapper from '../modules/DetailWrapper';
import { useWritePermissions } from '../Utilities/constants';

const Inventory = ({ showTags }) => {
    const dispatch = useDispatch();
    const { params: { inventoryId } } = useRouteMatch('/:inventoryId');
    const writePermissions = useWritePermissions();
    const entityLoaded = useSelector(({ entityDetails }) => entityDetails?.loaded);
    const entity = useSelector(({ entityDetails }) => entityDetails?.entity);
    const activeApp = useSelector(({ entityDetails }) => entityDetails?.activeApp?.appName);
    const firstApp = useSelector(({ entityDetails }) => entityDetails?.activeApps?.[0]);
    const currentApp = activeApp || (firstApp && firstApp.name);
    // const clearNotifications = () => dispatch(actions.clearNotifications());

    useEffect(() => {
        insights.chrome?.hideGlobalFilter?.(true);
        insights.chrome.appAction('system-detail');
        // clearNotifications();

        // BZ: RHEL cockpit is linking to crc/insights/inventory/{}/insights
        // which results in a page error, catch that and redirect
        // TODO Remove me when BZ is fixed
        const splitUrl = window.location.href.split('/insights');
        if (splitUrl.length === 3) {
            window.location = `${splitUrl[0]}/insights${splitUrl[1]}`;
        }

        const currId = inventoryId || location.pathname.replace(/\/$/, '').split('/').pop();
        if (!entity || !(entity?.id === currId) || !entityLoaded) {
            dispatch(loadEntity(currId, { hasItems: true }, { showTags }));
        }
    }, []);

    const additionalClasses = {
        'ins-c-inventory__detail--general-info': currentApp && currentApp === 'general_information'
    };

    // if (entity) {
    //     document.title = `${entity.display_name} | Inventory | Red Hat Insights`;
    // }

    useEffect(() => {
        insights?.chrome?.appObjectId?.(entity?.id);
    }, [entity?.id]);

    return (
        <DetailWrapper
            hideInvLink
            showTags
        >
            <PageHeader className={classnames('pf-m-light ins-inventory-detail', additionalClasses)} >
                <Breadcrumb ouiaId="systems-list">
                    <BreadcrumbItem>
                        <Link to={routes.table}>Inventory</Link>
                    </BreadcrumbItem>
                    <BreadcrumbItem isActive>
                        <div className="ins-c-inventory__detail--breadcrumb-name">
                            {
                                entity ?
                                    entity.display_name :
                                    entityLoaded !== true ?
                                        <Skeleton size={SkeletonSize.xs} /> : inventoryId
                            }
                        </div>
                    </BreadcrumbItem>
                </Breadcrumb>
                {entityLoaded && <InventoryDetailHead
                    fallback=""
                    hideBack
                    showTags
                    hideInvLink
                    showDelete={writePermissions}
                    hideInvDrawer
                />}
            </PageHeader>
            <Main className={classnames(additionalClasses)}>
                <Grid gutter="md">
                    <GridItem span={12}>
                        {entityLoaded && <AppInfo showTags />}
                    </GridItem>
                </Grid>
            </Main>
        </DetailWrapper>
    );
};

export default Inventory;
