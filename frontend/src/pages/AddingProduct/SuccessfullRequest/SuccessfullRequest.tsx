import React, { FC, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks/hooks';
import s from './SuccessfullRequest.module.scss'
import { changeError, toggleReboot } from '../../../store/slice/addProductSlice';
import { useNavigate } from 'react-router-dom';
interface SuccessfullRequestProps {
  text: string
  id: string | null
}
const SuccessfullRequest: FC<SuccessfullRequestProps> = ({ text, id }) => {
  const dispatch = useAppDispatch()
  const { error, reboot } = useAppSelector(state => state.addProductSlice)
  const navigate = useNavigate()
  const handleCreation = () => {
    dispatch(toggleReboot(false))
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
      id ? navigate('/personal_profile') : !error && navigate(-1)
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

export default SuccessfullRequest;