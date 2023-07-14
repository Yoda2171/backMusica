import { Product } from "src/products/entities/product.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'categoria' })
export class Categoria {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoria: string;

    @OneToMany(() =>  Product, product => product.categoria)
    products: Product[];
}
