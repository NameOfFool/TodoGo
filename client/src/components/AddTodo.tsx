import { useForm } from '@mantine/form'
import { Modal, Button, Group, Center, TextInput, Textarea } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ENDPOINT, ITodo } from '../App';
import { KeyedMutator} from 'swr';


function AddTodo({mutate}: {mutate:KeyedMutator<ITodo[]>}) {
    const [opened, { open, close }] = useDisclosure(false);
    const isMobile = useMediaQuery('(max-width: 50em)');

    const form = useForm({
        initialValues: {
            title: "",
            body: ""
        }
    })

    async function createTodo(values:{title:string, body:string}) {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify(values)
        }).then((response) => response.json())
        mutate(updated)
        form.reset()
        close()
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                centered
                fullScreen={isMobile}
                transitionProps={{ transition: 'fade', duration: 200 }}
                title="Create todo">
                <form onSubmit={form.onSubmit(createTodo)}>
                    <TextInput
                        required
                        mb={12}
                        label="Todo"
                        placeholder='input Task'
                        {...form.getInputProps("title")} />

                    <Textarea
                        required
                        mb={12}
                        label="Body"
                        placeholder='More...'
                        {...form.getInputProps("body")} />
                    <Button type='submit'>Create todo</Button>
                </form>
            </Modal>
            <Group pos={Center}>
                <Button variant='default' fullWidth mb={12} onClick={open}>
                    Add Task
                </Button>
            </Group>
            </>
    )
}

export default AddTodo