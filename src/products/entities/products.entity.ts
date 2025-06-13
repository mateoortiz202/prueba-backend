import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({length: 100})
    name: string;

    @Column('decimal', {precision: 10, scale: 2})
    price: number;

    @Column('int')
    stock: number;

    
    // @CreateDateColumn()
    // createdAt: Date;
}