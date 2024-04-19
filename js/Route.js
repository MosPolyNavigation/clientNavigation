import {graph} from './app.js'

export class Route {
	activeStep
	steps
	fullDistance
	
	constructor(wayAndDistance) {
		this.fullDistance = wayAndDistance.distance
		console.log(wayAndDistance)
		let way = [...wayAndDistance.way]
		this.activeStep = 0
		let firstVertex = graph.getVertexByID(way.shift())
		this.steps = [
			new Step(firstVertex.planName,
				firstVertex.id)
		]
		for (const wayVertexId of way) {
			let lastStep = this.steps.at(- 1)
			if(graph.getVertexByID(wayVertexId).planName === lastStep.plan){
				lastStep.distance += graph.getDistanceBetween2Vertexes(lastStep.way.at(-1), wayVertexId)
				lastStep.way.push(wayVertexId)
			}
			else {
				this.steps.push(
					new Step(graph.getVertexByID(wayVertexId).planName,
						graph.getVertexByID(wayVertexId).id)
				)
			}
		}
		
		//удаляем пустые этажи (обычно лестничный пролет)
		this.steps = this.steps.filter(step => step.way.length>1)

		
		console.log(this)
	}
	
}

class Step {
	plan
	way
	distance
	
	constructor(plan, firstVertexId) {
		this.plan = plan
		this.way = [firstVertexId]
		this.distance = 0
	}
}
//
//
// setTimeout(() => {
// 	graph.getVertexByID('n-4_25').neighborData = []
// 	graph.getVertexByID('n-4_23').neighborData = []
// 	let a = new Route(graph.getShortestWayFromTo('n-406', 'n-415'))
// }, 500)
