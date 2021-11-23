/* eslint-disable @typescript-eslint/no-use-before-define */
import { ConfigDto } from './dto/config.dto';
import { isPositiveInteger } from '../utils/isNumber';

const { ...env } = process.env;

const envConfig: ConfigDto = {
  env: env.NODE_ENV,
  http: {
    port: +env.HTTP_LISTEN_PORT,
    allowCredentials: env.ACCESS_CONTROL_ALLOW_CREDENTIALS,
  },
  url: {
    web: env.WEB_URL || 'http://localhost:3000',
  },
  db: {
    host: env.DB_HOST,
    port: +env.DB_PORT,
    database: env.DB_NAME,
    username: env.DB_USER,
    password: env.DB_PASS,
    dbDrop: env.DB_DROP,
    dbSync: env.DB_SYNC,
  },
  key: {
    passwordHashSalt: env.PASSWORD_HASH_SALT,
    verifiedTokenDigitLength: +env.VERIFIED_TOKEN_DIGIT_LENGTH || 6,
  },
  jwt: {
    secretKey: env.JWT_SECRET_KEY,
    expiresIn: +env.JWT_EXPIRES_IN,
  },
  aws: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
    s3: {
      bucketName: env.S3_BUCKET_NAME,
      bucketRegion: env.S3_BUCKET_REGION,
      signedUrlExpires: +env.S3_SIGNED_URL_EXPIRES_IN,
    },
  },
  rule: {
    password: getPasswordRule(),
  },
};

function getPasswordRule() {
  return new RegExp(
    [
      '^',
      env.PASSWORD_RULE_HAS_UPPERCASE === 'true' && '(?=.*?[A-Z])',
      env.PASSWORD_RULE_HAS_LOWERCASE === 'true' && '(?=.*?[a-z])',
      env.PASSWORD_RULE_HAS_DIGIT === 'true' && '(?=.*?[0-9])',
      // eslint-disable-next-line prettier/prettier
      env.PASSWORD_RULE_HAS_SPECIAL_CHARACTER === 'true' && '(?=.*?[#?!@$%^&*-])',
      /[A-Za-z\d#?!@$%^&*-]/.source,
      '{',
      isPositiveInteger(env.PASSWORD_RULE_MIN_LENGTH)
        ? +env.PASSWORD_RULE_MIN_LENGTH || '1'
        : '1',
      ',',
      isPositiveInteger(env.PASSWORD_RULE_MAX_LENGTH)
        ? +env.PASSWORD_RULE_MAX_LENGTH || ''
        : '',
      '}',
      '$',
    ]
      .filter((v) => v)
      .join(''),
  );
}

export default envConfig;
