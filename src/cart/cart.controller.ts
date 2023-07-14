import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post(':userId/add/:productId')
  async addToCart(@Param('userId') userId: number, @Param('productId') productId: number) {
    await this.cartService.addToCart(userId, productId);
  }

  @Get(':userId')
  async getCartByUserId(@Param('userId') userId: number): Promise<Cart> {
    return this.cartService.getCartByUserId(userId);
  }

  @Post(':cartId/transaction')
  async createWebpayTransaction(@Param('cartId') cartId: number, @Body('totalAmount') totalAmount: number) {
    const response = await this.cartService.createWebpayTransaction(cartId, totalAmount);
    return response;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(+id, updateCartDto);
  }

  @Delete(':id/delete/:productId')
  remove(@Param('id') id: number,@Param('productId') productId:number) {
    return  this.cartService.deleteProductFromCart(id,productId);
  }
}
