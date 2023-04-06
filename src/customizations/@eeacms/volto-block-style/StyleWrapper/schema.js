import { ALIGN_INFO_MAP } from '@eeacms/volto-climate-advisory-board-policy/components/manage/Blocks/schema';

export const StyleSchema = () => {
  return {
    title: 'Styles',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [],
      },
      {
        id: 'presets',
        title: 'Preset styles',
        fields: ['style_name'],
      },
      {
        id: 'standard',
        title: 'Standard',
        fields: ['textAlign', 'fontSize', 'fontWeight'],
      },
      {
        id: 'layout',
        title: 'Layout',
        fields: ['margin', 'padding', 'size'],
      },
      {
        id: 'advanced',
        title: 'Advanced',
        fields: ['theme', 'customClass', 'customId', 'clear'],
      },
    ],
    properties: {
      style_name: {
        title: 'Style',
        widget: 'style_select',
      },
      textAlign: {
        title: 'Text align',
        widget: 'style_text_align',
      },
      fontSize: {
        title: 'Font size',
        description: 'Relative to normal size of text in the block',
        choices: [
          ['xx-small', 'xx-small'],
          ['x-small', 'x-small'],
          ['small', 'small'],
          ['medium', 'medium'],
          ['large', 'large'],
          ['x-large', 'x-large'],
          ['xx-large', 'xx-large'],
          ['xxx-large', 'xxx-large'],
        ],
      },
      fontWeight: {
        title: 'Font weight',
        description: 'The weight (or boldness) of the font',
        choices: [
          ['300', 'Light'],
          ['400', 'Regular'],
          ['500', 'Medium'],
          ['600', 'SemiBold'],
          ['700', 'Bold'],
        ],
      },
      margin: {
        title: 'Margin',
        widget: 'quad_size',
      },
      padding: {
        title: 'Padding',
        widget: 'quad_size',
      },
      size: {
        widget: 'style_align',
        title: 'Section size',
        actions: Object.keys(ALIGN_INFO_MAP),
        actionsInfoMap: ALIGN_INFO_MAP,
      },
      theme: {
        title: 'Theme',
        description: 'A predefined theme, applicable just to this block',
        choices: [
          ['primary', 'Primary'],
          ['secondary', 'Secondary'],
        ],
      },
      customClass: {
        title: 'Custom CSS Class',
        description: 'A custom CSS class, applicable just to this block',
      },
      customId: {
        title: 'Custom Id',
        description: 'A custom id, applicable just to this block',
      },
      clear: {
        title: 'Clear floats',
        description: 'Pushes selected block under floated content',
        choices: [
          [null, 'None'],
          ['left', 'Left'],
          ['right', 'Right'],
          ['both', 'Both'],
        ],
      },
    },
    required: [],
  };
};
