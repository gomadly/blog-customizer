import { useState, useEffect, useRef } from 'react';
import { clsx } from 'clsx';
import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Select } from 'src/ui/select';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';

export const ArticleParamsForm = ({
	setArticleState,
	isPanelOpen,
	setIsPanelOpen,
}: {
	setArticleState: (state: ArticleStateType) => void;
	isPanelOpen: boolean;
	setIsPanelOpen: (isOpen: boolean) => void;
}) => {
	const [fontFamily, setFontFamily] = useState<OptionType>(
		fontFamilyOptions[0]
	);
	const [fontSize, setFontSize] = useState<OptionType>(fontSizeOptions[0]);
	const [fontColor, setFontColor] = useState<OptionType>(fontColors[0]);
	const [bgColor, setBgColor] = useState<OptionType>(backgroundColors[0]);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		contentWidthArr[0]
	);

	const panelRef = useRef<HTMLDivElement>(null);

	// Закрытие панели по клику вне её области
	useEffect(() => {
		if (!isPanelOpen) return;

		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target;
			if (
				target instanceof Node &&
				panelRef.current &&
				!panelRef.current.contains(target)
			) {
				setIsPanelOpen(false);
			}
		};

		window.addEventListener('mousedown', handleClickOutside);

		return () => {
			window.removeEventListener('mousedown', handleClickOutside);
		};
	}, [isPanelOpen, setIsPanelOpen]);

	const handleApply = () => {
		setArticleState({
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: bgColor,
			contentWidth: contentWidth,
		});
	};

	const handleReset = () => {
		setFontFamily(fontFamilyOptions[0]);
		setFontSize(fontSizeOptions[0]);
		setFontColor(fontColors[0]);
		setBgColor(backgroundColors[0]);
		setContentWidth(contentWidthArr[0]);
		setArticleState(defaultArticleState);
	};

	return (
		<>
			<ArrowButton
				isOpen={isPanelOpen}
				onClick={() => setIsPanelOpen(!isPanelOpen)}
			/>

			<aside
				ref={panelRef}
				className={clsx(styles.container, {
					[styles.container_open]: isPanelOpen,
				})}>
				<Select
					title='Шрифт'
					options={fontFamilyOptions}
					selected={fontFamily}
					onChange={setFontFamily}
				/>

				<RadioGroup
					title='Размер шрифта'
					name='fontSize'
					options={fontSizeOptions}
					selected={fontSize}
					onChange={setFontSize}
				/>

				<Select
					title='Цвет шрифта'
					options={fontColors}
					selected={fontColor}
					onChange={setFontColor}
				/>

				<Select
					title='Цвет фона'
					options={backgroundColors}
					selected={bgColor}
					onChange={setBgColor}
				/>

				<Select
					title='Ширина контента'
					options={contentWidthArr}
					selected={contentWidth}
					onChange={setContentWidth}
				/>

				<Separator />

				<div className={styles.bottomContainer}>
					<Button
						title='Сбросить'
						type='clear'
						htmlType='reset'
						onClick={handleReset}
					/>
					<Button
						title='Применить'
						type='apply'
						htmlType='submit'
						onClick={handleApply}
					/>
				</div>
			</aside>
		</>
	);
};
