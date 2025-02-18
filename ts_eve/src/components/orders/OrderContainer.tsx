const OrderHeader = ({ title }: { title: string }) => {
  return (
    <div className="order_header">
      <p>{title}</p>
    </div>
  );
};

const OrderBody = () => {
  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th className="table_header_row_price">Price</th>
            <th className="table_header_row_location">Location</th>
            <th className="table_header_row_stock">Stock</th>
            <th className="table_header_row_minimum">Min</th>
            <th className="table_header_row_duration">Duration</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="table_content_row_price"> price </td>
            <td className="table_content_row_location">locationId</td>
            <td className="table_content_row_stock">volumeRemain</td>
            <td className="table_content_row_minimum"> minVolume </td>
            <td className="table_content_row_duration">duration days</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

const OrderContainer = () => {
  return (
    <div className="orders_container">
      <OrderHeader title="Buy Orders" />
      <OrderBody />
      <OrderHeader title="Sell Orders" />
      <OrderBody />
    </div>
  );
};

export default OrderContainer;
