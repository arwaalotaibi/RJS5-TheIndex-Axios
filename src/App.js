import React, { Component } from "react";
import axios from "axios";

// Components
import Sidebar from "./Sidebar";
import SearchBar from "./SearchBar";
import AuthorsList from "./AuthorsList";
import AuthorDetail from "./AuthorDetail";
import Loading  from "./Loading";
import { throws } from "assert";
import { faCommentsDollar } from "@fortawesome/free-solid-svg-icons";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authors : [],
      currentAuthor: {},
      filteredAuthors: [],
      loading : false ,
    };
     this.selectAuthor = this.selectAuthor.bind(this);
    // this.unselectAuthor = this.unselectAuthor.bind(this);
    // this.filterAuthors = this.filterAuthors.bind(this);
    
  }
  componentDidMount(){
    axios
    .get("https://the-index-api.herokuapp.com/api/authors/")
    .then(res => res.data)
    .then(authorsData => this.setState({ authors: authorsData}))
    .catch(error => console.log(error));

  }
  selectAuthor(authorID) {
    axios
    .get(`https://the-index-api.herokuapp.com/api/authors/${authorID}/`)
    .then(res => res.data)
    .then(author => this.setState({ currentAuthor: author}))
    .catch(error => console.log(error));
    

  }

  // unselectAuthor() {
  //   this.setState({ currentAuthor: {} });
  // }

  // filterAuthors(query) {
  //   query = query.toLowerCase();
  //   let filteredAuthors = authors.filter(author => {
  //     return `${author.first_name} ${author.last_name}`.includes(query);
  //   });
  //   this.setState({ filteredAuthors: filteredAuthors });
  // }

  getContentView() {
    if (this.state.currentAuthor.first_name) {
      return <AuthorDetail author={this.state.currentAuthor} />;
    } else if (this.state.filteredAuthors[0]) {
      return (
        <AuthorsList
          authors={this.state.filteredAuthors}
          selectAuthor={this.selectAuthor}
        />
      );
    } else {
      return <AuthorsList loading= {this.state.loading} authors={this.state.authors} selectAuthor={this.selectAuthor} />;
    }
  }

  render() {
    return (
      <div id="app" className="container-fluid">
        <div className="row">
          <div className="col-2">
            <Sidebar unselectAuthor={this.unselectAuthor} />
          </div>
          <div className="content col-10">
            <SearchBar filterAuthors={this.filterAuthors} />
            {this.getContentView()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
