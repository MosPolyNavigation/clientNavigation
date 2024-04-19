import {Graph} from './Graph.js';
import {PlanHandler} from './PlanHandler.js'
import {Settings} from './Settings.js'
import {Way} from './Way.js'
import {DragHandler} from "./DragHandler.js";
import Data from "./Data.js"
import {Controller} from "./Controller.js";
import {Route} from './Route.js'

//обработчик карты, передаем объект содержащий карту
export let planHandler = new PlanHandler(document.querySelector('.plan-object'))
// planHandler.$planObject.data = Settings.floors.get('N3')
planHandler.setSelectorElements(document.querySelector('.selector'),
	document.querySelector('.button-from'),
	document.querySelector('.button-to'))

export let graph
export let data = new Data()
let route

export let controller = new Controller()
window.controller = controller

data.getData().then(() => {
	console.log('Создаю граф')
	graph = new Graph(data.importedVertexes)
	graph.addStairs(data.campuses)
	window.graph = graph
	controller.setup(
		document.querySelector('.switcher'),
		document.querySelector('.floors-switcher'),
		data,
		Settings.defaultPlan,
		planHandler
	)
})

let isPlanLoaded = false
export let dragHandler
// planHandler.$planObject.addEventListener('load', () => { //при загрузке плана
// 	processGraphAndPlan()
// })

dragHandler = new DragHandler(
	document.querySelector('.drag-able'),
	document.querySelector('.scale-able'),
	document.querySelector('.map-wrapper'),
	document.querySelector('.button-plus'),
	document.querySelector('.button-minus'));

	//////Добавить параметр следующий/предыдуший или обновление
export function processGraphAndPlan(isObject = true, svgText = '', planData) {
	console.log('план загружен', Date.now())
	isPlanLoaded = true
	if (isPlanLoaded) {
		planHandler.onPlanLoad(isObject, svgText, planData)
		way.setupWay(planHandler.$svgPlan)
	}
	planHandler.$selector.classList.remove('showing-selector')
	if(planHandler.fromId !== undefined && planHandler.toId !== undefined) {
		visualGraph()
	}
}

export let way = new Way(document.querySelector('.svg-way'),)

export function activateButton(buttonClassName) {
	document.getElementsByClassName(buttonClassName)[0].classList.remove('non-active-button')
}

export function deactivateButton(buttonClassName) {
	document.getElementsByClassName(buttonClassName)[0].classList.add('non-active-button')
}
document.querySelector('.get-way').addEventListener('click', () => {
	let idVertex1 = document.getElementById('input-idPoint1').value
	let idVertex2 = document.getElementById('input-idPoint2').value
	let wayAndDistance = graph.getShortestWayFromTo(idVertex1, idVertex2)
	
	let outputContent = ''
	wayAndDistance.way.forEach(vertexId => {
		outputContent += `→ ${vertexId} `
	})
	outputContent = outputContent.substring(2)
	console.log(outputContent)
	outputContent += `<br>Длина: ${wayAndDistance.distance}`
	
	let $output = document.getElementsByClassName('output-found-way')[0]
	$output.innerHTML = outputContent

})

document.querySelector('.build-way').addEventListener('click',() => {
	way.removeOldWays()
	route = new Route(graph.getShortestWayFromTo(planHandler.fromId, planHandler.toId))
	// way.visualGraph(route)
	// let k = graph.splitArraysByFloors(graph.getShortestWayFromTo(planHandler.fromId, planHandler.toId),Settings.floors)
	// if (k.size > 2) {
	// 	planHandler.$planObject.data = Settings.floors.get(k.keys().next().value)
	// }
	// else {
		visualGraph()
	// }
})
let $doubleFloor = ''
function visualGraph(){
	planHandler.removeButtonAnimation()
	way.removeOldWays()
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

	let activeFloor = controller.getActivePlan()
	// let activeFloor = planHandler.$planObject.data.substring(planHandler.$planObject.data.lastIndexOf('/') + 1, planHandler.$planObject.data.lastIndexOf('.svg')).replace('-', '');
	console.log(activeFloor)
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
			if (firstStairIndex !== -1 && firstStairIndex !== wayAndDistanceFloor.way.length - 1 && graph.getVertexByID(wayAndDistanceFloor.way[firstStairIndex + 1]).type === 'stair') {
				$doubleFloor = document.querySelector('.button-' + keysArr[keysArr.indexOf(activeFloor)])
				let firstPart = {
					way: wayAndDistanceFloor.way.slice(0,firstStairIndex + 1),
					distance: graph.getArrayDistance(wayAndDistanceFloor.way.slice(0,firstStairIndex + 1))
				}
				let secondPart = {
					way: wayAndDistanceFloor.way.slice(firstStairIndex + 1),
					distance: graph.getArrayDistance(wayAndDistanceFloor.way.slice(firstStairIndex + 1))
				}

				way.build(graph, firstPart)
				way.build(graph, secondPart)

				let $transitAuFirst = planHandler.auditoriums.get(firstPart.way[firstPart.way.length - 1])
				$transitAuFirst.classList.toggle('transit-animation')
				$transitAuFirst.addEventListener('click',()=>{
					$buttonNextfloor.click()
					setTimeout(function() {
						planHandler.$selector.classList.remove('showing-selector')
					}, 20)
				})
			}
			else if (firstPreviousIndex !== -1 && firstPreviousIndex !== firstArr.length - 1 && graph.getVertexByID(firstArr[firstPreviousIndex + 1]).type === 'stair'){
				way.build(graph, wayAndDistanceFloor)
				$doubleFloor.classList.toggle('next-floor')
				let $transitAuSecond = planHandler.auditoriums.get(wayAndDistanceFloor.way[wayAndDistanceFloor.way.length - 1])
				$transitAuSecond.classList.toggle('transit-animation')
				$transitAuSecond.addEventListener('click',()=>{
					$doubleFloor.click()
					setTimeout(function() {
						planHandler.$selector.classList.remove('showing-selector')
					}, 20)
				})
			}
			else {
				try {
					$doubleFloor = ''
					way.build(graph, wayAndDistanceFloor)
					$doubleFloor.classList.remove('next-floor')
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


document.querySelector('.map-wrapper').onwheel = function() {
	return false
}
document.querySelector('.button-N3').addEventListener('click',()=>{
	planHandler.$planObject.data = Settings.floors.get('N3')
	way.removeOldWays()
	document.querySelector('.next-floor').classList.remove('next-floor')


})
document.querySelector('.button-N4').addEventListener('click',()=>{
	planHandler.$planObject.data = Settings.floors.get('N4')
	way.removeOldWays()
	document.querySelector('.button-N3').classList.remove('next-floor')
	document.querySelector('.button-N4').classList.remove('next-floor')

})