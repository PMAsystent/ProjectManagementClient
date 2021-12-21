import React, { FC } from 'react';
import { projectRoleEnum } from '../enums/project.role';

const VisibilityGuard: FC<{ children: any; member: string }> = ({ children, member }) => {
  if (member !== projectRoleEnum.SUPER_MEMBER.value) return null;

  return <>{children}</>;
};

export default VisibilityGuard;
