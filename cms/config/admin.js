module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0614611e715a1e03f2ca951a1858ec48'),
  },
});
