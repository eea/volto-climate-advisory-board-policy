export default () => {
  return {
    title: 'Hero',
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: [
          'fullWidth',
          'fullHeight',
          'aboveBreadcrumbs',
          'quoted',
          'spaced',
          'inverted',
          'buttonLabel',
          'buttonLink',
          'overlay',
          'image',
        ],
      },
      {
        id: 'copyright',
        title: 'Copyright',
        fields: ['copyright', 'copyrightIcon', 'copyrightPosition'],
      },
    ],
    properties: {
      fullWidth: {
        title: 'Full width',
        type: 'boolean',
        defaultValue: true,
      },
      fullHeight: {
        title: 'Full height',
        type: 'boolean',
        defaultValue: true,
      },
      aboveBreadcrumbs: {
        title: 'Above breadcrumbs',
        type: 'boolean',
        defaultValue: true,
      },
      quoted: {
        title: 'Quoted',
        type: 'boolean',
        defaultValue: false,
      },
      spaced: {
        title: 'Spaced',
        type: 'boolean',
        defaultValue: false,
      },
      inverted: {
        title: 'Inverted',
        type: 'boolean',
        defaultValue: true,
      },
      buttonLabel: {
        title: 'Button label',
        widget: 'textarea',
      },
      buttonLink: {
        title: 'Button link',
        widget: 'url',
      },
      overlay: {
        title: 'Image darken overlay',
        type: 'boolean',
        defaultValue: true,
      },
      image: {
        title: 'Image',
        widget: 'attachedimage',
      },
      copyright: {
        title: 'Text',
      },
      copyrightIcon: {
        title: 'Icon',
        default: 'ri-copyright-line',
      },
      copyrightPosition: {
        title: 'Align',
        widget: 'align',
        actions: ['left', 'right'],
        defaultValue: 'left',
      },
    },
    required: [],
  };
};
