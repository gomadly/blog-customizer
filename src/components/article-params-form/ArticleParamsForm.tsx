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
}: {
	setArticleState: (state: ArticleStateType) => void;
}) => {
	const [isPanelOpen, setIsPanelOpen] = useState(false);

	const [fontFamily, setFontFamily] = useState<OptionType>(
		defaultArticleState.fontFamilyOption
	);
	const [fontSize, setFontSize] = useState<OptionType>(
		defaultArticleState.fontSizeOption
	);
	const [fontColor, setFontColor] = useState<OptionType>(
		defaultArticleState.fontColor
	);
	const [bgColor, setBgColor] = useState<OptionType>(
		defaultArticleState.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState<OptionType>(
		defaultArticleState.contentWidth
	);

	const panelRef = useRef<HTMLDivElement>(null);

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
	}, [isPanelOpen]);

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
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBgColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);

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
				<h2 className={styles.formTitle}>ЗАДАЙТЕ ПАРАМЕТРЫ</h2>

				<Select
					title='ШРИФТ'
					options={fontFamilyOptions}
					selected={fontFamily}
					onChange={setFontFamily}
				/>

				<div className={styles.radioBlock}>
					<RadioGroup
						name='fontSize'
						title='Размер шрифта'
						options={fontSizeOptions}
						selected={fontSize}
						onChange={setFontSize}
					/>
				</div>

				<Select
					title='ЦВЕТ ШРИФТА'
					options={fontColors}
					selected={fontColor}
					onChange={setFontColor}
				/>

				<Separator />

				<Select
					title='ЦВЕТ ФОНА'
					options={backgroundColors}
					selected={bgColor}
					onChange={setBgColor}
				/>

				<Select
					title='ШИРИНА КОНТЕНТА'
					options={contentWidthArr}
					selected={contentWidth}
					onChange={setContentWidth}
				/>

				<div className={styles.bottomContainer}>
					<Button
						title='СБРОСИТЬ'
						type='clear'
						htmlType='reset'
						onClick={handleReset}
					/>
					<Button
						title='ПРИМЕНИТЬ'
						type='apply'
						htmlType='submit'
						onClick={handleApply}
					/>
				</div>
			</aside>
		</>
	);
};
