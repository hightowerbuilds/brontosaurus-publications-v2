// types for the todo DB 
// notice: ? is syntax for optional

export interface Todo {
    checked: boolean;
    title: string;
    description: string;
    id?: number; 
}