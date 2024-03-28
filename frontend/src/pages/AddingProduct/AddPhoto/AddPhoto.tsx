import React, { ChangeEventHandler, FC, useRef, useState } from 'react'
import s from './AddPhoto.module.scss'
import camera from '../../../assets/PersonalProfile/camera.png'
interface AddPhotoProps {
	setFileLeft: (e: File | string) => void
	setFileCenter: (e: File | string) => void
	setFileRight: (e: File | string) => void
}
const AddPhoto: FC<AddPhotoProps> = ({
	setFileCenter,
	setFileLeft,
	setFileRight,
}) => {
	const filePickerLeft = useRef<HTMLInputElement>(null)
	const filePickerCenter = useRef<HTMLInputElement>(null)
	const filePickerRight = useRef<HTMLInputElement>(null)

	const handlePickLeft = () => {
		if (filePickerLeft.current) {
			filePickerLeft.current.focus()
			filePickerLeft.current.click()
		}
	}
	const handlePickCenter = () => {
		if (filePickerCenter.current) {
			filePickerCenter.current.focus()
			filePickerCenter.current.click()
		}
	}
	const handlePickRight = () => {
		if (filePickerRight.current) {
			filePickerRight.current.focus()
			filePickerRight.current.click()
		}
	}
	const handleChangeLeft: ChangeEventHandler<HTMLInputElement> = e => {
		if (e.target.files) {
			setFileLeft(e.target.files[0])
		} else {
			setFileLeft('')
		}
	}
	const handleChangeCenter: ChangeEventHandler<HTMLInputElement> = e => {
		if (e.target.files) {
			setFileCenter(e.target.files[0])
		} else {
			setFileCenter('')
		}
	}
	const handleChangeRight: ChangeEventHandler<HTMLInputElement> = e => {
		if (e.target.files) {
			setFileRight(e.target.files[0])
		} else {
			setFileRight('')
		}
	}
	return (
		<div className={s.AddPhoto}>
			<div onClick={handlePickLeft} className={s.add_photo}>
				<img src={camera} alt='camera' />
				<p>Добавить фото</p>
				<input
					ref={filePickerLeft}
					onChange={handleChangeLeft}
					className={s.hidden}
					type='file'
				/>
			</div>
			<div onClick={handlePickCenter} className={s.add_photo}>
				<img src={camera} alt='camera' />
				<p>Добавить фото</p>
				<input
					ref={filePickerCenter}
					onChange={handleChangeCenter}
					className={s.hidden}
					type='file'
				/>
			</div>
			<div onClick={handlePickRight} className={s.add_photo}>
				<img src={camera} alt='camera' />
				<p>Добавить фото</p>
				<input
					ref={filePickerRight}
					onChange={handleChangeRight}
					className={s.hidden}
					type='file'
				/>
			</div>
		</div>
	)
}

export default AddPhoto
