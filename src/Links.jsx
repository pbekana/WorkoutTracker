import { BrowserRouter, Route,Routes} from "react-router-dom";
import App from "./App";
import Exercise from './Exercise';
import Workout from './Workout';
import More from './More';
import Products from './Products';
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