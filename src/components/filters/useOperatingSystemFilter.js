import { useCallback, useState } from 'react';
import {
  appendGroupSelection,
  filterSelectionToValue,
  toOsFilterGroups,
  valueToFilterSelection,
} from './helpers';
import useFetchOperatingSystems from '../../Utilities/hooks/useFetchOperatingSystems';
import { OS_CHIP } from '../../Utilities/constants';

export const operatingSystemFilterState = { operatingSystemFilter: [] };
export const OPERATING_SYSTEM_FILTER = 'OPERATING_SYSTEM_FILTER';
export const operatingSystemFilterReducer = (_state, { type, payload }) => ({
  ...(type === OPERATING_SYSTEM_FILTER && {
    operatingSystemFilter: payload,
  }),
});

export const useOperatingSystemFilter = (
  [state, dispatch] = [operatingSystemFilterState],
  // TODO Get rid of all additional (unnecessary) parameters
  apiParams,
  hasAccess,
  showCentosVersions
) => {
  const [operatingSystemsStateValue, setStateValue] = useState({});
  const operatingSystemsValue = dispatch
    ? state.operatingSystemFilter
    : operatingSystemsStateValue;

  const { operatingSystems, operatingSystemsLoaded } = useFetchOperatingSystems(
    {
      apiParams,
      hasAccess,
      showCentosVersions,
    }
  );

  const groups = toOsFilterGroups(operatingSystems, operatingSystemsLoaded);
  const setValue = useCallback(
    (newSelection) => {
      const fullSelections = filterSelectionToValue(newSelection);
      const fullSelection = appendGroupSelection(newSelection, groups);

      console.log(
        'setValue',
        newSelection,
        groups,
        fullSelection,
        fullSelections
      );
      return dispatch
        ? dispatch({ type: OPERATING_SYSTEM_FILTER, payload: fullSelection })
        : setStateValue(fullSelection);
    },
    [groups, dispatch]
  );

  const filter = {
    label: 'Operating System',
    value: 'operating-system-filter',
    type: 'group',
    filterValues: {
      selected: valueToFilterSelection(operatingSystemsValue),
      groups,
      onChange: (_e, newSelection) => setValue(newSelection),
    },
  };

  const chips = Object.values(operatingSystemsValue)
    .flatMap((selection) => Object.keys(selection))
    .map((osVersionValue) =>
      groups
        .flatMap(({ items }) => items)
        .find(({ value }) => value === osVersionValue)
    )
    .filter((v) => !!v)
    .map(({ label: name, ...props }) => ({
      name,
      ...props,
    }));

  const chip =
    Object.values(operatingSystemsValue).length > 0
      ? [
          {
            category: 'Operating System',
            type: OS_CHIP,
            chips,
          },
        ]
      : [];

  return [filter, chip, operatingSystemsValue, setValue];
};
