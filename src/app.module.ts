import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { PrismaModule } from './prisma/prisma.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { MenuitemModule } from './menu/menuitem/menuitem.module';
import { InventoryItemModule } from './menu/inventory/inventory-item.module';
import { SupplierItemModule } from './menu/supplier/supplier-item.module';
import { TransactionModule } from './menu/inventory-transaction/transaction.module';
import { RecipeModule } from './menu/recipe-ingredient/recipe.module';
import { CategoryModule } from './menu/menu-category/category.module';
import { CouponModule } from './coupon/coupon/coupon.module';
import { CampaignModule } from './coupon/campaign/campaign.module';
import { CouponPoolModule } from './coupon/coupon-pool/coupon-pool.module';
import { CouponTargetModule } from './coupon/coupon-target/coupon-target.module';
import { CouponUsageModule } from './coupon/coupon-usage/coupon-usage.module';
import { EmployeeModule } from './employee/employee/employee.module';
import { LeaveRequestModule } from './employee/leave-request/leave-request.module';
import { OvertimeRequestModule } from './employee/overtime-request/overtime-request.module';
import { AttendanceModule } from './employee/attendance/attendance.module';
import { PayrollModule } from './employee/payroll/payroll.module';
import { WorkScheduleModule } from './employee/work-schedule/work-schedule.module';
import { OrderModule } from './order/order/order.module';
import { TableModule } from './order/table/table.module';
import { ReviewModule } from './order/review/review.module';
import { ReservationModule } from './order/reservation/reservation.module';
import { PaymentModule } from './order/payment/payment.module';
import { DeliveryModule } from './order/delivery/delivery.module';
import { OrderItemModule } from './order/order-item/order-item.module';
import { ShiftModule } from './employee/shift/shift.module';
import { PayrollMiddleware } from './middleware/payroll.middleware';
import { ScheduleModule } from '@nestjs/schedule';
import { CronJobService } from './node-cron/cron-job.service';
import { CouponExpirationMiddleware } from './middleware/campaign.middleware';
@Module({
  imports: [
    PrismaModule,
    CloudinaryModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
    }),
    ScheduleModule.forRoot(),
    UserModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MenuitemModule,
    InventoryItemModule,
    SupplierItemModule,
    TransactionModule,
    RecipeModule,
    CategoryModule,
    CouponModule,
    CampaignModule,
    CouponPoolModule,
    CouponTargetModule,
    CouponUsageModule,
    EmployeeModule,
    LeaveRequestModule,
    OvertimeRequestModule,
    AttendanceModule,
    PayrollModule,
    WorkScheduleModule,
    OrderModule,
    TableModule,
    ReviewModule,
    ReservationModule,
    PaymentModule,
    DeliveryModule,
    OrderItemModule,
    ShiftModule,
  ],
  providers: [AppService, CronJobService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ProxyMiddleware).forRoutes('*');
//   }
// }
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(PayrollMiddleware).forRoutes('*'); // Middleware chạy cho tất cả routes
    consumer.apply(CouponExpirationMiddleware).forRoutes('*'); // Middleware chạy cho routes bắt đầu bằng 'coupon/campaign'
  }
}
