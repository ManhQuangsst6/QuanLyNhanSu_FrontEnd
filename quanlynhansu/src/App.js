
import './App.scss';
import ModelInfoEmployee from './component/model-info-employee/model-info-employee.js'
import {
  GetAllDepartment
} from "./api/departmentAPI";
import LayoutCommon from './layout/layout-common';
function App() {
  // function TestAPI() {
  //   GetAllDepartment().then(res => {
  //     console.log(res)
  //   })
  // }

  return (
    <div class="all">
      {/* <h1>Hi</h1>
      <button onClick={() => TestAPI()} className="test">Test</button> */}
      <LayoutCommon></LayoutCommon>
      {/* <ModelInfoEmployee></ModelInfoEmployee> */}
    </div>
  );
}

export default App;
