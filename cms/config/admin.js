module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', 'e00eeb53368b3b1a8e1645b18a4b9fca'),
  },
});
