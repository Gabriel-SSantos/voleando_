import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom'
import { FaVolleyball } from 'react-icons/fa6'
import Home from './components/pages/Home/Home'
// import Company from './components/pages/Placar/Placar'
// import Contact from './components/pages/Ranking/Contact'
// import Newproject from './components/pages/Cadastro/Newproject'
import Navbar from './components/layout/Navbar'
import Container from './components/layout/Container'
// import Projects from './components/pages/Cadastro/Projects'
// import Footer from './components/layout/Footer'
import Placar from './components/pages/Placar/Placar'

function App() {
  return (
    <Router>
      <div style={
        {
          padding: 10,
          backgroundColor:"#FFDD00", 
          display:"flex",
          alignItems:"center", 
          justifyContent:"center",
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
        }}>
          <h1>
          <FaVolleyball size={50}
            style={{marginRight:"10px"}}
          />
          Voleando</h1>
        </div>
      <Container customClass='min-height'>
        <Routes>
          <Route exact path='/' Component={Home}></Route>
          <Route path='/placar' Component={Placar}></Route>
          {/* <Route path='/cadastros' Component={Projects}></Route> */}
          {/* <Route exact path='/classificacao' Component={Contact}></Route> */}
        </Routes>
      </Container>
      <Navbar/>
    </Router>
  );
}

export default App;
