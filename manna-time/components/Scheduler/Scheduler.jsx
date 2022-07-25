/* eslint-disable react/jsx-key */
/* eslint-disable react/display-name */

import { Checkbox, FormControlLabel, FormGroup } from "@mui/material"

import React, { useState, useEffect, forwardRef, useImperativeHandle } from "react"
import TableDragSelect from "./TableDragSelect"
import hours from "./Hours"
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { IconButton } from "@mui/material";

class CellProperty {
  opacity = 1

  constructor(isDisabled, opacity, color) {
    this.isDisabled = isDisabled
    this.opacity = opacity
    this.color = color
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

  var startDate, endDate, startTime, endTime, isGroup;
  let groupSchedule, totalNum, groupFilterChecked, mySchedule
  let isDisabled = false
  if (props.roomInfo == undefined) {
    // Dummy args
    startDate = new Date('2022-06-09');
    endDate = new Date('2022-06-15');
    startTime = 1;
    endTime = 5;

    isGroup = props.isGroup;
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
    groupFilterChecked = [true, true]
  } else {
    // props args
    // console.log(props)
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
      // console.log(mySchedule)
      // setSelectionState(mySchedule)
    }
    isDisabled = props.isDisabled
  }
  endTime += 1;

  // mon: 0, tue: 1, ...
  const startDateTime = startDate.getTime();
  const startDay = (startDate.getDay() + 6) % 7;
  const endDay = (endDate.getDay() + 6) % 7;
  const dateDiff = (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24)

  var initCells = [];
  var initGroupCells = [];
  var temp;
  for (temp = 0; temp < (endTime - startTime + 2); temp++) {
    initCells.push([false, false, false, false, false, false, false])
    initGroupCells.push(new Array(7).fill(0))
  }

  const [curr, changeCurr] = useState({
    cells: initCells
  });

  var tableState = [];
  var filterState = [];
  var groupState = [];

  for (temp = 0; temp < parseInt((startDay + dateDiff - 1) / 7 + 1); temp++) {
    tableState.push([...initCells]);
    filterState.push([...initCells]);
    groupState.push([...initGroupCells]);
  }
  tableState = JSON.parse(JSON.stringify(tableState));
  filterState = JSON.parse(JSON.stringify(filterState));
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
  
  function groupScheduleElements(element, index, array) {
    let available = element.available
    // console.log(available)

    if (available != null && available != 0 && isGroup && groupFilterChecked[index]) {
      available.forEach(
        obj => {
          var diff = ((new Date(obj.availableDate)).getTime() - startDateTime) / (1000 * 3600 * 24);
          var weekIdx = Math.floor(((startDate.getDay() + 6) % 7 + diff) / 7);
          var dayIdx = (startDate.getDay() + diff + 6) % 7;
          obj.availableTimeList.forEach(
            timeIdx => {
              filterState[weekIdx][timeIdx - startTime][dayIdx] = true;
              groupState[weekIdx][timeIdx - startTime][dayIdx] += 1;
            }
          )
        }
      )
    }
  }

  groupSchedule.forEach(groupScheduleElements)



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
        var availableDate = [
          weeks[i][j].getFullYear(),
          leftPad(weeks[i][j].getMonth() + 1),
          leftPad(weeks[i][j].getDate())
        ].join("-");
        var availableTimeList = []
        for (var k = 0; k < (endTime - startTime); k++) {
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
    // var temp = JSON.parse(cells_json);

    // changeCurrTot({ cellsTot: temp });
    // changeCurr({ cells: [...temp[0]] });
    // changeCurrIdx({ index: 0 });

    temp = [...currTot.cellsTot]
    // console.log(temp)
    available.forEach(
      obj => {
        var diff = ((new Date(obj.availableDate)).getTime() - startDateTime) / (1000 * 3600 * 24);
        var weekIdx = Math.floor(((startDate.getDay() + 6) % 7 + diff) / 7);
        var dayIdx = (startDate.getDay() + diff + 6) % 7;
        obj.availableTimeList.forEach(
          timeIdx => {
            temp[weekIdx][timeIdx - startTime+2][dayIdx+1] = true; //행열 2개와 1개
          }
          )
        }
        )
    // console.log(temp)
    // console.log(available)
        
    changeCurrTot({ cellsTot: temp })
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

    
  useEffect(() => {
    if (mySchedule != undefined) {
      setSelectionState(mySchedule)
    }
  }, [mySchedule])
  
  const weekDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"]
  const eachRow = times.map(t => {

    const eachCell = weekDays.map((weekDay, weekIdx) => {
      // const isDisabled = (groupState[currIdx.index][t - startTime][weekIdx] ==0 ? false : true)
      const opacity = groupState[currIdx.index][t - startTime][weekIdx] / totalNum
      // opacity == 0 ? opacity = 1 : null // 아무도 신청안했을때는 색을 보여줘야하므로 opacity = 1
      // console.log(opacity)
      const color = "#FFFFFF"
  
      let cellProperty = new CellProperty(
        isDisabled, //isDisabled
        opacity,
        color
      )
      
      const key = `${weekDay}-${t}-${currIdx.index}-${isGroup}-${isDisabled}-${groupFilterChecked}`
      return (
        <td key={key} disabled={!validDaysList[currIdx.index][weekIdx] } cellProperty={cellProperty} className={weekDay} />
      )
    })

    return (
      <tr>
        <td white disabled time>{hours[t].time}</td>
        {eachCell}
      </tr>
    )
  })

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
        {eachRow}
      </TableDragSelect>
      <IconButton  onClick={handleLeft}>
        <ArrowBackIosIcon />
      </IconButton>
      <IconButton onClick={handleRight} sx={"float:right"}>
        <ArrowForwardIosIcon />
      </IconButton>
    </div>
  );

})


export default Scheduler