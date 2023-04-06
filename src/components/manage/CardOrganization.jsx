import React from 'react';
import { Card as UiCard } from 'semantic-ui-react';

const CardOrganization = (props) => {
  const { item, itemModel = {}, description } = props;
  const { Description, organization } = item;
  const { hasDescription } = itemModel;
  const desc = description || Description;
  const show = hasDescription && desc;

  return (
    <>
      {show && <UiCard.Description content={`(${desc})`} />}
      {organization && (
        <UiCard.Description
          content={organization}
          className="organization-underline"
        />
      )}
    </>
  );
};

export default CardOrganization;
