import {
  Accordion,
  Box,
  Button,
  Center,
  Input,
  Modal,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import TasksTimeline from './TasksTimeline';
import { setTasks } from '../api/task';

const AccordionLabel = ({ label, description }) => (
  <div>
    <Text>{label}</Text>
    <Text size="sm" color="dimmed" weight={400}>
      {description}
    </Text>
  </div>
);

const MilestoneAccordion1 = ({ state, onChange, milestones }) => {
  const [opened, setOpened] = useState(false);
  const [curMilestone, setCurMilestone] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    await setTasks(router.query.projectId, curMilestone, data);

    setOpened(false);
    setCurMilestone(null);
    router.push(router.asPath, null, { scroll: false });
    reset();
  };

  return (
    <>
      <Accordion state={state} onChange={onChange}>
        {milestones.map((milestone) => (
          <Accordion.Item
            key={milestone.id}
            label={
              <AccordionLabel
                label={milestone.name}
                description={milestone.description}
              />
            }
          >
            <Button
              size="sm"
              onClick={() => {
                setOpened(true);
                setCurMilestone(milestone.id);
              }}
              mt="1rem"
            >
              Create New Task
            </Button>

            <Box mt="2rem">
              <TasksTimeline tasks={milestone.tasks} />
            </Box>
          </Accordion.Item>
        ))}
      </Accordion>

      <Modal
        size="md"
        centered
        opened={opened}
        onClose={() => setOpened(false)}
        title="Create New Task"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextInput
            {...register('name')}
            name="name"
            label="Title"
            placeholder="Title"
            size="md"
            mb="1rem"
            required
          />
          <Textarea
            {...register('description')}
            name="description"
            placeholder="Description"
            label="Description"
            size="md"
            mb="4rem"
            required
          />
          <Center sx={{ height: '10px' }}>
            <Input component="button" size="lg" mb="2rem">
              Create Milestone
            </Input>
          </Center>
        </form>
      </Modal>
    </>
  );
};

export default MilestoneAccordion1;
