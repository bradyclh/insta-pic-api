export interface ConfigDto {
  env: string;
  http: {
    port: number;
    allowCredentials: string;
  };
  url: {
    web: string;
  };
  db: {
    host: string;
    port: number;
    database: string;
    username: string;
    password: string;
    dbDrop: string;
    dbSync: string;
  };
  key: {
    passwordHashSalt: string;
    verifiedTokenDigitLength: number;
  };
  jwt: {
    secretKey: string;
    expiresIn: number;
  };
  aws: {
    accessKeyId: string;
    secretAccessKey: string;
    s3: {
      bucketName: string;
      bucketRegion: string;
      signedUrlExpires: number;
    };
  };
  rule: {
    password: RegExp;
  };
}
