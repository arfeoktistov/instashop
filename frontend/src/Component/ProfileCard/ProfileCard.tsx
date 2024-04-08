import React, { FC, } from 'react';
import s from './ProfileCard.module.scss'
import { Link } from 'react-router-dom';
import { ProfileCardModules } from '../../store/modules';
import { pathLink } from '../../reused';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface ProfileCardProps {
    profilCard: ProfileCardModules
}

const ProfileCard: FC<ProfileCardProps> = ({ profilCard }) => {
    return (
        <Link className={s.card} to={`/detailview/${profilCard.id}`}>
            <div className={s.imageClass}>
                <LazyLoadImage
                    alt={`${profilCard.name}`}
                    effect="blur"
                    src={`${profilCard.image?.startsWith('http') ? profilCard.image : pathLink + profilCard.image}`}
                    className={s.image}
                />
            </div>
            <div>
                <h2 title={profilCard.name}>{profilCard.name.length > 30 ? profilCard.name.slice(0, 30) + '...' : profilCard.name}</h2>
                <h3>{Math.ceil(profilCard?.price ? +profilCard?.price : 0)} com</h3>
            </div>
        </Link >

    );
};

export default ProfileCard;