import { OneToMany } from "typeorm";
import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { Column } from "typeorm/decorator/columns/Column";
import { Cart } from "src/cart/entities/cart.entity";

@Entity({name:'auth'})
export class Auth {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    username: string;

    @Column()
    password: string;

    @OneToMany(() => Cart, cart => cart.userId)
    carts: Cart[];
}
