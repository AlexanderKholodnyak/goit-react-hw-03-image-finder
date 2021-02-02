import { Component } from 'react';

import Container from './components/Container';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';

class App extends Component {
  state = {
    query: '',
  };

  handleSubmit = name => {
    this.setState({ query: name });

    console.log(name);
  };

  render() {
    const { query } = this.state;
    return (
      <Container>
        <Searchbar onHandleSubmit={this.handleSubmit} />

        <ImageGallery query={query} />
      </Container>
    );
  }
}

export default App;
