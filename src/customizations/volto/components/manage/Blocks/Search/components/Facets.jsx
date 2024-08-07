import React, { useEffect } from 'react';
import { resolveExtension } from '@plone/volto/helpers/Extensions/withBlockExtensions';
import config from '@plone/volto/registry';
import {
  hasNonValueOperation,
  hasDateOperation,
} from '@plone/volto/components/manage/Blocks/Search/utils';
import { filtered } from '@eeacms/volto-climate-advisory-board-policy/utils';

const showFacet = (index) => {
  const { values } = index;
  return index
    ? hasNonValueOperation(index.operations || []) ||
      hasDateOperation(index.operations || [])
      ? true
      : values && Object.keys(values).length > 0
    : values && Object.keys(values).length > 0;
};

const Facets = (props) => {
  const {
    querystring,
    data = {},
    facets,
    setFacets,
    facetWrapper,
    isEditMode,
  } = props;
  const { search } = config.blocks.blocksConfig;

  const FacetWrapper = facetWrapper;
  const query_to_values = Object.assign(
    {},
    ...(data?.query?.query?.map(({ i, v }) => ({ [i]: v })) || []),
  );

  // Clear all facets on component mount
  useEffect(() => {
    if (Object.keys(facets).length > 0) {
      setFacets({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      {data?.facets
        ?.filter((facetSettings) => !facetSettings.hidden)
        .map((facetSettings) => {
          const field = facetSettings?.field?.value;
          const index = querystring.indexes[field] || {};
          const { values = {} } = index;

          let choices = Object.keys(values)
            .map((name) => ({
              value: name,
              label: values[name].title,
            }))
            // filter the available values based on the allowed values in the
            // base query
            .filter(({ value }) =>
              query_to_values[field]
                ? query_to_values[field].includes(value)
                : true,
            );

          switch (field) {
            case 'temporal_coverage':
              choices = choices.sort((a, b) => b.label - a.label);
              break;
            case 'Subject':
              const [filteredChoices, otherChoice] = [
                ...filtered(
                  choices,
                  (choice) => choice.label !== 'Other publications',
                ),
              ];
              choices = [...filteredChoices, ...otherChoice];
              break;
            default:
              choices = choices.sort((a, b) =>
                a.label.localeCompare(b.label, 'en', { sensitivity: 'base' }),
              );
          }

          const isMulti = facetSettings.multiple;
          const selectedValue = facets[facetSettings?.field?.value];

          // TODO :handle changing the type of facet (multi/nonmulti)

          const { view: FacetWidget, stateToValue } = resolveExtension(
            'type',
            search.extensions.facetWidgets.types,
            facetSettings,
          );

          // Ensure the value is empty by default
          let value =
            stateToValue({ facetSettings, index, selectedValue }) || [];

          const {
            rewriteOptions = (name, options) => options,
          } = search.extensions.facetWidgets;

          return FacetWrapper && (isEditMode || showFacet(index)) ? (
            <FacetWrapper key={facetSettings['@id']}>
              <FacetWidget
                facet={facetSettings}
                choices={rewriteOptions(facetSettings?.field?.value, choices)}
                isMulti={isMulti}
                value={value}
                isEditMode={isEditMode}
                onChange={(id, value) => {
                  !isEditMode && setFacets({ ...facets, [id]: value });
                }}
              />
            </FacetWrapper>
          ) : (
            ''
          );
        })}
    </>
  );
};

export default Facets;
