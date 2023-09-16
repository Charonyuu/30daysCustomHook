import * as React from 'react';
import { useFetch } from '../../src';

type TodoDataType = {
  title: string;
  id: number;
  userId: number;
  isComplete: boolean
}

export default function FetchData() {
  const { data, loading, error } = useFetch<TodoDataType>('https://jsonplaceholder.typicode.com/todos/1')

  console.log(data)

  if (loading) return <p>loading...</p>
  if (error) return <p>There is an error when using this api : {error}</p>
  return (
    <section>
      <h3>useFetch</h3>
      title: {data?.title}
    </section>
  )
}
