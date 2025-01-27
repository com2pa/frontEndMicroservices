import { Route, Routes } from 'react-router-dom';
import PersistAuth from '../components/PersistAuth';
import Index from '../pages/Index';
import Post from '../pages/Post';


export const Root = () => {
  return (


    <>
    
      <Routes>
        <Route element={<PersistAuth />}>
          <Route path='/dashboard' element={<Index/>}/>
          <Route path='/post' element={<Post/>}/> 
        </Route>
      </Routes>

    </>


  );

};

export default Root;