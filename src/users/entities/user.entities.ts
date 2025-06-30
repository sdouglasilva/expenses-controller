import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Expense } from "src/expenses/entities/expense.entity";

@Entity("users")
export class User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({unique:true})
  email:string;

  @Column()
  password: string
  @OneToMany(()=> Expense,(expense)=> expense.user)
  expenses: Expense[]
}