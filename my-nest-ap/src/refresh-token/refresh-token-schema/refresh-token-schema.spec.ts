import { RefreshTokenSchema } from './refresh-token-schema';

describe('RefreshTokenSchema', () => {
  it('should be defined', () => {
    expect(new RefreshTokenSchema()).toBeDefined();
  });
});
