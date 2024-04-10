export class Settings {
	static auditoriumColor = '#3B3C41' //цвета аудиторий
	static auditoriumsEntrances = new Map()
	static auditoriumsRusNames = new Map()
	static auditoriumsEngNames = new Map()
	static throughPassVertexes = [] //Вершины со сквозным проходом (например аудитория со сквозным проходом)
	
 //путь к плану
	// static graphName = 'resources/plans/N/N-4-GRAPH.svg' //путь к графу
	static floors = new Map()
	static wayColor = '#3CD288'
	static wayWidth = '8px'
	static vertexes = []
}

//ассоциации для сэмпла
let auditoriumsEntrances = [
	//Корпус A 1 этаж
	["a-112a", "8"], ["a-108", "6"], ["a-112v", "9"], ["a-1-stair-2", "20"], ["a-100", "33"], ["a-1-stair-1", "32"], ["a-112", "21"], ["a-113", "22"], ["a-114", "23"], ["a-115", "24"], ["a-116", "26"], ["a-117", "27"], ["a-118", "28"], ["a-119", "30"], ["a-120", "31"], ["a-1-wc-2", "29"], ["a-1-stair-5", "25"],
	//Корпус А 2 этаж
	["a-200", "27"], ["a-205", "8"], ["a-211", "17"], ["a-212", "15"], ["a-214", "14"], ["a-215", "18"], ["a-216", "20"], ["a-218", "25"], ["a-219", "22"], ["a-220", "21"], ["a-221", "19"], ["a-224", "23"], ["a-2-stair-2", "6"], ["a-2-stair-3", "26"], ["a-2-stair-4", "24"], ["a-2-wc-2", "16"],
	//Корус Н 3 этаж
	['n-3-stair-1','30'],['n-3-stair-2','5'],['n-3-stair-3','16'],
	//Корпус Н 4 этаж
	['n-4-stair-1','5'],['n-4-stair-2','17'],['n-4-stair-3','27'],['n-401','25']
]
Settings.auditoriumsEntrances = new Map(auditoriumsEntrances)

let auditoriumsRusNames = [['a-2-stair-1','Лестница #1 2 этаж А'],['a-204','А204'],['a-203','А203'],['a-205','А205'],['a-206','А206'],['a-207','А207'],['a-208','А208'],['a-209','А209'],['a-210','А210'],['a-200','А200'],['a-224','А224'],['a-216','А216'],['a-215','А215'],['a-211','А211'],['a-218','А218'],['a-219','А219'],['a-220','А220'],['a-221','А221'],['a-212','А212'],['a-2-wc-2','Туалет Ж'],['a-214','А214'],['a-202','А202'],['a-201','А201'],['a-2-wc-1','Туалет М'],['a-2-stair-2','Лестница #2 2 этаж А'],['a-2-stair-4','Лестница #4 2 этаж А'],['a-2-stair-3','Лестница #3 2 этаж А'],
	//Корпус Н этаж 3
	['n-301','Н301'],['n-302','Н302'],['n-303a','Н303А'],['n-303b','Н303Б'],['n-304','Н304'],['n-305','Н305'],['n-306','Н306'],['n-307','Н307'],['n-308','Н308'],['n-309','Н309'],['n-310','Н310'],['n-311','Н311'],['n-312','Н312'],['n-313','Н313'],['n-314','Н314'],['n-315','Н315'],['n-316','Н316'],['n-317','Н317'],['n-318','Н318'],['n-319','Н319'],['n-320','Н320'],['n-321','Н321'],['n-322','Н322'],['n-323','Н323'],['n-324','Н324'],['n-325','Н325'],['n-326','Н326'],['n-327','Н327'],['n-3-stair-1','Лестница #1 Н3'],['n-3-stair-2','Лестница #2 Н3'],['n-3-stair-3','Лестница #3 Н3'],['n-3-lift-1','Лифт #1 Н3'],['n-3-lift-2','Лифт #2 Н3'],['n-3-lift-3','Лифт #3 Н3'],['n-3-lift-4','Лифт #4 Н3'],['n-3-lift-5','Лифт #5 Н3'],['n-3-lift-6','Лифт #6 Н3'],['n-3-lift-7','Лифт #7 Н3'],['n-3-wcm-1','Мужской туалет Н3'],['n-3-wcw-1','Женский туалет Н3'],
	//Корпус Н этаж 4
	['n-401','Н401'],['n-402','Н402'],['n-405','Н405'],['n-406','Н406'],['n-407','Н407'],['n-408','Н408'],['n-409','Н409'],['n-410','Н410'],['n-411','Н411'],['n-415','Н415'],['n-416','Библиотека Н416'],['n-418','Н418'],['n-419','Н419'],['n-4-stair-1','Лестница #1 Н4'],['n-4-stair-2','Лестница #2 Н4'],['n-4-stair-3','Лестница #3 Н4'],['n-4-lift-1','Лифт #1 Н4'],['n-4-lift-2','Лифт #2 Н4'],['n-4-lift-3','Лифт #3 Н4'],['n-4-lift-4','Лифт #4 Н4'],['n-4-lift-5','Лифт #5 Н4'],['n-4-wcm-1','Мужской туалет Н4'],['n-4-wcw-1','Женский туалет Н4'],['n-4-cowork-1','Коворкинг Н4'],['n-4-u-1','Помещение Н4'],['n-4-u-2','Помещение Н4'],['n-4-u-3','Помещение Н4'],['n-4-u-4','Помещение Н4'],['n-4-u-5','Помещение Н4'],['n-4-u-6','Помещение Н4']

]

