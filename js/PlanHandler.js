import {Settings} from "./Settings.js";
import {activateButton, deactivateButton} from "./app.js";

export class PlanHandler {
    $planObject
    $svgPlan
    auditoriums = new Map() //map ид-аудитории: dom-элемент аудитории
    entrances = new Map() //map ид-входа: dom-элемент входа
    AuditoriumsIdEntrancesId = new Map() //ассоциация айдишников аудиторий и входов
    $selector //элемент выбора аудиторий старта и финиша
    $fromInput //текстовое поле "откуда"
    $toInput  //текстовое поле "куда"
    $bFrom //кнопка "отсюда"
    $bTo //кнопка "сюда"
    currentAuId //
    fromId
    toId

    constructor($planObject) {
        this.$planObject = $planObject //объект отображения плана
        // this.$planWrapper = $mapObject.parentElement //внешний контейнер с картами
    }

    onPlanLoad(isObject = true, svgText = '', planData) { //при загрузки плана
        this.auditoriums = new Map() //Сброс
        this.entrances = new Map()
        this.AuditoriumsIdEntrancesId = new Map()
        //Удаление старого плана и перемещение svg загруженного плана в map-objects
        let $planDocument
        if(isObject){
            $planDocument = this.$planObject.contentDocument //получаем документа плана внутри <object>
            this.$svgPlan = $planDocument.documentElement.cloneNode(true)//получаем корневой элемент svg
            $planDocument.documentElement.remove() //удаляем всё из документа <object>
        }
        else {
            console.log('adf')
            let tempElement = document.createElement('div')
            tempElement.innerHTML += svgText
            this.$svgPlan = tempElement.firstChild.cloneNode(true)
            console.log(this.$svgPlan)
        }
        for(const $oldPlan of document.querySelectorAll('.plan'))
            $oldPlan.remove() //удаляем старый план
        this.$svgPlan.removeAttribute('width')
        this.$svgPlan.removeAttribute('height')
        this.$svgPlan.classList.add('plan')
        
        this.$planObject.before(this.$svgPlan) //вставляем в map-objects загруженный план
        
        console.groupCollapsed('Помещения')
        for (let $space of this.$svgPlan.getElementById('Spaces').children) {
			if($space.id.at(0) === "!"
                || $space.tagName === 'g')
				continue
            this.auditoriums.set($space.id, $space)
            if($space.getAttribute('fill') === Settings.auditoriumColor)
                $space.classList.add('auditorium') //и добавляем аудитории соответствующий класс, для подсветки
            else {
                $space.classList.add('other-space') //и добавляем аудитории соответствующий класс, для подсветки
                $space.removeAttribute('opacity')
            }
            console.log($space);
        }
        console.groupEnd()
        console.groupCollapsed('Входы')
        for (let $entrance of this.$svgPlan.getElementById('Entrances').children) {
            this.entrances.set($entrance.id, $entrance)
            $entrance.classList.add('entrance') //и добавляем соответствующий класс для
            console.log($entrance);
        }
        console.groupEnd()

        function isEntranceOfAuditorium($entrance, $auditorium) {
            let cx = Number($entrance.getAttribute('cx'))
            let cy = Number($entrance.getAttribute('cy'))
            let x = Number($auditorium.getAttribute('x'))
            let y = Number($auditorium.getAttribute('y'))
            let width = Number($auditorium.getAttribute('width'))
            let height = Number($auditorium.getAttribute('height'))
            return (cx >= x && cx <= x + width && cy >= y && cy <= y + height)
        }
        
        let entrances = new Map(planData.entrances)
        console.log(entrances)
        for (const [auditoriumId, $auditorium] of this.auditoriums) {
            if (entrances.get(auditoriumId) !== undefined) {
                this.AuditoriumsIdEntrancesId.set(auditoriumId, entrances.get(auditoriumId))
            } else {
                for (const [entranceId, $entrance] of this.entrances) {
                    if (isEntranceOfAuditorium($entrance, $auditorium)) {
                        this.AuditoriumsIdEntrancesId.set(auditoriumId, entranceId)
                    }
                }
            }
        }
        console.log(this.AuditoriumsIdEntrancesId)

        for (const [auId, $au] of this.auditoriums) { //для каждой аудитории поставить слушатель клика
            $au.addEventListener('click', event => this.onAuditoriumClicked(auId, event))
        }
    }

    setSelectorElements($selector, $bFrom, $bTo) {
        this.$selector = $selector
        this.$selector.setAttribute('auID', '')
        this.$bFrom = $bFrom
        this.$bTo = $bTo
        this.$bFrom.addEventListener('mousedown', () => this.onBFromClicked())
        this.$bTo.addEventListener('mousedown', () => this.onBToClicked())

        this.$fromInput = document.querySelector('#input-from')
        this.$toInput = document.querySelector('#input-to')
        console.log(this.$bFrom, this.$bTo)
    }

