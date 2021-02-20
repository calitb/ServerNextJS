module.exports = {
  roots: ['<rootDir>'],
  moduleFileExtensions: ['js', 'ts', 'tsx', 'json'],
  testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
  transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
  transform: {
    '^.+\\.(ts|tsx)$': 'babel-jest',
  },
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  moduleNameMapper: {
    '\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
    '@/components/(.*)': '<rootDir>/components/$1',
    '@/pages/(.*)': '<rootDir>/pages/$1',
    '@/github/(.*)': '<rootDir>/github/$1',
    '@/contentful/(.*)': '<rootDir>/contentful/$1',
    '@/utils/(.*)': '<rootDir>/utils/$1',
    '@/styles/(.*)': '<rootDir>/styles/$1',
  },
  setupFilesAfterEnv: [],
  coverageDirectory: 'jest-coverage',
  coverageReporters: ['json'],
};