let auditoriumsEngNames = []
for (const auditoriumsRusName of auditoriumsRusNames) {
	let nameRusEng = [auditoriumsRusName[1], auditoriumsRusName[0]]
	auditoriumsEngNames.push(nameRusEng)
}

Settings.auditoriumsEngNames = new Map(auditoriumsEngNames)
Settings.auditoriumsRusNames = new Map(auditoriumsRusNames)
Settings.floors.set('N3','resources/plans/N/N-3.svg')
Settings.floors.set('N4','resources/plans/N/N-4.svg')
let throughPassVertexes = [
]
Settings.throughPassVertexes = throughPassVertexes

let JSONVertexesFloors = [
	//n-4
	'[{"id":"n-4_0","x":1580,"y":305,"type":"hallway","neighborData":[["n-4_15",103],["n-4_13",217],["n-4_51",208],["n-4-stair-2",45],["n-4-u-6",675]]},{"id":"n-4-u-6","x":1580,"y":980,"type":"crossingSpace","neighborData":[["n-4_0",675],["n-4_55",47]]},{"id":"n-4_2","x":380,"y":305,"type":"hallway","neighborData":[["n-4_21",100],["n-4-cowork-1",540],["n-4-stair-3",45]]},{"id":"n-4-cowork-1","x":920,"y":305,"type":"crossingSpace","neighborData":[["n-4_2",540],["n-4_4",2091],["n-4_17",351],["n-4_19",340]]},{"id":"n-4_4","x":3011,"y":305,"type":"hallway","neighborData":[["n-4_7",76],["n-4-cowork-1",2091],["n-4-lift-5",45]]},{"id":"n-4-lift-5","x":3011,"y":260,"type":"lift","neighborData":[["n-4_4",45]]},{"id":"n-4-lift-4","x":2935,"y":260,"type":"lift","neighborData":[["n-4_7",45]]},{"id":"n-4_7","x":2935,"y":305,"type":"hallway","neighborData":[["n-4_9",76],["n-4_4",76],["n-4-lift-4",45]]},{"id":"n-4-lift-3","x":2859,"y":260,"type":"lift","neighborData":[["n-4_9",45]]},{"id":"n-4_9","x":2859,"y":305,"type":"hallway","neighborData":[["n-4_36",74],["n-4_7",76],["n-4-lift-3",45]]},{"id":"n-411","x":2647,"y":260,"type":"entrancesToAu","neighborData":[["n-4_11",45]]},{"id":"n-4_11","x":2647,"y":305,"type":"hallway","neighborData":[["n-4_26",154],["n-4_35",133],["n-411",45]]},{"id":"n-4-lift-2","x":1797,"y":260,"type":"lift","neighborData":[["n-4_13",45]]},{"id":"n-4_13","x":1797,"y":305,"type":"hallway","neighborData":[["n-4_0",217],["n-4_32",140],["n-4-lift-2",45]]},{"id":"n-4-wcm-1","x":1477,"y":260,"type":"entrancesToAu","neighborData":[["n-4_15",45]]},{"id":"n-4_15","x":1477,"y":305,"type":"hallway","neighborData":[["n-4_17",206],["n-4_0",103],["n-4-wcm-1",45]]},{"id":"n-4-wcw-1","x":1271,"y":260,"type":"entrancesToAu","neighborData":[["n-4_17",45]]},{"id":"n-4_17","x":1271,"y":305,"type":"hallway","neighborData":[["n-4_15",206],["n-4-wcw-1",45],["n-4-cowork-1",351]]},{"id":"n-4-lift-7","x":580,"y":260,"type":"lift","neighborData":[["n-4_19",45]]},{"id":"n-4_19","x":580,"y":305,"type":"hallway","neighborData":[["n-4_59",59],["n-4-cowork-1",340],["n-4-lift-7",45]]},{"id":"n-4-lift-6","x":480,"y":260,"type":"lift","neighborData":[["n-4_21",45]]},{"id":"n-4_21","x":480,"y":305,"type":"hallway","neighborData":[["n-4_2",100],["n-4_59",41],["n-4-lift-6",45]]},{"id":"n-4_22","x":380,"y":205,"type":"hallway","neighborData":[["n-4-stair-3",55],["n-402",50]]},{"id":"n-4-stair-3","x":380,"y":260,"type":"stair","neighborData":[["n-4_22",55],["n-3-stair-3",30],["n-4_2",45]]},{"id":"n-402","x":330,"y":205,"type":"entrancesToAu","neighborData":[["n-4_22",50]]},{"id":"n-410","x":2493,"y":260,"type":"entrancesToAu","neighborData":[["n-4_26",45]]},{"id":"n-4_26","x":2493,"y":305,"type":"hallway","neighborData":[["n-4_28",240],["n-4_11",154],["n-4-u-4",45],["n-410",45]]},{"id":"n-4-u-4","x":2493,"y":350,"type":"entrancesToAu","neighborData":[["n-4_26",45]]},{"id":"n-4_28","x":2253,"y":305,"type":"hallway","neighborData":[["n-4_30",196],["n-4_26",240],["n-419",45]]},{"id":"n-419","x":2253,"y":350,"type":"entrancesToAu","neighborData":[["n-4_28",45]]},{"id":"n-4_30","x":2057,"y":305,"type":"hallway","neighborData":[["n-4_32",120],["n-4_28",196],["n-418",45]]},{"id":"n-418","x":2057,"y":350,"type":"entrancesToAu","neighborData":[["n-4_30",45]]},{"id":"n-4_32","x":1937,"y":305,"type":"hallway","neighborData":[["n-4_13",140],["n-4_30",120],["n-4-u-5",45]]},{"id":"n-4-u-5","x":1937,"y":350,"type":"entrancesToAu","neighborData":[["n-4_32",45]]},{"id":"n-4-stair-1","x":2780,"y":260,"type":"stair","neighborData":[["n-3-stair-1",30],["n-4_35",45]]},{"id":"n-4_35","x":2780,"y":305,"type":"hallway","neighborData":[["n-4_11",133],["n-4_36",5],["n-4-stair-1",45]]},{"id":"n-4_36","x":2785,"y":305,"type":"hallway","neighborData":[["n-4_37",628],["n-4_35",5],["n-4_9",74],["n-4_44",297]]},{"id":"n-4_37","x":2785,"y":933,"type":"hallway","neighborData":[["n-4_36",628],["n-4_47",126],["n-4-u-2",45]]},{"id":"n-4_38","x":2695,"y":1065,"type":"hallway","neighborData":[["n-4_39",132],["n-4-u-1",46]]},{"id":"n-4_39","x":2695,"y":933,"type":"hallway","neighborData":[["n-4_38",132],["n-4-u-2",45]]},{"id":"n-4-u-1","x":2741,"y":1065,"type":"entrancesToAu","neighborData":[["n-4_38",46]]},{"id":"n-4-u-2","x":2740,"y":933,"type":"crossingSpace","neighborData":[["n-4_39",45],["n-4_37",45]]},{"id":"n-4_42","x":2785,"y":737,"type":"hallway","neighborData":[["n-4_44",135],["n-4_47",70],["n-416",45]]},{"id":"n-416","x":2830,"y":737,"type":"entrancesToAu","neighborData":[["n-4_42",45]]},{"id":"n-4_44","x":2785,"y":602,"type":"hallway","neighborData":[["n-4_36",297],["n-4_42",135],["n-415",45]]},{"id":"n-415","x":2830,"y":602,"type":"entrancesToAu","neighborData":[["n-4_44",45]]},{"id":"n-4-u-3","x":2740,"y":807,"type":"entrancesToAu","neighborData":[["n-4_47",45]]},{"id":"n-4_47","x":2785,"y":807,"type":"hallway","neighborData":[["n-4_42",70],["n-4_37",126],["n-4-u-3",45]]},{"id":"n-4-stair-2","x":1580,"y":260,"type":"stair","neighborData":[["n-4_0",45],["n-3-stair-2",30]]},{"id":"n-4_49","x":1580,"y":777,"type":"hallway","neighborData":[["n-4_51",264],["n-4_55",156],["n-408",50]]},{"id":"n-408","x":1630,"y":777,"type":"entrancesToAu","neighborData":[["n-4_49",50]]},{"id":"n-4_51","x":1580,"y":513,"type":"hallway","neighborData":[["n-4_0",208],["n-4_49",264],["n-405",50],["n-406",50]]},{"id":"n-406","x":1630,"y":513,"type":"entrancesToAu","neighborData":[["n-4_51",50]]},{"id":"n-405","x":1530,"y":513,"type":"entrancesToAu","neighborData":[["n-4_51",50]]},{"id":"n-407","x":1530,"y":933,"type":"entrancesToAu","neighborData":[["n-4_55",50]]},{"id":"n-4_55","x":1580,"y":933,"type":"hallway","neighborData":[["n-4_49",156],["n-407",50],["n-409",50],["n-4-u-6",47]]},{"id":"n-409","x":1630,"y":933,"type":"entrancesToAu","neighborData":[["n-4_55",50]]},{"id":"n-4_57","x":521,"y":486,"type":"hallway","neighborData":[["n-4_59",181],["n-401",39]]},{"id":"n-401","x":560,"y":486,"type":"entrancesToAu","neighborData":[["n-4_57",39]]},{"id":"n-4_59","x":521,"y":305,"type":"hallway","neighborData":[["n-4_57",181],["n-4_21",41],["n-4_19",59]]}]',
	//n-3
	'[{"id":"n-3_0","x":1580,"y":1007,"type":"hallway","neighborData":[["n-3_1",702],["n-3_65",74],["n-314",50]]},{"id":"n-3_1","x":1580,"y":305,"type":"hallway","neighborData":[["n-3_0",702],["n-3_16",103],["n-3_14",104],["n-3_63",218],["n-3-stair-2",45]]},{"id":"n-3_2","x":3011,"y":305,"type":"hallway","neighborData":[["n-3_3",2927],["n-3_6",76],["n-3-lift-5",45]]},{"id":"n-3_3","x":84,"y":305,"type":"hallway","neighborData":[["n-3_2",2927],["n-3_24",156],["n-301",45]]},{"id":"n-3-lift-5","x":3011,"y":260,"type":"lift","neighborData":[["n-3_2",45]]},{"id":"n-3-lift-4","x":2935,"y":260,"type":"lift","neighborData":[["n-3_6",45]]},{"id":"n-3_6","x":2935,"y":305,"type":"hallway","neighborData":[["n-3_8",76],["n-3_2",76],["n-3-lift-4",45]]},{"id":"n-3-lift-3","x":2859,"y":260,"type":"lift","neighborData":[["n-3_8",45]]},{"id":"n-3_8","x":2859,"y":305,"type":"hallway","neighborData":[["n-3_43",74],["n-3_6",76],["n-3-lift-3",45]]},{"id":"n-316","x":2647,"y":260,"type":"entrancesToAu","neighborData":[["n-3_10",45]]},{"id":"n-3_10","x":2647,"y":305,"type":"hallway","neighborData":[["n-3_27",154],["n-3_42",133],["n-316",45]]},{"id":"n-3-lift-2","x":1797,"y":260,"type":"lift","neighborData":[["n-3_12",45]]},{"id":"n-3_12","x":1797,"y":305,"type":"hallway","neighborData":[["n-3_14",113],["n-3_35",94],["n-3-lift-2",45]]},{"id":"n-3_13","x":1684,"y":260,"type":"hallway","neighborData":[["n-3_14",45]]},{"id":"n-3_14","x":1684,"y":305,"type":"hallway","neighborData":[["n-3_13",45],["n-3_1",104],["n-3_12",113]]},{"id":"n-3-wcm-1","x":1477,"y":260,"type":"entrancesToAu","neighborData":[["n-3_16",45]]},{"id":"n-3_16","x":1477,"y":305,"type":"hallway","neighborData":[["n-3_18",206],["n-3_1",103],["n-3-wcm-1",45]]},{"id":"n-3-wcw-1","x":1271,"y":260,"type":"entrancesToAu","neighborData":[["n-3_18",45]]},{"id":"n-3_18","x":1271,"y":305,"type":"hallway","neighborData":[["n-3_37",123],["n-3_16",206],["n-3-wcw-1",45]]},{"id":"n-3-lift-7","x":580,"y":260,"type":"lift","neighborData":[["n-3_20",45]]},{"id":"n-3_20","x":580,"y":305,"type":"hallway","neighborData":[["n-3_22",100],["n-3_39",113],["n-3-lift-7",45]]},{"id":"n-3-lift-6","x":480,"y":260,"type":"lift","neighborData":[["n-3_22",45]]},{"id":"n-3_22","x":480,"y":305,"type":"hallway","neighborData":[["n-3_67",100],["n-3_20",100],["n-3-lift-6",45]]},{"id":"n-302","x":240,"y":260,"type":"entrancesToAu","neighborData":[["n-3_24",45]]},{"id":"n-3_24","x":240,"y":305,"type":"hallway","neighborData":[["n-3_3",156],["n-3_67",140],["n-302",45]]},{"id":"n-301","x":84,"y":260,"type":"entrancesToAu","neighborData":[["n-3_3",45]]},{"id":"n-317","x":2493,"y":260,"type":"entrancesToAu","neighborData":[["n-3_27",45]]},{"id":"n-3_27","x":2493,"y":305,"type":"hallway","neighborData":[["n-3_29",126],["n-3_10",154],["n-327",45],["n-317",45]]},{"id":"n-327","x":2493,"y":350,"type":"entrancesToAu","neighborData":[["n-3_27",45]]},{"id":"n-3_29","x":2367,"y":305,"type":"hallway","neighborData":[["n-3_31",174],["n-3_27",126],["n-326",45]]},{"id":"n-326","x":2367,"y":350,"type":"entrancesToAu","neighborData":[["n-3_29",45]]},{"id":"n-3_31","x":2193,"y":305,"type":"hallway","neighborData":[["n-3_33",86],["n-3_29",174],["n-325",45]]},{"id":"n-325","x":2193,"y":350,"type":"entrancesToAu","neighborData":[["n-3_31",45]]},{"id":"n-3_33","x":2107,"y":305,"type":"hallway","neighborData":[["n-3_35",216],["n-3_31",86],["n-324",45]]},{"id":"n-324","x":2107,"y":350,"type":"entrancesToAu","neighborData":[["n-3_33",45]]},{"id":"n-3_35","x":1891,"y":305,"type":"hallway","neighborData":[["n-3_12",94],["n-3_33",216],["n-323",45]]},{"id":"n-323","x":1891,"y":350,"type":"entrancesToAu","neighborData":[["n-3_35",45]]},{"id":"n-3_37","x":1148,"y":305,"type":"hallway","neighborData":[["n-3_39",455],["n-3_18",123],["n-309",45]]},{"id":"n-309","x":1148,"y":350,"type":"entrancesToAu","neighborData":[["n-3_37",45]]},{"id":"n-3_39","x":693,"y":305,"type":"hallway","neighborData":[["n-3_20",113],["n-3_37",455],["n-308",45]]},{"id":"n-308","x":693,"y":350,"type":"entrancesToAu","neighborData":[["n-3_39",45]]},{"id":"n-3-stair-1","x":2780,"y":260,"type":"stair","neighborData":[["n-4-stair-1",30],["n-3_42",45]]},{"id":"n-3_42","x":2780,"y":305,"type":"hallway","neighborData":[["n-3_10",133],["n-3_43",5],["n-3-stair-1",45]]},{"id":"n-3_43","x":2785,"y":305,"type":"hallway","neighborData":[["n-3_44",678],["n-3_42",5],["n-3_8",74],["n-3_53",232]]},{"id":"n-3_44","x":2785,"y":983,"type":"hallway","neighborData":[["n-3_43",678],["n-3_47",50],["n-322",45]]},{"id":"n-322","x":2830,"y":983,"type":"entrancesToAu","neighborData":[["n-3_44",45]]},{"id":"n-321","x":2740,"y":933,"type":"entrancesToAu","neighborData":[["n-3_47",45]]},{"id":"n-3_47","x":2785,"y":933,"type":"hallway","neighborData":[["n-3_48",216],["n-3_44",50],["n-321",45]]},{"id":"n-3_48","x":2785,"y":717,"type":"hallway","neighborData":[["n-3_50",115],["n-3_47",216],["n-320",45]]},{"id":"n-320","x":2830,"y":717,"type":"entrancesToAu","neighborData":[["n-3_48",45]]},{"id":"n-3_50","x":2785,"y":602,"type":"hallway","neighborData":[["n-3_53",65],["n-3_48",115],["n-318",45]]},{"id":"n-318","x":2830,"y":602,"type":"entrancesToAu","neighborData":[["n-3_50",45]]},{"id":"n-319","x":2740,"y":537,"type":"entrancesToAu","neighborData":[["n-3_53",45]]},{"id":"n-3_53","x":2785,"y":537,"type":"hallway","neighborData":[["n-3_43",232],["n-3_50",65],["n-319",45]]},{"id":"n-3-stair-2","x":1580,"y":260,"type":"stair","neighborData":[["n-3_1",45],["n-4-stair-2",30]]},{"id":"n-314","x":1630,"y":1007,"type":"entrancesToAu","neighborData":[["n-3_0",50]]},{"id":"n-3_56","x":1580,"y":777,"type":"hallway","neighborData":[["n-3_61",40],["n-3_65",156],["n-312",50]]},{"id":"n-312","x":1630,"y":777,"type":"entrancesToAu","neighborData":[["n-3_56",50]]},{"id":"n-3_58","x":1580,"y":584,"type":"hallway","neighborData":[["n-3_63",61],["n-3_61",153],["n-310",50]]},{"id":"n-310","x":1630,"y":584,"type":"entrancesToAu","neighborData":[["n-3_58",50]]},{"id":"n-313","x":1530,"y":737,"type":"entrancesToAu","neighborData":[["n-3_61",50]]},{"id":"n-3_61","x":1580,"y":737,"type":"hallway","neighborData":[["n-3_58",153],["n-3_56",40],["n-313",50]]},{"id":"n-311","x":1530,"y":523,"type":"entrancesToAu","neighborData":[["n-3_63",50]]},{"id":"n-3_63","x":1580,"y":523,"type":"hallway","neighborData":[["n-3_1",218],["n-3_58",61],["n-311",50]]},{"id":"n-315","x":1530,"y":933,"type":"entrancesToAu","neighborData":[["n-3_65",50]]},{"id":"n-3_65","x":1580,"y":933,"type":"hallway","neighborData":[["n-3_56",156],["n-3_0",74],["n-315",50]]},{"id":"n-3-stair-3","x":380,"y":260,"type":"stair","neighborData":[["n-3_67",45],["n-4-stair-3",30]]},{"id":"n-3_67","x":380,"y":305,"type":"hallway","neighborData":[["n-3_68",733],["n-3_24",140],["n-3_22",100],["n-3_77",178],["n-3-stair-3",45]]},{"id":"n-3_68","x":380,"y":1038,"type":"hallway","neighborData":[["n-3_67",733],["n-3_75",130],["n-307",50]]},{"id":"n-3_69","x":380,"y":563,"type":"hallway","neighborData":[["n-3_77",80],["n-3_71",140],["n-304",50]]},{"id":"n-304","x":430,"y":563,"type":"entrancesToAu","neighborData":[["n-3_69",50]]},{"id":"n-3_71","x":380,"y":703,"type":"hallway","neighborData":[["n-3_69",140],["n-3_79",65],["n-306",50]]},{"id":"n-306","x":430,"y":703,"type":"entrancesToAu","neighborData":[["n-3_71",50]]},{"id":"n-307","x":430,"y":1038,"type":"entrancesToAu","neighborData":[["n-3_68",50]]},{"id":"n-305","x":330,"y":908,"type":"entrancesToAu","neighborData":[["n-3_75",50]]},{"id":"n-3_75","x":380,"y":908,"type":"hallway","neighborData":[["n-3_79",140],["n-3_68",130],["n-305",50]]},{"id":"n-303a","x":330,"y":483,"type":"entrancesToAu","neighborData":[["n-3_77",50]]},{"id":"n-3_77","x":380,"y":483,"type":"hallway","neighborData":[["n-3_67",178],["n-3_69",80],["n-303a",50]]},{"id":"n-303a_2","x":330,"y":768,"type":"entrancesToAu","neighborData":[["n-3_79",50]]},{"id":"n-3_79","x":380,"y":768,"type":"hallway","neighborData":[["n-3_71",65],["n-3_75",140],["n-303a_2",50]]}]',
]

for (let JSONVertexesFloor of JSONVertexesFloors) {
	Settings.vertexes.push(...JSON.parse(JSONVertexesFloor))
}