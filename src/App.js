import React from 'react'
import Search from './components/Search'
import PhotoContainer from './components/PhotoContainer';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NotFound from './components/Not-found';

class App extends React.Component {
    state = {
        photo: {},
        query:'',
        currentLocation:''
    }

    componentDidMount() {
      this.fetchPhotos()
    }

    componentWillUpdate(prevProps) {
     console.log('now')
  }

 

    fetchPhotos = (query='places') => {
     console.log('initial', query)
     this.setState({query:query})
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=24&api_key=e69353759d479fabc5cd0eef6c311757&tags=${query}&format=json&nojsoncallback=1`).then(response => response.json()).then(responseData => {
           
            this.setState({photo: responseData.photos});
        }).catch(error => {
            console.log('Error fetching and parsing data', error);
        });
    }

   render() {
        const fetchPic = Object.keys(this.state.photo).length !== 0
        const validResults= this.state.photo.photo &&  this.state.photo.photo.length>0
     
        return (
            <BrowserRouter>
                <Search onSearch={this.fetchPhotos}/>
                <Switch>
                <Route exact path="/" render= {routerProps => 
                    fetchPic &&<PhotoContainer 
                      routerProps={routerProps} 
                      photos = {this.state.photo}
                      query={this.state.query}
                      />
                    }
                    />
                   <Route path="/:query" render={(routerProps) => 
                      validResults ? (<PhotoContainer 
                      routerProps={routerProps} 
                      photos = {this.state.photo}
                      query={this.state.query}
                      handleFetch={this.fetchPhotos}
                      />) : <NotFound />
                    }
                    />
                </Switch>
            </BrowserRouter>

        )
    }
}

export default App;
