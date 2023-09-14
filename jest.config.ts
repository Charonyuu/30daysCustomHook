/** @type {import('ts-jest').JestConfigWithTsJest} */
import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // 更多配置選項
};

export default config;