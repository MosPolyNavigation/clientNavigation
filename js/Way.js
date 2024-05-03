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
	
	build(graph, step, wayOpacity) { //построить путь -
		this.$endMarker.style.visibility = 'hidden'
		// let distance = step.distance
		
		let d = 'M' //строка атрибута d - координаты точек линии маршрута
		for (const vertexID of step.way) { //для каждого айди вершины из полученного маршрута
			let vertex = graph.getVertexByID(vertexID) //получаем вершину
			d += `${vertex.x} ${vertex.y}L` //добавляем в линию координаты
		}
		d = d.slice(0, - 1); //удаляем последнюю L
		
		let $path = document.createElementNS('http://www.w3.org/2000/svg', 'path') //элемент path
		$path.setAttribute('style', `stroke-dashoffset: ${step.distance}; stroke-dasharray: ${step.distance}; filter: saturate(${Number(wayOpacity)**2});`)
		$path.setAttribute('d', d) //устанавливаем путь в атрибут d
		$path.setAttribute('stroke', Settings.wayColor) //цвет линии
		$path.setAttribute('opacity', wayOpacity) //цвет линии
		$path.setAttribute('stroke-width', Settings.wayWidth)//ширина линии
		// if (wayColor === '#6b6e6b') {
		// 	$path.setAttribute('marker-start', 'url(#start-dot-second)')
		// 	$path.setAttribute('marker-end', 'url(#end-arrow-second)')
		// }
		// else {
			$path.setAttribute('marker-start', 'url(#start-dot)') //маркер начала - кружочек
			$path.setAttribute('marker-end', 'url(#end-arrow)')
		// }

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

	visualGraph(route) {
		console.clear()
		console.log('Визуал запущен')
		planHandler.removeOldLights()
		this.removeOldWays()
		this.removeOldWays()
		let outputContent = ''
		graph.getShortestWayFromTo(planHandler.fromId, planHandler.toId).way.forEach(vertexId => {
			outputContent += `→ ${vertexId} `
		})
		outputContent = outputContent.substring(2)
		outputContent += `<br>Длина: ${route.fullDistance}`
		let $output = document.getElementsByClassName('output-way-between-au')[0]
		$output.innerHTML = outputContent
	
		route.steps.forEach(step => {
			if(route.steps[route.activeStep].way === step.way && step.plan === controller.getActivePlan()){
				this.build(graph, step, '1')
				console.log(step.plan, controller.getActivePlan(), route.steps[route.activeStep].way, step.way)
			}
			else if (step.plan === controller.getActivePlan()){
				this.build(graph,step, '0.7')
			}
		})
		if (route.steps.length > 1 && route.steps[route.activeStep] !== route.steps.at(-1)) {
			console.log('Добавляю клик')
			planHandler.addLight(
				route.steps[route.activeStep].way.at(-1),
				document.querySelector(
					`label:has(input[value=${route.steps[route.activeStep + 1].plan}])`
				),
				controller,
				data
			)
		}
	}
}