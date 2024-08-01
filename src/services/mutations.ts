import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, updateTodo } from "./api";
import { Todo } from '../types/todo'



export function useCreateTodo() {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: Todo) => createTodo(data),
        onMutate: () => {console.log('mutating')},
        onError: () => {console.log('error in mutation')},
        onSuccess: () => {console.log('successfulness')},
        onSettled: async (_, error) => {

            console.log('setttled')

            if (error) {
                console.log('error in create todo')
            } else {
                await queryClient.invalidateQueries({queryKey: ['todos']})
            }

        }
    })
} 


export function useUpdateTodo() {
    const queryClient = useQueryClient();

 
    return useMutation({
        mutationFn: (data: Todo) => updateTodo(data),
        onSettled: async (_, error, variables) => {
            if (error) {
                console.log(error)
            } else {
                await queryClient.invalidateQueries({ queryKey: ['todos']})
                await queryClient.invalidateQueries({ queryKey: ['todo', {id:variables.id}]})
            }
        },
    })

}


export function useDeleteTodo() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteTodo(id),
        onSuccess: () => {console.log('deleted')},
        onSettled: async (_, error) => {
            if (error) {
                console.log(error);
            } else {
                await queryClient.invalidateQueries({queryKey: ['todos']})
            }
        },
    })
}