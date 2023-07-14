import { Auth } from "src/auth/entities/auth.entity";
import { Product } from "src/products/entities/product.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'cart'})
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    createdAt: string;

    @Column()
    totalPrice: number;
   
    @ManyToOne(() => Auth, user => user.carts)
    userId: Auth;

    @ManyToMany(() => Product, product => product.carts)
    @JoinTable()
    products: Product[];
    

}
