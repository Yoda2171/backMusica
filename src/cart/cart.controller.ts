import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createCartItemDto: CreateCartDto) {
    return this.cartService.createCartItem(createCartItemDto);
  }

  @Get()
  findAll() {
    return this.cartService.getAllCartItems();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.getCartItemById(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCartItemDto: UpdateCartDto) {
    return this.cartService.updateCartItem(id, updateCartItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cartService.deleteCartItem(id);
  }
}
