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
	graph.addCrossingsBCorpuses(data.campuses)
	window.graph = graph
	controller.setup(
		document.querySelector('.switcher'),
		document.querySelector('.floors-switcher'),
		data,
		Settings.defaultPlan
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
		route.changeActiveStep(controller.getActivePlan())
		way.visualGraph(route)
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
	startNewRoute(planHandler.fromId, planHandler.toId)
})

function startNewRoute(fromId, toId) {
	planHandler.fromId = fromId
	planHandler.toId = toId
	way.removeOldWays()
	route = new Route(graph.getShortestWayFromTo(fromId, toId))
	window.route = route
	controller.changePlan(route.steps[0].plan, data).then()
	document.querySelector(`label:has(input[value=${route.steps[route.activeStep].plan}])`).click()
}

window.startNewRoute = startNewRoute

function nextStep() {
	if(route && (route.steps.length - 1 !== route.activeStep)) {
	controller.changePlan(route.steps[route.activeStep + 1].plan, data).then()
	}
	else {
		console.log('Это был последний этап')
	}
}
window.animationFlag = 'red'
function hideAllExcept() {
	document.querySelector('.scale-buttons').style.visibility = 'hidden'
	document.querySelector('.floors-switcher').style.visibility = 'hidden'
	document.querySelector('.menu').style.visibility = 'hidden'
	document.querySelector('.menu').style.width = '0'
	document.querySelector('.section-main').style.gap = '0'
	document.querySelector('.map-wrapper').style.width = '100%'
	document.querySelector('.map-wrapper').style.height = '100%'
	document.querySelector('.map-wrapper').style.border = '50px solid transparent'
	animationFlag = 'green'
}
function returnAllExcept() {
	document.querySelector('.scale-buttons').style.visibility = 'visible'
	document.querySelector('.floors-switcher').style.visibility = 'visible'
	document.querySelector('.menu').style.visibility = 'visible'
	document.querySelector('.menu').style.width = '150px'
	document.querySelector('.section-main').style.gap = '40px'
	document.querySelector('.map-wrapper').style.width = '80%'
	document.querySelector('.map-wrapper').style.height = '80%'
	document.querySelector('.map-wrapper').style.border = ' #3B3C41 solid 3px'
	animationFlag = 'red'
}
window.hideAllExcept = hideAllExcept
window.returnAllExcept = returnAllExcept
window.nextStep = nextStep

document.querySelector('.map-wrapper').onwheel = function(e) {
	e.preventDefault()
	return false
}
document.querySelector('.section-main').onwheel = function(e) {
	e.preventDefault()
	return false
}
document.querySelector('.section-main').ontouchmove = function() {
	// e.preventDefault()
	// document.querySelector('.section-main').innerHTML += e.target.tagName
	return false
}
