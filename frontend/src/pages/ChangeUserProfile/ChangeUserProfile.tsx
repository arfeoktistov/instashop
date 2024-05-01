import React, { FC, FormEventHandler, useEffect, useState } from 'react';
import s from './ChangeUserProfile.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { ISellerUser } from '../../store/modules';
import { fetchByChangeUserData } from '../../store/slice/userSlice';
import { pathLink } from '../../reused';
import defaultImg from '../../assets/PersonalProfile/default.png'
import Loading from '../../Component/Loading/Loading';
import SuccessfullUser from './SuccessfullUser/SuccessfullUser';
import { Helmet } from 'react-helmet-async';
import arrow from '../../assets/DetailView/leftArrow.png'
import { useNavigate } from 'react-router-dom';

const ChangeUserProfile: FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const { user, token } = useAppSelector(state => state.user)
  const [errorText, setErrorText] = useState('')
  const { error, loading, reboot } = useAppSelector(state => state.user)
  const [shopImgs, setShopImgs] = useState({
    main_image: '',
    background_image: '',
    insta_image: ''
  })
  const [changeUserData, setChangeUserData] = useState<ISellerUser>({
    background_image: null,
    main_image: null,
    insta_image: null,
    followers: '',
    instagram_link: '',
    mini_description: '',
    shop_name: '',
    product_count: '',
    user: '',
    whatsapp_number: '',
    telegram_link: ''
  })

  const getChangeUserData = (key: string, value: string) => {
    setChangeUserData({ ...changeUserData, [key]: value.trimStart() })
  }

  const toggleImgsFiles = React.useCallback((e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (e.target.files) {
      setChangeUserData((prev) => ({ ...prev, [key]: e.target.files ? e.target.files[0] : '' }))
      setShopImgs((prev) => ({ ...prev, [key]: URL.createObjectURL(new Blob([e.target.files ? e.target.files[0] : ''])) }))
    }
  }, [])

  if (errorText.includes('Введите название магазина!')) {
    changeUserData.shop_name && setErrorText('')
  } else if (errorText.includes('Введите описание!')) {
    changeUserData.mini_description && setErrorText('')
  } else if (errorText.includes('Введите ссылку на инстаграм!')) {
    changeUserData.instagram_link && setErrorText('')
  } else if (errorText.includes('Введите номер whatsApp!')) {
    changeUserData.whatsapp_number && setErrorText('')
  } else if (errorText.includes('Введите номер Telegram!')) {
    changeUserData.telegram_link && setErrorText('')
  }

  const handleAddProduct: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (changeUserData.shop_name && changeUserData.mini_description && changeUserData.instagram_link && changeUserData.instagram_link.startsWith('http') && user?.seller_user && changeUserData.whatsapp_number && changeUserData.telegram_link) {
      token && user.seller_user.id && dispatch(fetchByChangeUserData({ token, id: user.seller_user.id, seller_user: { ...changeUserData } }))
    } else if (!changeUserData.shop_name) {
      setErrorText('Введите название магазина!')
    } else if (!changeUserData.mini_description) {
      setErrorText('Введите описание!')
    } else if (!changeUserData.instagram_link && changeUserData.instagram_link.startsWith('http')) {
      setErrorText('Введите ссылку на инстаграм!')
    } else if (!changeUserData.whatsapp_number) {
      setErrorText('Введите номер whatsApp!')
    } else if (!changeUserData.telegram_link) {
      setErrorText('Введите номер Telegram!')
    }
  }

  useEffect(() => {
    if (user?.seller_user) {
      const changedObj = { ...user?.seller_user }
      for (let key in changedObj) {
        if (key === 'id' || key === 'product_count') {
          delete changedObj[key]
        }
        if (key.includes('image') && changedObj[key] !== '') {
          setShopImgs((prev) => ({ ...prev, [key]: changedObj[key] }))
        }
      }
      const data = { ...changedObj, background_image: null, insta_image: null, main_image: null }
      setChangeUserData(data)
    }
  }, [user?.seller_user])

  const goBack = () => {
    navigate(-1)
  }
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])
  return (
    <form onSubmit={handleAddProduct} className={s.change_user_profile}>
      <Helmet>
        <title>Изменение данных магазина</title>
      </Helmet>
      <img onClick={goBack} className='arrow' src={arrow} alt="arrow" />

      <div className={s.bagraund}>
        {/* <img src={shopImgs.background_image ? shopImgs.background_image.includes('http') ? `https${shopImgs.background_image.slice(4)}` : pathLink + shopImgs.background_image : defaultImg} alt="background" /> */}
        <img src={shopImgs.background_image.startsWith('blob') ? shopImgs.background_image : shopImgs.background_image ? shopImgs.background_image.includes('http') ? `https${shopImgs.background_image.slice(4)}` : pathLink + shopImgs.background_image : defaultImg} alt="background" />
        <label htmlFor="background" className={s.onclick_bg}>
          <input id='background' className={s.hidden} onChange={(e) => toggleImgsFiles(e, 'background_image')} type="file" accept='image/*' />
          <h2>Изменить банер</h2>
        </label>
      </div>
      <div className={s.images_main}>
        <div className={s.img_field}>
          <div className={s.main_img}>
            <img src={shopImgs.main_image.startsWith('blob') ? shopImgs.main_image : shopImgs.main_image ? shopImgs.main_image.includes('http') ? `https${shopImgs.main_image.slice(4)}` : pathLink + shopImgs.main_image : defaultImg} alt="main" />
            <label htmlFor="main" className={s.onclick_bg}>
              <input id='main' className={s.hidden} onChange={(e) => toggleImgsFiles(e, 'main_image')} type="file" accept='image/*' />
              <h2>Xотите изменить аватарку?</h2>
            </label>
          </div>
          <div className={s.main_img}>
            <img src={shopImgs.insta_image.startsWith('blob') ? shopImgs.insta_image : shopImgs.insta_image ? shopImgs.insta_image.includes('http') ? `https${shopImgs.insta_image.slice(4)}` : pathLink + shopImgs.insta_image : defaultImg} alt="insta" />
            <label htmlFor="insta" className={s.onclick_bg}>
              <input id='insta' className={s.hidden} onChange={(e) => toggleImgsFiles(e, 'insta_image')} type="file" accept='image/*' />
              <h2>Изменить картинку инстаграма?</h2>
            </label>
          </div>
        </div>
        <div className={s.text_field}>
          <div className={errorText.includes('Введите название магазина!') ? s.error_text : s.input_field}>
            <h2>Название магазина</h2>
            <input className={s.text_field} value={changeUserData.shop_name} onChange={e => getChangeUserData('shop_name', e.target.value)} type="text" placeholder='shop_name' />
          </div>
          <div className={errorText.includes('Введите описание!') ? s.error_text : s.input_field}>
            <h2>Мини описание</h2>
            <input className={s.text_field} value={changeUserData.mini_description} onChange={e => getChangeUserData('mini_description', e.target.value)} type="text" placeholder='mini_description' />
          </div>
          <div className={s.input_field}>
            <h2>Подписчики</h2>
            <input className={s.text_field} value={changeUserData.followers} onChange={e => getChangeUserData('followers', e.target.value)} type="text" placeholder='followers' />
          </div>
          <div className={errorText.includes('Введите ссылку на инстаграм!') ? s.error_text : s.input_field}>
            <h2>Ссылка в инстаграм</h2>
            <input className={s.text_field} value={changeUserData.instagram_link} onChange={e => getChangeUserData('instagram_link', e.target.value)} type="url" placeholder='instagram_link' />
          </div>
          <div className={errorText.includes('Введите номер whatsApp!') ? s.error_text : s.input_field}>
            <h2>WhatsApp</h2>
            <input className={s.text_field} value={changeUserData.whatsapp_number} onChange={e => getChangeUserData('whatsapp_number', e.target.value)} type="tel" placeholder='996700700700' />
          </div>
          <div className={errorText.includes('Введите номер Telegram!') ? s.error_text : s.input_field}>
            <h2>Telegram</h2>
            <input className={s.text_field} value={changeUserData.telegram_link} onChange={e => getChangeUserData('telegram_link', e.target.value)} type="text" placeholder='telegram' />
          </div>
        </div>
      </div>
      <div className={s.btn_form}>
        <h5>{errorText}</h5>
        <button>Редактировать профиль</button>
      </div>
      {(reboot || error?.includes('Упс что-то пошло не так!') || error?.includes('Не авторизован!')) && <SuccessfullUser text={'Профиль успешно отредактирован!'} />}
      {loading && <Loading />}
    </form>
  );
};

export default ChangeUserProfile;