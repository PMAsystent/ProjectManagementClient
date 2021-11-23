import React, { FC, useCallback, useEffect, useState } from 'react';
import './styles.scss';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import { findUsers } from '../../api/utils';
import { debounce } from 'lodash';

const AsyncAutocomplete: FC<any> = ({ label, ...props }) => {
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [options, setOptions] = useState<any[]>([]);
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!openAutocomplete) {
      setOptions([]);
    }
  }, [openAutocomplete]);

  const checkUserExistDebounced = useCallback(
    debounce(async (query) => {
      setLoading(true);
      const response: any = await findUsers(query);
      if (response?.count > 0) {
        setOptions(response.users);
      } else {
        setOptions([]);
      }
      setLoading(false);
    }, 800),
    []
  );

  return (
    <div className={'custom-autocomplete'}>
      {label && <label htmlFor={props.name}>{label}</label>}
      <Autocomplete
        id={props.name}
        open={openAutocomplete}
        onOpen={() => {
          setOpenAutocomplete(true);
        }}
        onClose={() => {
          setOpenAutocomplete(false);
        }}
        isOptionEqualToValue={(option, value) => option.email === value.email}
        getOptionLabel={(option) => option.email}
        options={options}
        loading={loading}
        multiple
        noOptionsText={value ? `Nie znaleziono: ${value}` : 'Znajdź użytkownika'}
        loadingText={'Szukanie...'}
        renderInput={(params) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
              onChange: (e) => {
                if (e.target.value) {
                  checkUserExistDebounced(e.target.value);
                } else {
                  setOptions([]);
                }
                setValue(e.target.value);
              },
              value,
              endAdornment: (
                <React.Fragment>
                  {loading ? <CircularProgress sx={{ color: '#7b7a7a', marginRight: '10px' }} size={20} /> : null}
                  {params.InputProps.endAdornment}
                </React.Fragment>
              ),
            }}
          />
        )}
      />
    </div>
  );
};

export default AsyncAutocomplete;
