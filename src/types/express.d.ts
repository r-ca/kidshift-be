import * as express from 'express'; // モジュールとして認識させるためのインポート

declare global {
  namespace Express {
    interface Request {
      user?: {
        token: string;
        claims: {
            sub: string;
            role: string;
            home_group_id: string;
        };
      };
    }
  }
}

export {}; // モジュールとして認識させるためのエクスポート
