import { Cart } from "src/cart/entities/cart.entity";
import { Categoria } from "src/categoria/entities/categoria.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'product'})
export class Product {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre: string;

    @Column()
    marca: string;

    @Column()
    modelo: string;

    @Column()
    precio: number;

    @ManyToMany(() => Cart, cart => cart.products)
    carts: Cart[];

    @ManyToOne(() => Categoria, categoria => categoria.products)
    @JoinColumn({name:'categoria'})
    categoria: string;
}
