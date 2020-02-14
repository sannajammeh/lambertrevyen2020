import React, { useMemo } from 'react';
import { FaUser, FaMailBulk, FaPhone } from 'react-icons/fa';
// Utils
import { formatToNOK } from '../../utils/format';
import { calcTotalTicketPrice } from '../../utils/calculations';
// Components
import SelectPrice from '../Select/SelectPrice';
import { IconInput } from '../Input/Input';

const IconInputMemo = React.memo(IconInput);
const BookingForm = ({
  count,
  handleChange,
  handleSelectChange,
  handleSubmit,
  prices,
  formData,
  maxSeats,
}) => {
  const { name, email, emailConfirm, phone, seats, error, errFields } = formData;

  const totalPrice = useMemo(() => calcTotalTicketPrice(seats, prices), [prices, seats]);

  const errors = {
    nameErr: errFields.name,
    emailConfirmErr: errFields.email,
    phoneErr: errFields.phone,
  };

  const isSoldOut = count >= maxSeats;

  return (
    <form onSubmit={handleSubmit}>
      {error && <span className="ticketError">{error}</span>}
      <IconInputMemo
        type="text"
        name="name"
        icon={FaUser}
        placeholder="Navn"
        value={name}
        invalid={errors.nameErr}
        onChange={handleChange}
        required
      />
      <IconInputMemo
        type="email"
        name="email"
        icon={FaMailBulk}
        placeholder="Epost addresse"
        value={email}
        onChange={handleChange}
        required
      />
      <IconInputMemo
        type="email"
        name="emailConfirm"
        invalid={errors.emailConfirmErr}
        msg={errors.emailConfirmErr}
        icon={FaMailBulk}
        placeholder="Bekreft epost addresse"
        value={emailConfirm}
        onChange={handleChange}
        required
      />
      <IconInputMemo
        icon={FaPhone}
        invalid={errors.phoneErr}
        type="number"
        name="phone"
        placeholder="Telefon nummer"
        value={phone}
        onChange={handleChange}
        required
      />
      <hr className="break" />
      <div className="mb-3">
        {prices.map(obj => (
          <SelectPrice
            label={`${obj.name} kr ${obj.price},-`}
            key={obj.id}
            name={obj.id}
            value={seats[obj.name] ? seats[obj.name] : '0'}
            onChange={handleSelectChange}
            required={!totalPrice}
          />
        ))}
        <h3 className="m-0">Sum totalt: {formatToNOK(totalPrice)}</h3>
      </div>
      <button disabled={isSoldOut} className="button brand u-full-width" type="submit">
        {isSoldOut ? 'Forestilling er utsolgt' : 'Reserver billett'}
      </button>
    </form>
  );
};

export default BookingForm;
