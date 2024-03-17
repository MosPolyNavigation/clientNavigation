import {Graph} from './Graph.js';
import {PlanHandler} from './PlanHandler.js'
import {Settings} from './Settings.js'
import {Way} from './Way.js'
import {DragHandler} from "./DragHandler.js";

//обработчик карты, передаем объект содержащий карту
export let planHandler = new PlanHandler(document.querySelector('.plan-object'))
planHandler.$planObject.data = Settings.floors.get('N3')
planHandler.setSelectorElements(document.querySelector('.selector'),
	document.querySelector('.button-from'),
	document.querySelector('.button-to'))

export let graph = new Graph(Settings.vertexes)

let isPlanLoaded = false
export let dragHandler
planHandler.$planObject.addEventListener('load', () => { //при загрузке плана
	console.log('план загружен', Date.now())
	isPlanLoaded = true
	processGraphAndPlan()
})

dragHandler = new DragHandler(
	document.querySelector('.drag-able'),
	document.querySelector('.scale-able'),
	document.querySelector('.map-wrapper'),
	document.querySelector('.button-plus'),
	document.querySelector('.button-minus'));

function processGraphAndPlan() {
	if (isPlanLoaded) {
		planHandler.onPlanLoad()
		way.setupWay(planHandler.$svgPlan)
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
	visualGraph()
	
})

document.querySelector('.build-way').addEventListener('click',() => {
	let k = graph.getShortestWayFromTo(planHandler.fromId, planHandler.toId)
	if (graph.splitArraysByFloors(k,Settings.floors).size > 2) {
		planHandler.$planObject.data = Settings.floors.get(graph.splitArraysByFloors(k, Settings.floors).keys().next().value)
	}
	visualGraph()
})
function visualGraph(){
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
	for (let key of floorWays.keys()) {
		if (key === activeFloor) {
			let wayAndDistanceFloor = {
				way: graph.splitArraysByFloors(wayAndDistance, Settings.floors).get(key)[0],
				distance: graph.splitArraysByFloors(wayAndDistance, Settings.floors).get(key)[1]
			}
			way.build(graph, wayAndDistanceFloor)
		}
	}
	// else {
	// 	way.build(graph, wayAndDistance)
	// }

}

document.querySelector('.map-wrapper').onwheel = function() {
	return false
}
document.querySelector('.button-N3').addEventListener('click',()=>{
	planHandler.$planObject.data = Settings.floors.get('N3')
	way.removeOldWays()
	visualGraph()
})
document.querySelector('.button-N4').addEventListener('click',()=>{
	planHandler.$planObject.data = Settings.floors.get('N4')
	way.removeOldWays()
	visualGraph()

})