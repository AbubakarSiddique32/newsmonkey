import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    pageSize: 5,
    country: "in",
    category: "General",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    country: PropTypes.string,
    category: PropTypes.string,
  };
  constructor(props) {
    super(props);
    this.state = { articles: [], loading: false, page: 1, totalResults: 0 };
    document.title = `${this.props.category}- NewsMonkey`;
  }

  async updateNews() {
    try {
      this.props.setProgress(10);
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${process.env.REACT_APP_NEWS_API}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({ loading: true });
      let response = await fetch(url);
      if (!response.ok) throw new Error("Network response was not ok.");
      let parsedData = await response.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      });
      this.props.setProgress(100);
    } catch (error) {
      console.error("Fetch error:", error);
      this.setState({ loading: false });
    }
  }

  async componentDidMount() {
    // let url = `https://newsapi.org/v2/top-headlines?country=${
    //   this.props.country
    // }&category=${
    //   this.props.category
    // }&apiKey=7d13786d7ed4466eb0edb409741cf223&page=${
    //   this.state.page - 1
    // }&pageSize=${this.props.pageSize}`;
    // // let url = `https://newsapi.org/v2/everything?domains=wsj.com&category=${this.props.category}&apiKey=7d13786d7ed4466eb0edb409741cf223&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({ loading: true });
    // let data = await fetch(url);
    // let parsedData = await data.json();
    // console.log(parsedData);
    // this.setState({
    //   articles: parsedData.articles,
    //   totalResults: parsedData.totalResults,
    //   loading: false,
    // });
    this.updateNews();
  }

  fetchMoreData = async () => {
    this.setState(
      (prevState) => ({
        page: prevState.page + 1,
      }),
      async () => {
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apikey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
        console.log(parsedData);
        this.setState({
          articles: this.state.articles.concat(parsedData.articles),
          totalResults: parsedData.totalResults,
        });
      }
    );
  };
  // handlePrevclick = async () => {
  //   // let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apiKey=7d13786d7ed4466eb0edb409741cf223&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.props.pageSize}`;

  //   // let url = `https://newsapi.org/v2/everything?domains=wsj.com&category=${
  //   //   this.props.category
  //   // }&apiKey=7d13786d7ed4466eb0edb409741cf223&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   page: this.state.page - 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false,
  //   // });}
  //   this.setState({ page: this.state.page - 1 });
  //   this.updateNews();
  // };
  // handleNextclick = async () => {
  //   // if (
  //   //   !(
  //   //     this.state.page + 1 >
  //   //     Math.ceil(this.state.totalResults / this.props.pageSize)
  //   //   )
  //   // ) {
  //   //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //   //     this.props.country
  //   //   }&category=${
  //   //     this.props.category
  //   //   }&apiKey=7d13786d7ed4466eb0edb409741cf223&page=${
  //   //     this.state.page - 1
  //   //   }&pageSize=${this.props.pageSize}`;
  //   // let url = `https://newsapi.org/v2/everything?domains=wsj.com&category=${ this.props.category}&apiKey=7d13786d7ed4466eb0edb409741cf223&page=${
  //   //   this.state.page + 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // this.setState({ loading: true });
  //   // let data = await fetch(url);
  //   // let parsedData = await data.json();
  //   // console.log(parsedData);
  //   // this.setState({
  //   //   page: this.state.page + 1,
  //   //   articles: parsedData.articles,
  //   //   loading: false,
  //   // });}
  //   this.setState({ page: this.state.page + 1 });
  //   this.updateNews();
  // };
  render() {
    return (
      <>
        <h1 className="text-center" style={{ margin: "35px" }}>
          NewsMonkey - Top {this.props.category} Headlines
        </h1>
        {this.state.loading && <Spinner />}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            <div className="row ">
              {this.state.articles.map((element) => {
                return (
                  <div className="col-md-4" key={element.url}>
                    <NewsItem
                      key={element.url}
                      title={element.title ? element.title : ""}
                      description={
                        element.description ? element.description : ""
                      }
                      imageUrl={element.urlToImage}
                      newsUrl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevclick}
            className="btn  btn-dark"
          >
            &larr; Previous
          </button>
          <button
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalResults / this.props.pageSize)
            }
            type="button"
            onClick={this.handleNextclick}
            className="btn  btn-dark"
          >
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}

export default News;
