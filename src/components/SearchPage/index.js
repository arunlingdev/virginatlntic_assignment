import React, { useState } from 'react';
import {
  Autocomplete,
  Container,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Rating,
  Select,
  TextField,
  Button,
} from "@mui/material";
import { location, facilities, prices, ratings } from '../../data/constant';
import Cards from '../Cards'
import NoFound from '../NoFound'
import DatePicker from 'react-datepicker';
import { useSelector, useDispatch } from 'react-redux';
import { actions } from '../../state/reducer';
import moment from 'moment';
import './SearchPage.scss';

/**
 * Component Search Page
 * @constant
 * @type {function}
 * @returns {JSX}
 */
const SearchPage = () => {
  const dispatch = useDispatch();
  /**
   * Data states from store
   * @constants
   * @type {object} data
  */
  const data = useSelector((state) => state.hotels);
  const [startDate, setStartDate] = useState('');
  const [selectedCity, setCity] = useState('');
  const [selectedPricePP, setPricePP] = useState('');
  const [selectedFacilities, setFacilities] = useState('');
  const [selectedRating, setRating] = useState('');
  const [filterHolidays, setFilterHolidays] = useState('');
  const [isFiltered, setFiltered] = useState(false);
  let holidays = isFiltered ? filterHolidays : data.holidays;

  const handleSelectCity = (_, value) => {
    setCity(value);
  };

  const handlePricePP = (event) => {
    setPricePP(event.target.value);
    console.log(event.target.name)
  };

  const handleFacilities = (event) => {
    setFacilities(event.target.value);
  }

  const handleRating = (event) => {
    setRating(event.target.value);
  }

  const handleFilter = () => {
    const filteredHolidays = data.holidays.filter((holiday) => {
      if (
        holiday.pricePerPerson <= selectedPricePP ||
        holiday.rating === selectedRating ||
        holiday.hotel.content.hotelFacilities.includes(selectedFacilities)
      ) {
        return true;
      } else {
        return false;
      }
    });
    setFilterHolidays(filteredHolidays);
    setFiltered(true);
  }

  const handleSubmit = () => {
    dispatch(actions.setLoader(1))
    dispatch(actions.getHolidays({ startDate: moment(startDate).format('DD-MM-YYYY'), city: selectedCity.city }));
  }

  const handleClearFilter = () => {
    setFacilities('');
    setPricePP('');
    setRating('');
    setFilterHolidays('');
    setFiltered(false);
  }

  return (
    <>
      <div  className="SearchPage">
        <div data-testid="search-page-heading" className="heading">Search Holiday</div>
        <div className="wrapper">
          <Autocomplete
            style={{ width: 200 }}
            disabled={data.loader}
            id="tags-outlined"
            options={location}
            getOptionLabel={(option) => option.city}
            onChange={handleSelectCity}
            renderInput={(params) => (
              <TextField {...params} margin="normal" fontFamily="lato" variant="outlined" label="Select Location" />
            )}
          />
          <div className="dates_heading">Departure Date</div>
          <DatePicker
            minDate={new Date()}
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            placeholderText="Departure Date"
            dateFormat="dd/MM/yyyy"
            disabled={data.loader}
          />

          <div className="submit">
            <Button disabled={!startDate || !selectedCity || data.loader} variant="contained" color="primary" onClick={handleSubmit}>
              Search
            </Button>
          </div>
        </div>
        <Divider sx={{ margin: "20px" }} />
        {data.loader !== 0 && <div className="loadPaginate"><i className="fas fa-spinner fa-pulse"></i></div>}
        {data.holidays.length > 0 && (<div>
          <div style={{ color: 'black', fontFamily: 'lato', fontSize: '16px' }} component="legend">
            Filter by...
          </div>
          <Container maxWidth='xl' sx={{ marginTop: "20px" }}>
            <Grid container item xs={12} sm={6} md={8} spacing={2}>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='location'>Price per Person</InputLabel>{" "}
                  <Select
                    labelId='location'
                    id='hotel-location'
                    value={selectedPricePP}
                    label='Price per Person'
                    onChange={handlePricePP}
                  >
                    {prices.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value.value}>
                          {value.displayValue}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='location'>Hotel Facilities</InputLabel>{" "}
                  <Select
                    labelId='location'
                    id='hotel-location'
                    value={selectedFacilities}
                    label='Hotel Facilities'
                    onChange={handleFacilities}
                  >
                    {facilities.map((facility, i) => {
                      return (
                        <MenuItem key={i} value={facility.value}>
                          {facility.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={3}>
                <FormControl fullWidth size='small'>
                  <InputLabel id='location'>Hotel rating</InputLabel>{" "}
                  <Select
                    labelId='location'
                    id='hotel-location'
                    value={selectedRating}
                    label='Hotel Rating'
                    onChange={handleRating}
                  >
                    {ratings.map((value, index) => {
                      return (
                        <MenuItem key={index} value={value.displayValue}>
                          <Rating readOnly value={value.displayValue} />
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <div
              style={{
                marginTop: "20px",
              }}
            >
              <Button
                onClick={handleFilter}
                variant='contained'
                color='primary'
              >
                Filter
              </Button>
              <Button
                disabled={!isFiltered}
                onClick={handleClearFilter}
                variant='contained'
                color='primary'
                style={{ marginLeft: "10px" }}
              >
                Clear Filters
              </Button>
            </div>
          </Container>
          {holidays.length > 0 && <div className='totalCount' component="legend">
            Total Holidays Found {holidays.length}
          </div>}
          {holidays.length > 0 ? <div className='cards'>
            {
              holidays.map((holiday, index) => {
                return (
                  <Cards key={index} holiday={holiday} />
                );
              })
            }
          </div> : <NoFound />}
        </div>)}
      </div>
    </>
  )
};

export default SearchPage;
