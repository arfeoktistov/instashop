import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import s from './SuccessfullUser.module.scss'
import { useNavigate } from 'react-router-dom';
import { changeError, toggleRedirect } from '../../../store/slice/userSlice';
interface SuccessfullRequestProps {
  text: string
}
const SuccessfullUser: FC<SuccessfullRequestProps> = ({ text }) => {
  const dispatch = useAppDispatch()
  const { error, reboot } = useAppSelector(state => state.user)
  const navigate = useNavigate()
  const handleCreation = () => {
    dispatch(toggleRedirect(false))
    dispatch(changeError(null))
  }

  useEffect(() => {
    // При рождении убрать скрол
    document.body.style.overflow = 'hidden'
    // При нажатии на ESC закрыть модальное окно
    document.addEventListener('keydown', (e) => {
      e.code === 'Escape' && handleCreation()
    })
    // При рождении навесит другое событие на кнопку назад у браузера
    if (reboot || error) {
      window.history.pushState(null, '', window.location.href)
      window.onpopstate = () => handleCreation();
    }
    return () => {
      // При закрытии  модального окна вернуть скролл
      document.body.style.overflow = 'auto'
      // При закрытии убрать действия с кнопки ESC
      document.removeEventListener('keydown', () => { })
      // При закрытии вернуть действие по умолчанию на кнопку назад в браузере
      if (!reboot || error) window.history.back();
      window.onpopstate = () => { };
      navigate(-2)
    }
  }, [])
  return (
    <div onClick={handleCreation} className={s.SuccesfullCreation}>
      <div onClick={(e) => e.stopPropagation()} className={error ? s.NotSuccessfull : s.box}>
        <span onClick={handleCreation} className={s.closed}>&#10006;</span>
        {error && <h2 className={s.textError}>{error} </h2>}
        {reboot && <h2 className={s.title_text}>{text} </h2>}
      </div>
    </div>
  );
};

export default SuccessfullUser;