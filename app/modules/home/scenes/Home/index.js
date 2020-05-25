import React from 'react';
import {FlatList, ActivityIndicator, View, Text} from 'react-native';
import {connect} from 'react-redux';
import BookItem from "../../components/bookitem";
import {actions as home} from "../../index"
import {SearchBar} from "react-native-elements";
import {throttle, debounce} from "throttle-debounce";

const {getBooks} = home;

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {query: "", refreshing: false};
    this.autoSearchThrottled = throttle(1000, this.autoSearch);
    this.autoSearchDebounced = debounce(1000, this.autoSearch);
    this.autoSearchDebouncedForSmallWords = debounce(2000, this.autoSearch);
  }

  componentDidMount() {
    this.searchBooks();
  }

  // A common function to trigger get books call based on whether its additive or not
  searchBooks = (key, additive) => {
    this.props.getBooks(key, this.state.page, additive)
    .finally(() => this.setState({refreshing: false}));
  }

  // This handles Page Refresh and triggers the search again
  // This also removes any old results from the list
  handleRefresh = () => {
    this.setState(
        {
          page: 1,
          refreshing: true,
          books: []
        },
        () => {
          this.searchBooks(this.state.query, false)
        }
    );
  };

  // This handles triggering the search when we need to load more results.
  // This works as pagination in our case
  handleLoadMore = () => {
    this.setState(
        {
          page: this.state.page + 1,
          refreshing: true
        },
        () => {
          this.searchBooks(this.state.query, true)
        }
    );
  };

  // This handles triggering the search automatically for the given text in search box
  handleChange = text => {
    this.setState({query: text}, () => {
      const query = this.state.query;
      if (query.length > 5) {
        // For query with good enough length we use throttle
        this.autoSearchThrottled(this.state.query);
      } else if (query.length > 3) {
        // For query with Ok-ish length we use debounced
        this.autoSearchDebounced(this.state.query);
      } else {
        // For smaller queries we tread wisely!
        this.autoSearchDebouncedForSmallWords(this.state.query);
      }
    });
  };

  // This function represents auto search for a given query string
  // This resets the page (we need only 1 page to start with)
  // This also passes additive as false since we do not need to append the result to already displayed list
  autoSearch = query => {
    this.setState(
        {
          page: 1,
          refreshing: true,
          books: []
        },
        () => {
          this.searchBooks(query, false);
        }
    );
  };

  // Renders the header i.e. Our Search Bar
  renderHeader = () => {
    return (
        <SearchBar
            placeholder="Search for a Book Title Here..."
            lightTheme
            round
            // This tells what to do when a change in text in search bar happens
            onChangeText={text => this.handleChange(text)}
            value={this.state.query}
            autoCorrect={false}
        />
    );
  };

  // How to render each item of list. Here we associate it with our Book Item
  renderItem = ({item, index}) => {
    return <BookItem book={item}/>
  }

  // Here we render our Home Page with the Flatlist (this is latest one which fits our need)
  // Multiple features are used here from triggering loading all data afresh when page is refreshed
  // to loading additional data when end of list is reached (threshold based)
  render() {
    const {books, isFetching, hasError, errorMsg} = this.props;

    // If we are still fetching then display activity indicator
    if (isFetching) {
      return <ActivityIndicator/>
    } else {
      return (
          <FlatList
              style={{backgroundColor: 'white'}}
              contentContainerStyle={{paddingVertical: 1}}
              data={books}
              // this triggers re-rendering when change in state happens
              extraData={this.state}
              renderItem={this.renderItem}
              // Combination of these will improve visual performance of your UX
              initialNumToRender={20}
              windowSize={41}
              // Unique key for items in list
              keyExtractor={(item, index) => index.toString() + "_HomePage"}
              // Whether app is refreshing or not
              refreshing={this.state.refreshing}
              // What happens when page refresh is triggered
              onRefresh={this.handleRefresh}
              // What happens when end of page is reached
              onEndReached={this.handleLoadMore}
              // After what threshold to trigger on End Reached
              onEndReachedThreshold={0}
              // Attached the Search Header to our List
              ListHeaderComponent={this.renderHeader}
          />
      );
    }
  }
}

// Here we assign our props from the state changes made by home reducer
// This can be changes in docs after an action call (Search books) etc.
function mapStateToProps(state, props) {
  return {
    isFetching: state.homeReducer.isFetching,
    hasError: state.homeReducer.hasError,
    errorMsg: state.homeReducer.errorMsg,
    books: state.homeReducer.docs,
    page: state.homeReducer.page
  }
}

// This is where we connect our redux to action to Scene
export default connect(mapStateToProps, {getBooks})(Home);