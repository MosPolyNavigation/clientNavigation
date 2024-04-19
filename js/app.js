import {Graph} from './Graph.js';
import {PlanHandler} from './PlanHandler.js'
import {Settings} from './Settings.js'
import {Way} from './Way.js'
import {DragHandler} from "./DragHandler.js";
import Data from "./Data.js"

//обработчик карты, передаем объект содержащий карту
export let planHandler = new PlanHandler(document.querySelector('.plan-object'))
planHandler.$planObject.data = Settings.floors.get('N3')
planHandler.setSelectorElements(document.querySelector('.selector'),
	document.querySelector('.button-from'),
	document.querySelector('.button-to'))

export let graph
export let data = new Data()

data.getData().then((a) => {
	console.log('Создаю граф')
	graph = new Graph(data.importedVertexes)
	graph.addStairs(data.campuses)
	window.graph = graph
})

let isPlanLoaded = false
export let dragHandler
planHandler.$planObject.addEventListener('load', () => { //при загрузке плана
	console.log('план загружен', Date.now())
	isPlanLoaded = true
	processGraphAndPlan()
	planHandler.$selector.classList.remove('showing-selector')
	if(planHandler.fromId !== undefined && planHandler.toId !== undefined) {
		way.visualGraph(graph)
	}
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

})
document.querySelector('.build-way').addEventListener('click',() => {
	way.removeOldWays()
	let k = graph.splitArraysByFloors(graph.getShortestWayFromTo(planHandler.fromId, planHandler.toId),Settings.floors)
	if (k.size > 2) {
		planHandler.$planObject.data = Settings.floors.get(k.keys().next().value)
		if (graph.getStepRoute(k) !== false) {
			window.stepRoute = graph.getStepRoute(k)
			window.stepRoute.set('activeStep',1)
		}
		else {
			window.stepRoute = undefined
		}
	}
	else {
		window.stepRoute = undefined
		way.visualGraph(graph)
	}
})



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