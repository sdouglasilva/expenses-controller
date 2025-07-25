import { Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Expense } from '../../expenses/entities/expense.entity';

@Entity("users")
export class User{
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({length:100})
  name:string;

  @Column({unique:true})
  email:string;

  @Column()
  password: string

  @OneToMany(()=> Expense,(expense)=> expense.user)
  expenses: Expense[]
}