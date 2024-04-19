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
	
	build(graph, wayParam, distanceParam, step) { //построить путь -
		this.$endMarker.style.visibility = 'hidden'
		let distance = distanceParam
		this.$svg.setAttribute('style', `stroke-dashoffset: ${distance}; stroke-dasharray: ${distance};`)
		
		let d = 'M' //строка атрибута d - координаты точек линии маршрута
		for (const vertexID of wayParam) { //для каждого айди вершины из полученного маршрута
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
		$path.setAttribute('opacity',step)
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

	visualGraph(graph){
		planHandler.removeButtonAnimation()
		this.removeOldWays()
		let stepRoutes = window.stepRoute
		console.log(stepRoutes)
		let idVertex1 = planHandler.fromId
		let idVertex2 = planHandler.toId
		let wayAndDistance = graph.getShortestWayFromTo(idVertex1, idVertex2)
		let outputContent = ''
		wayAndDistance.way.forEach(vertexId => {
			outputContent += `→ ${vertexId} `
		})
		outputContent = outputContent.substring(2)
		outputContent += `<br>Длина: ${wayAndDistance.distance}`
		let $output = document.getElementsByClassName('output-way-between-au')[0]
		$output.innerHTML = outputContent

		let activeFloor = planHandler.$planObject.data.substring(planHandler.$planObject.data.lastIndexOf('/') + 1, planHandler.$planObject.data.lastIndexOf('.svg')).replace('-', '');
		let floorWays = graph.splitArraysByFloors(wayAndDistance, Settings.floors)
		let keysArr = Array.from(floorWays.keys())
		let $buttonNextfloor = document.querySelector('.button-' + keysArr[keysArr.indexOf(activeFloor) + 1])
		for (let key of floorWays.keys()) {
			if (key === activeFloor) {
				let wayAndDistanceFloor = {
					way: graph.splitArraysByFloors(wayAndDistance, Settings.floors).get(key)[0],
					distance: graph.splitArraysByFloors(wayAndDistance, Settings.floors).get(key)[1]
				}
				let firstStairIndex = wayAndDistanceFloor.way.findIndex(element => graph.getVertexByID(element).type === "stair")
				let firstArr = floorWays.get(floorWays.keys().next().value)[0]
				let firstPreviousIndex = firstArr.findIndex(element => element.includes('stair'))
				// if (firstStairIndex !== -1 && firstStairIndex !== wayAndDistanceFloor.way.length - 1 && graph.getVertexByID(wayAndDistanceFloor.way[firstStairIndex + 1]).type === 'stair') {
				// 	// $doubleFloor = document.querySelector('.button-' + keysArr[keysArr.indexOf(activeFloor)])
				// 	let firstPart = {
				// 		way: wayAndDistanceFloor.way.slice(0,firstStairIndex + 1),
				// 		distance: graph.getArrayDistance(wayAndDistanceFloor.way.slice(0,firstStairIndex + 1))
				// 	}
				// 	let secondPart = {
				// 		way: wayAndDistanceFloor.way.slice(firstStairIndex + 1),
				// 		distance: graph.getArrayDistance(wayAndDistanceFloor.way.slice(firstStairIndex + 1))
				// 	}
				//
				// 	this.build(graph, firstPart)
				// 	this.build(graph, secondPart)
				//
				// 	let $transitAuFirst = planHandler.auditoriums.get(firstPart.way[firstPart.way.length - 1])
				// 	$transitAuFirst.classList.toggle('transit-animation')
				// 	$transitAuFirst.addEventListener('click',()=>{
				// 		$buttonNextfloor.click()
				// 		setTimeout(function() {
				// 			planHandler.$selector.classList.remove('showing-selector')
				// 		}, 20)
				// 	})
				// }
				// else if (firstPreviousIndex !== -1 && firstPreviousIndex !== firstArr.length - 1 && graph.getVertexByID(firstArr[firstPreviousIndex + 1]).type === 'stair'){
				// 	this.build(graph, wayAndDistanceFloor)
				// 	// $doubleFloor.classList.toggle('next-floor')
				// 	let $transitAuSecond = planHandler.auditoriums.get(wayAndDistanceFloor.way[wayAndDistanceFloor.way.length - 1])
				// 	$transitAuSecond.classList.toggle('transit-animation')
				// 	$transitAuSecond.addEventListener('click',()=>{
				// 		// $doubleFloor.click()
				// 		setTimeout(function() {
				// 			planHandler.$selector.classList.remove('showing-selector')
				// 		}, 20)
				// 	})
				// }
				if(stepRoutes !== undefined && stepRoutes.get('activeStep') === 1){
					this.build(graph, stepRoutes.get('steps')[0].way, stepRoutes.get('steps')[0].distance, 1)
					this.build(graph, stepRoutes.get('steps')[2].way,stepRoutes.get('steps')[2].distance,0.5)
				}
				else if (stepRoutes !== undefined && stepRoutes.get('activeStep') === 2)
					this.build(graph, stepRoutes.get('steps')[1].way, stepRoutes.get('steps')[1].distance, 1)
				else if (stepRoutes !== undefined && stepRoutes.get('activeStep') === 3) {
					this.build(graph, stepRoutes.get(''))
				}
				else {
					try {
						// $doubleFloor = ''
						this.build(graph, wayAndDistanceFloor.way, wayAndDistance.distance, 1)
						// $doubleFloor.classList.remove('next-floor')
					}
					catch {}
				}
			}
		}
		let $transitAu = planHandler.auditoriums.get(floorWays.get(activeFloor)[0][floorWays.get(activeFloor)[0].length - 1])
		let finishFloor = keysArr[keysArr.length-2]
		if (graph.splitArraysByFloors(wayAndDistance, Settings.floors).size > 2 && finishFloor !== activeFloor) {
			$transitAu.classList.toggle('transit-animation')
			$buttonNextfloor.classList.toggle('next-floor')
			$transitAu.addEventListener('click',()=>{
				$buttonNextfloor.click()
				setTimeout(function() {
					planHandler.$selector.classList.remove('showing-selector')
				}, 20)

			})
		}
		try {
			document.querySelector('.final-animation').classList.remove('final-animation')
		}
		catch {}
		document.querySelector('#' + planHandler.toId).classList.toggle('final-animation')
		try {
			if (floorWays.size <= 2) {
				document.querySelector('.transit-animation').classList.remove('transit-animation')
			}
		}
		catch {}
	}
}