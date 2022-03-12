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
import { getTasks, setTasks } from '../api/task';
import { getMilestones } from '../api/milestone';

const AccordionLabel = ({ label, description }) => (
  <div>
    <Text>{label}</Text>
    <Text size="sm" color="dimmed" weight={400}>
      {description}
    </Text>
  </div>
);

const MilestoneAccordion1 = ({ state, onChange, milestones }) => {
  // const [ta]

  const [opened, setOpened] = useState(false);
  const [curMilestone, setCurMilestone] = useState(null);
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();

  const onSubmit = async (data) => {
    await setTasks(router.query.projectId, curMilestone, data);

    console.log('yes');

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

export const getServerSideProps = async ({ params }) => {
  const { projectId } = params;

  const milestones = await getMilestones(projectId);
  const response = milestones.map(async (milestone) => {
    const tasks = await getTasks(projectId, milestone.id);
    return { ...milestone, tasks };
  });

  return {
    props: {
      project: {
        id: 0,
        name: `Project1${response.tasks}`,
        description: 'Thisdsadsa is a long description of the project. ',
        milestones: response,
        files: [
          {
            id: 0,
            name: 'File 1',
            lastModified: '2020-01-01',
          },
          {
            id: 1,
            name: 'File 2',
            lastModified: '2020-01-02',
          },
          {
            id: 2,
            name: 'File 3',
            lastModified: '2020-01-03',
          },
          {
            id: 3,
            name: 'File 4',
            lastModified: '2020-01-04',
          },
          {
            id: 3,
            name: 'File 5',
            lastModified: '2020-01-04',
          },
          {
            id: 3,
            name: 'File 6',
            lastModified: '2020-01-04',
          },
          {
            id: 3,
            name: 'File 7',
            lastModified: '2020-01-04',
          },
        ],
      },
      users: [
        {
          id: 0,
          firstName: 'Денис',
          lastName: 'Мирчев',
        },
        {
          id: 1,
          firstName: 'Божидар',
          lastName: 'Павлов',
        },
        {
          id: 2,
          firstName: 'Калоян',
          lastName: 'Миладинов',
        },
        {
          id: 3,
          firstName: 'Никола',
          lastName: 'Сачков',
        },
      ],
      files: [
        {
          id: 0,
          name: 'Test.txt',
          lastModified: '2020-01-01',
        },
        {
          id: 1,
          name: 'Some File.txt',
          lastModified: '2020-01-01',
        },
        {
          id: 2,
          name: 'Some File.txt',
          lastModified: '2020-01-01',
        },
      ],
    },
  };
};

export default MilestoneAccordion1;
