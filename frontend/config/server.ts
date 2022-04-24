// WARNING!!: THis file should be only imported by server side files,
// so the environment vars defined here are no expose to public domain

const SERVER = {
  WEB3: {
    DEPLOYER_PRIVATE_KEY: process.env.BLOCKCHAIN_DEPLOYER_PRIVATE_KEY,
  },
};

export default SERVER;
