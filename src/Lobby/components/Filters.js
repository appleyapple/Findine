import React, {useEffect} from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function Filters(props) {

    const [prices, setPrices] = React.useState(() => ['1', '2', '3', '4']);
    const [meals, setMeals] = React.useState(() => ['Breakfast', 'Lunch', 'Dinner']);

    const handlePrices = (event, newPrices) => {
        setPrices(newPrices);
        props.addPriceFilters(prices);
    };

    const handleMeals = (event, newMeals) => {
        setMeals(newMeals);
        props.addPriceFilters(meals);
    };

    useEffect(() => {
        props.addPriceFilters(prices);
        props.addMealFilters(meals);

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prices, meals]); // only re-run if filters changes

    return (
        <div>

            <ToggleButtonGroup value={prices} onChange={handlePrices} aria-label="prices">
                <ToggleButton value="1" aria-label="1">
                    $
                </ToggleButton>
                <ToggleButton value="2" aria-label="2">
                    $$
                </ToggleButton>
                <ToggleButton value="3" aria-label="3">
                    $$$
                </ToggleButton>
                <ToggleButton value="4" aria-label="4">
                    $$$$
                </ToggleButton>
            </ToggleButtonGroup>

            <ToggleButtonGroup value={meals} onChange={handleMeals} aria-label="meals">
                <ToggleButton value="Breakfast" aria-label="Breakfast">
                    Breakfast
                </ToggleButton>
                <ToggleButton value="Lunch" aria-label="Lunch">
                    Lunch
                </ToggleButton>
                <ToggleButton value="Dinner" aria-label="Dinner">
                    Dinner
                </ToggleButton>
            </ToggleButtonGroup>
            
        </div>
    )
}

export default Filters
