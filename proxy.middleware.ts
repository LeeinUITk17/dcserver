import { Injectable, NestMiddleware } from '@nestjs/common';
import { createProxyMiddleware } from 'http-proxy-middleware';

@Injectable()
export class ProxyMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    if (req.url.startsWith('/api')) {
      return createProxyMiddleware({
        target: 'http://localhost:3001',
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
      })(req, res, next);
    } else if (req.url.startsWith('/graphql')) {
      return createProxyMiddleware({
        target: 'http://172.19.199.54:3000',
        changeOrigin: true,
      })(req, res, next);
    } else {
      next();
    }
  }
}
