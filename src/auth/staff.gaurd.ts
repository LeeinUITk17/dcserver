import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';

@Injectable()
export class StaffGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    console.log('Cookies:', request.cookies); // Kiểm tra xem cookies có không
    console.log('User in StaffGuard:', request.user); // Kiểm tra user

    if (!request.user) {
      throw new ForbiddenException('User is not authenticated.');
    }
    if (!request.user.isEmployee) {
      throw new ForbiddenException('Access denied: staff only.');
    }
    return true;
  }
}
