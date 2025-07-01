import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from "src/users/entities/user.entities";

@Entity('expenses')
export class Expense{
  @PrimaryGeneratedColumn('uuid'
  )
  id: string;
  @Column({type:'date'})
  date: Date;

  @Column({type:'decimal', precision:10, scale:2})
  value:number

  @ManyToOne(()=>User, (user)=> user.expenses,{onDelete:'CASCADE'}
  )
  @JoinColumn({name:'userId'})
  user: User;
}