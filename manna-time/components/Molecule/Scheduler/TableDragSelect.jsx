import React from "react";
import clone from "clone";
import PropTypes from "prop-types";
import colors from "./Colors"
import { useSetRecoilState } from "recoil";
import { clickParticipantState, clickTimeState } from "@/src/state/ClickScheduler";

const TableDragSelectWrapper = (props) => {
  const setSelectedTime = useSetRecoilState(clickTimeState)
  const setSelectedParticipant = useSetRecoilState(clickParticipantState)
  return (
    <TableDragSelect
      value={props.value}
      onChange={props.onChange}
      days={props.days}
      setSelectedTime={setSelectedTime}
      setSelectedParticipant={setSelectedParticipant}
    >
      {props.children}
    </TableDragSelect>)
}

class TableDragSelect extends React.Component {
  static propTypes = {
    value: (props) => {
      const error = new Error(
        "Invalid prop `value` supplied to `TableDragSelect`. Validation failed."
      );
      if (!Array.isArray(props.value)) {
        return error;
      }
      if (props.value.length === 0) {
        return;
      }
      const columnCount = props.value[0].length;
      for (const row of props.value) {
        if (!Array.isArray(row) || row.length !== columnCount) {
          return error;
        }
        for (const cell of row) {
          if (typeof cell !== "boolean") {
            return error;
          }
        }
      }
    },
    maxRows: PropTypes.number,
    maxColumns: PropTypes.number,
    onSelectionStart: PropTypes.func,
    onInput: PropTypes.func,
    onChange: PropTypes.func,
    children: (props) => {
      if (TableDragSelect.propTypes.value(props)) {
        return; // Let error be handled elsewhere
      }
      const error = new Error(
        "Invalid prop `children` supplied to `TableDragSelect`. Validation failed."
      );
      const trs = React.Children.toArray(props.children);
      const rowCount = props.value.length;
      const columnCount = props.value.length === 0 ? 0 : props.value[0].length;
      if (trs.length !== rowCount) {
        return error;
      }
      for (const tr of trs) {
        const tds = React.Children.toArray(tr.props.children);
        if (tr.type !== "tr" || tds.length !== columnCount) {
          return error;
        }
        for (const td of tds) {
          if (td.type !== "td") {
            return error;
          }
        }
      }
    }
  };

  static defaultProps = {
    value: [],
    maxRows: Infinity,
    maxColumns: Infinity,
    onSelectionStart: () => { },
    onInput: () => { },
    onChange: () => { },
    setSelectedTime: () => { },
    setSelectedParticipant: () => {}
  };

  state = {
    selectionStarted: false,
    startRow: null,
    startColumn: null,
    endRow: null,
    endColumn: null,
    addMode: null
  };

  componentDidMount = () => {
    window.addEventListener("mouseup", this.handleTouchEndWindow);
    window.addEventListener("touchend", this.handleTouchEndWindow);
  };

  componentWillUnmount = () => {
    window.removeEventListener("mouseup", this.handleTouchEndWindow);
    window.removeEventListener("touchend", this.handleTouchEndWindow);
  };

  render = () => {
    return (
      <table className="table-drag-select">
        <colgroup>
          <col width={"20px"} />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
          <col />
        </colgroup>
        <tbody>{this.renderRows()}</tbody>
      </table>
    );
  };

  renderRows = () =>
    React.Children.map(this.props.children, (tr, i) => {
      return (
        <tr key={i} {...tr.props}>
          {React.Children.map(tr.props.children, (cell, j) => (
            <Cell
              key={j}
              onTouchStart={this.handleTouchStartCell}
              onTouchMove={this.handleTouchMoveCell}
              selected={this.props.value[i][j]}
              beingSelected={this.isCellBeingSelected(i, j)}
              setSelectedTime={this.props.setSelectedTime}
              setSelectedParticipant={this.props.setSelectedParticipant}
              {...cell.props}
            >
              {cell.props.children}
            </Cell>
          ))}
        </tr>
      );
    });

  handleTouchStartCell = (e) => {
    const isLeftClick = e.button === 0;
    const isTouch = e.type !== "mousedown";
    if (!this.state.selectionStarted && (isLeftClick || isTouch)) {
      e.preventDefault();
      const { row, column } = eventToCellLocation(e);
      this.props.onSelectionStart({ row, column });
      this.setState({
        selectionStarted: true,
        startRow: row,
        startColumn: column,
        endRow: row,
        endColumn: column,
        addMode: !this.props.value[row][column]
      });
      // console.log(!this.props)
    }
  };

  handleTouchMoveCell = (e) => {
    if (this.state.selectionStarted) {
      e.preventDefault();
      const { row, column } = eventToCellLocation(e);
      const { startRow, startColumn, endRow, endColumn } = this.state;

      if (endRow !== row || endColumn !== column) {
        const nextRowCount =
          startRow === null && endRow === null
            ? 0
            : Math.abs(row - startRow) + 1;
        const nextColumnCount =
          startColumn === null && endColumn === null
            ? 0
            : Math.abs(column - startColumn) + 1;

        if (nextRowCount <= this.props.maxRows) {
          this.setState({ endRow: row });
        }

        if (nextColumnCount <= this.props.maxColumns) {
          this.setState({ endColumn: column });
        }
      }
    }
  };

