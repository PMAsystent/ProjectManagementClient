import React, { FC } from 'react';
import { projectMemberEnum } from '../enums/project.member';

const VisibilityGuard: FC<{ children: any; member: string }> = ({ children, member }) => {
  if (member !== projectMemberEnum.SUPER_MEMBER.value) return null;

  return <>{children}</>;
};

export default VisibilityGuard;
