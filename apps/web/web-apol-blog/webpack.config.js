const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(
  withNx(),
  withReact({
    // Uncomment this line if you don't want to use SVGR
    // See: https://react-svgr.com/
    // svgr: false
  }),
  (config) => {
    config.devServer = {
      host: process.env['NX_PUBLIC_DEFAULT_HOST'] || 'localhost',
      port: process.env['NX_PUBLIC_FRONT_APOL'] || 4200,
      historyApiFallback: true,
    };
    return config;
  }
);
