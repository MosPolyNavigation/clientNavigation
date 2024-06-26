export class Settings {
	static auditoriumColor = '#3B3C41' //цвета аудиторий
	static auditoriumsRusNames = new Map()
	static auditoriumsEngNames = new Map()
	static throughPassVertexes = [] //Вершины со сквозным проходом (например аудитория со сквозным проходом)
	static floors = new Map()
	static wayColor = '#3CD288'
	static wayWidth = '8px'
	static defaultPlan = 'A-0'
	static dataServer = 'https://mospolynavigation.github.io/navigationData'
	// static dataServer = 'http://127.0.0.1:5500'
}

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

