import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    return super.canActivate(
      new Proxy(context, {
        get: (_, prop) =>
          prop === 'switchToHttp'
            ? () => ({ getRequest: () => request })
            : context[prop],
      }),
    );
  }

  handleRequest(err: any, user: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('You are not authorized.');
    }
    return user;
  }
}
