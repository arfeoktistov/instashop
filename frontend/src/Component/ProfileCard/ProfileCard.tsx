import React, { FC } from 'react';
import s from './ProfileCard.module.scss'
import cardOne from '../../assets/Profile/cardOne.png'
import { Link } from 'react-router-dom';

const ProfileCard: FC = () => {
    return (
        <Link to={'/detailview'}>
            <div className={s.card}>
                <img src={cardOne} alt="img" />
                <div>
                    <h2>Shop now!</h2>
                    <h3>1000$</h3>
                </div>
            </div>
        </Link>

    );
};

export default ProfileCard;