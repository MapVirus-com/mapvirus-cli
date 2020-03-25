import {API_ROOT} from "./Constants";

export function fetchRegions(props, search) {
    fetch(API_ROOT + "/regions?search=" + search, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then((json) => {
            props.setSubRegion1(json);
            props.setFetchingRegion(false);
        }, (error) => {
            console.log(error);
            props.setFetchingRegion(false);
        })
}

export function fetchCountries(props) {
    fetch(API_ROOT + "/countries", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
        .then(res => res.json())
        .then((json) => {
            props.setCountries(json.countries);
        }, (error) => {
            console.log(error);
        });
}