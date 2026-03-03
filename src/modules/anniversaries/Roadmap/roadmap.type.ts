export interface TodoItem {
    title: string;
    description: string;
    completed: boolean;
}

export interface RoadMapItem {
    month: string;
    year: string;
    todolist: TodoItem[];
}
