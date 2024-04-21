import {Settings} from './Settings.js';

export class Way { //класс для обработки свг-пути
	$svg //элемент свг для путей
	$endMarker
	
	constructor($svg) {
		this.$svg = $svg
	}
	
	setupWay($similarElement) {
		this.$svg.setAttribute('viewBox', $similarElement.getAttribute('viewBox'))
		this.$endMarker = this.$svg.getElementById('end-arrow')
	}
	
	build(graph, wayAndDistance, wayOpacity) { //построить путь -
		this.$endMarker.style.visibility = 'hidden'
		let distance = wayAndDistance.distance
		this.$svg.setAttribute('style', `stroke-dashoffset: ${distance}; stroke-dasharray: ${distance};`)
		
		let d = 'M' //строка атрибута d - координаты точек линии маршрута
		for (const vertexID of wayAndDistance.way) { //для каждого айди вершины из полученного маршрута
			let vertex = graph.getVertexByID(vertexID) //получаем вершину
			d += `${vertex.x} ${vertex.y}L` //добавляем в линию координаты
		}
		d = d.slice(0, - 1); //удаляем последнюю L
		
		let $path = document.createElementNS('http://www.w3.org/2000/svg', 'path') //элемент path
		$path.setAttribute('d', d) //устанавливаем путь в атрибут d
		$path.setAttribute('stroke', Settings.wayColor) //цвет линии
		$path.setAttribute('stroke-width', Settings.wayWidth) //ширина линии
		$path.setAttribute('marker-start', 'url(#start-dot)') //маркер начала - кружочек
		$path.setAttribute('marker-end', 'url(#end-arrow)')
		$path.classList.add('way-path')
		this.$svg.prepend($path) //добавляем path в свг
		setTimeout(function () { //через секунду - когда линия полностью нарисуется добавить маркер конца - стрелочку
			this.$endMarker.style.visibility = 'visible'
		}.bind(this), 1000)
		console.log($path)
	}
	
	removeOldWays() {
		for (const $oldPath of this.$svg.getElementsByClassName('way-path')) {
			$oldPath.remove()
		}
	}

	visualGraph(stepsObj) {
		planHandler.removeOldLights()
		this.removeOldWays()
		let outputContent = ''
		graph.getShortestWayFromTo(planHandler.fromId, planHandler.toId).way.forEach(vertexId => {
			outputContent += `→ ${vertexId} `
		})
		outputContent = outputContent.substring(2)
		outputContent += `<br>Длина: ${stepsObj.fullDistance}`
		let $output = document.getElementsByClassName('output-way-between-au')[0]
		$output.innerHTML = outputContent
		console.log(planHandler.auditoriums)
		if (stepsObj.steps[stepsObj.activeStep].plan !== controller.getActivePlan()) {
			return;
		}
		this.build(graph, stepsObj.steps[stepsObj.activeStep])
		// Добавляем подсветку на кнопки этажей и лестницы
		if (stepsObj.steps.length > 1 && stepsObj.steps[stepsObj.activeStep] !== stepsObj.steps.at(-1)) {
			planHandler.addLight(stepsObj.steps[stepsObj.activeStep].way.at(-1),document.querySelector(`label:has(input[value=${stepsObj.steps[stepsObj.activeStep + 1].plan}])`))
		}
	}
}