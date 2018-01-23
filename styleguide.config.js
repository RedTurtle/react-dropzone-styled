const path = require('path');

module.exports = {
  title: 'react-dropzone-styled',
  styleguideDir: path.join(__dirname, 'styleguide'),
  showCode: true,
  showSidebar: false,
  sections: [
    {
      content: './README.md',
      components: './src/index.js',
      sections: [
        {
          name: 'Usage',
          content: './src/DropzoneStyled.md',
        },
      ],
    },
  ],
};
