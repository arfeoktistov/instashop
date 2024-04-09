import React, { FC, FormEventHandler, useEffect, useRef, useState } from 'react';
import s from './ChangeUserProfile.module.scss'
import { useAppDispatch, useAppSelector } from '../../store/hooks/hooks';
import { IShopSellerUser } from '../../store/modules';
import { fetchByChangeUserData } from '../../store/slice/userSlice';
import { pathLink } from '../../reused';
import defaultImg from '../../assets/PersonalProfile/default.png'
import Loading from '../../Component/Loading/Loading';
import SuccessfullUser from './SuccessfullUser/SuccessfullUser';
import { Helmet } from 'react-helmet-async';

const ChangeUserProfile: FC = () => {
  const dispatch = useAppDispatch()
  const { user, token } = useAppSelector(state => state.user)
  const [imgFileBackground, setFileBackground] = useState('')
  const [imgFileInsta, setFileInsta] = useState('')
  const [imgFileMain, setFileMain] = useState('')
  const [errorText, setErrorText] = useState('')
  const { error, loading, reboot } = useAppSelector(state => state.user)
  console.log(loading);

  const [fileBackgroundImg, setFileBackgroundImg] = useState<string | File>('')
  const [fileInstaImg, setFileInstaImg] = useState<string | File>('')
  const [fileMainImg, setFileMainImg] = useState<string | File>('')

  const fileMain = useRef<HTMLInputElement>(null)
  const fileInsta = useRef<HTMLInputElement>(null)
  const fileBackground = useRef<HTMLInputElement>(null)
  const [changeUserData, setChangeUserData] = useState<IShopSellerUser>({
    background_image: '',
    main_image: '',
    insta_image: '',
    followers: '',
    instagram_link: '',
    mini_description: '',
    shop_name: '',
    product: '',
    user: ''
  })

  const getChangeUserData = (key: string, value: string) => {
    setChangeUserData({ ...changeUserData, [key]: value.trimStart() })
  }

  const onSelectMain = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileMainImg(e.target.files[0])
      setFileMain(URL.createObjectURL(new Blob([e.target.files[0]])))
    }
  }, [])
  const onSelectBeckground = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileBackgroundImg(e.target.files[0])
      setFileBackground(URL.createObjectURL(new Blob([e.target.files[0]])))
    } else {
      setFileBackground('')
    }
  }, [])
  const onSelectInsta = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileInstaImg(e.target.files[0])
      setFileInsta(URL.createObjectURL(new Blob([e.target.files[0]])))
    }
  }, [])

  if (errorText.includes('Введите название магазина!')) {
    changeUserData.shop_name && setErrorText('')
  } else if (errorText.includes('Введите описание!')) {
    changeUserData.mini_description && setErrorText('')
  } else if (errorText.includes('Введите ссылку на инстаграм!')) {
    changeUserData.instagram_link && setErrorText('')
  }

  const handleAddProduct: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    if (changeUserData.shop_name && changeUserData.mini_description && changeUserData.instagram_link) {
      if (token && user?.seller_user && fileBackgroundImg && fileInstaImg && fileMainImg) {
        dispatch(fetchByChangeUserData({ token, id: user.seller_user.id, seller_user: { followers: changeUserData.followers, user: changeUserData.user, shop_name: changeUserData.shop_name, product: changeUserData.product, mini_description: changeUserData.mini_description, instagram_link: changeUserData.instagram_link, background_image: fileBackgroundImg, insta_image: fileInstaImg, main_image: fileMainImg } }))
      } else if (token && user?.seller_user && fileBackgroundImg && fileInstaImg) {
        dispatch(fetchByChangeUserData({ token, id: user.seller_user.id, seller_user: { followers: changeUserData.followers, user: changeUserData.user, shop_name: changeUserData.shop_name, product: changeUserData.product, mini_description: changeUserData.mini_description, instagram_link: changeUserData.instagram_link, background_image: fileBackgroundImg, insta_image: fileInstaImg } }))
      } else if (token && user?.seller_user && fileBackgroundImg && fileMainImg) {
        dispatch(fetchByChangeUserData({ token, id: user.seller_user.id, seller_user: { followers: changeUserData.followers, user: changeUserData.user, shop_name: changeUserData.shop_name, product: changeUserData.product, mini_description: changeUserData.mini_description, instagram_link: changeUserData.instagram_link, background_image: fileBackgroundImg, main_image: fileMainImg } }))
      } else if (token && user?.seller_user && fileInstaImg && fileMainImg) {
        dispatch(fetchByChangeUserData({ token, id: user.seller_user.id, seller_user: { followers: changeUserData.followers, user: changeUserData.user, shop_name: changeUserData.shop_name, product: changeUserData.product, mini_description: changeUserData.mini_description, instagram_link: changeUserData.instagram_link, insta_image: fileInstaImg, main_image: fileMainImg } }))
      } else if (token && user?.seller_user && fileBackgroundImg) {
        dispatch(fetchByChangeUserData({ token, id: user.seller_user.id, seller_user: { followers: changeUserData.followers, user: changeUserData.user, shop_name: changeUserData.shop_name, product: changeUserData.product, mini_description: changeUserData.mini_description, instagram_link: changeUserData.instagram_link, background_image: fileBackgroundImg } }))
      } else if (token && user?.seller_user && fileInstaImg) {
        dispatch(fetchByChangeUserData({ token, id: user.seller_user.id, seller_user: { followers: changeUserData.followers, user: changeUserData.user, shop_name: changeUserData.shop_name, product: changeUserData.product, mini_description: changeUserData.mini_description, instagram_link: changeUserData.instagram_link, background_image: fileBackgroundImg, insta_image: fileInstaImg, main_image: fileMainImg } }))
      } else if (token && user?.seller_user && fileMainImg) {
        dispatch(fetchByChangeUserData({ token, id: user.seller_user.id, seller_user: { followers: changeUserData.followers, user: changeUserData.user, shop_name: changeUserData.shop_name, product: changeUserData.product, mini_description: changeUserData.mini_description, instagram_link: changeUserData.instagram_link, main_image: fileMainImg } }))
      } else if (token && user?.seller_user) {
        dispatch(fetchByChangeUserData({ token, id: user.seller_user.id, seller_user: { followers: changeUserData.followers, user: changeUserData.user, shop_name: changeUserData.shop_name, product: changeUserData.product, mini_description: changeUserData.mini_description, instagram_link: changeUserData.instagram_link } }))
      }
    } else if (!changeUserData.shop_name) {
      setErrorText('Введите название магазина!')
    } else if (!changeUserData.mini_description) {
      setErrorText('Введите описание!')
    } else if (!changeUserData.instagram_link) {
      setErrorText('Введите ссылку на инстаграм!')
    }
  }

  const handleMain = () => {
    if (fileMain.current) {
      fileMain.current.focus()
      fileMain.current.click()
    }
  }
  const handleBackground = () => {
    if (fileBackground.current) {
      fileBackground.current.focus()
      fileBackground.current.click()
    }
  }
  const handleInsta = () => {
    if (fileInsta.current) {
      fileInsta.current.focus()
      fileInsta.current.click()
    }
  }
  // console.log(user);

  useEffect(() => {
    if (user?.seller_user) {
      setChangeUserData({
        ...changeUserData, user: `${user.seller_user?.user}`, product: `${user.seller_user.product}`,
        shop_name: user.seller_user.shop_name, mini_description: user.seller_user.mini_description, instagram_link: user.seller_user.instagram_link,
        followers: user.seller_user.followers
      })
      if (user.seller_user.background_image && user.seller_user.insta_image && user.seller_user.main_image) {
        setFileBackground((user.seller_user.background_image && user.seller_user.background_image.startsWith('http')) ? user.seller_user.background_image : user.seller_user.background_image ? pathLink + user.seller_user.background_image : '')
        setFileInsta((user.seller_user.insta_image && user.seller_user.insta_image.startsWith('http')) ? user.seller_user.insta_image : user.seller_user.insta_image ? pathLink + user.seller_user.insta_image : '')
        setFileMain((user.seller_user.main_image && user.seller_user.main_image.startsWith('http')) ? user.seller_user.main_image : user.seller_user.main_image ? pathLink + user.seller_user.main_image : '')
      }
    }
  }, [user?.seller_user])
  // console.log(imgFileBackground);
  return (
    <form onSubmit={handleAddProduct} className={s.change_user_profile}>
      <Helmet>
        <title>Изменение данных магазина</title>
      </Helmet>
      <div className={s.bagraund}>
        <img src={imgFileBackground ? imgFileBackground : defaultImg} alt="background" />
        <input ref={fileBackground} className={s.hidden} onChange={onSelectBeckground} type="file" accept='image/*' />
        <div onClick={handleBackground} className={s.onclick_bg}>  <h2>Изменить банер</h2></div>
      </div>
      <div className={s.images_main}>
        <div className={s.img_field}>
          <div className={s.main_img}>
            <img src={imgFileMain ? imgFileMain : defaultImg} alt="main" />
            <input ref={fileMain} className={s.hidden} onChange={onSelectMain} type="file" accept='image/*' />
            <div onClick={handleMain} className={s.onclick_bg}><h2>Xотите изменить аватарку?</h2> </div>
          </div>
          <div className={s.main_img}>
            <img src={imgFileInsta ? imgFileInsta : defaultImg} alt="insta" />
            <input ref={fileInsta} className={s.hidden} onChange={onSelectInsta} type="file" accept='image/*' />
            <div onClick={handleInsta} className={s.onclick_bg}> <h2>Изменить картинку инстаграма?</h2> </div>
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
            <input className={s.text_field} value={changeUserData.instagram_link} onChange={e => getChangeUserData('instagram_link', e.target.value)} type="text" placeholder='instagram_link' />
          </div>
        </div>
      </div>
      <div className={s.btn_form}>
        <h5>{errorText}</h5>
        <button>Редактировать профиль</button>
      </div>
      {(reboot || error?.includes('Упс что-то пошло не так!')) && <SuccessfullUser text={'Профиль успешно редактирован!'} />}
      {loading && <Loading />}
    </form>
  );
};

export default ChangeUserProfile;