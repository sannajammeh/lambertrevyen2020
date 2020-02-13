import React from 'react';
import { FaUser, FaMailBulk, FaPhone } from 'react-icons/fa';
// Utils
import { formatToNOK } from '../../utils/format';
// Components
import SelectPrice from '../Select/SelectPrice';
import { IconInput } from '../Input/Input';

const IconInputMemo = React.memo(IconInput);

const BookingForm = state => {
  const {handleSelectChange} = state;
  const {handleChange} = state;
  return (
    <div>
      <IconInputMemo
        type='text'
        name='name'
        icon={FaUser}
        placeholder='Navn'
        value={name}
        onChange={handleChange}
        required
      />
      <IconInputMemo
        type='email'
        name='email'
        icon={FaMailBulk}
        placeholder='Epost addresse'
        value={email}
        onChange={handleChange}
        required
      />
      <IconInputMemo
        type='email'
        name='emailConfirm'
        invalid={emailConfirmErr}
        icon={FaMailBulk}
        placeholder='Bekreft epost addresse'
        value={emailConfirm}
        onChange={handleChange}
        required
      />
      <IconInputMemo
        icon={FaPhone}
        type='number'
        name='phone'
        placeholder='Telefon nummer'
        value={phone}
        onChange={handleChange}
        required
      />
      <hr className='break' />
      <div className='mb-3'>
        {prices.map(obj => (
          <SelectPrice
            label={`${obj.name} kr ${obj.price},-`}
            key={obj.id}
            name={obj.id}
            onChange={handleSelectChange}
            required={!getTotal}
          />
        ))}
        <h3 className='m-0'>Sum totalt: {formatToNOK(getTotal)}</h3>
      </div>
      <button className='button brand u-full-width' type='submit'>
        Reserver billett
      </button>
    </div>
  );
};

export default BookingForm;
