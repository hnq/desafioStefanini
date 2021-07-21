import path from 'path';

const env = process.env.NODE_ENV || 'development';

const config = {
  development: {
    path: '/',
    secret: 'c1a7adcc1cbab9ae0b00abb0d4518a518950ec9e8277511344c616dd9af1e508',
    useProxy: false,
    log: {
      pretty: true,
    },
  },
  test: {
    path: '/',
    secret: '46499d450cc9cd1f4067d5d85c5bffb1e0f8e808b48918f6e801baa087872743',
    useProxy: false,
    log: false,
  },
  docker: {
    path: '/',
    secret: process.env.SECRET_KEY,
    useProxy: true,
    log: {
      pretty: true,
    },
  },
  homolog: {
    path: '/',
    secret: process.env.SECRET_KEY,
    useProxy: true,
    log: true,
  },
  production: {
    path: '/',
    secret: process.env.SECRET_KEY,
    useProxy: true,
    log: true,
  }
};

module.exports = {
  ...config[env],
  env,
};
