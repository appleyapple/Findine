import React, {useEffect} from 'react';
import MultiSelect from 'react-multi-select-component';

// returns list of objects {label, value} for multiselect options
// function getCuisines() {
//     var cuisines;

//     fetch('/restaurants/cuisines')
//     .then(res => res.json())
//     .then(data => {
//         var cuisineList = data.map(function(data) {
//             var cuisineItem = {
//                 label: data,
//                 value: data
//             }
//             return cuisineItem;
//         });
//         cuisines = cuisineList;
//     });
//     return cuisines;
// }

function MoreFilters(props) {

    const [cuisines, setCuisines] = React.useState(() => [
        {label: "American", value: "American"}
        ,{label: "Asian", value: "Asian"}
        ,{label: "Australian", value: "Australian"}
        ,{label: "Bakery", value: "Bakery"}
        ,{label: "Bar Food", value: "Bar Food"}
        ,{label: "Beverages", value: "Beverages"}
        ,{label: "Biryani", value: "Biryani"}
        ,{label: "Burger", value: "Burger"}
        ,{label: "Cafe", value: "Cafe"}
        ,{label: "Cambodian", value: "Cambodian"}
        ,{label: "Canadian", value: "Canadian"}
        ,{label: "Chinese", value: "Chinese"}
        ,{label: "Continental", value: "Continental"}
        ,{label: "Desserts", value: "Desserts"}
        ,{label: "European", value: "European"}
        ,{label: "Fast Food", value: "Fast Food"}
        ,{label: "French", value: "French"}
        ,{label: "Fusion", value: "Fusion"}
        ,{label: "Ice Cream", value: "Ice Cream"}
        ,{label: "Indian", value: "Indian"}
        ,{label: "Italian", value: "Italian"}
        ,{label: "Japanese", value: "Japanese"}
        ,{label: "Juices", value: "Juices"}
        ,{label: "Mediterranean", value: "Mediterranean"}
        ,{label: "North Indian", value: "North Indian"}
        ,{label: "Pizza", value: "Pizza"}
        ,{label: "Salad", value: "Salad"}
        ,{label: "Sandwich", value: "Sandwich"}
        ,{label: "Seafood", value: "Seafood"}
        ,{label: "South Indian", value: "South Indian"}
        ,{label: "Spanish", value: "Spanish"}
        ,{label: "Steak", value: "Steak"}
        ,{label: "Street Food", value: "Street Food"}
        ,{label: "Sushi", value: "Sushi"}
        ,{label: "Tapas", value: "Tapas"}
        ,{label: "Thai", value: "Thai"}
        ,{label: "Vietnamese", value: "Vietnamese"}
        ,{label: "Wraps", value: "Wraps"}
    ]);

    const cuisineFilters = [
        {label: "American", value: "American"}
        ,{label: "Asian", value: "Asian"}
        ,{label: "Australian", value: "Australian"}
        ,{label: "Bakery", value: "Bakery"}
        ,{label: "Bar Food", value: "Bar Food"}
        ,{label: "Beverages", value: "Beverages"}
        ,{label: "Biryani", value: "Biryani"}
        ,{label: "Burger", value: "Burger"}
        ,{label: "Cafe", value: "Cafe"}
        ,{label: "Cambodian", value: "Cambodian"}
        ,{label: "Canadian", value: "Canadian"}
        ,{label: "Chinese", value: "Chinese"}
        ,{label: "Continental", value: "Continental"}
        ,{label: "Desserts", value: "Desserts"}
        ,{label: "European", value: "European"}
        ,{label: "Fast Food", value: "Fast Food"}
        ,{label: "French", value: "French"}
        ,{label: "Fusion", value: "Fusion"}
        ,{label: "Ice Cream", value: "Ice Cream"}
        ,{label: "Indian", value: "Indian"}
        ,{label: "Italian", value: "Italian"}
        ,{label: "Japanese", value: "Japanese"}
        ,{label: "Juices", value: "Juices"}
        ,{label: "Mediterranean", value: "Mediterranean"}
        ,{label: "North Indian", value: "North Indian"}
        ,{label: "Pizza", value: "Pizza"}
        ,{label: "Salad", value: "Salad"}
        ,{label: "Sandwich", value: "Sandwich"}
        ,{label: "Seafood", value: "Seafood"}
        ,{label: "South Indian", value: "South Indian"}
        ,{label: "Spanish", value: "Spanish"}
        ,{label: "Steak", value: "Steak"}
        ,{label: "Street Food", value: "Street Food"}
        ,{label: "Sushi", value: "Sushi"}
        ,{label: "Tapas", value: "Tapas"}
        ,{label: "Thai", value: "Thai"}
        ,{label: "Vietnamese", value: "Vietnamese"}
        ,{label: "Wraps", value: "Wraps"}
    ];


    useEffect(() => {
        var filters = cuisines.map((cuisine) => {return cuisine['value']});
        props.addCuisineFilters(filters);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [cuisines]); // only re-run if filters changes

    return (
        <div>
            <pre>{JSON.stringify(cuisines)}</pre>
            <MultiSelect
                options={cuisineFilters}
                value={cuisines}
                onChange={setCuisines}
                labelledBy={'Select'}
            />
        </div>
    )
}

export default MoreFilters
