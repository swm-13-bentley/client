/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */

import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"
import {Flex} from "@chakra-ui/react"
import React, { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from "react"
import TableDragSelect from "./TableDragSelect"
import hours from "./Hours"
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from "@mui/material";

class CellProperty {
  opacity = 1

  constructor(isDisabled, opacity, isCalendar, participantNames, time) {
    this.isDisabled = isDisabled
    this.opacity = opacity
    this.isCalendar = isCalendar
    this.participantNames = participantNames
    this.time = time
  }

  setOpacity(total, availableNum) {
    this.opacity = availableNum / total
  }
}

let toggle = [false, false, false, false, false, false, false];

const Scheduler = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    testFn: () => {
      return handleClick()
    }
  }))

  let startDate, endDate, startTime, endTime, isGroup;
  let groupSchedule, totalNum, groupFilterChecked, participantNames // 필터 누를 때마다 그룹스케줄
  let isDisabled = false
  let calendarEvents = [] //비회원 캘린더 내 스케줄
  let mySchedule // 이전에 selected해놓은 내 스케줄
  if (props.roomInfo == undefined) {
    // Dummy Data
    startDate = new Date('2022-06-09');
    endDate = new Date('2022-06-15');
    startTime = 1;
    endTime = 5;

    isGroup = true
    groupSchedule = [
      {
        available: [
          {
            availableDate: "2022-06-10",
            availableTimeList: [2, 3]
          },
          {
            availableDate: "2022-06-12",
            availableTimeList: [2, 3]
          }
        ]
      },
      {
        available: [
          {
            availableDate: "2022-06-10",
            availableTimeList: [2, 4]
          },
          {
            availableDate: "2022-06-12",
            availableTimeList: [1, 3]
          }
        ]
      }
    ]
    totalNum = 2
    groupFilterChecked = [true, true]
    calendarEvents = [
      {
        scheduledDate: "2022-06-10",
        scheduledTimeList: [
          3, 4, 5
        ]
      },
      {
        scheduledDate: "2022-06-11",
        scheduledTimeList: [
          1, 2, 5
        ]
      }
    ]
  } else {
    // props args

    startDate = new Date(props.roomInfo.dates[0])
    endDate = new Date(props.roomInfo.dates[props.roomInfo.dates.length - 1])
    startTime = props.roomInfo.startTime
    endTime = props.roomInfo.endTime
    isGroup = props.isGroup
    groupSchedule = props.groupSchedule
    if (groupSchedule != undefined && groupSchedule.length > 0) {
      totalNum = groupSchedule.length
      if (props.groupFilterChecked == undefined) {
        groupFilterChecked = Array(totalNum).fill(true)
      } else { groupFilterChecked = props.groupFilterChecked }
    } else {
      groupSchedule = []
      totalNum = 0
    }
    if (props.mySchedule != undefined) {
      mySchedule = props.mySchedule.available
    }
    if (props.calendarEvents != undefined) {
      calendarEvents = props.calendarEvents
    }
    if (props.participantNames != undefined) {
      participantNames = props.participantNames
    }
    isDisabled = props.isDisabled
  }
  endTime += 1;

  // mon: 0, tue: 1, ...
  const startDateTime = startDate.getTime();
  const startDay = (startDate.getDay() + 6) % 7;
  const endDay = (endDate.getDay() + 6) % 7;
  const dateDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)

  let initCells = [];
  let initGroupCells = [];
  let temp;
  for (temp = 0; temp < (endTime - startTime + 2); temp++) {
    initCells.push([false, false, false, false, false, false, false, false]) // 시간대 : 1, 월~일 : 7 => 총 8개
    initGroupCells.push(new Array(8).fill([]))
  }

  const [curr, changeCurr] = useState({
    cells: initCells
  });
  // console.log(curr.cells)

  let tableState = [];
  let calendarState = [];
  let groupState = [];

  for (temp = 0; temp < parseInt((startDay + dateDiff) / 7 + 1); temp++) {
    tableState.push([...initCells]);
    calendarState.push([...initCells]);
    groupState.push([...initGroupCells]);
  }
  tableState = JSON.parse(JSON.stringify(tableState));
  calendarState = JSON.parse(JSON.stringify(calendarState));
  groupState = JSON.parse(JSON.stringify(groupState));



  let currDate = startDate; // Object.assign({}, startDate);
  let tableList = [];
  let tempList = [];
  while (currDate.getTime() <= endDate.getTime()) {
    if (currDate.getDay() === 1 && tempList.length > 0) {
      tableList.push(tempList);
      tempList = [currDate];
    } else {
      tempList.push(currDate);
    }
    currDate = new Date(currDate.getTime() + (24 * 60 * 60 * 1000))
  }
  if (tempList.length > 0) {
    tableList.push(tempList);
  }

  let validDaysList = []
  let weeks = tableList.map(
    days => {
      let firstDay = days[0].getDay();
      let monday = new Date(days[0].getTime() - (firstDay - (firstDay == 0 ? -6 : 1)) * (24 * 60 * 60 * 1000));
      let validDays = [false, false, false, false, false, false, false];
      days.forEach(
        day => validDays[(day.getDay() + 6) % 7] = true
      );
      validDaysList.push(validDays);
      return [
        monday,
        new Date(monday.getTime() + (24 * 60 * 60 * 1000) * 1),
        new Date(monday.getTime() + (24 * 60 * 60 * 1000) * 2),
        new Date(monday.getTime() + (24 * 60 * 60 * 1000) * 3),
        new Date(monday.getTime() + (24 * 60 * 60 * 1000) * 4),
        new Date(monday.getTime() + (24 * 60 * 60 * 1000) * 5),
        new Date(monday.getTime() + (24 * 60 * 60 * 1000) * 6),
      ]
    }
  )
  let times = [...Array((endTime - startTime)).keys()].map(i => i + startTime)

  function groupScheduleElements(element, index, array) {
    let available = element.available
    // console.log(available)

    if (available != null && available != 0 && isGroup && groupFilterChecked[index]) {
      available.forEach(
        obj => {
          let diff = ((new Date(obj.availableDate)).getTime() - startDateTime) / (1000 * 3600 * 24);
          let weekIdx = Math.floor(((startDate.getDay() + 6) % 7 + diff) / 7);
          let dayIdx = (startDate.getDay() + diff + 6) % 7;
          obj.availableTimeList.forEach(
            timeIdx => {
              groupState[weekIdx][timeIdx - startTime][dayIdx].push(participantNames[index]);
            }
          )
        }
      )
    }
  }

  groupSchedule.forEach(groupScheduleElements)

  function calendarElements(events) {
    if (events != null && events != 0 && isGroup) {
      events.forEach(
        obj => {
          let diff = ((new Date(obj.scheduledDate)).getTime() - startDateTime) / (1000 * 3600 * 24);
          let weekIdx = Math.floor(((startDate.getDay() + 6) % 7 + diff) / 7);
          let dayIdx = (startDate.getDay() + diff + 6) % 7;
          obj.scheduledTimeList.forEach(
            timeIdx => {
              calendarState[weekIdx][timeIdx - startTime][dayIdx] = true;
            }
          )
        }
      )
    }
    // console.log(calendarState)
  }

  calendarElements(calendarEvents)

  const [currTot, changeCurrTot] = useState({ cellsTot: tableState });
  const [currIdx, changeCurrIdx] = useState({ index: 0 });
  const [monText, changeMonText] = useState({ text: weeks[0][0].toLocaleDateString().substring(5) });
  const [tueText, changeTueText] = useState({ text: weeks[0][1].toLocaleDateString().substring(5) });
  const [wedText, changeWedText] = useState({ text: weeks[0][2].toLocaleDateString().substring(5) });
  const [thuText, changeThuText] = useState({ text: weeks[0][3].toLocaleDateString().substring(5) });
  const [friText, changeFriText] = useState({ text: weeks[0][4].toLocaleDateString().substring(5) });
  const [satText, changeSatText] = useState({ text: weeks[0][5].toLocaleDateString().substring(5) });
  const [sunText, changeSunText] = useState({ text: weeks[0][6].toLocaleDateString().substring(5) });
  const dayTexts = [monText, tueText, wedText, thuText, friText, satText, sunText];
  const dayChanges = [changeMonText, changeTueText, changeWedText, changeThuText, changeFriText, changeSatText, changeSunText];

  function handleChange(cells) {
    changeCurr({ cells : cells });
  }

  const handleClick = () => {
    let temp = [...currTot.cellsTot];
    temp[currIdx.index] = [...curr.cells];
    let apiRequestBody = [];

    for (let i = 0; i < weeks.length; i++) {
      for (let j = 0; j < 7; j++) {
        function leftPad(value) {
          if (value >= 10) {
            return value;
          }
          return `0${value}`
        }
        let availableDate = [
          weeks[i][j].getFullYear(),
          leftPad(weeks[i][j].getMonth() + 1),
          leftPad(weeks[i][j].getDate())
        ].join("-");
        let availableTimeList = []
        for (let k = 0; k < (endTime - startTime); k++) {
          if (temp[i][k + 2][j + 1]) {
            availableTimeList.push(startTime + k)
          }
        }
        apiRequestBody.push({
          availableDate: availableDate,
          availableTimeList: availableTimeList
        })
      }
    }
    // console.log(apiRequestBody);
    return apiRequestBody
  };

  function getSelectionState() {
    return JSON.stringify(currTot.cellsTot);
  }

  function setSelectionState(available) {

    temp = [...currTot.cellsTot]

    available.forEach(
      obj => {
        let diff = ((new Date(obj.availableDate)).getTime() - startDateTime) / (1000 * 3600 * 24);
        let weekIdx = Math.floor(((startDate.getDay() + 6) % 7 + diff) / 7);
        let dayIdx = (startDate.getDay() + diff + 6) % 7;
        obj.availableTimeList.forEach(
          timeIdx => {
            temp[weekIdx][timeIdx - startTime + 2][dayIdx + 1] = true; //행열 2개와 1개
          }
        )
      }
    )

    changeCurrTot({ cellsTot: temp })
    changeCurr({ cells: [...temp[0]] }); //동기처리 위해 updater 함수 사용 -> 실패 ㅜㅜ
    changeCurrIdx({ index: 0 });
  }

  const handleLeft = () => {
    if (currIdx.index > 0) {
      let temp = [...currTot.cellsTot];
      temp[currIdx.index] = [...curr.cells];
      changeCurrTot({ cellsTot: temp });
      changeCurr({ cells: [...temp[currIdx.index - 1]] });
      changeCurrIdx({ index: currIdx.index - 1 });
      let currWeek = weeks[currIdx.index - 1];
      dayChanges.forEach(
        (changeText, idx) => changeText({ text: currWeek[idx].toLocaleDateString().substring(5) })
      )
      // console.log(getSelectionState());
    }
  }

  const handleRight = () => {
    if (currIdx.index < tableState.length - 1) {
      let currWeek = weeks[currIdx.index + 1];
      dayChanges.forEach(
        (changeText, idx) => {
          // console.log(currWeek[idx].toLocaleDateString())
          changeText({ text: currWeek[idx].toLocaleDateString().substring(5) })
        }
      )
      let temp = [...currTot.cellsTot]
      temp[currIdx.index] = [...curr.cells];
      changeCurrTot({ cellsTot: temp });
      changeCurr({ cells: [...temp[currIdx.index + 1]] });
      changeCurrIdx({ index: currIdx.index + 1 })
    }
  }


  useEffect(() => {
    if (mySchedule != undefined) {
      setSelectionState(mySchedule)
    }
  }, [mySchedule])

  const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
  const weekDaysKo = ["월", "화", "수", "목", "금", "토", "일"]

  const eachRow = times.map(t => {

    const eachCell = weekDays.map((weekDay, weekIdx) => {
      // const isDisabled = (groupState[currIdx.index][t - startTime][weekIdx] ==0 ? false : true)
      const opacity = groupState[currIdx.index][t - startTime][weekIdx].length / totalNum
      // opacity == 0 ? opacity = 1 : null // 아무도 신청안했을때는 색을 보여줘야하므로 opacity = 1
      // console.log(opacity)
      const isCalendar = calendarState[currIdx.index][t - startTime][weekIdx]
      // const color = "#FFFFFF"

      let cellProperty = new CellProperty(
        isDisabled,
        opacity,
        // color,
        isCalendar,
        groupState[currIdx.index][t - startTime][weekIdx],
        `${hours[t%48].realTime} ~ ${hours[(t+1)%48].realTime}`
      )

      const key = `${weekDay}-${t}-${currIdx.index}-${isGroup}-${isDisabled}-${groupFilterChecked}`
      return (
        <td
          key={key}
          disabled={!validDaysList[currIdx.index][weekIdx]}
          cellProperty={cellProperty}
          className={weekDay}
        />
      )
    })

    return (
      <tr>
        <td white disabled time>{hours[t].time}</td>
        {eachCell}
      </tr>
    )
  })

  const onDateClick = (colIdx) => {
    const timeDiff = endTime - startTime
    const isAllSelected = true

    let temp = [...curr.cells];
    for (let i = 0; i < timeDiff; i++) {
      isAllSelected &= temp[i + 2][colIdx + 1]
    }
    for (let i = 0; i < timeDiff; i++) {
      temp[i + 2][colIdx + 1] = !isAllSelected
    }

    handleChange(temp);
  }

  return (
    <div>

      <Flex>
        <IconButton onClick={handleLeft} size="small">
          <ArrowBackIosNewIcon fontSize="small"/>
        </IconButton>
      <TableDragSelect value={curr.cells} onChange={handleChange} days={""}>
        <tr>
          <td white disabled />
          {
            dayTexts.map(
              (text,index) => <td white disabled text={text.text}>{text.text}</td>
            )
          }
        </tr>
        <tr>
          <td white disabled />
          <td white disabled>월</td>
          <td white disabled>화</td>
          <td white disabled>수</td>
          <td white disabled>목</td>
          <td white disabled>금</td>
          <td white disabled className=" text-red-600">토</td>
          <td white disabled className=" text-red-600">일</td>
        </tr>
        {eachRow}
      </TableDragSelect >
        <IconButton onClick={handleRight} sx={"float:right"} size="small">
          <ArrowForwardIosIcon fontSize="small"/>
        </IconButton>
      </Flex>
    </div>

  );

})


export default Scheduler