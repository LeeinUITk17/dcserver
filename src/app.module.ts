import { Module } from '@nestjs/common';
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
    UserModule,
    AuthModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MenuitemModule,
    InventoryItemModule,
    SupplierItemModule,
    TransactionModule,
    RecipeModule,
    CategoryModule,
  ],
  providers: [AppService],
})
// export class AppModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ProxyMiddleware).forRoutes('*');
//   }
// }
export class AppModule {}
