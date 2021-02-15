import logo from './logo.svg';
import React from 'react'
import Search from './components/Search'
import apiKey from './config'
import SearchButtons from './components/SearchButtons';
import PhotoContainer from './components/PhotoContainer';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NotFound from './components/Not-found';

class App extends React.Component {
    state = {
        photo: {},
        query:'sunset'
    }

    componentDidMount() {
        this.fetchPhotos()
    }

 

    fetchPhotos = (query) => {
      console.log('running', query)
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=24&api_key=e69353759d479fabc5cd0eef6c311757&tags=${query}&format=json&nojsoncallback=1`).then(response => response.json()).then(responseData => {
            console.log('res', responseData)
            this.setState({photo: responseData.photos, query:this.state.query});
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
                      />
                    }
                    />
                   <Route path="/:query" render={(routerProps) => 
                      validResults ? (fetchPic &&<PhotoContainer 
                      routerProps={routerProps} 
                      photos = {this.state.photo}
                      />) : <NotFound />
                    }
                    />
                </Switch>
            </BrowserRouter>

        )
    }
}

export default App;
