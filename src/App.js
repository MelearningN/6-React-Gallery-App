import React from 'react'
import Search from './components/Search'
import PhotoContainer from './components/PhotoContainer';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import NotFound from './components/Not-found';

class App extends React.Component {
    state = {
        photo: {},
        query: '',
        intialStage: true
    }

    componentWillMount() {
       /*  if(this.state.intialStage){
            this.setState({intialStage:false})
        } */
        this.fetchPhotos()
    }

    fetchPhotos = (query = 'places', routerProps) => {
        /* if (routerProps && routerProps.location.pathname !== '/') {
            query = routerProps.match.params.query
        } */
        this.setState({query})
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=24&api_key=e69353759d479fabc5cd0eef6c311757&tags=${query}&format=json&nojsoncallback=1`).then(response => response.json()).then(responseData => {
            this.setState({photo: responseData.photos});
        }).catch(error => {
            console.log('Error fetching and parsing data', error);
        });
    }

    handleRouter = (routerProps) => {
        console.log('ye', routerProps)
        if (routerProps.match.params.query !== undefined && routerProps.match.params.query !== this.state.query) { // props.fetchApi(props.routerProps.match.params.query)
            this.fetchPhotos(routerProps.match.params.query, routerProps)
        }
    }

    render() {
        const fetchPic = Object.keys(this.state.photo).length !== 0
        const validResults = this.state.photo.photo && this.state.photo.photo.length > 0

        return (
            <BrowserRouter>
                <Search onSearch={
                    this.fetchPhotos
                }/>
                <a href="/">
                    <span>&larr;</span>
                    Home</a>
                <Switch>
                    <Route exact path="/" render= {routerProps =>                                                                                                      fetchPic &&<PhotoContainer 
                                                    routerProps={routerProps} 
                                                    photos = {this.state.photo}
                                                    query={this.state.query}
                                                    />
                     }/>
                    <Route path="/:query"
                        render={
                            (routerProps) => validResults ? (
                                <PhotoContainer routerProps={routerProps}
                                    photos={
                                        this.state.photo
                                    }
                                    query={
                                        this.state.query
                                    }
                                    handleRouter={
                                        this.handleRouter(routerProps)
                                    }/>
                            ) : <NotFound/>
                        }/>
                </Switch>
            </BrowserRouter>

        )
    }
}

export default App;
