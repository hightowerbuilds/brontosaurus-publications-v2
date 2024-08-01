import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateTodo, useDeleteTodo, useUpdateTodo } from "../../services/mutations";
import { useTodos ,useTodosIds } from "../../services/queries"
import { Todo } from "../../types/todo"
import './Todos.css'

export default function Todos() {

    const todosIdsQuery = useTodosIds();
    const todosQueries = useTodos(todosIdsQuery.data)

    const createTodoMutation = useCreateTodo();
    const updateTodoMutation = useUpdateTodo();
    const deleteTodoMutation = useDeleteTodo();

    const { register, handleSubmit } = useForm<Todo>()

    const handleCreateTodoSubmit: SubmitHandler<Todo> = (data) => {
        createTodoMutation.mutate(data)
    }

    const handlMarkAsDoneSubmit = (data: Todo | undefined) => {
      if (data) { 
        updateTodoMutation.mutate({ ...data, checked: true })
      } }

    const handleDeleteTodoMutation = (id: number) => {
      deleteTodoMutation.mutate(id)
    }
     

    if (todosIdsQuery.isPending) {
        return <p>loading...</p>
    }
    
    if (todosIdsQuery.isError) {
        return <p>we have an error</p>
    }

  return (
    <div className="todosMainBox">
  
    <form onSubmit={handleSubmit(handleCreateTodoSubmit)}>
    <h4>new to do</h4>
    <input placeholder="title" {...register("title")}/>
    <br />
    <input placeholder="description" {...register("description")}/>
    <br />
    <input 
    type="submit" 
    disabled={createTodoMutation.isPending}
    value={createTodoMutation.isPending ? "Creating..." : "Add Todo"}
    />
    </form>

    <h4>get DB by ID</h4>
  {
    todosQueries.map(({ data }) => (
        <p key={data?.id}>
            <div>
                <p>ID: {data?.id}</p>
                <p>Title:  {data?.title}</p>
                <p>Description: {data?.description}</p>
            </div>
            <div>
                <button onClick={() => handlMarkAsDoneSubmit(data)} disabled={data?.checked}>
                  {data?.checked ?  "done" : "mark as done"}
                </button>
                  {data && data.id && (<button onClick={() => handleDeleteTodoMutation(data.id!)}>delete button</button>)}
               
            </div>
        </p>
    ))
  }
    


    </div>
  ) 
}
