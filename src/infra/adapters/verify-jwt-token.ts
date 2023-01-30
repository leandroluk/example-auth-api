import { VerifyJwtTokenAdapter } from '$/data/protocols/adapters/verify-jwt-token';
import vars from '$/vars';
import jsonwebtoken, { JwtPayload, VerifyOptions } from 'jsonwebtoken';

export class VerifyJwtTokenAdapterImpl implements VerifyJwtTokenAdapter {
  async verify(token: VerifyJwtTokenAdapter.Token): Promise<VerifyJwtTokenAdapter.Result> {
    const payload = jsonwebtoken.verify(token, vars.jwt.publicKey, {
      algorithms: [vars.jwt.algorithm] as VerifyOptions['algorithms'],
      issuer: vars.jwt.issuer,
      audience: vars.jwt.audience,
    }) as JwtPayload;
    // reverse the subject
    const reversed = payload.sub.split('').reduce((str, char) => char + str, '');
    // convert content to utf8 (minimal decrypting)
    const converted = Buffer.from(reversed, 'hex').toString('utf8');
    // remove salt from real subject
    const withoutSalt = converted.split('.').shift();
    return withoutSalt;
  }
}
