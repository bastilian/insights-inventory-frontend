/* eslint-disable react/display-name */
import React from 'react';
import { AppInfo, InventoryDetail, FullDetail } from '../components/InventoryDetail';
import RenderWrapper from './Wrapper';
import TagWithDialog from './TagWithDialog';
import { InventoryTable } from '../components/InventoryTable';
import * as inventoryFitlers from '../components/filters';
import DetailRenderer from '../components/InventoryDetail/DetailRenderer';

export function inventoryConnector(_store, componentsMapper, Wrapper, isRbacEnabled = true) {
    const showInventoryDrawer = Boolean(Wrapper);
    return {
        InventoryTable: React.forwardRef(
            (props, ref) => <RenderWrapper
                { ...props }
                isRbacEnabled={ isRbacEnabled }
                inventoryRef={ ref }
                cmp={ InventoryTable }
            />
        ),
        AppInfo: React.forwardRef(
            (props, ref) => <RenderWrapper
                hideLoader
                { ...props }
                {...componentsMapper}
                isRbacEnabled={ isRbacEnabled }
                inventoryRef={ ref }
                cmp={ AppInfo }
            />
        ),
        InventoryDetailHead: React.forwardRef(
            (props, ref) => <RenderWrapper
                hideLoader
                { ...props }
                {...componentsMapper}
                isRbacEnabled={ isRbacEnabled }
                inventoryRef={ ref }
                // eslint-disable-next-line react/prop-types
                showInventoryDrawer={ showInventoryDrawer && !props.hideInvDrawer }
                cmp={ InventoryDetail }
            />
        ),
        InventoryDetail: React.forwardRef(
            (props, ref) => <RenderWrapper
                hideLoader
                { ...props }
                {...componentsMapper}
                isRbacEnabled={ isRbacEnabled }
                inventoryRef={ ref }
                showInventoryDrawer={ showInventoryDrawer }
                cmp={ FullDetail }
            />
        ),
        TagWithDialog: React.forwardRef(
            (props, ref) => <RenderWrapper
                { ...props }
                inventoryRef={ ref }
                isRbacEnabled={ isRbacEnabled }
                cmp={ TagWithDialog }
            />
        ),
        // eslint-disable-next-line react/display-name
        DetailWrapper: (props) => <DetailRenderer
            Wrapper={Wrapper}
            isRbacEnabled={ isRbacEnabled }
            showInventoryDrawer={ showInventoryDrawer }
            {...props}
        />,
        ...inventoryFitlers
    };
}
