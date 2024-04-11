import React, { FC, useEffect } from 'react';
import s from './DeleteProduct.module.scss'

interface DeleteProductProps {
  setLogOut: (e: boolean) => void
  logOut: boolean
  handleDeleteCard: () => void
}
const DeleteProduct: FC<DeleteProductProps> = ({ logOut, setLogOut, handleDeleteCard }) => {

  useEffect(() => {
    // При рождении убрать скрол
    document.body.style.overflow = 'hidden'
    // При нажатии на ESC закрыть модальное окно
    document.addEventListener('keydown', (e) => {
      e.code === 'Escape' && setLogOut(false)
    })
    // При рождении навесит другое событие на кнопку назад у браузера
    if (logOut) {
      window.history.pushState(null, '', window.location.href)
      window.onpopstate = () => setLogOut(false);
    }
    return () => {
      // При закрытии  модального окна вернуть скролл
      document.body.style.overflow = 'auto'
      // При закрытии убрать действия с кнопки ESC
      document.removeEventListener('keydown', () => { })
      // При закрытии вернуть действие по умолчанию на кнопку назад в браузере
      if (!logOut) window.history.back();
      window.onpopstate = () => { };
    }
  }, [])
  return (
    <div onClick={() => setLogOut(false)} className={s.log_out}>
      <div className={s.modal_login} onClick={e => e.stopPropagation()}>
        <span onClick={() => setLogOut(false)} className={s.closed}> &#10006; </span>
        <h2 className={s.title_text}>Удалить продукт?</h2>
        <div className={s.buttons}>
          <button className={s.cancellation} onClick={() => setLogOut(false)}>Отмена</button>
          <button className={s.out_user} onClick={handleDeleteCard}>Удалить</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;