import './App.css'
import { Box, MantineProvider } from '@mantine/core'
import useSWR from 'swr'
import '@mantine/core/styles.css';
import AddTodo from './components/AddTodo'


export const ENDPOINT = 'http://localhost:8000'

export interface ITodo {
  id:number
  title:string
  body:string
  done:boolean
}

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then(response => {
  response.json()
})

function App() {

  const { data, mutate } = useSWR('api/todos', fetcher)

  return (
    
      <MantineProvider>
        <Box>{JSON.stringify(data)}</Box>        
        <AddTodo mutate={mutate}/>
      </MantineProvider>
    
  )
}

export default App
