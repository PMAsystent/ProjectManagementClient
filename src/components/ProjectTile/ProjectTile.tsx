import React, { FC } from 'react';
import './styles.scss';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import CustomButton from '../CustomButton/CustomButton';

const ProjectTile: FC<any> = ({ name, activeTasks, progressBar, typeOfProject, endDate }) => {
  return (
    <section className="tile-container">
      <div>
        <CircularProgressbar
          styles={buildStyles({
            backgroundColor: '#292929',
          })}
          background
          backgroundPadding={3}
          value={progressBar}
          text={`${progressBar}%`}
        />
      </div>
      <h3>{name}</h3>
      <div>
        <p>Aktywne zadania</p>
        <h4>{activeTasks}</h4>
      </div>
      <div>
        <p>Typ projektu</p>
        <h4>{typeOfProject}</h4>
      </div>
      <div>
        <p>Deadline</p>
        <h4>{endDate}</h4>
      </div>
      <CustomButton className="btn-project">Rozwiń &#10095;</CustomButton>
    </section>
  );
};

export default ProjectTile;