    flipFromTo() {
        let tInputValue = this.$fromInput.value
        this.$fromInput.value = this.$toInput.value
        this.$toInput.value = tInputValue

        let tId = this.fromId
        this.fromId = this.toId
        this.toId = tId
    }

    onBFromClicked() {
        if (this.$toInput.value === Settings.auditoriumsRusNames.get(this.currentAuId)) {
            this.flipFromTo()
        } else {
            this.$fromInput.value = Settings.auditoriumsRusNames.get(this.currentAuId)
            this.fromId = this.currentAuId
        }
        this.onAuditoriumClicked(this.currentAuId, null)
        let clickedAuditoriumEntranceId = this.AuditoriumsIdEntrancesId.get(this.fromId) //ид входа в нажатую аудиторию
        for (const [entranceID, $entrance] of this.entrances) {
            if (entranceID === clickedAuditoriumEntranceId) $entrance.classList.add('selected-entrance')
        }
        if (this.fromId !== undefined && this.toId !== undefined) {
            document.querySelector('.build-way').click()
        }
    }

    onBToClicked() {
        if (this.$fromInput.value === Settings.auditoriumsRusNames.get(this.currentAuId)) {
            this.flipFromTo()
        } else {
            this.$toInput.value = Settings.auditoriumsRusNames.get(this.currentAuId)
            this.toId = this.currentAuId
        }
        this.onAuditoriumClicked(this.currentAuId, null)
        let clickedAuditoriumEntranceId = this.AuditoriumsIdEntrancesId.get(this.toId) //ид входа в нажатую аудиторию
        for (const [entranceID, $entrance] of this.entrances) {
            if (entranceID === clickedAuditoriumEntranceId) $entrance.classList.add('selected-entrance')
        }
        if (this.fromId !== undefined && this.toId !== undefined) {
            for (const [entranceID, $entrance] of this.entrances) {
                if (entranceID === clickedAuditoriumEntranceId) $entrance.classList.remove('selected-entrance')
            }
            document.querySelector('.build-way').click()
        }
    }

    onAuditoriumClicked(clickedAuId, event) { //когда нажато на аудиторию
        for (const [auditoriumID, $auditorium] of this.auditoriums) { //когда нажима
            if (auditoriumID !== clickedAuId) $auditorium.classList.remove('selected')
            else $auditorium.classList.toggle('selected')
        }

        let clickedAuditoriumEntranceId = this.AuditoriumsIdEntrancesId.get(clickedAuId) //ид входа в нажатую аудиторию
        for (const [entranceID, $entrance] of this.entrances) {
            if (entranceID !== clickedAuditoriumEntranceId && this.AuditoriumsIdEntrancesId.get(this.fromId) !== entranceID) $entrance.classList.remove('selected-entrance')
            else $entrance.classList.add('selected-entrance')
        }

        let isSelected = this.auditoriums.get(clickedAuId).classList.contains('selected')
        this.showSelector(event, isSelected, clickedAuId)

    }

    showSelector(event, isSelected, clickedAuId) {


        if (isSelected) {
            this.$selector.classList.remove('showing-selector')
            setTimeout((planHandler) => {
                planHandler.$selector.style.left = `${event.clientX}px`
                planHandler.$selector.style.top = `${event.clientY}px`
                planHandler.$selector.classList.remove('hidden-selector')
                planHandler.$selector.classList.add('showing-selector')
                this.currentAuId = clickedAuId
                if (this.currentAuId === this.fromId) deactivateButton('button-from')
                else activateButton('button-from')
                if (this.currentAuId === this.toId) deactivateButton('button-to')
                else activateButton('button-to')
            }, 20, this)
        } else {
            this.$selector.classList.remove('showing-selector')
            this.$selector.classList.add('hidden-selector')
        }
        this.$selector.setAttribute('auID', clickedAuId)
    }
    removeButtonAnimation(){
        let $arrFloorButtons = document.querySelectorAll('.floor-button')
        $arrFloorButtons.forEach(function (button){
            try {
                button.classList.remove('next-floor')
            }
            catch {}
        })
    }
    addLight(idStair, $nextFloorButton) {
        $nextFloorButton.classList.toggle('next-floor')
        let $stair = this.auditoriums.get(idStair)
        console.log($nextFloorButton)
        $stair.classList.toggle('transit-light')
        $stair.addEventListener('click',() => {
            $nextFloorButton.click()
            setTimeout(function () {
                planHandler.$selector.classList.remove('showing-selector')
            }, 20)
        })

    }
    removeOldLights() {
        this.auditoriums.forEach($auditorium => {
            if ($auditorium.classList.contains('transit-light')) {
                $auditorium.classList.remove('transit-light')
            }
        })
        console.log(document.querySelectorAll('.next-floor'))
        document.querySelectorAll('.next-floor').forEach($button => {
            $button.classList.remove('next-floor')
        })

    }
}