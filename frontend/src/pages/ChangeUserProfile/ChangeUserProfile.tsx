import React, { FC } from 'react';
import s from './ChangeUserProfile.module.scss'
import { Helmet } from 'react-helmet-async';

const ChangeUserProfile: FC = () => {
  return (
    <div className={s.change_user_profile}>
      <Helmet>
        <title>Изменение данных магазина</title>
      </Helmet>

    </div>
  );
};

export default ChangeUserProfile;