  handleTouchEndWindow = (e) => {
    const isLeftClick = e.button === 0;
    const isTouch = e.type !== "mousedown";
    if (this.state.selectionStarted && (isLeftClick || isTouch)) {
      const value = clone(this.props.value);
      const minRow = Math.min(this.state.startRow, this.state.endRow);
      const maxRow = Math.max(this.state.startRow, this.state.endRow);
      for (let row = minRow; row <= maxRow; row++) {
        const minColumn = Math.min(
          this.state.startColumn,
          this.state.endColumn
        );
        const maxColumn = Math.max(
          this.state.startColumn,
          this.state.endColumn
        );
        for (let column = minColumn; column <= maxColumn; column++) {
          value[row][column] = this.state.addMode;
        }
      }
      this.setState({ selectionStarted: false });
      this.props.onChange(value);
    }
  };

  isCellBeingSelected = (row, column) => {
    const minRow = Math.min(this.state.startRow, this.state.endRow);
    const maxRow = Math.max(this.state.startRow, this.state.endRow);
    const minColumn = Math.min(this.state.startColumn, this.state.endColumn);
    const maxColumn = Math.max(this.state.startColumn, this.state.endColumn);

    return (
      this.state.selectionStarted &&
      row >= minRow &&
      row <= maxRow &&
      column >= minColumn &&
      column <= maxColumn
    );
  };
}

class Cell extends React.Component {
  // This optimization gave a 10% performance boost while drag-selecting
  // cells
  shouldComponentUpdate = (nextProps) =>
    this.props.beingSelected !== nextProps.beingSelected ||
    this.props.selected !== nextProps.selected ||
    this.props.text !== nextProps.text ||
    this.props.disabled !== nextProps.disabled;

  componentDidMount = () => {
    // We need to call addEventListener ourselves so that we can pass
    // {passive: false}
    this.td.addEventListener("touchstart", this.handleTouchStart, {
      passive: false
    });
    this.td.addEventListener("touchmove", this.handleTouchMove, {
      passive: false
    });
  };

  componentWillUnmount = () => {
    this.td.removeEventListener("touchstart", this.handleTouchStart);
    this.td.removeEventListener("touchmove", this.handleTouchMove);
  };

  render = () => {
    // console.log(this.props)
    let {
      className = "",
      white,
      disabled,
      time,
      day,
      date,
      beingSelected,
      selected,
      onTouchStart,
      onTouchMove,

      cellProperty,
      ...props
    } = this.props;
    // console.log(cellProperty)
    let style = {
      overflow: "visible",
      backgroundColor: "",
    }
    if (disabled) {
      if (white) {
        className += " cell-white-disabled";
        if (time) {
          className += "-time"
        } else if (day) {
          className += "-day-of-the-week"
        } else if (date) {
          className += "-date"
        }
      } else {
        className += " cell-disabled";
      }
    } else {

      className += " cell-enabled";

      if (cellProperty != undefined) {
        if (!cellProperty.isDisabled) {
          if (selected) {
            className += " cell-selected";
          }

          if (beingSelected) {
            className += " cell-being-selected";
          }
        }

        if (!(selected || beingSelected) || cellProperty.isDisabled) {
            // style.backgroundColor = '#' + colors[Math.ceil((colors.length - 1) * cellProperty.opacity)]
            style.backgroundColor = `rgba(0, 86, 224, ${cellProperty.opacity})`
        }
      }
    }
    return (
      <td
        style={style}
        ref={(td) => (this.td = td)}
        className={className}
        onMouseDown={this.handleTouchStart}
        onMouseMove={this.handleTouchMove}
        {...props}
      >
        {cellProperty && cellProperty.calendarInfo != undefined && (
          <div className="relative overflow-y-visible top-0 pointer-events-none">
            <div
              style={{height: `${cellProperty.calendarInfo.timeLength * 18}px`, lineHeight:"120%", fontFamily:"pretendard", padding:'3px'}}
              className="absolute overflow-y-visible left-0 right-0 bg-custom-orange opacity-50 text-white"
            >
              {cellProperty.calendarInfo.summary}
            </div>
          </div>
        )}
        {this.props.children || <span>&nbsp;</span>}
      </td>
    );
  };

  handleTouchStart = (e) => {
    if (!this.props.disabled) {
      if (this.props.cellProperty != undefined) {
        if (!this.props.cellProperty.isDisabled)
          this.props.onTouchStart(e);
        else {
          this.props.setSelectedTime(this.props.cellProperty.time)
          this.props.setSelectedParticipant(this.props.cellProperty.participantNames)
        }

      }
    }
  };

  handleTouchMove = (e) => {
    if (!this.props.disabled) {
      if ((this.props.cellProperty != undefined) && (!this.props.cellProperty.isDisabled)) {
        this.props.onTouchMove(e);
      }
    }
  };
}

// Takes a mouse or touch event and returns the corresponding row and cell.
// Example:
//
// eventToCellLocation(event);
// {row: 2, column: 3}
const eventToCellLocation = (e) => {
  let target;
  // For touchmove and touchend events, e.target and e.touches[n].target are
  // wrong, so we have to rely on elementFromPoint(). For mouse clicks, we have
  // to use e.target.
  if (e.touches) {
    const touch = e.touches[0];
    target = document.elementFromPoint(touch.clientX, touch.clientY);
  } else {
    target = e.target;
    while (target.tagName !== "TD") {
      target = target.parentNode;
    }
  }
  return {
    row: target.parentNode.rowIndex,
    column: target.cellIndex
  };
};

export default TableDragSelectWrapper
