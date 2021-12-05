import React, { FC, useEffect, useState } from 'react';
import './styles.scss';
import { Autocomplete, CircularProgress, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const AsyncAutocomplete: FC<{
  label: string;
  setOptions: any;
  loading: boolean;
  name: string;
  nameOptionLabel: string;
  options: any[];
  clearOnClose: boolean;
  onSelect: any;
  onChange: any;
}> = ({ label, ...props }) => {
  const [openAutocomplete, setOpenAutocomplete] = useState(false);
  const [value, setValue] = useState('');
  const [selected, setSelected] = useState(null);
  useEffect(() => {
    if (!openAutocomplete) {
      props.setOptions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openAutocomplete]);

  useEffect(() => {
    if (!value) {
      props.setOptions([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.loading]);

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
          if (props.clearOnClose) {
            setSelected(null);
            setValue('');
          }
        }}
        isOptionEqualToValue={(option, value) => option[props.nameOptionLabel] === value[props.nameOptionLabel]}
        getOptionLabel={(option: any) => option[props.nameOptionLabel]}
        renderOption={(p, option) => {
          return (
            <li {...p} key={option.id}>
              <AddIcon /> {option[props.nameOptionLabel]}
            </li>
          );
        }}
        options={props.options}
        loading={props.loading}
        noOptionsText={value ? `Nie znaleziono: ${value}` : 'Szukaj'}
        loadingText={'Szukanie...'}
        value={selected}
        onChange={props.onSelect}
        blurOnSelect
        renderInput={(params) => (
          <TextField
            data-testid={'input-autocomplete'}
            {...params}
            InputProps={{
              ...params.InputProps,
              onChange: (e) => {
                if (e.target.value) {
                  props.onChange(e.target.value);
                } else {
                  props.setOptions([]);
                }
                setValue(e.target.value);
              },
              value,
              endAdornment: (
                <React.Fragment>
                  {props.loading ? <CircularProgress sx={{ color: '#7b7a7a', marginRight: '10px' }} size={20} /> : null}
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
