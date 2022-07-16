/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */

import React, { useState, forwardRef, useImperativeHandle } from "react"
import TableDragSelect from "./TableDragSelect"
import styles from "/styles/Scheduler.module.css"
import hours from "./Hours"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from "@mui/material";


let toggle = [false, false, false, false, false, false, false];
const Scheduler = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    testFn: () => {
      return handleClick()
    }
  }))


  var startDate, endDate, startTime, endTime, isGroup, groupSchedule;
  if (props.roomInfo == undefined) {
    // Dummy args
    startDate = new Date('2022-06-09');
    endDate = new Date('2022-06-15');
    startTime = 1;
    endTime = 5;
    isGroup = true;
    groupSchedule = [
      {
        scheduledDate: "2022-06-10",
        scheduledTimeList: [2, 3]
      },
      {
        scheduledDate: "2022-06-12",
        scheduledTimeList: [2, 3]
      }
    ]
  } else {
    // props args
    console.log(props)
    startDate = new Date(props.roomInfo.startDay)
    endDate = new Date(props.roomInfo.endDay)
    startTime = props.roomInfo.startTime
    endTime = props.roomInfo.endTime
    isGroup = props.isGroup
    groupSchedule = props.groupSchedule
  }
  endTime += 1;

  // mon: 0, tue: 1, ...
  const startDateTime = startDate.getTime();
  const startDay = (startDate.getDay() + 6) % 7;
  const endDay = (endDate.getDay() + 6) % 7;
  const dateDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)

  var initCells = [];
  var temp;
  for (temp = 0; temp < (endTime - startTime + 2); temp++) {
    initCells.push([false, false, false, false, false, false, false])
  }

  const [curr, changeCurr] = useState({
    cells: initCells
  });

  var tableState = [];
  var groupState = [];
  for (temp = 0; temp < parseInt((startDay + dateDiff - 1) / 7 + 1); temp++) {
    tableState.push([...initCells]);
    groupState.push([...initCells]);
  }
  tableState = JSON.parse(JSON.stringify(tableState));
  groupState = JSON.parse(JSON.stringify(groupState));

  var currDate = startDate; // Object.assign({}, startDate);
  var tableList = [];
  var tempList = [];
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
  var validDaysList = []
  var weeks = tableList.map(
    days => {
      var firstDay = days[0].getDay();
      var monday = new Date(days[0].getTime() - (firstDay - (firstDay == 0 ? -6 : 1)) * (24 * 60 * 60 * 1000));
      var validDays = [false, false, false, false, false, false, false];
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
  var times = [...Array((endTime - startTime)).keys()].map(i => i + startTime)
  if (groupSchedule != null && groupSchedule != 0 && isGroup) {
    groupSchedule.forEach(
      obj => {
        var diff = ((new Date(obj.scheduledDate)).getTime() - startDateTime) / (1000 * 3600 * 24);
        var weekIdx = Math.floor(((startDate.getDay() + 6) % 7 + diff) / 7);
        var dayIdx = (startDate.getDay() + diff + 6) % 7;
        obj.scheduledTimeList.forEach(
          timeIdx => {
            groupState[weekIdx][timeIdx - startTime][dayIdx] = true;
          }
        )
      }
    )
  }



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
    changeCurr({ cells });
    // console.log(cells);
  }

  const handleClick = () => {
    var temp = [...currTot.cellsTot];
    temp[currIdx.index] = [...curr.cells];
    var apiRequestBody = [];
    for (var i = 0; i < weeks.length; i++) {
      for (var j = 0; j < 7; j++) {
        function leftPad(value) {
          if (value >= 10) {
            return value;
          }
          return `0${value}`
        }
        var scheduledDate = [
          weeks[i][j].getFullYear(),
          leftPad(weeks[i][j].getMonth() + 1),
          leftPad(weeks[i][j].getDate())
        ].join("-");
        var scheduledTimeList = []
        for (var k = 0; k < (endTime - startTime); k++) {
          if (temp[i][k + 2][j + 1]) {
            scheduledTimeList.push(startTime + k)
          }
        }
        apiRequestBody.push({
          scheduledDate: scheduledDate,
          scheduledTimeList: scheduledTimeList
        })
      }
    }
    // console.log(apiRequestBody);
    return apiRequestBody
  };

  function getSelectionState() {
    return JSON.stringify(currTot.cellsTot);
  }

  function setSelectionState(cells_json) {
    var temp = JSON.parse(cells_json);
    console.log(temp);
    changeCurrTot({ cellsTot: temp });
    changeCurr({ cells: [...temp[0]] });
    changeCurrIdx({ index: 0 });
  }

  const handleLeft = () => {
    if (currIdx.index > 0) {
      var temp = [...currTot.cellsTot];
      temp[currIdx.index] = [...curr.cells];
      changeCurrTot({ cellsTot: temp });
      changeCurr({ cells: [...temp[currIdx.index - 1]] });
      changeCurrIdx({ index: currIdx.index - 1 });
      var currWeek = weeks[currIdx.index - 1];
      dayChanges.forEach(
        (changeText, idx) => changeText({ text: currWeek[idx].toLocaleDateString().substring(5) })
      )
      // console.log(getSelectionState());
    }
  }

  const handleRight = () => {
    if (currIdx.index < tableState.length - 1) {
      var currWeek = weeks[currIdx.index + 1];
      dayChanges.forEach(
        (changeText, idx) => {
          // console.log(currWeek[idx].toLocaleDateString())
          changeText({ text: currWeek[idx].toLocaleDateString().substring(5) })
        }
      )
      var temp = [...currTot.cellsTot]
      temp[currIdx.index] = [...curr.cells];
      changeCurrTot({ cellsTot: temp });
      changeCurr({ cells: [...temp[currIdx.index + 1]] });
      changeCurrIdx({ index: currIdx.index + 1 })
    }
  }


  return (
    <div>
      <TableDragSelect value={curr.cells} onChange={handleChange} days={""}>
        <tr>
          <td white disabled />
          {
            dayTexts.map(
              text => <td white disabled text={text.text}>{text.text}</td>
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
          <td white disabled>토</td>
          <td white disabled>일</td>
        </tr>
        {
          times.map(t =>
            <tr>
              <td white disabled time>{hours[t].time}</td>
              <td disabled={!validDaysList[currIdx.index][0] || groupState[currIdx.index][t - startTime][0]} className="mon" />
              <td disabled={!validDaysList[currIdx.index][1] || groupState[currIdx.index][t - startTime][1]} className="tue" />
              <td disabled={!validDaysList[currIdx.index][2] || groupState[currIdx.index][t - startTime][2]} className="wed" />
              <td disabled={!validDaysList[currIdx.index][3] || groupState[currIdx.index][t - startTime][3]} className="thu" />
              <td disabled={!validDaysList[currIdx.index][4] || groupState[currIdx.index][t - startTime][4]} className="fri" />
              <td disabled={!validDaysList[currIdx.index][5] || groupState[currIdx.index][t - startTime][5]} className="sat" />
              <td disabled={!validDaysList[currIdx.index][6] || groupState[currIdx.index][t - startTime][6]} className="sun" />
            </tr>
          )
        }
      </TableDragSelect>
      <IconButton  onClick={handleLeft}>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton onClick={handleRight}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );

})

export default Scheduler