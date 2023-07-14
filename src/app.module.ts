import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { CategoriaModule } from './categoria/categoria.module';
import { CartModule } from './cart/cart.module';



@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'picachu2171',
      database: 'carrito',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule, ProductsModule, CategoriaModule, CartModule,  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
