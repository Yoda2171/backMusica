import { BadRequestException, Injectable, NotFoundException, Param } from '@nestjs/common';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './entities/cart.entity';
import { DeepPartial, Repository } from 'typeorm';
import { Auth } from 'src/auth/entities/auth.entity';
import { Product } from 'src/products/entities/product.entity';
import { WebpayPlus } from 'transbank-sdk'; // ES6 Modules
import { Options, IntegrationApiKeys, Environment, IntegrationCommerceCodes } from 'transbank-sdk'; // ES6 Modules

import { AxiosResponse } from 'axios';
import axios from 'axios';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartRepository: Repository<Cart>,

    @InjectRepository(Auth)
    private authRepository: Repository<Auth>,

    @InjectRepository(Product)
    private productRepository: Repository<Product>,

  ) {}
  


  async addToCart(@Param('userId') userId: number, @Param('productId') productId: number) {
    const auth = await this.authRepository.findOne({ where: { id: userId }});
    if (!auth) {
      throw new NotFoundException('User not found');
    }
  
    const product = await this.productRepository.findOne({ where: { id: productId }});
    if (!product) {
      throw new NotFoundException('Product not found');
    }
  
    const cart = await this.cartRepository.findOne({ where: { userId: auth }, relations: ['products'] });
  
    if (cart) {
      if (cart.products.find(p => p.id === product.id)) {
        throw new BadRequestException('Product already added to cart');
      }
      cart.products.push(product);
      cart.totalPrice += product.precio;
      await this.cartRepository.save(cart); // Guardar el carrito actualizado en la base de datos
    } else {
      const newCart = this.cartRepository.create({
        userId: auth,
        products: [product],
        totalPrice: product.precio,
        createdAt: new Date().toISOString(),
      });
  
      await this.cartRepository.save(newCart); // Guardar el nuevo carrito en la base de datos
    }
  

  }




  async getCartByUserId(userId: number): Promise<Cart> {
    const user = await this.authRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
  
    const cart = await this.cartRepository.findOne({ where: { userId:user }, relations: ['products'] });
    return cart;
  }



  async createWebpayTransaction(cartId: number, totalAmount: number) {

    const tx = new WebpayPlus.Transaction(new Options(IntegrationCommerceCodes.WEBPAY_PLUS, IntegrationApiKeys.WEBPAY, Environment.Integration));
   
    const createResponse = await tx.create(cartId.toString(),cartId.toString(),totalAmount, 'http://localhost:4200/products');

    return createResponse;
  }

  //eliminar producto del carrito
  async deleteProductFromCart(cartId: number, productId: number) {
    const cart = await this.cartRepository.findOne({ where: { id: cartId }, relations: ['products'] });
    if (!cart) {
      throw new NotFoundException('Cart not found');
    }

    const product = await this.productRepository.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    
    const productIndex = cart.products.findIndex(p => p.id === product.id);
    if (productIndex === -1) {
      throw new NotFoundException('Product not found in cart');
    }

    cart.products.splice(productIndex, 1);
    cart.totalPrice -= product.precio;
    await this.cartRepository.save(cart);
  }



  findAll() {
    return `This action returns all cart`;
  }


  

  findOne(id: number) {
    return `This action returns a #${id} cart`;
  }

  update(id: number, updateCartDto: UpdateCartDto) {
    return `This action updates a #${id} cart`;
  }

  
}
