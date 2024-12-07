import { useState, useEffect } from 'react';
import { Button, Table } from 'antd';
import { API } from "../constants/api";
import useFetch from "../hooks/useFetch";
import { columns } from '../features/history/transfer/columns';

const TransferHistory = () => {
  const [req, setReq] = useState(1);
  const { loading, data, error } = useFetch(API.TRANSFER_HISTORY, req);
  const [displayData, setDisplayData] = useState([]);

  useEffect(() => {
    if (data?.length) {
      setDisplayData([...displayData, ...data])
    }
  }, [data]);

  console.log({ loading, data, error , displayData})
  const handleLoadMore = () => {
    setReq(req + 1);
  }

  if (error) throw new Error(error);

  return (
    <div>
      <Table columns={columns} dataSource={displayData} loading={loading || !displayData.length} pagination={false} />
      <Button onClick={handleLoadMore} disabled={loading}>Load more</Button>
    </div>
  )
}

export default TransferHistory;