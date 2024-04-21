
export class DragHandler {
	$dragAble //Объект для премещения
	$scaleAble //Объект для масштабирования в центр
	$wrapper //Внешний контейнер за пределами которого не видно
	$bPlus //Кнопка увеличить масштаб
	$bMinus //Кнопка уменьшить масштаб
	
	constructor($dragAble, $scaleAble, $wrapper, $bPlus, $bMinus) {
		let oldComputedStyle = getComputedStyle($dragAble)
		this.$dragAble = $dragAble
		this.$scaleAble = $scaleAble;
		this.$bPlus = $bPlus;
		this.$bMinus = $bMinus;
		this.$wrapper = $wrapper
		// let logger = document.getElementsByClassName('logger')[0]
		let currentScale = 1
		let da = this
		
		//слушатели нажатия на мышь или экран
		this.$wrapper.addEventListener('mousedown', startMove)
		this.$wrapper.addEventListener('touchstart', startMove, 'mouse')
		
		//при нажатии
		function startMove(eventMD) {
			//запоминаем начальную позицию перемещаемого объекта и начальные координаты касания/нажатия
			function getTransformTranslateXY(str) {
				// Извлекаем все числа из строки с помощью регулярного выражения
				const numbers = str.match(/-?\d+\.?\d*/g);
				
				// Проверяем, что найдено не менее двух чисел
				if (numbers && numbers.length >= 2) {
					// Возвращаем объект с ключами x и y, значениями которых являются два последних числа
					return {
						x: parseFloat(numbers[numbers.length - 2]),
						y: parseFloat(numbers[numbers.length - 1]),
					};
				}
				
				// Если чисел менее двух, возвращаем null
				return {x: 0, y: 0};
			}
			let startObjectXY = getTransformTranslateXY(getComputedStyle($dragAble).transform)
			let startLeft = startObjectXY.x
			let startTop = startObjectXY.y
			// let startLeft = $dragAble.offsetLeft
			// let startTop = $dragAble.offsetTop
			let startX = eventMD.type === 'mousedown' ? eventMD.clientX : eventMD.touches[0].clientX
			let startY = eventMD.type === 'mousedown' ? eventMD.clientY : eventMD.touches[0].clientY
			let startDistance
			let startScale = currentScale
			if(eventMD.type === 'touchstart' && eventMD.touches.length === 2){
				startDistance = ((eventMD.touches[1].clientY-eventMD.touches[0].clientY)**2+(eventMD.touches[1].clientX-eventMD.touches[0].clientX)**2)**0.5
				$scaleAble.classList.add('no-scale-able')
				eventMD.preventDefault()
			}
			//устанавливаем слушатели на перемещение
			document.addEventListener('mousemove', onMouseMove)
			document.addEventListener('touchmove', onMouseMove)
			
			//при перемещении
			function onMouseMove(eventMM) {
				eventMM.preventDefault()
				$dragAble.style.pointerEvents = 'none' //отключаем возможность нажатия/выделения
				if(eventMM.type === 'mousemove' || (eventMM.type === 'touchmove' && eventMM.touches.length === 1)){
				
				//считаем текущие координаты касания/нажатия
				let clientX = eventMM.type === 'mousemove' ? eventMM.clientX : eventMM.touches[0].clientX
				let clientY = eventMM.type === 'mousemove' ? eventMM.clientY : eventMM.touches[0].clientY
				//перемещаем с учетом масштаба
				$dragAble.style.transform = `translate(${(clientX - startX) / currentScale + startLeft}px, ${(clientY - startY) / currentScale + startTop}px)`
				}
				else if(eventMM.type === 'touchmove' && eventMM.touches.length === 2){
					let distance = ((eventMM.touches[1].clientY-eventMM.touches[0].clientY)**2+(eventMM.touches[1].clientX-eventMM.touches[0].clientX)**2)**0.5
					// logger.innerHTML = `${startDistance.toFixed(0)}<br>${distance.toFixed(0)}`
					setScale((distance-startDistance)/50+startScale)
				}
			}
			
			//слушатели отпускания мыши/пальца
			document.addEventListener('mouseup', moveEnd)
			document.addEventListener('touchend', moveEnd)
			document.addEventListener('touchcancel', moveEnd)
			
			//при отпускании удаляем слушатели и возвращаем возможность взаимодействовать с контентом
			function moveEnd() {
				$dragAble.style.pointerEvents = 'auto'
				document.removeEventListener('mousemove', onMouseMove)
				document.removeEventListener('touchmove', onMouseMove)
				document.removeEventListener('mouseup', moveEnd)
				document.removeEventListener('touchend', moveEnd)
				document.removeEventListener('touchcancel', moveEnd)
				$scaleAble.classList.remove('no-scale-able')
			}
		}
		
		//слушатели нажатия на кнопки масштаба
		this.$bPlus.addEventListener('click', () => scale(1.8))
		this.$bMinus.addEventListener('click', () => scale(1 / 1.8))
		
		//функция масштабирует масштабируемый объект
		function scale(scaleValue) {
			let newScale = Math.round((currentScale * scaleValue) * 100) / 100;
			setScale(newScale)
		}
		
		function setScale(newScale) {
			if(newScale < 0.75) newScale=0.75
			if(newScale > 7) newScale=7
			da.$scaleAble.style.transform = `scale(${newScale})`
			currentScale = newScale
		}
		
		let wheelSum = 0
		$wrapper.addEventListener('wheel', function (eventWH) {
			wheelSum+=eventWH.wheelDelta
			if(Math.abs(wheelSum) > 200 ) {
				if (eventWH.wheelDelta > 0) scale(1.5)
				else if (eventWH.wheelDelta < 0) scale(1 / 1.5)
				wheelSum = 0
			}
			else if(Math.abs(wheelSum) > 120 ) {
				if (eventWH.wheelDelta > 0) scale(1.15)
				else if (eventWH.wheelDelta < 0) scale(1 / 1.15)
				wheelSum = 0
			}
		}.bind(this))
	}
}

