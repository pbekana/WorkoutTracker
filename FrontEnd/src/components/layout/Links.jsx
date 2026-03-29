import { BrowserRouter, Route,Routes} from "react-router-dom";
import App from "../../pages/App";
import Exercise from '../../pages/Exercise';
import Workout from '../../pages/Workout';
import More from '../../pages/More';
import Products from '../../pages/Products';
export default function Links() {
   return (
    <>
    <div>
    <BrowserRouter>
     
      <Routes>
       <Route path="/" element={<App/>}></Route>
       <Route path="/products" element={<Products/>}></Route>
       <Route path="/workout" element={<Workout/>}></Route>
       <Route path="/exercise" element={<Exercise/>}></Route>
       <Route path="/more" element={<More/>}></Route>
     </Routes>
    </BrowserRouter>
    
    </div>
    </>
   ) 
}