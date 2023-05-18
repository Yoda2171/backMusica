import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './entities/cart.entity';

@Injectable()
export class CartService {
  private cartItems: Cart[] = [
    {id: '1', productId: 'Guitarra', quantity: 5000},
    {id: '2', productId: 'Bajo', quantity: 3000},
    {id: '3', productId: 'Bateria', quantity: 4000},

  ];

  createCartItem(createCartItemDto: CreateCartDto): Cart {
    const { productId, quantity } = createCartItemDto;
    const cartItem: Cart = {
      id: uuid(),
      productId,
      quantity,
    };
    this.cartItems.push(cartItem);
    return cartItem;
  }

  getAllCartItems(): Cart[] {
    return this.cartItems;
  }

  getCartItemById(id: string): Cart {
    const cartItem = this.cartItems.find((item) => item.id === id);
    if (!cartItem) {
      throw new NotFoundException('CartItem not found');
    }
    return cartItem;
  }

  updateCartItem(id: string, updateCartItemDto: UpdateCartDto): Cart {
    const { quantity } = updateCartItemDto;
    const cartItem = this.getCartItemById(id);
    cartItem.quantity = quantity;
    return cartItem;
  }

  deleteCartItem(id: string): void {
    const index = this.cartItems.findIndex((item) => item.id === id);
    if (index >= 0) {
      this.cartItems.splice(index, 1);
    } else {
      throw new NotFoundException('CartItem not found');
    }
  }
}
