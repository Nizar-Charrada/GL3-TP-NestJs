import  TodoEntity  from './src/entities/ToDoEntity';
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: 'localhost',
  username: 'root',
  password: '',
  database: 'database',
  entities: [TodoEntity],

});
