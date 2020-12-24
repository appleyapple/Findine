import React, {useEffect} from 'react'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function Filters(props) {

    const [filters, setFilters] = React.useState(() => ['1', '2', '3', '4']);

    const handFilters = (event, newFilters) => {
        setFilters(newFilters);
        props.addPriceFilters(filters);
    };

    useEffect(() => {
        return () => {
            props.addPriceFilters(filters);
        };
    });

    return (
        <div>

            <ToggleButtonGroup value={filters} onChange={handFilters} aria-label="meals">

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
        </div>
    )
}

export default Filters
