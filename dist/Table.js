"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.includes.js");

require("core-js/modules/es.array.sort.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.string.split.js");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

require("./table.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/**
 * Table component smart
 */
const Table = props => {
  const {
    state
  } = props;
  const [show, setShow] = (0, _react.useState)(10);
  const refShow = (0, _react.useRef)();
  const [start, setStart] = (0, _react.useState)(0);
  const [sortActive, setSortActive] = (0, _react.useState)(false);
  const [arrayEmployee, setArrayEmployee] = (0, _react.useState)(state.employee.slice(start, show));
  /**
   * Search filters employee data based on the user's search
   * @param {String} search user search
   */

  const Search = search => {
    setArrayEmployee(state.employee.filter(employee => {
      if (employee.FirstName.toLowerCase().includes(search.toLowerCase()) || employee.LastName.toLowerCase().includes(search.toLowerCase()) || employee.StartDate.toLowerCase().includes(search.toLowerCase()) || employee.Department.toLowerCase().includes(search.toLowerCase()) || employee.DateBirth.toLowerCase().includes(search.toLowerCase()) || employee.Street.toLowerCase().includes(search.toLowerCase()) || employee.City.toLowerCase().includes(search.toLowerCase()) || employee.State.toLowerCase().includes(search.toLowerCase()) || employee.ZipCode.toLowerCase().includes(search.toLowerCase())) {
        return true;
      }

      return false;
    }).slice(0, parseInt(refShow.current.value)));
  };
  /**
   * InitShow limit of items
   * @param {Number} value
   */


  const InitShow = value => {
    setStart(0);
    setShow(value);
    setArrayEmployee(state.employee.slice(0, value));
  };
  /**
   * Sort sort employee data
   * @param {String} type Text or Date or Number
   * @param {String} action item to sort
   */


  const Sort = (type, action) => {
    switch (type) {
      case 'Text':
        setArrayEmployee(arrayEmployee.sort((a, b) => {
          let valueA;
          let valueB;

          switch (action) {
            case 'FirstName':
              valueA = a.FirstName.toLowerCase();
              valueB = b.FirstName.toLowerCase();
              break;

            case 'LastName':
              valueA = a.LastName.toLowerCase();
              valueB = b.LastName.toLowerCase();
              break;

            case 'Department':
              valueA = a.Department.toLowerCase();
              valueB = b.Department.toLowerCase();
              break;

            case 'Street':
              valueA = a.Street.toLowerCase();
              valueB = b.Street.toLowerCase();
              break;

            case 'City':
              valueA = a.City.toLowerCase();
              valueB = b.City.toLowerCase();
              break;

            case 'State':
              valueA = a.State.toLowerCase();
              valueB = b.State.toLowerCase();
              break;

            default:
              valueA = a.FirstName.toLowerCase();
              valueB = b.FirstName.toLowerCase();
              break;
          }

          if (!sortActive) {
            setSortActive(true);
            if (valueA < valueB) return -1;else return 1;
          } else {
            setSortActive(false);
            if (valueA < valueB) return 1;else return -1;
          }
        }));
        break;

      case 'Date':
        setArrayEmployee(arrayEmployee.sort((a, b) => {
          let valueA;
          let valueB;

          switch (action) {
            case 'StartDate':
              valueA = parseInt(a.StartDate.split('/').join(''));
              valueB = parseInt(b.StartDate.split('/').join(''));
              break;

            case 'DateBirth':
              valueA = parseInt(a.DateBirth.split('/').join(''));
              valueB = parseInt(b.DateBirth.split('/').join(''));
              break;

            default:
              valueA = parseInt(a.StartDate.split('/').join(''));
              valueB = parseInt(b.StartDate.split('/').join(''));
              break;
          }

          if (!sortActive) {
            setSortActive(true);
            if (valueA < valueB) return 1;else return -1;
          } else {
            setSortActive(false);
            if (valueA < valueB) return -1;else return 1;
          }
        }));
        setSortActive(!sortActive);
        break;

      case 'Number':
        setArrayEmployee(arrayEmployee.sort((a, b) => {
          const valueA = parseInt(a.StartDate);
          const valueB = parseInt(b.StartDate);

          if (!sortActive) {
            setSortActive(true);
            if (valueA < valueB) return -1;else return 1;
          } else {
            setSortActive(false);
            if (valueA < valueB) return 1;else return -1;
          }
        }));
        setSortActive(!sortActive);
        break;

      default:
        break;
    }
  };
  /**
   * NextTable display the following data
   */


  const NextTable = () => {
    if (state.employee.length > show) {
      const newStart = start + parseInt(refShow.current.value);
      const newShow = show + parseInt(refShow.current.value);
      setStart(newStart);
      setShow(newShow);
      setArrayEmployee(state.employee.slice(newStart, newShow));
    }
  };
  /**
   * PreviousTable display previous data
   */


  const PreviousTable = () => {
    if (start !== 0) {
      const newStart = start - parseInt(refShow.current.value);
      const newShow = show - parseInt(refShow.current.value);
      setStart(newStart);
      setShow(newShow);
      setArrayEmployee(state.employee.slice(newStart, newShow));
    }
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: "listEmployee"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "showSearch"
  }, /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "show"
  }, "Show", /*#__PURE__*/_react.default.createElement("select", {
    id: "show",
    ref: refShow,
    onChange: e => InitShow(parseInt(e.target.value))
  }, /*#__PURE__*/_react.default.createElement("option", null, "10"), /*#__PURE__*/_react.default.createElement("option", null, "25"), /*#__PURE__*/_react.default.createElement("option", null, "50"), /*#__PURE__*/_react.default.createElement("option", null, "100")), "entries")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "search"
  }, "Search: "), /*#__PURE__*/_react.default.createElement("input", {
    type: "search",
    id: "search",
    onChange: e => Search(e.target.value)
  }))), /*#__PURE__*/_react.default.createElement("table", {
    className: "table"
  }, /*#__PURE__*/_react.default.createElement("thead", null, /*#__PURE__*/_react.default.createElement("tr", {
    role: "row"
  }, /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => Sort('Text', 'FirstName')
  }, "First Name"), /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => Sort('Text', 'LastName')
  }, "Last Name"), /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => Sort('Date', 'StartDate')
  }, "Start Date"), /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => Sort('Text', 'Department')
  }, "Department"), /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => Sort('Date', 'DateBirth')
  }, "Date of Birth"), /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => Sort('Text', 'Street')
  }, "Street"), /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => Sort('Text', 'City')
  }, "City"), /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => Sort('Text', 'State')
  }, "State"), /*#__PURE__*/_react.default.createElement("th", {
    onClick: () => Sort('Number', 'ZipCode')
  }, "Zip Code"))), /*#__PURE__*/_react.default.createElement("tbody", null, state.employee.length > 0 ? arrayEmployee.length > 0 ? arrayEmployee.map((employee, index) => /*#__PURE__*/_react.default.createElement("tr", {
    role: "row",
    key: index
  }, /*#__PURE__*/_react.default.createElement("td", null, employee.FirstName), /*#__PURE__*/_react.default.createElement("td", null, employee.LastName), /*#__PURE__*/_react.default.createElement("td", null, employee.StartDate), /*#__PURE__*/_react.default.createElement("td", null, employee.Department), /*#__PURE__*/_react.default.createElement("td", null, employee.DateBirth), /*#__PURE__*/_react.default.createElement("td", null, employee.Street), /*#__PURE__*/_react.default.createElement("td", null, employee.City), /*#__PURE__*/_react.default.createElement("td", null, employee.State), /*#__PURE__*/_react.default.createElement("td", null, employee.ZipCode))) : /*#__PURE__*/_react.default.createElement("tr", {
    role: "row"
  }, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: "9"
  }, "No matching records found")) : /*#__PURE__*/_react.default.createElement("tr", {
    role: "row"
  }, /*#__PURE__*/_react.default.createElement("td", {
    colSpan: "9"
  }, "No data available in table")))), /*#__PURE__*/_react.default.createElement("div", {
    className: "showingPreviousOrNext"
  }, /*#__PURE__*/_react.default.createElement("div", null, state.employee.length > 0 ? /*#__PURE__*/_react.default.createElement("p", null, "Showing ", start + 1, " to ", show > state.employee.length ? state.employee.length : show, " of ", state.employee.length, " entries") : /*#__PURE__*/_react.default.createElement("p", null, "Showing 0 to 0 of 0 entries")), /*#__PURE__*/_react.default.createElement("div", null, /*#__PURE__*/_react.default.createElement("p", null, /*#__PURE__*/_react.default.createElement("span", {
    onClick: PreviousTable
  }, "Previous"), /*#__PURE__*/_react.default.createElement("span", {
    onClick: NextTable
  }, "Next")))));
};

Table.propTypes = {
  state: _propTypes.default.object.isRequired
};
var _default = Table;
exports.default = _default;