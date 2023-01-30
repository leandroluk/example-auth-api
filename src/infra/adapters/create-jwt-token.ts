import { CreateJwtTokenAdapter } from '$/data/protocols/adapters/create-jwt-token';
import vars from '$/vars';
import crypto from 'crypto';
import jsonwebtoken, { SignOptions } from 'jsonwebtoken';

export class CreateJwtTokenAdapterImpl implements CreateJwtTokenAdapter {
  async create(data: CreateJwtTokenAdapter.Data): Promise<CreateJwtTokenAdapter.Result> {
    // add random string in end of subject
    const withSalt = `${data.subject}.${crypto.randomBytes(8).toString('hex')}`;
    // convert to base64 (minimal encrypting)
    const converted = Buffer.from(withSalt, 'utf8').toString('hex');
    // reverses the string to make translation difficult
    const reversed = converted.split('').reduce((str, char) => char + str, '');
    // create jwt token
    const jwtToken = jsonwebtoken.sign({}, vars.jwt.privateKey, {
      algorithm: vars.jwt.algorithm as SignOptions['algorithm'],
      issuer: vars.jwt.issuer,
      audience: vars.jwt.audience,
      subject: reversed,
      expiresIn: data.expires,
    });
    return jwtToken;
  }
}