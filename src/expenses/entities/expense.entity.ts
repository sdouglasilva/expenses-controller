import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { User } from '../../users/entities/user.entity';

@Entity('expenses')
export class Expense{
  @PrimaryGeneratedColumn('uuid'
  )
  id: string;
  @Column({type:'date'})
  date: Date;

  @Column({type:'decimal', precision:10, scale:2})
  value:number
  
  @Column({ length: 191 })
  description: string;

  @ManyToOne(()=>User, (user)=> user.expenses,{onDelete:'CASCADE'}
  )
  @JoinColumn({name:'userId'})
  user: User;
}