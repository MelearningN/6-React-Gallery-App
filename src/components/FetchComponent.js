import React from 'react'
import Search from './Search'
import PhotoContainer from './PhotoContainer';
import logo from '../gallery.png'
import Nav from './Nav'
import NotFound from './Not-found'
import apiKey from '../config.js'

class FetchComponent extends React.Component {
    state = {
        photos: [],
        loading: true
    }

    //loads photos whenever component mounts
    componentDidMount() {
        this.fetchPhotos()
    }

    //only fetchs when search query changes(prevents fetching on refresh)
    componentDidUpdate(prevProps) {
        const {match} = this.props
        if (prevProps.match.params.searchText !== match.params.searchText) {
            this.fetchPhotos();
        }
    }

    //adds to history object when search query comes up
    fallbackSearch = (searchText) => {
        this.props.history.push(`/search/${searchText}`)
    }

    //fetch photos function to call flickr api
    fetchPhotos = () => {
        const {match} = this.props
        this.setState({loading: true})
        let searchText = match.params.searchText;
        fetch(`https://www.flickr.com/services/rest/?method=flickr.photos.search&per_page=24&api_key=${apiKey}&tags=${searchText}&format=json&nojsoncallback=1`).then(response => response.json()).then(responseData => {
            this.setState({photos: responseData.photos.photo, loading: false});
        }).catch(error => {
            console.log('Error fetching and parsing data', error);
        });
    }

    render() {
        const {searchText} = this.props.match.params
        const {photos} = this.state
        let validPhotoOutput = photos.length > 0
       
        // a component that renders when there are some results
        const SearchText = () => {
            return <React.Fragment>
                <React.Fragment>Here are some results for {searchText}</React.Fragment>
                <a style={
                        {display: 'block'}
                    }
                    href="/">
                    <span>&larr;</span>Go Home</a>
            </React.Fragment>
        }

        return (
            <React.Fragment>
                <img id='logo'
                    style={
                        {
                            border: '35px solid lightskyblue',
                            animation: '3s linear 2s alternate slidein'
                        }
                    }
                    src={logo}/>
                <Search onSearch={
                    this.fallbackSearch
                }/>
                <Nav/>
                {this.state.loading ? 'Loading please wait....' : <span>
                <h3>{
                    searchText !== undefined ? (validPhotoOutput ?
                        <SearchText/> :
                        <NotFound/>) :'Welcome Home! try searching keywords like city'
                } </h3>
               
                <PhotoContainer photos={
                    this.state.photos
                }/>
                </span>
            }
            </React.Fragment>
        )
    }
}

export default FetchComponent;
