import cx from 'classnames';

import { Card as UiCard } from 'semantic-ui-react';

import {
  CardTitle,
  CardMeta,
  CardExtra,
  // CardImage,
} from '@eeacms/volto-listing-block/components/UniversalCard';
import CardOrganization from '@eeacms/volto-climate-advisory-board-policy/components/manage/CardOrganization';
import { ConditionalLink } from '@plone/volto/components';
import { Card } from 'semantic-ui-react';

import PreviewImage from '@eeacms/volto-listing-block/PreviewImage';

const getLabel = (props) => {
  const { item, itemModel = {} } = props;
  const text = item.isNew ? 'New' : item.isExpired ? 'Archived' : null;

  return itemModel?.hasLabel && text
    ? {
        text,
        side: 'left',
        // TODO: set the colors from css?
        color: item.isExpired ? 'yellow' : 'green',
      }
    : null;
};

const CardTitleOnImage = (props) => {
  const { item, itemModel = {} } = props;
  return itemModel?.titleOnImage ? (
    <div className="gradient">
      <Card.Header>{item.title}</Card.Header>
    </div>
  ) : null;
};

const CardImage = (props) => {
  const { item, isEditMode, preview_image, itemModel } = props;
  const label = getLabel(props);
  return (
    <ConditionalLink
      className="image"
      item={item}
      condition={!isEditMode && itemModel?.hasLink}
    >
      {!isEditMode && itemModel?.hasLink ? (
        <>
          <PreviewImage
            item={item}
            preview_image={preview_image}
            alt={item.title}
            size="teaser"
            label={label}
          />
          <CardTitleOnImage {...props} />
        </>
      ) : (
        <div className={'image'}>
          <PreviewImage
            item={item}
            preview_image={preview_image}
            alt={item.title}
            size="teaser"
            label={label}
          />
          <CardTitleOnImage {...props} />
        </div>
      )}
    </ConditionalLink>
  );
};

const getStyles = (props) => {
  const { itemModel = {} } = props;
  const res = {};
  if (itemModel.maxDescription) {
    res[`max-${itemModel.maxDescription}-lines`] = true;
  }
  if (itemModel.maxTitle) {
    res[`title-max-${itemModel.maxTitle}-lines`] = true;
  }
  return res;
};

const BasicCard = (props) => {
  const { className } = props;
  return (
    <UiCard fluid={true} className={cx('u-card', getStyles(props), className)}>
      <CardImage {...props} />
      <UiCard.Content>
        <CardMeta {...props} />
        <CardTitle {...props} />
        <CardOrganization {...props} />
      </UiCard.Content>
      <CardExtra {...props} />
    </UiCard>
  );
};

export const DefaultCardLayout = BasicCard;

export const LeftImageCardLayout = (props) => (
  <BasicCard
    {...props}
    className={cx(props.className || 'left-image-card', '')}
  />
);

export const RightImageCardLayout = (props) => (
  <BasicCard
    {...props}
    className={cx(props.className || 'right-image-card', '')}
  />
);

export const ImageCardLayout = (props) => {
  const { className } = props;

  return (
    <UiCard
      fluid={true}
      className={cx('u-card', getStyles(props), {
        [className]: className,
      })}
    >
      <CardImage {...props} />
    </UiCard>
  );
};
