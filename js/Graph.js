import {Settings} from "./Settings.js";

class Vertex {
	constructor(x = 0, y = 0, id = '', type = '', neighborData = []) {
		this.id = id
		this.x = x
		this.y = y
		this.type = type
		this.neighborData = neighborData
	}
}

export class Graph {
	vertexes = [] //список вершин
	$graphObject
	floorName = ''

	constructor(staticVertexes) {
		for (let staticVertex of staticVertexes) {
			this.vertexes.push(new Vertex(
				staticVertex.x,
				staticVertex.y,
				staticVertex.id,
				staticVertex.type,
				[...staticVertex.neighborData]
			))
		}
		console.log(this.vertexes)
	}

	// getVertexByXY(x, y) {
	// 	return this.vertexes.find(vertex => {
	// 		if(vertex.x === x && vertex.y === y) return true
	// 	})
	// } //возвращает объект вершины по координатам

	getVertexByID(id = '') {
		return this.vertexes.find(vertex => {
			if (vertex.id === id) return true
		})
	} //возвращает объект вершины по id

	getShortestWayFromTo(idVertex1, idVertex2) {
		let start = Date.now()

		function isVertexNeedCheck(vertex) {
			return (vertex.type === 'hallway' ||
				vertex.type === 'lift' ||
				vertex.type === 'stair' ||
				vertex.type === 'corpusTransition' ||
				vertex.type === 'crossingSpace' ||
				vertex.id === idVertex1 ||
				vertex.id === idVertex2 ||
				Settings.throughPassVertexes.includes(vertex.id)
			)
		}

		let filteredVertexes = this.vertexes.filter((vertex) => isVertexNeedCheck(vertex))
		//Список вершин находящиеся только в коридорах
		let distances = new Map() //расстояния до вершин от начальной точки (старта)
		let ways = new Map() //маршруты из точек
		for (let vertex of filteredVertexes) { // для всех вершин устанавливаем бесконечную длину пути
			distances.set(vertex.id, Infinity)
			ways.set(vertex.id, [])
		}
		distances.set(idVertex1, 0) //для начальной вершины длина пути = 0

		let finals = new Set() //вершины с окончательной длиной (обработанные вершины)

		let currentVertexID = idVertex1 //ид обрабатываемой вершины
		// for (let i = 0; i < 2; i ++) {
		let iterations = [0, 0] //счётчик количества итераций внешнего и внутреннего циклов
		let isEndVertexInFinals = false //Флаг находится ли конечная вершина в обработанных
		while (finals.size !== filteredVertexes.length && !isEndVertexInFinals) { //пока не посетили все вершины (или пока не обнаружено, что
			// граф не связный) или пока не обработана конечная вершина
			iterations[0] += 1

			//релаксации для соседних вершин
			let currentVertexDistance = distances.get(currentVertexID) //длина до обрабатываемой вершины
			for (let [neighborId, distanceToNeighbor] of this.getVertexByID(currentVertexID).neighborData) { //для всех айдишников соседей вершины по айди
				if (!filteredVertexes.includes(this.getVertexByID(neighborId)))
					continue
				iterations[1] += 1
				let distanceBetweenCurrentAndNeighbor = distanceToNeighbor
				//расстояние между обрабатываемой и соседней вершиной
				let neighborDistance = distances.get(neighborId) //расстояние до соседней вершины от старта

				//если расстояние до обр верш + между соседней < расст до соседней вершины от старта
				if (currentVertexDistance + distanceBetweenCurrentAndNeighbor < neighborDistance) {
					//обновляем расстояние до соседней вершины
					distances.set(neighborId, currentVertexDistance + distanceBetweenCurrentAndNeighbor)
					//и путь для нёё, как путь до текущей вершины + текущая вершина
					let wayToRelaxingVertex = Array.from(ways.get(currentVertexID))
					wayToRelaxingVertex.push(currentVertexID)
					ways.set(neighborId, wayToRelaxingVertex)
				}

			}

			finals.add(currentVertexID) //помечаем текущую вершину как обработканную
			if (currentVertexID === idVertex2)
				isEndVertexInFinals = true
			//поиск следующей обрабатываемой вершины (необработанная вершина с наименьшим расстоянием от начала)
			let minDistance = Infinity
			let nextVertexID = ''
			for (let [id, distance] of distances) {
				if (distance < minDistance && (!finals.has(id))) {
					minDistance = distance
					nextVertexID = id
					// console.log(minDistance, nextVertexID)
				}
			}
			if (minDistance === Infinity) //если граф несвязный то закончить поиск путей
				break
			currentVertexID = nextVertexID
		}

		for (let [id, way] of ways) {
			way.push(id)
		}

		// console.log(distances)
		console.log((idVertex2))
		console.log(`Путь найден за ${Date.now() - start} миллисекунд с количеством итераций ${iterations[0]}, ${iterations[1]} и количеством вершин ${filteredVertexes.length}`)
		return {
			way: ways.get(idVertex2),
			distance: Math.floor(distances.get(idVertex2))
		}
	}
	splitArraysByFloors(waysMap,floorsMap) {
		let resultArrays = new Map();
		// Проходимся по каждой строке из массива
		waysMap.way.forEach(vertex => {
			// Преобразуем символы в верхний регистр
			let symbol = vertex.toUpperCase().replace('-', '');
			// Проходимся по каждому ключу из floorsMap
			for (let [floorKey, floorValue] of floorsMap) {
				// Если символ из начала строки соответствует ключу из floorsMap
				symbol = symbol.substring(0,floorKey.length)
				if (symbol === floorKey) {
					// Если для этого ключа еще нет подмассива, создаем его
					if (!resultArrays.has(floorKey)) {
						resultArrays.set(floorKey, []);
					}
					resultArrays.get(floorKey).push(vertex);
				}
			}
		})
		// Считаем дистанцию пути на каждом этаже по отдельности
		for (let [key, value] of resultArrays) {
			let floorDistance = 0
			for (let i = 0; i < value.length - 1; i++) {
				let neighborArr = Settings.vertexes.find(obj => obj.id === value[i]).neighborData
				floorDistance +=  neighborArr.find(subbaray => subbaray[0] === value[i+1])[1]
			}
			resultArrays.set(key,[value,floorDistance])

		}
		resultArrays.set('distance', waysMap.distance);
		return resultArrays;
	}
}