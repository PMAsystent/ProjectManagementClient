import React, { FC } from 'react';
import './styles.scss';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskItem from '../TaskItem/TaskItem';

const TaskList: FC<{ title: string; name: string; prefix: string; tasks: any[] }> = ({ title, name, prefix, tasks }) => {
  return (
    <div className="tasks-container">
      <h1>{title}</h1>
      <Droppable droppableId={prefix}>
        {(provided, snapshot) => (
          <div className="tasks-drop" {...provided.droppableProps} ref={provided.innerRef}>
            {tasks.map((task, index) => (
              <Draggable index={index} key={task.id} draggableId={`${task.id}`}>
                {(provided, snapshot) => (
                  <div
                    className="task"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      ...provided.draggableProps.style,
                    }}
                  >
                    <TaskItem task={task} />
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TaskList;
