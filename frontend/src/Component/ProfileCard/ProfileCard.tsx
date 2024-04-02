import React, { FC, useEffect } from 'react';
import s from './ProfileCard.module.scss'
import cardOne from '../../assets/Profile/cardOne.png'
import { Link } from 'react-router-dom';
import { ProfileCardModules } from '../../store/modules';
interface ProfileCardProps {
    profilCard: ProfileCardModules
}
const ProfileCard: FC<ProfileCardProps> = ({ profilCard }) => {
    return (
        <Link className={s.card} to={`/detailview/${profilCard.id}`}>
            <div className={s.imageClass}>
                <img src={profilCard.image} alt="img" />
            </div>
            <div>
                <h2>Shop now!</h2>
                <h3>{Math.ceil(profilCard?.price ? +profilCard?.price : 0)} com</h3>
            </div>
        </Link >

    );
};

export default ProfileCard;