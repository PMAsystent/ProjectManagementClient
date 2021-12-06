import React from 'react';
import { fireEvent, render, screen, waitFor } from 'test-utils';
import AsyncAutocomplete from '../../components/AsyncAutocomplete/AsyncAutocomplete';

describe('Async Autocomplete Tests', () => {
  it('Should render the component', () => {
    render(
      <AsyncAutocomplete
        label={'test'}
        setOptions={() => {}}
        loading={false}
        name={'test'}
        nameOptionLabel={'test'}
        options={[
          {
            id: 1,
            test: 'nazwa',
          },
        ]}
        clearOnClose={true}
        onSelect={() => {}}
        onChange={() => {}}
      />
    );
  });
  it('Should render component with provide values and save one', async () => {
    let options = [
      {
        id: 1,
        value: 'Test 1',
      },
      {
        id: 2,
        value: 'Test 2',
      },
    ];
    const setOption = (newOptions: any[]) => {
      options = newOptions;
    };
    const coponent = render(
      <AsyncAutocomplete
        label={'test'}
        setOptions={setOption}
        loading={false}
        name={'test'}
        nameOptionLabel={'value'}
        options={options}
        clearOnClose={true}
        onSelect={(e: any, value: any) => {
          options.push(value);
          expect(value).toStrictEqual({
            id: 2,
            value: 'Test 2',
          });
        }}
        onChange={() => {}}
      />
    );

    const autocomplete = coponent.container.querySelector('#test');
    if (autocomplete) {
      fireEvent.change(autocomplete, {
        target: { value: 'T' },
      });
    }
    await waitFor(() => screen.getByText('Test 1'));
    const testValue = await waitFor(() => screen.getByText('Test 2'));
    fireEvent.click(testValue);
  });
  it('Should render the component with loading state', () => {
    const component = render(
      <AsyncAutocomplete
        label={'test'}
        setOptions={() => {}}
        loading={true}
        name={'test'}
        nameOptionLabel={'test'}
        options={[
          {
            id: 1,
            test: 'nazwa',
          },
        ]}
        clearOnClose={true}
        onSelect={() => {}}
        onChange={() => {}}
      />
    );
    expect(component.container.querySelector('.MuiCircularProgress-svg')).toBeDefined();
  });
});
