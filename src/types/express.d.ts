import * as express from 'express'; // モジュールとして認識させるためのインポート

declare global {
  namespace Express {
    interface Request {
      user?: {
        token: string;
        claims: any;
      };
    }
  }
}

export {}; // モジュールとして認識させるためのエクスポート
