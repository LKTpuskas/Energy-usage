module.exports = {
  preset: "ts-jest",
  verbose: true,
  moduleNameMapper: {
    "\\.(css|scss)$": "identity-obj-proxy"
  },
  setupFiles: [
    "./src/setupJest.ts"
  ]
};
