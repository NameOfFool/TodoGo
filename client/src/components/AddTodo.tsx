import { useForm } from '@mantine/form'
import { Modal, Button, Group, Center, TextInput, Textarea, MantineProvider } from '@mantine/core'
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { ENDPOINT } from '../App';


function AddTodo({mutate: KeyedMutator}) {
    const [opened, { open, close }] = useDisclosure(true);
    const isMobile = useMediaQuery('(max-width: 50em)');

    const form = useForm({
        initialValues: {
            title: "",
            body: ""
        }
    })

    function createTodo(values:string, body:string) {
        const updated = await fetch(`${ENDPOINT}/api/todos`, {
            method:"POST",
            headers:{
                'Content-Type':"application/json"
            },
            body: JSON.stringify(values)
        }).then((response) => response.json())
        form.reset()
        close
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
                        {...form.getInputProps("title")} />
                    <Button>Create todo</Button>
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