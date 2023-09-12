/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  setupFiles: ["jest-localstorage-mock"],
  // 更多配置選項
};

export default config;