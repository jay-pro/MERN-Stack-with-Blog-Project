import { BrowserRouter as Router, Route } from "react-route-dom";
import "./App.css";

//Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Article from "./pages/Article";
import ArticlesList from "./pages/ArticlesList";

//Components
import NavBar from "./Components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <div className="max-w-screen-md mx-auto pt-20">
        <Route exact path="/" component={Home} />
        <Route exact path="/about" component={About} />
        <Route exact path="/articles-list" component={ArticlesList} />
        <Route exact path="/article:name" component={Article} />
      </div>
    </Router>
  );
}

export default App;
