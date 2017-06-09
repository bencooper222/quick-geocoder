# quick-geocoder

## Purpose
Paste/type in place names and then uses a geocoder to plot on a map. Live version available at [benc.io/geocoder.html](https://www.benc.io/geocoder.html). 

## Tech

* `Vue.js` for reactive framework
* `Leaflet.js` for mapping
* `vue-awesome` for providing Font Awesome icons in Vue components
* Webpack for module bundling (credts to vue-cli for setting this up)
* Nominatim by OpenStreetMap for geocoding locations

## Caveats
This is 10x better on wide screen devices that have a lot of screen real estate. In rare occurences, it might not succesfully geocode. Try entering a space after your input if this occurs. If it still happens, you probably just have an invalid location


## Build Setup

``` bash
# install dependencies
yarn install 
# npm install works too but is for plebs

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```
Be careful not to use `yarn clean` - it deletes some folders that Leaflet requires for creating popups. 

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).

## License
MIT License.